import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCode, FiEye, FiTag } from 'react-icons/fi';
import CodeBlock from './CodeBlock.jsx';
import previewRegistry from './previews/registry'; // Import the registry

const ShowcaseCard = ({ component }) => {
  const [showCode, setShowCode] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState('jsx');

  // Get the Preview Component from registry
  const PreviewComponent = previewRegistry[component.id];

  // Get available code formats
  const availableFormats = Object.entries(component.code)
    .filter(([_, code]) => code !== null)
    .map(([format]) => format);

  // Set initial active tab to first available format
  useState(() => {
    if (availableFormats.length > 0 && !availableFormats.includes(activeCodeTab)) {
      setActiveCodeTab(availableFormats[0]);
    }
  }, [component.id]);

  const getFrameworkBadge = () => {
    const badges = {
      'react': { label: 'React', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
      'react-framer': { label: 'React + Framer', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
      'tailwind': { label: 'Tailwind', color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' },
      'html-css': { label: 'HTML/CSS', color: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
    };
    return badges[component.framework] || badges['react'];
  };

  const badge = getFrameworkBadge();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group relative flex flex-col bg-[#050505] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-colors"
    >
      {/* Preview Area */}
      <div className="relative h-[300px] w-full flex items-center justify-center bg-[#0a0a0a] border-b border-white/5 overflow-hidden">
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="relative z-10 p-6 w-full flex items-center justify-center">
          {PreviewComponent ? (
            <PreviewComponent />
          ) : (
            <div className="text-util-gray/30 text-xs font-mono uppercase tracking-widest">
              No Preview
            </div>
          )}
        </div>
      </div>

      {/* Info Header */}
      <div className="p-6 flex-grow flex flex-col bg-[#050505]">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-display font-bold text-white leading-tight">
            {component.title}
          </h3>
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border bg-white/5 border-white/5 text-util-gray`}>
            {badge.label}
          </span>
        </div>
        
        <p className="text-sm text-util-gray/60 leading-relaxed mb-4">
          {component.description}
        </p>

        {/* Tags */}
        <div className="mb-6 flex flex-wrap gap-2">
          {component.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 rounded text-[10px] font-medium text-util-gray/50 bg-white/[0.02] border border-white/5"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Action Footer */}
        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
           <button
             onClick={() => setShowCode(!showCode)}
             className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors ${
               showCode ? 'text-white' : 'text-util-gray hover:text-white'
             }`}
           >
             <FiCode className="w-4 h-4" />
             {showCode ? "Hide Code" : "View Code"}
           </button>
        </div>
      </div>

      {/* Code View (Expandable) */}
      <AnimatePresence>
        {showCode && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-[#020202] border-t border-white/5"
          >
            <div className="p-0">
              {/* Tabs */}
              {availableFormats.length > 1 && (
                <div className="flex border-b border-white/5">
                  {availableFormats.map((format) => (
                    <button
                      key={format}
                      onClick={() => setActiveCodeTab(format)}
                      className={`px-4 py-2 text-[10px] font-bold uppercase tracking-wider transition-colors ${
                        activeCodeTab === format
                          ? 'text-white bg-white/5 border-b-2 border-util-accent'
                          : 'text-util-gray/50 hover:text-white'
                      }`}
                    >
                      {format}
                    </button>
                  ))}
                </div>
              )}
              
              <div className="relative">
                 <CodeBlock
                   code={component.code[activeCodeTab]}
                   language={activeCodeTab}
                 />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ShowcaseCard;
