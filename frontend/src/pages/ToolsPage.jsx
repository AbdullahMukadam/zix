import { useState } from 'react';
import { FiLayout, FiBox, FiActivity } from 'react-icons/fi';
import GradientGenerator from '../components/tools/GradientGenerator.jsx';
import BoxShadowGenerator from '../components/tools/BoxShadowGenerator.jsx';
import BoxLayoutGenerator from '../components/tools/BoxLayoutGenerator.jsx';
import SEO from '../components/common/SEO.jsx';

const ToolsPage = () => {
  const [activeTab, setActiveTab] = useState('gradient');

  const tools = [
    { id: 'gradient', name: 'Gradient', icon: <FiActivity className="w-3.5 h-3.5" /> },
    { id: 'shadow', name: 'Shadow', icon: <FiBox className="w-3.5 h-3.5" /> },
    { id: 'layout', name: 'Layout', icon: <FiLayout className="w-3.5 h-3.5" /> }
  ];

  return (
    <div className="min-h-screen bg-[#020202] text-white pt-16 relative overflow-hidden font-sans">
      <SEO 
        title="CSS Tools & Generators"
        description="Free CSS tools for developers. Generate gradients, box shadows, and flexbox/grid layouts visually and export code instantly."
        keywords="css generator, gradient generator, box shadow generator, flexbox generator, grid layout tool"
        url="https://portfolio-builder.com/tools"
      />
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none"></div>

      {/* Header */}
      <div className=" z-10 border-b border-white/10 bg-[#020202]/80 backdrop-blur-md sticky top-16">
        <div className="max-w-7xl mx-auto px-6 py-4">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <h1 className="text-xl font-bold tracking-tight">CSS Generators</h1>
                 <div className="hidden md:flex items-center gap-2 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                    <span className="text-[10px] font-mono text-util-gray uppercase tracking-widest">Tools</span>
                </div>
              </div>
              
              {/* Tool Navigation - Top Bar for Mobile/Desktop */}
              <div className="flex bg-white/5 p-0.5 rounded-lg border border-white/10">
                {tools.map(tool => (
                  <button
                    key={tool.id}
                    onClick={() => setActiveTab(tool.id)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 flex items-center gap-2 ${
                      activeTab === tool.id
                        ? 'bg-white text-black shadow-sm'
                        : 'text-util-gray hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {tool.icon}
                    <span className="hidden sm:inline">{tool.name}</span>
                  </button>
                ))}
              </div>
           </div>
        </div>
      </div>

      {/* Tool Interface */}
      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10 mt-20">
        <div className="bg-[#0A0A0A] border border-white/10 rounded-xl overflow-hidden shadow-2xl shadow-black/50 min-h-[600px]">
          {/* Tool Body */}
          <div className="p-0">
            {activeTab === 'gradient' && <GradientGenerator />}
            {activeTab === 'shadow' && <BoxShadowGenerator />}
            {activeTab === 'layout' && <BoxLayoutGenerator />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsPage;
