import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiGrid, FiList, FiZap } from 'react-icons/fi';
import SEO from '../components/common/SEO.jsx';
import ShowcaseCard from '../components/showcase/ShowcaseCard.jsx';
import { showcaseComponents, categories, frameworks } from '../data/showcase/components.js';

const ShowcasePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeFramework, setActiveFramework] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Filter components based on search, category, and framework
  const filteredComponents = useMemo(() => {
    return showcaseComponents.filter((component) => {
      const matchesSearch = 
        component.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = 
        activeCategory === 'all' || component.category === activeCategory;

      const matchesFramework = 
        activeFramework === 'all' || component.framework === activeFramework;

      return matchesSearch && matchesCategory && matchesFramework;
    });
  }, [searchQuery, activeCategory, activeFramework]);

  return (
    <div className="min-h-screen bg-[#020202] text-white pt-16 relative font-sans">
      <SEO
        title="Component Showcase"
        description="Explore a curated collection of beautiful, interactive UI components. Copy-paste ready components for React, Tailwind, Framer Motion, and vanilla HTML/CSS."
        keywords="ui components, react components, framer motion, tailwind css, component library, ui showcase"
      />

      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-overlay bg-[length:50px_50px] opacity-[0.02] pointer-events-none"></div>

      {/* Hero Header */}
      <div className="relative border-b border-white/10 bg-[#020202]">
        <div className="max-w-[1400px] mx-auto px-6 py-20">
          <div className="flex flex-col items-start gap-6">
            
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-white leading-[0.9]">
              Showcase.
            </h1>
            
            <p className="text-lg text-util-gray/60 max-w-xl leading-relaxed">
              A curated collection of interactive UI components. Built with React, Framer Motion, and Tailwind CSS. Ready to copy-paste.
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
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder-util-gray/30 focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all font-sans"
              />
            </div>

            {/* Right: Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="h-6 w-[1px] bg-white/10 mx-2 hidden md:block"></div>
              
              {categories.map((category) => (
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

      {/* Components Grid */}
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-util-gray/70">
            Showing <span className="font-bold text-white">{filteredComponents.length}</span> component{filteredComponents.length !== 1 ? 's' : ''}
            {searchQuery && (
              <span> for "<span className="text-white">{searchQuery}</span>"</span>
            )}
          </p>
        </div>

        {/* Components */}
        <AnimatePresence mode="wait">
          {filteredComponents.length > 0 ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 lg:grid-cols-2 gap-6'
                  : 'flex flex-col gap-6'
              }
            >
              {filteredComponents.map((component) => (
                <ShowcaseCard key={component.id} component={component} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-16"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 mb-4">
                <FiSearch className="w-8 h-8 text-util-gray/50" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No components found</h3>
              <p className="text-util-gray/70 mb-6">
                Try adjusting your search or filters
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                  setActiveFramework('all');
                }}
                className="px-6 py-2.5 bg-white text-black font-bold text-sm rounded-lg hover:bg-util-gray transition-all"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ShowcasePage;
