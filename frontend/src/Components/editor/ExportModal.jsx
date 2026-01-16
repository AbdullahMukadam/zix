
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import useGitHub from '../../hooks/useGitHub.js';
import { FiDownload, FiGithub, FiX, FiCheck, FiAlertCircle, FiTerminal, FiPackage } from 'react-icons/fi';

const ExportModal = ({ onClose, template, templateFiles, formData }) => {
  const { isAuthenticated, login } = useAuth();
  const { exportAsZip, exportToGitHub, loading } = useGitHub();
  
  const [repoName, setRepoName] = useState('');
  const [exportStatus, setExportStatus] = useState(null);
  const [error, setError] = useState(null);
  const [exportResult, setExportResult] = useState(null);

  const handleDownloadZip = async () => {
    try {
      setError(null);
      setExportStatus('downloading');
      
      const filename = `${formData.name?.replace(/\s+/g, '-') || 'website'}.zip`;
      await exportAsZip(templateFiles, formData, filename, template?.type || 'html');
      
      setExportStatus('download-success');
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setError(err.message);
      setExportStatus(null);
    }
  };

  const handlePushToGitHub = async () => {
    if (!isAuthenticated) {
      login();
      return;
    }

    if (!repoName.trim()) {
      setError('Please enter a repository name');
      return;
    }

    try {
      setError(null);
      setExportStatus('uploading');
      
      const result = await exportToGitHub(templateFiles, formData, repoName, template?.type || 'html');
      
      setExportStatus('upload-success');
      setExportResult(result);
    } catch (err) {
      setError(err.message);
      setExportStatus(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#020202]/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-[#0A0A0A] border border-white/10 w-full max-w-2xl rounded-xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#0A0A0A]">
          <div>
            <h2 className="text-xl font-bold text-white">Deploy Project</h2>
            <p className="text-sm text-util-gray/60">Choose how you want to export your codebase.</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-util-gray hover:text-white hover:bg-white/5 rounded-md transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {/* Status Messages */}
          {exportStatus?.includes('success') && (
            <div className="mb-6 bg-green-500/10 border border-green-500/20 p-4 rounded-lg flex items-start gap-3">
              <div className="p-1 bg-green-500/20 rounded-full text-green-500 mt-0.5">
                <FiCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-green-500 font-bold text-sm">Deployment Successful</h4>
                <p className="text-green-500/70 text-xs mt-1">Your project has been successfully exported.</p>
                {exportResult && (
                  <a 
                    href={exportResult.repoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white text-xs font-bold underline mt-2 block hover:text-green-400"
                  >
                    View Repository →
                  </a>
                )}
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/20 p-4 rounded-lg flex items-start gap-3">
              <FiAlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <div>
                <h4 className="text-red-500 font-bold text-sm">Export Failed</h4>
                <p className="text-red-500/70 text-xs mt-1">{error}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Option 1: Local Download */}
            <div className="border border-white/10 rounded-lg p-6 hover:border-white/20 transition-all bg-[#111] flex flex-col">
               <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center mb-4 text-white">
                 <FiPackage className="w-5 h-5" />
               </div>
               <h3 className="text-white font-bold mb-2">Download Archive</h3>
               <p className="text-util-gray/60 text-sm mb-6 flex-1">
                 Get a compiled .zip file of your project. Perfect for manual hosting or local development.
               </p>
               <button
                 onClick={handleDownloadZip}
                 disabled={loading && exportStatus === 'downloading'}
                 className="w-full py-2.5 bg-white text-black font-bold text-xs rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
               >
                 {loading && exportStatus === 'downloading' ? (
                    <>
                        <FiLoader className="animate-spin w-4 h-4" /> Processing...
                    </>
                 ) : (
                    <>
                        <FiDownload className="w-4 h-4" /> Download ZIP
                    </>
                 )}
               </button>
            </div>

            {/* Option 2: GitHub Push */}
            <div className="border border-white/10 rounded-lg p-6 hover:border-white/20 transition-all bg-[#111] flex flex-col">
               <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center mb-4 text-white">
                 <FiGithub className="w-5 h-5" />
               </div>
               <h3 className="text-white font-bold mb-2">Push to GitHub</h3>
               <p className="text-util-gray/60 text-sm mb-6 flex-1">
                 Create a new repository and push your code directly. Best for Vercel/Netlify deployments.
               </p>
               
               {isAuthenticated ? (
                 <div className="space-y-3">
                   <div className="relative">
                        <FiTerminal className="absolute left-3 top-1/2 -translate-y-1/2 text-util-gray/50 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="repository-name"
                            value={repoName}
                            onChange={(e) => setRepoName(e.target.value)}
                            className="w-full bg-[#050505] border border-white/10 rounded-md py-2 pl-9 pr-3 text-xs text-white placeholder-util-gray/30 focus:outline-none focus:border-white/30"
                        />
                   </div>
                   <button
                     onClick={handlePushToGitHub}
                     disabled={loading && exportStatus === 'uploading'}
                     className="w-full py-2.5 bg-[#222] text-white border border-white/10 font-bold text-xs rounded-md hover:bg-[#333] hover:border-white/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                   >
                     {loading && exportStatus === 'uploading' ? (
                        <>
                            <FiLoader className="animate-spin w-4 h-4" /> Pushing...
                        </>
                     ) : (
                        <>
                            <FiGithub className="w-4 h-4" /> Create & Push
                        </>
                     )}
                   </button>
                 </div>
               ) : (
                 <button
                   onClick={login}
                   className="w-full py-2.5 bg-[#222] text-white border border-white/10 font-bold text-xs rounded-md hover:bg-[#333] transition-colors flex items-center justify-center gap-2 mt-auto"
                 >
                   <FiGithub className="w-4 h-4" /> Connect GitHub
                 </button>
               )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
