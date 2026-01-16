import React, { useState } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';
import { cssComponents } from '../../data/components/css.js';

const CSSComponentCard = ({ title, children, htmlCode, cssCode, category }) => {
  const [copiedHTML, setCopiedHTML] = useState(false);
  const [copiedCSS, setCopiedCSS] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const copyHTML = () => {
    navigator.clipboard.writeText(htmlCode);
    setCopiedHTML(true);
    setTimeout(() => setCopiedHTML(false), 2000);
  };

  const copyCSS = () => {
    navigator.clipboard.writeText(cssCode);
    setCopiedCSS(true);
    setTimeout(() => setCopiedCSS(false), 2000);
  };

  return (
    <div className="border border-white/10 rounded-lg overflow-hidden bg-[#0A0A0A] hover:border-white/20 transition-colors">
      <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
        <div className="flex items-center gap-2">
            <h3 className="font-bold text-sm text-white">{title}</h3>
            <span className="text-[10px] text-util-gray px-1.5 py-0.5 rounded bg-white/5 border border-white/5 uppercase tracking-wider">{category}</span>
        </div>
        <button
          onClick={() => setShowCode(!showCode)}
          className="text-xs font-mono text-util-gray hover:text-white px-2 py-1 rounded hover:bg-white/10 transition-colors"
        >
          {showCode ? 'Preview' : 'Show Code'}
        </button>
      </div>
      
      {showCode ? (
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10 h-64">
           <div className="p-4 bg-black/50 overflow-auto custom-scrollbar">
             <div className="flex justify-between items-center mb-2">
               <span className="text-xs font-bold text-util-gray">HTML</span>
               <button onClick={copyHTML} className="text-util-gray hover:text-white">
                 {copiedHTML ? <FiCheck className="w-3 h-3 text-green-400" /> : <FiCopy className="w-3 h-3" />}
               </button>
             </div>
             <pre className="text-xs text-blue-400 font-mono whitespace-pre-wrap">{htmlCode}</pre>
           </div>
           <div className="p-4 bg-black/50 overflow-auto custom-scrollbar">
             <div className="flex justify-between items-center mb-2">
               <span className="text-xs font-bold text-util-gray">CSS</span>
               <button onClick={copyCSS} className="text-util-gray hover:text-white">
                 {copiedCSS ? <FiCheck className="w-3 h-3 text-green-400" /> : <FiCopy className="w-3 h-3" />}
               </button>
             </div>
             <pre className="text-xs text-green-400 font-mono whitespace-pre-wrap">{cssCode}</pre>
           </div>
        </div>
      ) : (
        <div className="p-8 flex items-center justify-center min-h-[192px] bg-grid-pattern bg-[length:20px_20px] relative">
           <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
           <div className="relative z-10">
               <style>{cssCode}</style>
               <div dangerouslySetInnerHTML={{ __html: htmlCode }} />
           </div>
        </div>
      )}
    </div>
  );
};

const CSSComponents = ({ searchQuery, category }) => {
  const filteredComponents = cssComponents.filter(comp => {
    const matchesSearch = comp.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === 'all' || comp.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredComponents.length > 0 ? (
        filteredComponents.map(comp => (
          <CSSComponentCard
            key={comp.id}
            title={comp.title}
            category={comp.category}
            htmlCode={comp.htmlCode}
            cssCode={comp.cssCode}
          />
        ))
      ) : (
        <div className="col-span-full py-12 text-center text-util-gray">
          <p className="text-lg font-medium">No components found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default CSSComponents;
