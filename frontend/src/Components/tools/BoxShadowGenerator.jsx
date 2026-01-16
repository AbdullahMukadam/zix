import React, { useState } from 'react';
import { FiCopy, FiCheck, FiCode } from 'react-icons/fi';
import { shadowPresets } from '../../data/tools/shadows.js';

const BoxShadowGenerator = () => {
  const [copied, setCopied] = useState(false);
  const [shadows, setShadows] = useState([
    {
      horizontal: 0,
      vertical: 10,
      blur: 20,
      spread: 0,
      color: '#000000',
      opacity: 0.5,
      inset: false
    }
  ]);

  const loadPreset = (preset) => {
    setShadows([{ ...preset }]);
  };

  const generateBoxShadow = () => {
    return shadows
      .map(shadow => {
        const rgba = hexToRgba(shadow.color, shadow.opacity);
        const inset = shadow.inset ? 'inset ' : '';
        return `${inset}${shadow.horizontal}px ${shadow.vertical}px ${shadow.blur}px ${shadow.spread}px ${rgba}`;
      })
      .join(', ');
  };
  
  // Helper for preset preview style
  const getPresetShadow = (preset) => {
    const rgba = hexToRgba(preset.color, preset.opacity);
    const inset = preset.inset ? 'inset ' : '';
    return `${inset}${preset.horizontal}px ${preset.vertical}px ${preset.blur}px ${preset.spread}px ${rgba}`;
  };

  const hexToRgba = (hex, opacity) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const cssCode = `box-shadow: ${generateBoxShadow()};`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const updateShadow = (index, field, value) => {
    const newShadows = [...shadows];
    newShadows[index][field] = value;
    setShadows(newShadows);
  };

  const shadow = shadows[0]; // Using single shadow for simplicity

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-[600px]">
      {/* Preview Section */}
      <div className="lg:w-[60%] bg-[#e5e5e5] relative flex flex-col border-b lg:border-b-0 lg:border-r border-white/10 p-8">
         <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none mix-blend-multiply"></div>
         
         <div className="flex-1 flex items-center justify-center relative z-10">
            <div 
              className="w-48 h-48 bg-white rounded-2xl transition-all duration-300"
              style={{ boxShadow: generateBoxShadow() }}
            />
         </div>

         <div className="mt-8 bg-[#0A0A0A] border border-white/10 rounded-lg p-4 shadow-xl">
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
            <code className="text-xs sm:text-sm font-mono text-green-400 break-all bg-black/30 p-2 rounded block">
              {cssCode}
            </code>
         </div>
      </div>

      {/* Controls Section */}
      <div className="lg:w-[40%] bg-[#0A0A0A] p-6 lg:p-8 overflow-y-auto">
        
        {/* Presets */}
        <div className="mb-8 border-b border-white/10 pb-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Presets</h3>
          <div className="grid grid-cols-3 gap-3">
             {shadowPresets.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => loadPreset(preset)}
                  className="group relative aspect-square rounded-lg bg-white overflow-hidden border border-white/10 hover:border-white/30 transition-all flex items-center justify-center"
                >
                  <div 
                    className="w-10 h-10 bg-white rounded-md"
                    style={{ boxShadow: getPresetShadow(preset) }}
                  ></div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">{preset.name}</span>
                  </div>
                </button>
             ))}
          </div>
        </div>

        <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Configuration</h3>
        
        <div className="space-y-6">
          
          {/* Sliders Group */}
          <div className="space-y-5">
             {[
               { label: 'Horizontal Offset', field: 'horizontal', min: -100, max: 100, unit: 'px' },
               { label: 'Vertical Offset', field: 'vertical', min: -100, max: 100, unit: 'px' },
               { label: 'Blur Radius', field: 'blur', min: 0, max: 100, unit: 'px' },
               { label: 'Spread Radius', field: 'spread', min: -50, max: 50, unit: 'px' }
             ].map((control) => (
                <div key={control.field}>
                  <div className="flex justify-between items-center mb-2">
                     <label className="text-xs font-bold text-util-gray uppercase tracking-wider">{control.label}</label>
                     <span className="text-xs font-mono text-white bg-white/10 px-2 py-0.5 rounded">{shadow[control.field]}{control.unit}</span>
                  </div>
                  <input
                    type="range"
                    min={control.min}
                    max={control.max}
                    value={shadow[control.field]}
                    onChange={(e) => updateShadow(0, control.field, parseInt(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white hover:accent-gray-200"
                  />
                </div>
             ))}

             {/* Opacity */}
             <div>
                <div className="flex justify-between items-center mb-2">
                   <label className="text-xs font-bold text-util-gray uppercase tracking-wider">Opacity</label>
                   <span className="text-xs font-mono text-white bg-white/10 px-2 py-0.5 rounded">{(shadow.opacity * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={shadow.opacity}
                  onChange={(e) => updateShadow(0, 'opacity', parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white hover:accent-gray-200"
                />
             </div>
          </div>

          <div className="pt-4 border-t border-white/10 space-y-4">
             {/* Color */}
             <div>
               <label className="block text-xs font-bold text-util-gray uppercase tracking-wider mb-3">Shadow Color</label>
               <div className="flex items-center gap-3 bg-white/5 p-2 rounded-lg border border-white/10">
                 <div className="relative">
                    <input
                      type="color"
                      value={shadow.color}
                      onChange={(e) => updateShadow(0, 'color', e.target.value)}
                      className="w-8 h-8 rounded opacity-0 absolute inset-0 cursor-pointer z-10"
                    />
                    <div 
                      className="w-8 h-8 rounded border border-white/20"
                      style={{ backgroundColor: shadow.color }}
                    ></div>
                 </div>
                 <input
                   type="text"
                   value={shadow.color.toUpperCase()}
                   onChange={(e) => updateShadow(0, 'color', e.target.value)}
                   className="flex-1 bg-transparent text-sm font-mono text-white focus:outline-none"
                 />
               </div>
             </div>

             {/* Inset Checkbox */}
             <div className="flex items-center gap-3 pt-2">
                <div className="relative flex items-center">
                   <input
                     type="checkbox"
                     id="inset"
                     checked={shadow.inset}
                     onChange={(e) => updateShadow(0, 'inset', e.target.checked)}
                     className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-white/20 bg-white/5 checked:border-blue-500 checked:bg-blue-500 transition-all"
                   />
                   <FiCheck className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                </div>
                <label htmlFor="inset" className="text-sm font-medium text-white cursor-pointer select-none">
                  Inset Shadow
                </label>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxShadowGenerator;
