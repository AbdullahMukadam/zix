import { useRef, useEffect, useState } from 'react';
import { renderTemplate } from '../../services/template/renderer.js';
import { usePreviewUpdate } from '../../hooks/usePreviewUpdate.js';
import { FiLoader, FiAlertCircle } from 'react-icons/fi';

const PreviewIframe = ({ templateFiles, formData, templateType = 'html' }) => {
  // Only support HTML templates
  if (templateType !== 'html') {
    return (
      <div className="w-full h-full bg-util-black flex items-center justify-center p-8 font-mono">
        <div className="text-center p-12 border border-util-accent bg-black">
          <FiAlertCircle className="w-16 h-16 text-util-accent mx-auto mb-6" />
          <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tighter">UNSUPPORTED_TYPE</h3>
          <p className="text-util-gray mb-8 text-sm uppercase font-bold tracking-tight leading-relaxed max-w-xs mx-auto">
            Only HTML templates are supported. React and Next.js templates are not available.
          </p>
        </div>
      </div>
    );
  }
  
  // HTML preview (original implementation)
  const iframeRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const lastTemplateFilesRef = useRef(null);

  // Smart preview update hook - only updates when data actually changes
  const { queueUpdate, hasPendingChanges } = usePreviewUpdate({
    onUpdate: (data) => {
      setIsUpdating(true);
      loadPreview(data);
    },
    delay: 800, // Reduced from 2000ms to 800ms for better UX
    strategy: 'debounced'
  });

  // Load preview when template files change (immediate, no debounce)
  useEffect(() => {
    if (templateFiles && templateFiles.length > 0) {
      const filesChanged = JSON.stringify(templateFiles) !== JSON.stringify(lastTemplateFilesRef.current);
      if (filesChanged) {
        lastTemplateFilesRef.current = templateFiles;
        loadPreview(formData);
      }
    }
  }, [templateFiles]);

  // Queue preview update when form data changes (with smart batching)
  useEffect(() => {
    if (templateFiles && templateFiles.length > 0 && !loading) {
      queueUpdate(formData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, templateFiles, loading]);

  const loadPreview = async (data = formData) => {
    try {
      setError(null);

      // Find the main HTML file
      const mainFile = templateFiles.find(
        f => f.path === 'index.html' || f.path.endsWith('index.html')
      );

      if (!mainFile) {
        throw new Error('No index.html found in template');
      }

      // Find all CSS files
      const cssFiles = templateFiles.filter(f => f.path.endsWith('.css'));
      
      // Find all JS files
      const jsFiles = templateFiles.filter(f => f.path.endsWith('.js'));

      // Render the template with current form data
      let renderedHTML = renderTemplate(mainFile.content, data);

      // Inject CSS files into the HTML
      let cssInjects = '';
      cssFiles.forEach(cssFile => {
        const renderedCSS = renderTemplate(cssFile.content, data);
        cssInjects += `<style data-source="${cssFile.path}">\n${renderedCSS}\n</style>\n`;
      });

      // Inject JS files into the HTML
      let jsInjects = '';
      jsFiles.forEach(jsFile => {
        const renderedJS = renderTemplate(jsFile.content, data);
        jsInjects += `<script data-source="${jsFile.path}">\n${renderedJS}\n</script>\n`;
      });

      // Inject CSS and JS into the HTML
      // Try to inject CSS before </head> or before </body>
      if (renderedHTML.includes('</head>')) {
        renderedHTML = renderedHTML.replace('</head>', `${cssInjects}</head>`);
      } else if (renderedHTML.includes('</body>')) {
        renderedHTML = renderedHTML.replace('</body>', `${cssInjects}</body>`);
      } else {
        renderedHTML = cssInjects + renderedHTML;
      }

      // Inject JS before </body> or at the end
      if (renderedHTML.includes('</body>')) {
        renderedHTML = renderedHTML.replace('</body>', `${jsInjects}</body>`);
      } else {
        renderedHTML = renderedHTML + jsInjects;
      }
      
      // Create a data URL for the iframe
      const blob = new Blob([renderedHTML], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      
      if (iframeRef.current) {
        iframeRef.current.src = url;
      }

      // Cleanup old blob URL
      return () => {
        URL.revokeObjectURL(url);
      };
    } catch (err) {
      console.error('Error loading preview:', err);
      setError(err.message);
      setLoading(false);
      setIsUpdating(false);
    }
  };

  const handleIframeLoad = () => {
    setLoading(false);
    setIsUpdating(false);
  };

  if (error) {
    return (
      <div className="w-full h-full bg-util-black flex items-center justify-center p-8 font-mono">
        <div className="text-center p-12 border border-util-accent bg-black">
          <FiAlertCircle className="w-16 h-16 text-util-accent mx-auto mb-6" />
          <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tighter">FAULT_DETECTED</h3>
          <p className="text-util-gray mb-8 text-sm uppercase font-bold tracking-tight leading-relaxed max-w-xs mx-auto">{error}</p>
          <button
            onClick={loadPreview}
            className="px-8 py-3 bg-util-accent text-black font-black hover:bg-white transition-all uppercase tracking-widest text-[10px]"
          >
            Retry_Sync
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white overflow-hidden relative border-none">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-util-black z-10 font-mono">
          <div className="text-center">
            <div className="relative w-16 h-16 mx-auto mb-8">
               <div className="absolute inset-0 border border-util-accent animate-spin-slow"></div>
               <FiLoader className="absolute inset-0 m-auto w-6 h-6 text-util-accent animate-pulse" />
            </div>
            <p className="text-white font-black uppercase tracking-[0.3em] text-[10px]">Compiling_Source...</p>
          </div>
        </div>
      )}
      
      {/* Update status overlay */}
      {!loading && (isUpdating || hasPendingChanges) && (
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-util-black/60 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 animate-scan bg-gradient-to-b from-transparent via-util-accent/20 to-transparent h-40 w-full"></div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
             <div className="bg-black border border-util-accent text-util-accent text-[10px] px-4 py-2 font-black uppercase tracking-[0.4em] shadow-[0_0_20px_rgba(255,51,0,0.3)]">
               {isUpdating ? 'Syncing_Core...' : 'Processing_Input...'}
             </div>
          </div>
        </div>
      )}
      
      {/* Grid Overlay for technical feel */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-[2] grid-overlay"></div>
      
      <iframe
        ref={iframeRef}
        onLoad={handleIframeLoad}
        title="Template Preview"
        className="w-full h-full border-0 relative z-[1]"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
};

export default PreviewIframe;
