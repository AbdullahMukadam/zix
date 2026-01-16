
import React from 'react';
import { useTemplates } from '../../hooks/useTemplates.js';
import { useTemplate } from '../../context/TemplateContext.jsx';
import TemplateCard from './TemplateCard.jsx';
import TemplateFilters from './TemplateFilters.jsx';
import { FiSearch, FiLoader, FiAlertCircle } from 'react-icons/fi';

const TemplateGallery = () => {
  const { templates, filteredTemplates, loading, error, filter, setFilter } = useTemplates();
  const { selectTemplate } = useTemplate();
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleTemplateSelect = (template) => {
    selectTemplate(template);
  };

  const getSearchFilteredTemplates = () => {
    if (!searchQuery) return filteredTemplates;
    
    const query = searchQuery.toLowerCase();
    return filteredTemplates.filter(template =>
      template.name.toLowerCase().includes(query) ||
      template.description.toLowerCase().includes(query) ||
      template.tags?.some(tag => tag.toLowerCase().includes(query))
    );
  };

  const displayedTemplates = getSearchFilteredTemplates();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020202] flex items-center justify-center font-mono relative">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xs text-util-gray tracking-widest uppercase">Loading Registry...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#020202] flex items-center justify-center font-mono">
        <div className="text-center p-8 border border-white/10 bg-[#0A0A0A] rounded-lg">
          <FiAlertCircle className="w-8 h-8 text-red-500 mx-auto mb-4" />
          <p className="text-white text-xs font-bold uppercase mb-6 tracking-widest">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors uppercase text-xs font-bold"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] pt-24 pb-20 font-sans relative">
      <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.15]"></div>
      </div>
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 pb-8 border-b border-white/5">
            <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-2">
                    Templates
                </h1>
                <p className="text-util-gray/60 text-lg">
                    Select a starting point for your portfolio.
                </p>
            </div>
            
            <div className="w-full md:w-80">
                <div className="relative group">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-util-gray/50 group-focus-within:text-white transition-colors" />
                    <input
                        type="text"
                        placeholder="Search templates..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#0A0A0A] border border-white/10 rounded-md py-2.5 pl-10 pr-4 text-sm text-white placeholder-util-gray/30 focus:outline-none focus:border-white/30 transition-colors"
                    />
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <div className="sticky top-24">
              <TemplateFilters
                filter={filter}
                onFilterChange={setFilter}
                templates={templates}
              />
            </div>
          </div>

          {/* Grid */}
          <div className="lg:col-span-9">
            {displayedTemplates.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 border border-dashed border-white/10 rounded-lg">
                <FiSearch className="w-8 h-8 text-util-gray/30 mb-4" />
                <p className="text-util-gray/50 font-mono text-sm mb-4">
                  No matching templates found.
                </p>
                <button
                  onClick={() => {
                    setFilter({ category: 'all' });
                    setSearchQuery('');
                  }}
                  className="text-white hover:underline text-sm"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {displayedTemplates.map(template => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    onSelect={handleTemplateSelect}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateGallery;
