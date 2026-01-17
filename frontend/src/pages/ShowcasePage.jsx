import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import SEO from '../components/common/SEO.jsx';
import ShowcaseCard from '../components/showcase/ShowcaseCard.jsx';
import Pagination from '../components/common/Pagination.jsx';
import { showcaseComponents, categories } from '../data/showcase/components.js';

const ITEMS_PER_PAGE = 6;

const ShowcasePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter components based on search and category
  const filteredComponents = useMemo(() => {
    return showcaseComponents.filter((component) => {
      const matchesSearch = 
        component.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = 
        activeCategory === 'all' || component.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredComponents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedComponents = filteredComponents.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen bg-[#020202] text-white pt-16 relative font-sans">
      <SEO
        title="Component Showcase"
        description="Explore a curated collection of beautiful UI components, dashboards, hero sections, and more. Discover creative designs from talented creators around the world."
        keywords="ui components, showcase, dashboards, hero sections, design inspiration, ui library"
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
              Discover beautiful UI components, dashboards, hero sections, and creative designs from talented creators worldwide.
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
        {/* Results Count and Pagination Info */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-util-gray/70">
            Showing <span className="font-bold text-white">{startIndex + 1}-{Math.min(endIndex, filteredComponents.length)}</span> of <span className="font-bold text-white">{filteredComponents.length}</span> component{filteredComponents.length !== 1 ? 's' : ''}
            {searchQuery && (
              <span> for "<span className="text-white">{searchQuery}</span>"</span>
            )}
          </p>
          {totalPages > 1 && (
            <p className="text-xs text-util-gray/50">
              Page {currentPage} of {totalPages}
            </p>
          )}
        </div>

        {/* Components */}
        <AnimatePresence mode="wait">
          {paginatedComponents.length > 0 ? (
            <motion.div
              key={`page-${currentPage}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {paginatedComponents.map((component) => (
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
                }}
                className="px-6 py-2.5 bg-white text-black font-bold text-sm rounded-lg hover:bg-util-gray transition-all"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination */}
        {filteredComponents.length > 0 && (
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default ShowcasePage;
