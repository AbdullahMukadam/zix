import React, { useState } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';
import { tailwindComponents } from '../../data/components/tailwind.jsx';

const ComponentCard = ({ title, children, code, category }) => {
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-white/10 rounded-lg overflow-hidden bg-[#0A0A0A] hover:border-white/20 transition-colors group">
      <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
        <div className="flex items-center gap-2">
           <h3 className="font-bold text-sm text-white">{title}</h3>
           <span className="text-[10px] text-util-gray px-1.5 py-0.5 rounded bg-white/5 border border-white/5 uppercase tracking-wider">{category}</span>
        </div>
        <div className="flex gap-2">
           <button
            onClick={() => setShowCode(!showCode)}
            className="text-xs font-mono text-util-gray hover:text-white px-2 py-1 rounded hover:bg-white/10 transition-colors"
          >
            {showCode ? 'Preview' : 'Code'}
          </button>
          <button
            onClick={handleCopy}
            className="text-util-gray hover:text-white transition-colors"
            title="Copy Code"
          >
            {copied ? <FiCheck className="w-4 h-4 text-green-400" /> : <FiCopy className="w-4 h-4" />}
          </button>
        </div>
      </div>
      
      {showCode ? (
        <div className="p-6 bg-black/50 overflow-x-auto h-48 custom-scrollbar">
           <pre className="text-xs text-green-400 font-mono whitespace-pre-wrap">{code}</pre>
        </div>
      ) : (
        <div className="p-8 flex items-center justify-center min-h-[192px] bg-grid-pattern bg-[length:20px_20px] relative">
            <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
            <div className="relative z-10 w-full flex justify-center">
               {children}
            </div>
        </div>
      )}
    </div>
  );
};

const TailwindComponents = ({ searchQuery, category }) => {
  const filteredComponents = tailwindComponents.filter(comp => {
    const matchesSearch = comp.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === 'all' || comp.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredComponents.length > 0 ? (
        filteredComponents.map(comp => (
          <ComponentCard
            key={comp.id}
            title={comp.title}
            category={comp.category}
            code={comp.code}
          >
            {/* Render the preview component function */}
            <comp.preview />
          </ComponentCard>
        ))
      ) : (
        <div className="col-span-full py-12 text-center text-util-gray">
          <p className="text-lg font-medium">No components found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default TailwindComponents;
