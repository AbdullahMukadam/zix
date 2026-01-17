import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCode, FiEye, FiExternalLink, FiUser, FiPlay } from 'react-icons/fi';
import { FaTwitter } from 'react-icons/fa';
import CodeBlock from './CodeBlock.jsx';
import previewRegistry from './previews/registry'; // Import the registry

const ShowcaseCard = ({ component }) => {
  const [showCode, setShowCode] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState('jsx');
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  // Determine if this is a media showcase or live preview
  const hasMedia = component.media !== null && component.media !== undefined;
  const hasLivePreview = component.hasLivePreview === true;
  const hasCode = component.code !== null && component.code !== undefined;
  const hasCreator = component.creator !== null && component.creator !== undefined;

  // Get the Preview Component from registry (for live previews)
  const PreviewComponent = previewRegistry[component.id];

  // Get available code formats
  const availableFormats = hasCode 
    ? Object.entries(component.code)
        .filter(([_, code]) => code !== null)
        .map(([format]) => format)
    : [];

  // Set initial active tab to first available format
  useState(() => {
    if (availableFormats.length > 0 && !availableFormats.includes(activeCodeTab)) {
      setActiveCodeTab(availableFormats[0]);
    }
  }, [component.id]);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePauseVideo = () => {
    setIsPlaying(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group relative flex flex-col bg-[#050505] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-colors"
    >
      {/* Preview/Media Area */}
      <div className="relative h-[300px] w-full flex items-center justify-center bg-[#0a0a0a] border-b border-white/5 overflow-hidden">
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          {hasMedia ? (
            // Video or Image showcase
            component.media.type === 'video' ? (
              <div className="relative w-full h-full group/video">
                <video
                  ref={videoRef}
                  src={component.media.url}
                  loop
                  muted
                  playsInline
                  onEnded={handlePauseVideo}
                  className="w-full h-full object-cover"
                />
                {/* Play Button Overlay */}
                {!isPlaying && (
                  <button
                    onClick={handlePlayVideo}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm group-hover/video:bg-black/40 transition-all"
                  >
                    <div className="w-16 h-16 rounded-full bg-white/10 border-2 border-white/50 flex items-center justify-center backdrop-blur-md group-hover/video:scale-110 group-hover/video:bg-white/20 transition-all">
                      <FiPlay className="w-8 h-8 text-white ml-1" />
                    </div>
                  </button>
                )}
              </div>
            ) : (
              <img
                src={component.media.url}
                alt={component.title}
                className="w-full h-full object-cover"
              />
            )
          ) : hasLivePreview && PreviewComponent ? (
            // Live interactive preview
            <div className="p-6 w-full flex items-center justify-center">
              <PreviewComponent />
            </div>
          ) : (
            // No preview available
            <div className="text-util-gray/30 text-xs font-mono uppercase tracking-widest">
              No Preview
            </div>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="p-6 flex-grow flex flex-col bg-[#050505]">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-display font-bold text-white leading-tight">
            {component.title}
          </h3>
          {hasCreator && (
            <a
              href={`https://x.com/${component.creator.twitter.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1DA1F2]/10 border border-[#1DA1F2]/20 text-[#1DA1F2] hover:bg-[#1DA1F2]/20 transition-all group/twitter"
            >
              <FaTwitter className="w-3 h-3" />
              <span className="text-[10px] font-bold">{component.creator.twitter}</span>
            </a>
          )}
        </div>
        
        <p className="text-sm text-util-gray/60 leading-relaxed mb-4">
          {component.description}
        </p>

        {/* Tags */}
        <div className="mb-6 flex flex-wrap gap-2">
          {component.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 rounded text-[10px] font-medium text-util-gray/50 bg-white/[0.02] border border-white/5"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Action Footer */}
        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between gap-3 flex-wrap">
          {/* View Code Button - only show if code is available */}
          {hasCode && (
            <button
              onClick={() => setShowCode(!showCode)}
              className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                showCode ? 'text-white' : 'text-util-gray hover:text-white'
              }`}
            >
              <FiCode className="w-4 h-4" />
              {showCode ? "Hide Code" : "View Code"}
            </button>
          )}

          {/* Creator Attribution - if no code/source/demo */}
          {!hasCode && !component.sourceUrl && !component.demoUrl && hasCreator && (
            <div className="flex items-center gap-2 text-xs text-util-gray/60">
              <FiUser className="w-3.5 h-3.5" />
              <span>by {component.creator.name}</span>
            </div>
          )}
        </div>
      </div>

      {/* Code View (Expandable) - only render if code is available */}
      {hasCode && (
        <AnimatePresence>
          {showCode && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="bg-[#020202] border-t border-white/5"
            >
              <div className="p-0">
                {/* Tabs */}
                {availableFormats.length > 1 && (
                  <div className="flex border-b border-white/5">
                    {availableFormats.map((format) => (
                      <button
                        key={format}
                        onClick={() => setActiveCodeTab(format)}
                        className={`px-4 py-2 text-[10px] font-bold uppercase tracking-wider transition-colors ${
                          activeCodeTab === format
                            ? 'text-white bg-white/5 border-b-2 border-util-accent'
                            : 'text-util-gray/50 hover:text-white'
                        }`}
                      >
                        {format}
                      </button>
                    ))}
                  </div>
                )}
                
                <div className="relative">
                  <CodeBlock
                    code={component.code[activeCodeTab]}
                    language={activeCodeTab}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
};

export default ShowcaseCard;
