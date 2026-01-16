import React, { useState } from 'react';
import { FiCopy, FiCheck, FiCode, FiGrid, FiLayout } from 'react-icons/fi';
import { layoutPresets } from '../../data/tools/layouts.js';

const BoxLayoutGenerator = () => {
  const [copied, setCopied] = useState(false);
  const [layoutType, setLayoutType] = useState('flexbox');
  
  // Flexbox settings
  const [flexDirection, setFlexDirection] = useState('row');
  const [justifyContent, setJustifyContent] = useState('flex-start');
  const [alignItems, setAlignItems] = useState('flex-start');
  const [gap, setGap] = useState(16);
  const [flexWrap, setFlexWrap] = useState('nowrap');
  
  // Grid settings
  const [gridColumns, setGridColumns] = useState(3);
  const [gridRows, setGridRows] = useState(2);
  const [gridGap, setGridGap] = useState(16);

  const loadPreset = (preset) => {
    setLayoutType(preset.type);
    if (preset.type === 'flexbox') {
      setFlexDirection(preset.direction);
      setJustifyContent(preset.justify);
      setAlignItems(preset.align);
      setGap(preset.gap);
      setFlexWrap(preset.wrap);
    } else {
      setGridColumns(preset.cols);
      setGridRows(preset.rows);
      setGridGap(preset.gap);
    }
  };

  const generateCSS = () => {
    if (layoutType === 'flexbox') {
      return `display: flex;
flex-direction: ${flexDirection};
justify-content: ${justifyContent};
align-items: ${alignItems};
gap: ${gap}px;
flex-wrap: ${flexWrap};`;
    } else {
      return `display: grid;
grid-template-columns: repeat(${gridColumns}, 1fr);
grid-template-rows: repeat(${gridRows}, auto);
gap: ${gridGap}px;`;
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateCSS());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderPreview = () => {
    const baseStyle = "bg-blue-500/20 border border-blue-500/30 rounded-lg flex items-center justify-center text-xs font-mono text-blue-300 transition-all duration-300 hover:bg-blue-500/30 hover:border-blue-500/50 shadow-lg shadow-blue-500/5";
    const containerStyle = {
       width: '100%',
       height: '100%',
       padding: '2rem',
       transition: 'all 0.3s ease',
    };

    const items = Array.from({ length: layoutType === 'flexbox' ? 5 : gridColumns * gridRows }, (_, i) => i + 1);

    if (layoutType === 'flexbox') {
      return (
        <div 
          style={{
            ...containerStyle,
            display: 'flex',
            flexDirection: flexDirection,
            justifyContent: justifyContent,
            alignItems: alignItems,
            gap: `${gap}px`,
            flexWrap: flexWrap
          }}
        >
          {items.map(i => (
            <div key={i} className={`${baseStyle} w-20 h-20`}>Box {i}</div>
          ))}
        </div>
      );
    } else {
      return (
        <div 
          style={{
            ...containerStyle,
            display: 'grid',
            gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
            gridTemplateRows: `repeat(${gridRows}, auto)`,
            gap: `${gridGap}px`
          }}
        >
          {items.map(i => (
            <div key={i} className={`${baseStyle} min-h-[80px]`}>Box {i}</div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-[600px]">
      {/* Preview Section */}
      <div className="lg:w-[60%] bg-[#050505] relative flex flex-col border-b lg:border-b-0 lg:border-r border-white/10 p-8">
         <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"></div>
         
         <div className="flex-1 border border-white/10 rounded-xl bg-[#080808] overflow-hidden relative">
            <div className="absolute inset-0 overflow-auto">
               {renderPreview()}
            </div>
         </div>

         <div className="mt-8 bg-[#0A0A0A] border border-white/10 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-util-gray uppercase tracking-wider flex items-center gap-2">
                <FiCode className="w-3 h-3" /> CSS Output
              </span>
              <button
                onClick={copyToClipboard}
                className="text-xs font-medium flex items-center gap-1.5 text-util-gray hover:text-white transition-colors px-2 py-1 hover:bg-white/10 rounded"
              >
                {copied ? <FiCheck className="w-3 h-3 text-green-400" /> : <FiCopy className="w-3 h-3" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <code className="text-xs sm:text-sm font-mono text-green-400 break-all bg-black/30 p-2 rounded block whitespace-pre">
              {generateCSS()}
            </code>
         </div>
      </div>

      {/* Controls Section */}
      <div className="lg:w-[40%] bg-[#0A0A0A] p-6 lg:p-8 overflow-y-auto">
        
        {/* Presets */}
        <div className="mb-8 border-b border-white/10 pb-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Presets</h3>
          <div className="grid grid-cols-3 gap-3">
             {layoutPresets.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => loadPreset(preset)}
                  className="group relative px-2 py-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all flex flex-col items-center justify-center gap-2"
                >
                  <div className="text-util-gray group-hover:text-white transition-colors">
                     {preset.type === 'flexbox' ? <FiLayout className="w-5 h-5" /> : <FiGrid className="w-5 h-5" />}
                  </div>
                  <span className="text-[10px] font-bold text-util-gray group-hover:text-white uppercase tracking-wider">{preset.name}</span>
                </button>
             ))}
          </div>
        </div>

        <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Configuration</h3>
        
        <div className="space-y-8">
            {/* Layout Type Toggle */}
            <div>
              <label className="block text-xs font-bold text-util-gray uppercase tracking-wider mb-3">Layout Model</label>
              <div className="grid grid-cols-2 gap-2 bg-black/20 p-1 rounded-lg border border-white/10">
                <button
                  onClick={() => setLayoutType('flexbox')}
                  className={`px-3 py-2 rounded-md text-xs font-bold uppercase tracking-wide transition-all flex items-center justify-center gap-2 ${
                    layoutType === 'flexbox'
                      ? 'bg-white text-black shadow-sm'
                      : 'text-util-gray hover:text-white hover:bg-white/5'
                  }`}
                >
                  <FiLayout className="w-4 h-4" /> Flexbox
                </button>
                <button
                  onClick={() => setLayoutType('grid')}
                  className={`px-3 py-2 rounded-md text-xs font-bold uppercase tracking-wide transition-all flex items-center justify-center gap-2 ${
                    layoutType === 'grid'
                      ? 'bg-white text-black shadow-sm'
                      : 'text-util-gray hover:text-white hover:bg-white/5'
                  }`}
                >
                  <FiGrid className="w-4 h-4" /> Grid
                </button>
              </div>
            </div>

            {/* Flexbox Controls */}
            {layoutType === 'flexbox' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="space-y-4">
                   {[
                     { 
                       label: 'Direction', 
                       value: flexDirection, 
                       setter: setFlexDirection, 
                       options: ['row', 'row-reverse', 'column', 'column-reverse'] 
                     },
                     { 
                       label: 'Justify Content', 
                       value: justifyContent, 
                       setter: setJustifyContent, 
                       options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'] 
                     },
                     { 
                       label: 'Align Items', 
                       value: alignItems, 
                       setter: setAlignItems, 
                       options: ['flex-start', 'flex-end', 'center', 'stretch', 'baseline'] 
                     },
                     { 
                       label: 'Wrap', 
                       value: flexWrap, 
                       setter: setFlexWrap, 
                       options: ['nowrap', 'wrap', 'wrap-reverse'] 
                     }
                   ].map((control) => (
                     <div key={control.label}>
                       <label className="block text-xs font-bold text-util-gray uppercase tracking-wider mb-2">{control.label}</label>
                       <select
                         value={control.value}
                         onChange={(e) => control.setter(e.target.value)}
                         className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-white/30 hover:bg-white/10 transition-colors"
                       >
                         {control.options.map(opt => (
                           <option key={opt} value={opt} className="bg-[#0A0A0A]">{opt}</option>
                         ))}
                       </select>
                     </div>
                   ))}
                </div>

                <div>
                   <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-bold text-util-gray uppercase tracking-wider">Gap</label>
                      <span className="text-xs font-mono text-white bg-white/10 px-2 py-0.5 rounded">{gap}px</span>
                   </div>
                   <input
                     type="range"
                     min="0"
                     max="64"
                     value={gap}
                     onChange={(e) => setGap(parseInt(e.target.value))}
                     className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white hover:accent-gray-200"
                   />
                </div>
              </div>
            )}

            {/* Grid Controls */}
            {layoutType === 'grid' && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                   <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-bold text-util-gray uppercase tracking-wider">Columns</label>
                      <span className="text-xs font-mono text-white bg-white/10 px-2 py-0.5 rounded">{gridColumns}</span>
                   </div>
                   <input
                     type="range"
                     min="1"
                     max="12"
                     value={gridColumns}
                     onChange={(e) => setGridColumns(parseInt(e.target.value))}
                     className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white hover:accent-gray-200"
                   />
                </div>

                <div>
                   <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-bold text-util-gray uppercase tracking-wider">Rows</label>
                      <span className="text-xs font-mono text-white bg-white/10 px-2 py-0.5 rounded">{gridRows}</span>
                   </div>
                   <input
                     type="range"
                     min="1"
                     max="12"
                     value={gridRows}
                     onChange={(e) => setGridRows(parseInt(e.target.value))}
                     className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white hover:accent-gray-200"
                   />
                </div>

                <div>
                   <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-bold text-util-gray uppercase tracking-wider">Gap</label>
                      <span className="text-xs font-mono text-white bg-white/10 px-2 py-0.5 rounded">{gridGap}px</span>
                   </div>
                   <input
                     type="range"
                     min="0"
                     max="64"
                     value={gridGap}
                     onChange={(e) => setGridGap(parseInt(e.target.value))}
                     className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white hover:accent-gray-200"
                   />
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default BoxLayoutGenerator;
