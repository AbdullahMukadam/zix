import React, { useState } from 'react';
import { FiCopy, FiCheck, FiPlus, FiTrash2, FiCode } from 'react-icons/fi';
import { gradientPresets } from '../../data/tools/gradients.js';

const GradientGenerator = () => {
  const [copied, setCopied] = useState(false);
  const [gradientType, setGradientType] = useState('linear');
  const [angle, setAngle] = useState(90);
  const [colors, setColors] = useState([
    { color: '#667eea', position: 0 },
    { color: '#764ba2', position: 100 }
  ]);

  const loadPreset = (preset) => {
    setGradientType(preset.type);
    setAngle(preset.angle);
    setColors(preset.colors);
  };

  const generateGradient = () => {
    const colorStops = colors
      .sort((a, b) => a.position - b.position)
      .map(c => `${c.color} ${c.position}%`)
      .join(', ');

    if (gradientType === 'linear') {
      return `linear-gradient(${angle}deg, ${colorStops})`;
    } else if (gradientType === 'radial') {
      return `radial-gradient(circle, ${colorStops})`;
    } else {
      return `conic-gradient(from ${angle}deg, ${colorStops})`;
    }
  };

  // Helper to generate CSS for preset preview
  const getPresetGradient = (preset) => {
      const colorStops = preset.colors
      .sort((a, b) => a.position - b.position)
      .map(c => `${c.color} ${c.position}%`)
      .join(', ');

    if (preset.type === 'linear') {
      return `linear-gradient(${preset.angle}deg, ${colorStops})`;
    } else if (preset.type === 'radial') {
      return `radial-gradient(circle, ${colorStops})`;
    } else {
      return `conic-gradient(from ${preset.angle}deg, ${colorStops})`;
    }
  };

  const cssCode = `background: ${generateGradient()};`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const addColor = () => {
    if (colors.length < 5) {
      setColors([...colors, { color: '#ffffff', position: 50 }]);
    }
  };

  const removeColor = (index) => {
    if (colors.length > 2) {
      setColors(colors.filter((_, i) => i !== index));
    }
  };

  const updateColor = (index, field, value) => {
    const newColors = [...colors];
    newColors[index][field] = value;
    setColors(newColors);
  };

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-[600px]">
      {/* Preview Section */}
      <div className="lg:w-[60%] bg-[#050505] relative flex flex-col border-b lg:border-b-0 lg:border-r border-white/10 p-8">
         <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"></div>
         
         <div className="flex-1 flex items-center justify-center relative z-10">
            <div 
              className="w-full max-w-md aspect-square rounded-2xl shadow-2xl shadow-black border border-white/10 transition-all duration-300"
              style={{ background: generateGradient() }}
            />
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
             {gradientPresets.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => loadPreset(preset)}
                  className="group relative aspect-video rounded-lg overflow-hidden border border-white/10 hover:border-white/30 transition-all"
                >
                  <div 
                    className="absolute inset-0" 
                    style={{ background: getPresetGradient(preset) }} 
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">{preset.name}</span>
                  </div>
                </button>
             ))}
          </div>
        </div>

        <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Configuration</h3>
        
        <div className="space-y-8">
          {/* Gradient Type */}
          <div>
            <label className="block text-xs font-bold text-util-gray uppercase tracking-wider mb-3">Type</label>
            <div className="grid grid-cols-3 gap-2 bg-black/20 p-1 rounded-lg border border-white/10">
              {['linear', 'radial', 'conic'].map(type => (
                <button
                  key={type}
                  onClick={() => setGradientType(type)}
                  className={`px-3 py-2 rounded-md text-xs font-bold uppercase tracking-wide transition-all ${
                    gradientType === type
                      ? 'bg-white text-black shadow-sm'
                      : 'text-util-gray hover:text-white hover:bg-white/5'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Angle Control */}
          <div>
            <div className="flex justify-between items-center mb-3">
               <label className="block text-xs font-bold text-util-gray uppercase tracking-wider">
                 {gradientType === 'conic' ? 'Start Angle' : 'Direction'}
               </label>
               <span className="text-xs font-mono text-white bg-white/10 px-2 py-0.5 rounded">{angle}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="360"
              value={angle}
              onChange={(e) => setAngle(parseInt(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white hover:accent-gray-200"
            />
          </div>

          {/* Colors Control */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-xs font-bold text-util-gray uppercase tracking-wider">Color Stops</label>
              <button
                onClick={addColor}
                disabled={colors.length >= 5}
                className="flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider px-2 py-1 rounded hover:bg-blue-500/10 transition-colors"
              >
                <FiPlus className="w-3 h-3" />
                Add Stop
              </button>
            </div>
            
            <div className="space-y-3">
              {colors.map((colorStop, index) => (
                <div key={index} className="group flex items-center gap-3 bg-white/[0.03] p-3 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                  <div className="relative">
                    <input
                      type="color"
                      value={colorStop.color}
                      onChange={(e) => updateColor(index, 'color', e.target.value)}
                      className="w-8 h-8 rounded cursor-pointer opacity-0 absolute inset-0 z-10"
                    />
                    <div 
                      className="w-8 h-8 rounded border border-white/20 shadow-sm"
                      style={{ backgroundColor: colorStop.color }}
                    ></div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                       <span className="text-[10px] text-util-gray font-mono">{colorStop.color.toUpperCase()}</span>
                       <span className="text-[10px] text-util-gray font-mono">{colorStop.position}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={colorStop.position}
                      onChange={(e) => updateColor(index, 'position', parseInt(e.target.value))}
                      className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                    />
                  </div>
                  
                  <button
                    onClick={() => removeColor(index)}
                    disabled={colors.length <= 2}
                    className="p-1.5 text-util-gray hover:text-red-400 hover:bg-red-400/10 rounded-md transition-colors disabled:opacity-0"
                  >
                    <FiTrash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradientGenerator;
