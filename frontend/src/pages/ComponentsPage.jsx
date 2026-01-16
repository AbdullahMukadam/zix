import React, { useState } from 'react';
import { FiSearch, FiCode, FiLayers } from 'react-icons/fi';
import CSSComponents from '../components/ui-library/CSSComponents.jsx';
import TailwindComponents from '../components/ui-library/TailwindComponents.jsx';
import SEO from '../components/common/SEO.jsx';

const ComponentsPage = () => {
  const [activeTab, setActiveTab] = useState('tailwind');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['all', 'buttons', 'cards', 'inputs', 'loaders'];

  return (
    <div className="min-h-screen bg-[#020202] text-white pt-16 relative font-sans selection:bg-util-accent selection:text-black">
      <SEO 
        title="UI Component Library"
        description="A collection of beautiful, copy-paste React and HTML/CSS components. Buttons, cards, inputs, and loaders for your next project."
        keywords="ui library, react components, tailwind components, css components, free ui kit, frontend components"
        url="https://zix.dev/components"
      />
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      {/* Hero Header */}
      <div className="relative border-b border-white/10 bg-[#020202]">
        <div className="max-w-[1400px] mx-auto px-6 py-20">
          <div className="flex flex-col items-start gap-6">
            
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-white leading-[0.9]">
              UI Components.
            </h1>
            
            <p className="text-lg text-util-gray/60 max-w-xl leading-relaxed">
              Essential building blocks for your next project. Available in both Tailwind CSS and raw CSS formats.
            </p>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="sticky top-16 z-30 border-b border-white/10 bg-[#020202]/80 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            
            {/* Left: Search & Mode Toggle */}
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
               {/* Search */}
               <div className="relative w-full md:w-64">
                 <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-util-gray/50 w-4 h-4" />
                 <input
                   type="text"
                   placeholder="Search components..."
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder-util-gray/30 focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all font-sans"
                 />
               </div>

               <div className="h-full w-[1px] bg-white/10 hidden md:block"></div>

               {/* Framework Toggle */}
               <div className="bg-white/5 p-1 rounded-full inline-flex border border-white/10 self-start">
                <button
                  onClick={() => setActiveTab('tailwind')}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide transition-all ${
                    activeTab === 'tailwind'
                      ? 'bg-white text-black shadow-sm'
                      : 'text-util-gray hover:text-white'
                  }`}
                >
                  <FiLayers className="w-3 h-3" />
                  Tailwind
                </button>
                <button
                  onClick={() => setActiveTab('css')}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide transition-all ${
                    activeTab === 'css'
                      ? 'bg-white text-black shadow-sm'
                      : 'text-util-gray hover:text-white'
                  }`}
                >
                  <FiCode className="w-3 h-3" />
                  CSS
                </button>
              </div>
            </div>

            {/* Right: Category Filters */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all border ${
                    activeCategory === category
                      ? 'bg-white text-black border-white'
                      : 'bg-transparent text-util-gray/60 border-transparent hover:text-white hover:bg-white/5'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="animate-fadeIn">
          {activeTab === 'tailwind' ? (
            <TailwindComponents searchQuery={searchQuery} category={activeCategory} />
          ) : (
            <CSSComponents searchQuery={searchQuery} category={activeCategory} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ComponentsPage;
