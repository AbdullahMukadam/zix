import React, { useState, useRef, useEffect } from 'react';
import { FiCopy, FiCheck, FiCode, FiPlus, FiTrash2, FiMove, FiMaximize2, FiRefreshCw, FiGrid, FiLayout, FiSidebar } from 'react-icons/fi';

const VisualLayoutBuilder = () => {
  const [copied, setCopied] = useState({ css: false, html: false, tailwind: false });
  const [exportFormat, setExportFormat] = useState('both'); // 'css', 'html', 'tailwind', 'both'
  const canvasRef = useRef(null);
  
  // Layout state
  const [boxes, setBoxes] = useState([
    { id: 1, x: 40, y: 40, width: 200, height: 150, color: '#3b82f6' },
    { id: 2, x: 260, y: 40, width: 200, height: 150, color: '#8b5cf6' },
  ]);
  
  const [selectedBox, setSelectedBox] = useState(null);
  
  // Ref for drag state to avoid stale closures and re-renders during drag
  const dragRef = useRef({
    isDragging: false,
    isResizing: false,
    boxId: null,
    startX: 0,
    startY: 0,
    initialX: 0,
    initialY: 0,
    initialWidth: 0,
    initialHeight: 0,
    offsetX: 0,
    offsetY: 0
  });

  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 600 }); // dynamic width

  // Update canvas width on mount and resize
  useEffect(() => {
    if (canvasRef.current) {
        setCanvasSize(prev => ({ ...prev, width: canvasRef.current.offsetWidth }));
    }
    const handleResize = () => {
        if (canvasRef.current) {
            setCanvasSize(prev => ({ ...prev, width: canvasRef.current.offsetWidth }));
        }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Container properties
  const [containerProps, setContainerProps] = useState({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 20,
    padding: 24,
    background: '#0a0a0a',
  });

  // Add new box
  const addBox = () => {
    const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#6366f1'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const newBox = {
      id: Date.now(),
      x: 40 + (boxes.length % 5) * 30,
      y: 40 + (boxes.length % 5) * 30,
      width: 160,
      height: 120,
      color: randomColor,
    };
    setBoxes([...boxes, newBox]);
    setSelectedBox(newBox.id);
  };

  // Remove box
  const removeBox = (id) => {
    setBoxes(boxes.filter(box => box.id !== id));
    if (selectedBox === id) setSelectedBox(null);
  };

  const clearCanvas = () => {
    setBoxes([]);
    setSelectedBox(null);
  };

  // Mouse handlers for drag and resize
  const handleMouseDown = (e, boxId, action = 'drag') => {
    e.stopPropagation();
    e.preventDefault(); // Prevent text selection
    setSelectedBox(boxId);
    
    // Find box
    const box = boxes.find(b => b.id === boxId);
    if (!box) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Set drag state
    dragRef.current = {
      isDragging: action === 'drag',
      isResizing: action === 'resize',
      boxId: boxId,
      startX: mouseX,
      startY: mouseY,
      initialX: box.x,
      initialY: box.y,
      initialWidth: box.width,
      initialHeight: box.height,
      offsetX: mouseX - box.x,
      offsetY: mouseY - box.y
    };

    // Attach listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!dragRef.current.isDragging && !dragRef.current.isResizing) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    
    setBoxes(prevBoxes => prevBoxes.map(box => {
      if (box.id !== dragRef.current.boxId) return box;

      if (dragRef.current.isDragging) {
        // Calculate new position based on offset
        const newX = currentX - dragRef.current.offsetX;
        const newY = currentY - dragRef.current.offsetY;
        return { ...box, x: newX, y: newY };
      } 
      
      if (dragRef.current.isResizing) {
        // Calculate delta from start
        const deltaX = currentX - dragRef.current.startX;
        const deltaY = currentY - dragRef.current.startY;
        
        return { 
          ...box, 
          width: Math.max(50, dragRef.current.initialWidth + deltaX),
          height: Math.max(50, dragRef.current.initialHeight + deltaY)
        };
      }

      return box;
    }));
  };

  const handleMouseUp = () => {
    dragRef.current = { ...dragRef.current, isDragging: false, isResizing: false, boxId: null };
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Generate CSS based on container type
  const generateCSS = () => {
    let containerCSS = `.container {\n`;
    containerCSS += `  width: 100%;\n`;
    containerCSS += `  min-height: 400px;\n`;
    
    if (containerProps.display === 'flex') {
      containerCSS += `  display: flex;\n`;
      containerCSS += `  flex-direction: ${containerProps.flexDirection};\n`;
      containerCSS += `  justify-content: ${containerProps.justifyContent};\n`;
      containerCSS += `  align-items: ${containerProps.alignItems};\n`;
      containerCSS += `  gap: ${containerProps.gap}px;\n`;
    } else if (containerProps.display === 'grid') {
      containerCSS += `  display: grid;\n`;
      containerCSS += `  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n`;
      containerCSS += `  gap: ${containerProps.gap}px;\n`;
    } else {
      containerCSS += `  display: block;\n`;
      containerCSS += `  position: relative;\n`;
    }
    
    containerCSS += `  padding: ${containerProps.padding}px;\n`;
    containerCSS += `  background: ${containerProps.background};\n`;
    containerCSS += `}\n\n`;

    // Box CSS
    boxes.forEach((box, index) => {
      containerCSS += `.box-${index + 1} {\n`;
      
      if (containerProps.display === 'absolute') {
        containerCSS += `  position: absolute;\n`;
        containerCSS += `  left: ${box.x}px;\n`;
        containerCSS += `  top: ${box.y}px;\n`;
      }
      
      containerCSS += `  width: ${box.width}px;\n`;
      containerCSS += `  height: ${box.height}px;\n`;
      containerCSS += `  background: ${box.color};\n`;
      containerCSS += `  border-radius: 8px;\n`;
      containerCSS += `}\n\n`;
    });

    return containerCSS;
  };

  // Generate HTML
  const generateHTML = () => {
    let html = `<div class="container">\n`;
    
    boxes.forEach((box, index) => {
      html += `  <div class="box-${index + 1}"></div>\n`;
    });
    
    html += `</div>`;
    return html;
  };

  // Generate Tailwind Classes
  const generateTailwind = () => {
    // Container Classes
    let containerClasses = `w-full min-h-[400px] `;
    
    // Display
    if (containerProps.display === 'flex') {
      containerClasses += `flex `;
      
      // Flex Direction
      const dirMap = { 'row': 'flex-row', 'column': 'flex-col', 'row-reverse': 'flex-row-reverse', 'column-reverse': 'flex-col-reverse' };
      containerClasses += `${dirMap[containerProps.flexDirection] || 'flex-row'} `;
      
      // Justify
      const justifyMap = { 'flex-start': 'justify-start', 'center': 'justify-center', 'flex-end': 'justify-end', 'space-between': 'justify-between', 'space-around': 'justify-around' };
      containerClasses += `${justifyMap[containerProps.justifyContent] || 'justify-start'} `;
      
      // Align
      const alignMap = { 'flex-start': 'items-start', 'center': 'items-center', 'flex-end': 'items-end', 'stretch': 'items-stretch' };
      containerClasses += `${alignMap[containerProps.alignItems] || 'items-start'} `;
      
      // Gap (arbitrary value)
      containerClasses += `gap-[${containerProps.gap}px] `;
      
    } else if (containerProps.display === 'grid') {
      containerClasses += `grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] `;
      containerClasses += `gap-[${containerProps.gap}px] `;
    } else {
      containerClasses += `block relative `;
    }
    
    // Padding & Background (arbitrary values)
    containerClasses += `p-[${containerProps.padding}px] `;
    containerClasses += `bg-[${containerProps.background}] `;
    
    let html = `<div class="${containerClasses.trim()}">\n`;
    
    boxes.forEach((box) => {
      let boxClasses = ``;
      
      if (containerProps.display === 'absolute') {
        boxClasses += `absolute top-[${box.y}px] left-[${box.x}px] `;
      }
      
      boxClasses += `w-[${box.width}px] h-[${box.height}px] `;
      boxClasses += `bg-[${box.color}] rounded-lg`;
      
      html += `  <div class="${boxClasses.trim()}"></div>\n`;
    });
    
    html += `</div>`;
    return html;
  };

  // Copy handlers
  const copyToClipboard = (type) => {
    let textToCopy = '';
    
    if (type === 'css') {
      textToCopy = generateCSS();
    } else if (type === 'html') {
      textToCopy = generateHTML();
    } else if (type === 'tailwind') {
      textToCopy = generateTailwind();
    } else {
      textToCopy = `/* CSS */\n${generateCSS()}\n\n<!-- HTML -->\n${generateHTML()}`;
    }
    
    navigator.clipboard.writeText(textToCopy);
    setCopied({ ...copied, [type]: true });
    setTimeout(() => setCopied({ ...copied, [type]: false }), 2000);
  };

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-[calc(100vh-64px)]">
      {/* Canvas Section */}
      <div className="lg:w-[70%] bg-[#020202] relative flex flex-col border-b lg:border-b-0 lg:border-r border-white/10">
        
        {/* Toolbar */}
        <div className="h-14 border-b border-white/10 flex items-center justify-between px-4 md:px-6 bg-[#050505]">
           <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                 <button
                   onClick={addBox}
                   className="flex items-center gap-2 px-3 py-1.5 bg-white text-black hover:bg-gray-200 rounded text-xs font-bold transition-colors shadow-lg shadow-white/5"
                 >
                   <FiPlus className="w-3.5 h-3.5" />
                   Add Box
                 </button>
                 <button
                   onClick={clearCanvas}
                   className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-util-gray hover:text-white rounded text-xs font-bold transition-colors border border-white/5"
                 >
                   <FiRefreshCw className="w-3.5 h-3.5" />
                   Clear
                 </button>
              </div>
              <div className="h-6 w-[1px] bg-white/10"></div>
          <div className="text-xs text-util-gray font-sans">
            {canvasSize.width} × {canvasSize.height}px
          </div>
           </div>

           <div className="flex items-center gap-3">
              <div className="text-[10px] font-bold text-util-gray uppercase tracking-wider bg-white/5 px-2 py-1 rounded">
                 {canvasSize.width} × {canvasSize.height}px
              </div>
           </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 overflow-auto bg-[#020202] p-4 md:p-8 relative custom-scrollbar">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.08] pointer-events-none"></div>
            <div className="absolute inset-0 bg-dots-pattern opacity-[0.05] pointer-events-none"></div>

            {/* The Visual Container */}
            <div 
              ref={canvasRef}
              className="w-full h-full min-h-[500px] border border-white/10 rounded-xl relative transition-colors duration-300 shadow-2xl shadow-black"
              style={{
                background: containerProps.background,
                display: containerProps.display === 'absolute' ? 'block' : containerProps.display,
                flexDirection: containerProps.flexDirection,
                justifyContent: containerProps.justifyContent,
                alignItems: containerProps.alignItems,
                gap: `${containerProps.gap}px`,
                padding: `${containerProps.padding}px`,
              }}
              onClick={() => setSelectedBox(null)}
            >
               {/* Placeholders for visual feedback when empty */}
               {boxes.length === 0 && (
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center">
                       <FiLayout className="w-12 h-12 text-util-gray/10 mx-auto mb-4" />
                       <p className="text-util-gray/30 text-sm font-medium">Add boxes to start building layout</p>
                    </div>
                 </div>
               )}

               {/* Render Boxes */}
               {boxes.map((box, index) => (
                 <div
                   key={box.id}
                   className={`relative group transition-all duration-200 ${
                     selectedBox === box.id ? 'ring-2 ring-white z-10 shadow-xl' : 'hover:ring-1 hover:ring-white/30'
                   }`}
                   style={{
                     width: box.width,
                     height: box.height,
                     backgroundColor: box.color,
                     borderRadius: '8px',
                     position: containerProps.display === 'absolute' ? 'absolute' : 'relative',
                      left: containerProps.display === 'absolute' ? box.x : 'auto',
                      top: containerProps.display === 'absolute' ? box.y : 'auto',
                      cursor: 'move', // Always show move cursor for boxes
                      flexShrink: 0, // prevent shrinking in flex
                    }}
                    onMouseDown={(e) => handleMouseDown(e, box.id, 'drag')}
                    onClick={(e) => e.stopPropagation()} // Prevent deselecting when clicking/dragging box
                  >

                    {/* Box Label */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                       <span className="bg-black/50 text-white text-[10px] px-2 py-1 rounded backdrop-blur-sm font-mono">
                          {Math.round(box.width)}×{Math.round(box.height)}
                       </span>
                    </div>

                    {/* Controls (visible on select) */}
                    {selectedBox === box.id && (
                      <>
                        {/* Remove Button */}
                        <button
                          className="absolute -top-3 -right-3 p-1.5 bg-red-500 text-white rounded-full shadow-lg hover:scale-110 transition-transform z-20"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeBox(box.id);
                          }}
                        >
                          <FiTrash2 className="w-3 h-3" />
                        </button>
                        
                        {/* Resize Handle */}
                        <div
                          className="absolute bottom-0 right-0 w-6 h-6 bg-white rounded-tl-lg cursor-se-resize flex items-center justify-center shadow-lg z-20 hover:bg-gray-100"
                          onMouseDown={(e) => handleMouseDown(e, box.id, 'resize')}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FiMaximize2 className="w-3 h-3 text-black transform rotate-90" />
                        </div>
                      </>
                    )}
                 </div>
               ))}
            </div>
        </div>

        {/* Code Output Drawer */}
        <div className="border-t border-white/10 bg-[#050505] p-6 max-h-[300px] overflow-y-auto custom-scrollbar">
           <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                 <FiCode className="w-4 h-4 text-util-accent" /> Generated Code
              </h3>
              
              <div className="flex bg-white/5 rounded-md p-0.5 border border-white/5">
                 {['both', 'html', 'css', 'tailwind'].map((format) => (
                   <button
                     key={format}
                     onClick={() => setExportFormat(format)}
                     className={`px-3 py-1 rounded text-[10px] font-bold uppercase transition-all ${
                       exportFormat === format
                         ? 'bg-white text-black shadow-sm'
                         : 'text-util-gray hover:text-white'
                     }`}
                   >
                     {format}
                   </button>
                 ))}
              </div>
           </div>

           <div className="grid grid-cols-1 gap-4">
              {(exportFormat === 'both' || exportFormat === 'tailwind') && (
                <div className="bg-[#020202] border border-white/10 rounded-lg overflow-hidden">
                   <div className="flex items-center justify-between px-3 py-2 bg-white/5 border-b border-white/5">
                      <span className="text-[10px] font-bold text-util-gray uppercase">Tailwind HTML</span>
                      <button onClick={() => copyToClipboard('tailwind')} className="text-util-gray hover:text-white transition-colors">
                        {copied.tailwind ? <FiCheck className="w-3 h-3 text-green-400" /> : <FiCopy className="w-3 h-3" />}
                      </button>
                   </div>
                   <div className="p-3 overflow-x-auto max-h-40 custom-scrollbar">
                     <code className="text-xs font-mono text-cyan-400 whitespace-pre">{generateTailwind()}</code>
                   </div>
                </div>
              )}

              {(exportFormat === 'both' || exportFormat === 'html') && (
                <div className="bg-[#020202] border border-white/10 rounded-lg overflow-hidden">
                   <div className="flex items-center justify-between px-3 py-2 bg-white/5 border-b border-white/5">
                      <span className="text-[10px] font-bold text-util-gray uppercase">HTML</span>
                      <button onClick={() => copyToClipboard('html')} className="text-util-gray hover:text-white transition-colors">
                        {copied.html ? <FiCheck className="w-3 h-3 text-green-400" /> : <FiCopy className="w-3 h-3" />}
                      </button>
                   </div>
                   <div className="p-3 overflow-x-auto">
                     <code className="text-xs font-mono text-green-400 whitespace-pre">{generateHTML()}</code>
                   </div>
                </div>
              )}

              {(exportFormat === 'both' || exportFormat === 'css') && (
                <div className="bg-[#020202] border border-white/10 rounded-lg overflow-hidden">
                   <div className="flex items-center justify-between px-3 py-2 bg-white/5 border-b border-white/5">
                      <span className="text-[10px] font-bold text-util-gray uppercase">CSS</span>
                      <button onClick={() => copyToClipboard('css')} className="text-util-gray hover:text-white transition-colors">
                        {copied.css ? <FiCheck className="w-3 h-3 text-green-400" /> : <FiCopy className="w-3 h-3" />}
                      </button>
                   </div>
                   <div className="p-3 overflow-x-auto max-h-40 custom-scrollbar">
                     <code className="text-xs font-mono text-blue-400 whitespace-pre">{generateCSS()}</code>
                   </div>
                </div>
              )}
           </div>
        </div>
      </div>

      {/* Sidebar Controls */}
      <div className="lg:w-[30%] bg-[#050505] border-l border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
           <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
             <FiSidebar className="w-4 h-4" /> Properties
           </h3>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
           {/* Container Settings */}
           <section>
              <h4 className="text-xs font-bold text-util-gray uppercase tracking-wider mb-4 border-l-2 border-util-accent pl-2">Container</h4>
              
              <div className="space-y-4">
                 <div>
                    <label className="block text-[10px] font-bold text-util-gray uppercase tracking-wider mb-2">Display Mode</label>
                    <div className="grid grid-cols-3 gap-2">
                       {['flex', 'grid', 'absolute'].map((mode) => (
                         <button
                           key={mode}
                           onClick={() => setContainerProps({ ...containerProps, display: mode })}
                           className={`px-2 py-2 rounded text-[10px] font-bold uppercase transition-all border ${
                             containerProps.display === mode
                               ? 'bg-white text-black border-white'
                               : 'bg-transparent text-util-gray border-white/10 hover:border-white/30'
                           }`}
                         >
                           {mode}
                         </button>
                       ))}
                    </div>
                 </div>

                 {/* Flex Properties */}
                 {containerProps.display === 'flex' && (
                   <div className="space-y-4 pt-4 border-t border-white/5 animate-fadeIn">
                      <div>
                         <label className="block text-[10px] font-bold text-util-gray uppercase tracking-wider mb-2">Direction</label>
                         <select
                           value={containerProps.flexDirection}
                           onChange={(e) => setContainerProps({ ...containerProps, flexDirection: e.target.value })}
                           className="w-full bg-[#020202] border border-white/10 rounded px-3 py-2 text-xs text-white focus:border-white/30 outline-none"
                         >
                           <option value="row">Row (→)</option>
                           <option value="column">Column (↓)</option>
                           <option value="row-reverse">Row Reverse (←)</option>
                           <option value="column-reverse">Column Reverse (↑)</option>
                         </select>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                         <div>
                           <label className="block text-[10px] font-bold text-util-gray uppercase tracking-wider mb-2">Justify</label>
                           <select
                             value={containerProps.justifyContent}
                             onChange={(e) => setContainerProps({ ...containerProps, justifyContent: e.target.value })}
                             className="w-full bg-[#020202] border border-white/10 rounded px-3 py-2 text-xs text-white focus:border-white/30 outline-none"
                           >
                             <option value="flex-start">Start</option>
                             <option value="center">Center</option>
                             <option value="flex-end">End</option>
                             <option value="space-between">Space Between</option>
                             <option value="space-around">Space Around</option>
                           </select>
                         </div>
                         <div>
                           <label className="block text-[10px] font-bold text-util-gray uppercase tracking-wider mb-2">Align</label>
                           <select
                             value={containerProps.alignItems}
                             onChange={(e) => setContainerProps({ ...containerProps, alignItems: e.target.value })}
                             className="w-full bg-[#020202] border border-white/10 rounded px-3 py-2 text-xs text-white focus:border-white/30 outline-none"
                           >
                             <option value="flex-start">Start</option>
                             <option value="center">Center</option>
                             <option value="flex-end">End</option>
                             <option value="stretch">Stretch</option>
                           </select>
                         </div>
                      </div>
                   </div>
                 )}

                 {/* Spacing */}
                 <div className="pt-4 border-t border-white/5 space-y-4">
                    <div>
                       <div className="flex justify-between mb-2">
                          <label className="text-[10px] font-bold text-util-gray uppercase tracking-wider">Gap</label>
                          <span className="text-[10px] font-sans text-white">{containerProps.gap}px</span>
                       </div>
                       <input
                         type="range"
                         min="0"
                         max="64"
                         value={containerProps.gap}
                         onChange={(e) => setContainerProps({ ...containerProps, gap: parseInt(e.target.value) })}
                         className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                       />
                    </div>
                    <div>
                       <div className="flex justify-between mb-2">
                          <label className="text-[10px] font-bold text-util-gray uppercase tracking-wider">Padding</label>
                          <span className="text-[10px] font-sans text-white">{containerProps.padding}px</span>
                       </div>
                       <input
                         type="range"
                         min="0"
                         max="64"
                         value={containerProps.padding}
                         onChange={(e) => setContainerProps({ ...containerProps, padding: parseInt(e.target.value) })}
                         className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                       />
                    </div>
                    
                    <div>
                       <label className="block text-[10px] font-bold text-util-gray uppercase tracking-wider mb-2">Background</label>
                       <div className="flex gap-2">
                          <div className="relative w-8 h-8 rounded border border-white/10 overflow-hidden">
                             <input
                               type="color"
                               value={containerProps.background}
                               onChange={(e) => setContainerProps({ ...containerProps, background: e.target.value })}
                               className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                             />
                             <div className="w-full h-full" style={{ backgroundColor: containerProps.background }}></div>
                          </div>
                          <input
                            type="text"
                            value={containerProps.background}
                            onChange={(e) => setContainerProps({ ...containerProps, background: e.target.value })}
                            className="flex-1 bg-[#020202] border border-white/10 rounded px-2 text-xs text-white font-mono focus:border-white/30 outline-none"
                          />
                       </div>
                    </div>
                 </div>
              </div>
           </section>

           {/* Selected Item Settings */}
           {selectedBox && (
             <section className="pt-6 border-t border-white/10 animate-slideUp">
                <div className="flex items-center justify-between mb-4">
                   <h4 className="text-xs font-bold text-util-gray uppercase tracking-wider border-l-2 border-util-accent pl-2">Selected Item</h4>
                   <button onClick={() => removeBox(selectedBox)} className="text-red-500 hover:text-red-400 text-[10px] font-bold uppercase flex items-center gap-1">
                      <FiTrash2 /> Remove
                   </button>
                </div>
                
                {boxes.map(box => {
                   if (box.id !== selectedBox) return null;
                   return (
                      <div key={box.id} className="space-y-4">
                         {/* Dimensions */}
                         <div className="grid grid-cols-2 gap-3">
                            <div>
                               <label className="block text-[10px] font-bold text-util-gray uppercase tracking-wider mb-2">Width</label>
                               <div className="flex items-center bg-[#020202] border border-white/10 rounded px-2">
                                  <input
                                    type="number"
                                    value={Math.round(box.width)}
                                    onChange={(e) => setBoxes(boxes.map(b => b.id === selectedBox ? { ...b, width: parseInt(e.target.value) } : b))}
                                    className="w-full bg-transparent py-2 text-xs text-white focus:outline-none"
                                  />
                                  <span className="text-[10px] text-util-gray">px</span>
                               </div>
                            </div>
                            <div>
                               <label className="block text-[10px] font-bold text-util-gray uppercase tracking-wider mb-2">Height</label>
                               <div className="flex items-center bg-[#020202] border border-white/10 rounded px-2">
                                  <input
                                    type="number"
                                    value={Math.round(box.height)}
                                    onChange={(e) => setBoxes(boxes.map(b => b.id === selectedBox ? { ...b, height: parseInt(e.target.value) } : b))}
                                    className="w-full bg-transparent py-2 text-xs text-white focus:outline-none"
                                  />
                                  <span className="text-[10px] text-util-gray">px</span>
                               </div>
                            </div>
                         </div>

                         {/* Color */}
                         <div>
                            <label className="block text-[10px] font-bold text-util-gray uppercase tracking-wider mb-2">Color</label>
                            <div className="flex gap-2">
                               <div className="relative w-8 h-8 rounded border border-white/10 overflow-hidden">
                                  <input
                                    type="color"
                                    value={box.color}
                                    onChange={(e) => setBoxes(boxes.map(b => b.id === selectedBox ? { ...b, color: e.target.value } : b))}
                                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                  />
                                  <div className="w-full h-full" style={{ backgroundColor: box.color }}></div>
                               </div>
                               <input
                                 type="text"
                                 value={box.color}
                                 onChange={(e) => setBoxes(boxes.map(b => b.id === selectedBox ? { ...b, color: e.target.value } : b))}
                                 className="flex-1 bg-[#020202] border border-white/10 rounded px-2 text-xs text-white font-mono focus:border-white/30 outline-none"
                               />
                            </div>
                         </div>
                         
                         {containerProps.display === 'absolute' && (
                            <div className="grid grid-cols-2 gap-3 pt-2">
                               <div>
                                  <label className="block text-[10px] font-bold text-util-gray uppercase tracking-wider mb-2">X Pos</label>
                                  <input
                                    type="number"
                                    value={Math.round(box.x)}
                                    onChange={(e) => setBoxes(boxes.map(b => b.id === selectedBox ? { ...b, x: parseInt(e.target.value) } : b))}
                                    className="w-full bg-[#020202] border border-white/10 rounded px-3 py-2 text-xs text-white focus:border-white/30 outline-none"
                                  />
                               </div>
                               <div>
                                  <label className="block text-[10px] font-bold text-util-gray uppercase tracking-wider mb-2">Y Pos</label>
                                  <input
                                    type="number"
                                    value={Math.round(box.y)}
                                    onChange={(e) => setBoxes(boxes.map(b => b.id === selectedBox ? { ...b, y: parseInt(e.target.value) } : b))}
                                    className="w-full bg-[#020202] border border-white/10 rounded px-3 py-2 text-xs text-white focus:border-white/30 outline-none"
                                  />
                               </div>
                            </div>
                         )}
                      </div>
                   );
                })}
             </section>
           )}
        </div>
      </div>
    </div>
  );
};

export default VisualLayoutBuilder;
