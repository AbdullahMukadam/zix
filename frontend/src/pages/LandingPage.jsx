import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiGithub } from 'react-icons/fi';
import Header from "../components/layout/Header.jsx";
import Footer from '../components/layout/Footer.jsx';
import SEO from '../components/common/SEO.jsx';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#020202] text-util-gray font-sans selection:bg-util-accent selection:text-black relative flex flex-col">
            <SEO 
                title="Home"
                description="The ultimate developer ecosystem. Build portfolios, generate CSS, finding UI components, and discover productivity tools."
            />
            <Header />

            <main className="relative z-10 flex-grow flex flex-col justify-center py-24 md:py-32">
                {/* Hero Section */}
                <section className="max-w-[1400px] mx-auto px-6 w-full">
                    <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-10 animate-fade-in-up">
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-util-accent opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-util-accent"></span>
                            </span>
                            <span className="text-[11px] uppercase tracking-widest font-mono text-util-gray/80">Builder v2.0 is Live</span>
                        </div>
                        
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-white tracking-tight mb-8 leading-[0.95] animate-fade-in-up delay-100">
                            The All-in-One <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40">Developer Ecosystem.</span>
                        </h1>
                        
                        <p className="text-lg md:text-xl text-util-gray/60 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up delay-200">
                            Build professional portfolios, generate CSS assets, explore UI components, and discover productivity tools. Everything you need to ship faster.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-in-up delay-300">
                            <button
                                onClick={() => navigate('/templates')}
                                className="px-8 py-4 bg-white text-black font-bold text-sm rounded-full hover:bg-util-gray transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                            >
                                Start Building <FiArrowRight />
                            </button>
                            <button
                                onClick={() => window.open('https://github.com/AbdullahMukadam', '_blank')}
                                className="px-8 py-4 bg-[#111] border border-white/10 text-white font-bold text-sm rounded-full hover:bg-[#222] hover:border-white/20 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                            >
                                <FiGithub className="text-lg" /> Star on GitHub
                            </button>
                        </div>
                    </div>


                </section>
            </main>

            <Footer />
        </div>
    )
};

export default LandingPage;
