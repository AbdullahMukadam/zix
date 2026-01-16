import React, { useState } from 'react';
import { FiSearch, FiExternalLink, FiGlobe } from 'react-icons/fi';
import { productivityTools, toolCategories } from '../data/productivity/tools.js';
import SEO from '../components/common/SEO.jsx';

const ProductivityPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredTools = productivityTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#020202] text-white pt-16 relative font-sans selection:bg-util-accent selection:text-black">
      <SEO 
        title="Developer Productivity Tools"
        description="Curated list of the best developer tools, assets, and utilities. Find design resources, icons, and generators to boost your workflow."
        keywords="developer tools, productivity resources, web design tools, coding assets, free developer resources"
        url="https://zix.dev/productivity"
      />
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      {/* Hero Header */}
      <div className="relative border-b border-white/10 bg-[#020202]">
        <div className="max-w-[1400px] mx-auto px-6 py-20">
          <div className="flex flex-col items-start gap-6">
            
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-white leading-[0.9]">
              Productivity.
            </h1>
            
            <p className="text-lg text-util-gray/60 max-w-xl leading-relaxed">
              A collection of essential tools, assets, and utilities to help you build faster and better. Hand-picked for modern developers.
            </p>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="sticky top-16 z-30 border-b border-white/10 bg-[#020202]/80 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            
            {/* Left: Search */}
            <div className="relative w-full md:w-64">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-util-gray/50 w-4 h-4" />
              <input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder-util-gray/30 focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all font-sans"
              />
            </div>

            {/* Right: Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="h-6 w-[1px] bg-white/10 mx-2 hidden md:block"></div>
              
              {toolCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all border ${
                    activeCategory === category.id
                      ? 'bg-white text-black border-white'
                      : 'bg-transparent text-util-gray/60 border-transparent hover:text-white hover:bg-white/5'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
          {filteredTools.length > 0 ? (
            filteredTools.map(tool => (
              <a 
                key={tool.id} 
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-white/5 rounded-2xl bg-[#050505] p-6 hover:border-white/10 hover:bg-white/[0.02] transition-all flex flex-col h-full"
              >
                <div className="flex items-start justify-between mb-5">
                   <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center p-2.5 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                      {tool.image ? (
                        <img src={tool.image} alt={tool.name} className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all" />
                      ) : (
                        <FiGlobe className="w-6 h-6 text-util-gray" />
                      )}
                   </div>
                   <div className="text-util-gray/40 group-hover:text-white transition-colors p-2 bg-white/0 group-hover:bg-white/5 rounded-full">
                      <FiExternalLink className="w-4 h-4" />
                   </div>
                </div>
                
                <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-util-accent transition-colors tracking-tight">
                  {tool.name}
                </h3>
                <p className="text-sm text-util-gray/60 mb-6 flex-1 leading-relaxed">
                  {tool.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                   {tool.tags.map(tag => (
                     <span key={tag} className="text-[10px] font-medium text-util-gray/50 px-2 py-1 rounded bg-white/[0.02] border border-white/5 uppercase tracking-wide">
                       #{tag}
                     </span>
                   ))}
                </div>
              </a>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 mb-4">
                <FiSearch className="w-6 h-6 text-util-gray/50" />
              </div>
              <p className="text-util-gray/60">No tools found matching your criteria.</p>
              <button 
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                className="mt-4 text-sm font-bold text-white underline underline-offset-4 hover:text-util-gray"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductivityPage;
