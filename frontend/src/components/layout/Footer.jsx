
import React from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiGlobe } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#020202] text-sm font-sans z-10 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-overlay bg-[length:50px_50px] opacity-[0.05] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-6 pt-20 pb-10 relative z-10">
        
        {/* Main Content - Centered Flex Container */}
        <div className="flex flex-col md:flex-row justify-center items-start gap-12 md:gap-24 mb-20">
          
          {/* Brand Column */}
          <div className="flex flex-col items-start max-w-sm">
            <Link to="/" className="flex items-center gap-2 text-white font-display font-bold text-2xl tracking-tighter mb-6">
               Zix.
            </Link>
            <p className="text-util-gray/60 leading-relaxed mb-8">
              The ultimate developer ecosystem. <br/>
              Build portfolios, generate CSS assets, explore UI components, and ship faster than ever.
            </p>
            <div className="flex gap-4">
               <a href="https://github.com/AbdullahMukadam" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/5 border border-white/5 text-util-gray hover:text-white hover:bg-white/10 transition-all">
                 <FiGithub className="w-5 h-5" />
               </a>
               <a href="https://x.com/abd_mukadam" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/5 border border-white/5 text-util-gray hover:text-white hover:bg-white/10 transition-all">
                 <FiTwitter className="w-5 h-5" />
               </a>
               <a href="https://abdullahmukadam.fun" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/5 border border-white/5 text-util-gray hover:text-white hover:bg-white/10 transition-all">
                 <FiGlobe className="w-5 h-5" />
               </a>
            </div>
          </div>

          {/* Product Links Column */}
          <div>
            <h4 className="text-white font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-util-gray/60">
               <li><Link to="/templates" className="hover:text-white transition-colors">Templates</Link></li>
               <li><Link to="/showcase" className="hover:text-white transition-colors">Showcase</Link></li>
               <li><Link to="/components" className="hover:text-white transition-colors">UI Components</Link></li>
               <li><Link to="/tools" className="hover:text-white transition-colors">Tools</Link></li>
               <li><Link to="/productivity" className="hover:text-white transition-colors">Productivity</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col items-center gap-4 text-xs text-util-gray/40 font-mono text-center">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <span>© {new Date().getFullYear()} Zix. OPEN SOURCE. MIT LICENSE.</span>
            <span className="hidden sm:inline text-white/10">|</span>
            <span>Made by Abdullah Mukadam</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
