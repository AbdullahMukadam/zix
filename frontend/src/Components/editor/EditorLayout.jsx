
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTemplate } from '../../context/TemplateContext.jsx';
import { useTemplates, useTemplateData } from '../../hooks/useTemplates.js';
import DynamicForm from '../forms/DynamicForm.jsx';
import PreviewIframe from './PreviewIframe.jsx';
import ExportModal from './ExportModal.jsx';
import { FiEye, FiEyeOff, FiDownload, FiArrowLeft, FiMonitor, FiTablet, FiSmartphone, FiSettings } from 'react-icons/fi';

const EditorLayout = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const { getTemplateById } = useTemplates();
  const {
    selectedTemplate,
    selectTemplate,
    updateTemplateConfig,
    updateTemplateFiles,
    formData
  } = useTemplate();

  const { config, files, loading, error } = useTemplateData(templateId);

  const [showPreview, setShowPreview] = useState(true);
  const [showExportModal, setShowExportModal] = useState(false);
  const [viewMode, setViewMode] = useState('desktop');

  useEffect(() => {
    if (!selectedTemplate && templateId) {
      const template = getTemplateById(templateId);
      if (template) {
        selectTemplate(template);
      }
    }
  }, [templateId]);

  useEffect(() => {
    if (config) updateTemplateConfig(config);
  }, [config]);

  useEffect(() => {
    if (files) updateTemplateFiles(files);
  }, [files]);

  const handleFormComplete = () => {
    setShowExportModal(true);
  };

  const handleBack = () => {
    navigate('/templates');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020202] flex items-center justify-center font-mono">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xs text-util-gray tracking-widest uppercase">Loading Editor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#020202] flex items-center justify-center font-mono">
        <div className="text-center p-8 border border-white/10 bg-[#0A0A0A] rounded-lg">
          <p className="text-red-500 font-bold uppercase mb-6 tracking-widest text-xs">Error: {error}</p>
          <button onClick={handleBack} className="px-6 py-2 bg-white text-black font-bold uppercase text-xs rounded hover:bg-gray-200 transition-colors">Abort</button>
        </div>
      </div>
    );
  }

  if (!selectedTemplate) return null;

  return (
    <div className="min-h-screen bg-[#020202] font-sans relative overflow-hidden flex flex-col text-white">
      {/* Header */}
      <div className="bg-[#020202]/80 backdrop-blur-md border-b border-white/10 z-30 flex justify-between items-center h-16 px-6">
        <div className="flex items-center gap-6">
          <button onClick={handleBack} className="p-2 -ml-2 text-util-gray hover:text-white hover:bg-white/5 rounded-md transition-all">
            <FiArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded bg-[#111] border border-white/10 flex items-center justify-center">
                <span className="font-mono font-bold text-xs">V2</span>
             </div>
             <div className="flex flex-col">
                <span className="text-[10px] font-bold text-util-gray uppercase tracking-widest mb-0.5">Project</span>
                <span className="text-sm font-bold tracking-wide">{selectedTemplate.name}</span>
             </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-8 w-[1px] bg-white/10 mx-2 hidden md:block"></div>
          
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="px-4 py-2 text-util-gray hover:text-white transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:bg-white/5 rounded"
          >
            {showPreview ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
            <span className="hidden md:inline">{showPreview ? 'Hide Preview' : 'Show Preview'}</span>
          </button>

          <button
            onClick={() => setShowExportModal(true)}
            className="px-6 py-2 bg-white text-black font-bold uppercase text-xs tracking-widest hover:bg-gray-200 transition-colors flex items-center gap-2 rounded shadow-lg shadow-white/5"
          >
            <FiDownload className="w-4 h-4" />
            <span>Publish</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex relative z-10 overflow-hidden">
        
        {/* Canvas Area (Preview) */}
        {showPreview && (
          <div className="flex-1 flex flex-col relative overflow-hidden bg-[#050505]">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.07] pointer-events-none"></div>
            
            {/* Canvas Toolbar */}
            <div className="h-12 border-b border-white/5 flex justify-center items-center px-4 z-20">
              <div className="flex items-center gap-1 bg-[#0A0A0A] p-1 rounded-lg border border-white/5 shadow-sm">
                <button 
                  onClick={() => setViewMode('desktop')}
                  className={`p-2 rounded-md transition-all ${viewMode === 'desktop' ? 'bg-white/10 text-white shadow-sm' : 'text-util-gray hover:text-white hover:bg-white/5'}`}
                  title="Desktop View"
                >
                    <FiMonitor className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setViewMode('tablet')}
                  className={`p-2 rounded-md transition-all ${viewMode === 'tablet' ? 'bg-white/10 text-white shadow-sm' : 'text-util-gray hover:text-white hover:bg-white/5'}`}
                  title="Tablet View"
                >
                    <FiTablet className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setViewMode('mobile')}
                  className={`p-2 rounded-md transition-all ${viewMode === 'mobile' ? 'bg-white/10 text-white shadow-sm' : 'text-util-gray hover:text-white hover:bg-white/5'}`}
                  title="Mobile View"
                >
                    <FiSmartphone className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Canvas Viewport */}
            <div className="flex-1 relative overflow-hidden flex items-center justify-center bg-zinc-900">
              <div 
                className={`bg-white shadow-2xl overflow-hidden transition-all duration-500 ease-in-out ${
                  viewMode === 'desktop' ? 'w-full h-full max-w-[1400px] border-0' : 
                  viewMode === 'tablet' ? 'w-[768px] h-[95%]' : 
                  'w-[375px] h-[95%]'
                }`}
              >
                <PreviewIframe
                  templateFiles={files}
                  formData={formData}
                  templateType={selectedTemplate?.type || 'html'}
                />
              </div>
            </div>
          </div>
        )}

        {/* Properties Panel (Form) */}
        <div className={`${showPreview ? 'w-[400px] border-l border-white/10' : 'w-full'} flex-shrink-0 overflow-y-auto bg-[#020202] transition-all duration-300 z-20`}>
          <div className="p-0">
            <div className="sticky top-0 z-10 bg-[#020202]/95 backdrop-blur px-6 py-4 border-b border-white/10 flex justify-between items-center">
               <div className="flex items-center gap-2 text-white">
                  <FiSettings className="w-4 h-4" />
                  <span className="text-sm font-bold uppercase tracking-wide">Properties</span>
               </div>
               <span className="text-[10px] text-util-gray font-mono px-2 py-1 bg-white/5 rounded">CONFIG.JSON</span>
            </div>
            <div className="p-6">
                <DynamicForm onFormComplete={handleFormComplete} />
            </div>
          </div>
        </div>
      </div>

      {showExportModal && (
        <ExportModal
          onClose={() => setShowExportModal(false)}
          template={selectedTemplate}
          templateFiles={files}
          formData={formData}
        />
      )}
    </div>
  );
};

export default EditorLayout;
