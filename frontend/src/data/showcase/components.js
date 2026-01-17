// Showcase Components Data Structure
// This file contains showcase items for cool UI components, dashboards, hero sections, etc.
// Each item can have:
// - media: { type: 'video' | 'image', url: string } - for showcasing the component
// - creator: { name: string, twitter: string } - attribution
// - sourceUrl: (optional) link to original source if available

export const showcaseComponents = [
  // === INTERACTIVE COMPONENTS (with code) ===
  
  {
    id: 'handlebars',
    title: 'Handlebars Reveal',
    description: 'Draggable handles that reveal hidden content with a smooth mask animation. Interactive GSAP-powered component.',
    category: 'animations',
    tags: ['gsap', 'draggable', 'mask', 'interactive', 'animation'],
    media: null,
    creator: {
      name: 'Abdullah Mukadam',
      twitter: '@abd_mukadam',
    },
    hasLivePreview: true,
    sourceUrl: null,
    dependencies: ['gsap', 'react'],
    code: {
      jsx: `import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const Handlebars = ({ children }) => {
  const containerRef = useRef(null);
  const leftHandleRef = useRef(null);
  const rightHandleRef = useRef(null);
  const contentRef = useRef(null);
  const leftDraggableRef = useRef(null);
  const rightDraggableRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) setWidth(entries[0].contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!leftHandleRef.current || !rightHandleRef.current || !contentRef.current || width === 0) return;

    if (leftDraggableRef.current) leftDraggableRef.current[0].kill();
    if (rightDraggableRef.current) rightDraggableRef.current[0].kill();

    gsap.set(leftHandleRef.current, { x: 0 });
    gsap.set(rightHandleRef.current, { x: width - 28 });

    const updateMask = () => {
      const leftX = leftDraggableRef.current[0].x;
      const rightX = rightDraggableRef.current[0].x + 28;
      const leftPercent = Math.max(0, Math.min(100, (leftX / width) * 100));
      const rightPercent = Math.max(0, Math.min(100, (rightX / width) * 100));
      const maskValue = \`linear-gradient(90deg, transparent 0%, transparent \${leftPercent}%, black \${leftPercent}%, black \${rightPercent}%, transparent \${rightPercent}%, transparent 100%)\`;
      gsap.set(contentRef.current, { mask: maskValue, webkitMask: maskValue });
    };

    leftDraggableRef.current = Draggable.create(leftHandleRef.current, {
      type: "x",
      bounds: { minX: 0, maxX: width - 28 },
      onDrag: function () {
        updateMask();
        if (rightDraggableRef.current) {
          rightDraggableRef.current[0].applyBounds({ minX: this.x + 28, maxX: width - 28 });
        }
      }
    });

    rightDraggableRef.current = Draggable.create(rightHandleRef.current, {
      type: "x",
      bounds: { minX: 28, maxX: width - 28 },
      onDrag: function () {
        updateMask();
        if (leftDraggableRef.current) {
          leftDraggableRef.current[0].applyBounds({ minX: 0, maxX: this.x - 28 });
        }
      }
    });

    updateMask();

    return () => {
      leftDraggableRef.current?.[0].kill();
      rightDraggableRef.current?.[0].kill();
    };
  }, [width]);

  return (
    <div className="flex justify-center gap-4 py-10 w-full">
      <div ref={containerRef} className="relative -rotate-[2.76deg] mt-0.5 w-64 md:w-80 h-16">
        <div className="absolute inset-0 w-full h-full rounded-full border border-yellow-500/50 flex justify-between z-10 pointer-events-none">
          <div ref={leftHandleRef} className="absolute z-20 h-full border border-yellow-500 w-7 rounded-full bg-[#1a1a1a] flex items-center justify-center cursor-grab active:cursor-grabbing pointer-events-auto">
            <div className="w-1.5 h-6 rounded-full bg-yellow-500" />
          </div>
          <div ref={rightHandleRef} className="absolute z-20 h-full border border-yellow-500 w-7 rounded-full bg-[#1a1a1a] flex items-center justify-center cursor-grab active:cursor-grabbing pointer-events-auto">
            <div className="w-1.5 h-6 rounded-full bg-yellow-500" />
          </div>
        </div>
        <span ref={contentRef} className="absolute inset-0 flex items-center justify-center w-full h-full px-9 bg-[#1a1a1a] rounded-full border border-white/10 text-white font-bold text-lg whitespace-nowrap overflow-hidden">
          {children}
        </span>
      </div>
    </div>
  );
};

export default Handlebars;`,
    }
  },
  {
    id: 'ecommerce-hero',
    title: 'E-commerce Hero Section',
    description: 'Made an Ecommerce hero section made using React and Tailwind, framer motion, gsap PS: Design is not mine, dm for credits.',
    category: 'hero-sections',
    tags: ['react', 'tailwind', 'framer-motion', 'gsap', 'ecommerce'],
    media: {
      type: 'video',
      url: 'https://res.cloudinary.com/dhbs6k3ue/video/upload/v1767790957/e-commerce-design-new-1767790768736_jdiqox.mp4',
    },
    creator: {
      name: 'Abdullah Mukadam',
      twitter: '@abd_mukadam',
    },
    sourceUrl: 'https://github.com/AbdullahMukadam/metaverse',
    demoUrl: 'https://2dverse.vercel.app/',
  },

  {
    id: 'cool-cards',
    title: 'Cool Cards',
    description: 'Made cool cards using react, tailwind and framer motion.',
    category: 'cards',
    tags: ['react', 'tailwind', 'framer-motion', 'interactive'],
    media: {
      type: 'video',
      url: 'https://res.cloudinary.com/dhbs6k3ue/video/upload/v1768634481/new_card-1768040847287_p213hm.mp4',
    },
    creator: {
      name: 'Abdullah Mukadam',
      twitter: '@abd_mukadam',
    },
    sourceUrl: 'https://github.com/AbdullahMukadam/metaverse',
    demoUrl: 'https://2dverse.vercel.app/',
  },

  {
    id: 'simple-dashboard',
    title: 'Simple Dashboard UI',
    description: 'Simple Dashboard UI made using React and Tailwind, PS: Design is not mine, dm for credits.',
    category: 'dashboards',
    tags: ['react', 'typescript', 'tailwind', 'recharts', 'dashboard'],
    media: {
      type: 'video',
      url: 'https://res.cloudinary.com/dhbs6k3ue/video/upload/v1767604625/2025-12-07_10-15-09_rejykt.mp4',
    },
    creator: {
      name: 'Abdullah Mukadam',
      twitter: '@abd_mukadam',
    },
    sourceUrl: 'https://github.com/AbdullahMukadam/metaverse',
    demoUrl: 'https://2dverse.vercel.app/',
  },

  {
    id: 'modern-dashboard',
    title: 'Modern Dashboard UI',
    description: 'A modern dashboard interface with clean design and smooth animations.',
    category: 'dashboards',
    tags: ['react', 'tailwind', 'framer-motion', 'dashboard'],
    media: {
      type: 'video',
      url: 'https://res.cloudinary.com/dhbs6k3ue/video/upload/v1767604463/dashboard-new-1767292231122_hqrud4.mp4',
    },
    creator: {
      name: 'Abdullah Mukadam',
      twitter: '@abd_mukadam',
    },
    sourceUrl: 'https://github.com/AbdullahMukadam/Job-portal-app',
    demoUrl: 'https://job-portal-app-test.vercel.app/',
  },

  {
    id: 'portfolio-template',
    title: 'Portfolio Template',
    description: 'Created this Single Page Portfolio Template using react, Framer Motion.',
    category: 'landing-pages',
    tags: ['react', 'tailwind', 'framer-motion', 'portfolio'],
    media: {
      type: 'video',
      url: 'https://res.cloudinary.com/dhbs6k3ue/video/upload/v1768145506/new-portfolio-template-1768142541551_io3p0d.mp4',
    },
    creator: {
      name: 'Abdullah Mukadam',
      twitter: '@abd_mukadam',
    },
    sourceUrl: 'https://github.com/AbdullahMukadam/Job-portal-app',
    demoUrl: 'https://job-portal-app-test.vercel.app/',
  },

  {
    id: 'studioflow-dashboard',
    title: 'StudioFlow Dashboard',
    description: 'The dashboard from my StudioFlow Project.',
    category: 'dashboards',
    tags: ['react', 'typescript', 'tailwind', 'recharts', 'dashboard'],
    media: {
      type: 'video',
      url: 'https://res.cloudinary.com/dhbs6k3ue/video/upload/v1767604421/studioflow-video_1_eo6wxu.mp4',
    },
    creator: {
      name: 'Abdullah Mukadam',
      twitter: '@abd_mukadam',
    },
    sourceUrl: 'https://github.com/AbdullahMukadam/metaverse',
    demoUrl: 'https://2dverse.vercel.app/',
  },

  {
    id: 'isthover-landing',
    title: 'IstHover Landing Page',
    description: "Simple Landing page created for my friend's opensource project.",
    category: 'landing-pages',
    tags: ['react', 'typescript', 'tailwind', 'landing-page'],
    media: {
      type: 'video',
      url: 'https://res.cloudinary.com/dhbs6k3ue/video/upload/v1768634850/isthover-concept-1768304475476_qas865.mp4',
    },
    creator: {
      name: 'Abdullah Mukadam',
      twitter: '@abd_mukadam',
    },
    sourceUrl: 'https://github.com/AbdullahMukadam/metaverse',
    demoUrl: 'https://2dverse.vercel.app/',
  },

  {
    id: 'mobile-card',
    title: 'Mobile Screen Card',
    description: 'Simple mobile screen recreated using Anthropic. PS: Design is not mine, dm for credits.',
    category: 'cards',
    tags: ['react', 'tailwind', 'framer-motion', 'mobile'],
    media: {
      type: 'video',
      url: 'https://res.cloudinary.com/dhbs6k3ue/video/upload/v1767604446/new-component-1767453250333_jx6inh.mp4',
    },
    creator: {
      name: 'Abdullah Mukadam',
      twitter: '@abd_mukadam',
    },
    sourceUrl: 'https://github.com/AbdullahMukadam/QuestlyAi',
    demoUrl: 'https://questly-ai.vercel.app/',
  },

  {
    id: 'email-component',
    title: 'Email Card Component',
    description: 'Email Card Component using Tailwind. Designed by Rico.',
    category: 'cards',
    tags: ['react', 'tailwind', 'email', 'ui'],
    media: {
      type: 'video',
      url: 'https://res.cloudinary.com/dhbs6k3ue/video/upload/v1767604443/2025-12-15_07-48-34_cfjzqy.mp4',
    },
    creator: {
      name: 'Abdullah Mukadam',
      twitter: '@abd_mukadam',
    },
    sourceUrl: 'https://github.com/AbdullahMukadam/web_voice_assistant',
    demoUrl: null,
  },

  {
    id: 'saas-landing',
    title: 'SaaS Landing Page',
    description: 'An SaaS Landing Page made using Framer, Tailwind, etc.',
    category: 'landing-pages',
    tags: ['react', 'tailwind', 'framer-motion', 'saas'],
    media: {
      type: 'video',
      url: 'https://res.cloudinary.com/dhbs6k3ue/video/upload/v1767604096/1755107894672_eerimd.mp4',
    },
    creator: {
      name: 'Abdullah Mukadam',
      twitter: '@abd_mukadam',
    },
    sourceUrl: 'https://github.com/AbdullahMukadam/Woman-Safety-App',
    demoUrl: 'https://woman-safety-app.vercel.app/',
  },

  {
    id: 'mobile-ui',
    title: 'Mobile UI',
    description: 'Clean mobile interface design with smooth interactions.',
    category: 'mobile-ui',
    tags: ['react', 'tailwind', 'mobile', 'ui'],
    media: {
      type: 'video',
      url: 'https://res.cloudinary.com/dhbs6k3ue/video/upload/v1767604447/2025-12-14_04-06-55_rxahty.mp4',
    },
    creator: {
      name: 'Abdullah Mukadam',
      twitter: '@abd_mukadam',
    },
    sourceUrl: 'https://github.com/AbdullahMukadam/Portfolio-Website-Builder',
    demoUrl: 'https://portfolio-website-builder.vercel.app',
  },

  {
    id: 'retro-portfolio',
    title: 'Retro Portfolio UI',
    description: 'Created an Retro styled Portfolio.',
    category: 'landing-pages',
    tags: ['react', 'tailwind', 'gsap', 'retro', 'portfolio'],
    media: {
      type: 'video',
      url: 'https://res.cloudinary.com/dhbs6k3ue/video/upload/v1767604409/portfolio-new-1765964106840_1_txpcke.mp4',
    },
    creator: {
      name: 'Abdullah Mukadam',
      twitter: '@abd_mukadam',
    },
    sourceUrl: 'https://github.com/AbdullahMukadam/Superman',
    demoUrl: null,
  },
];

// Categories for filtering
export const categories = [
  { id: 'all', label: 'All', count: showcaseComponents.length },
  { id: 'dashboards', label: 'Dashboards', count: showcaseComponents.filter(c => c.category === 'dashboards').length },
  { id: 'hero-sections', label: 'Hero Sections', count: showcaseComponents.filter(c => c.category === 'hero-sections').length },
  { id: 'landing-pages', label: 'Landing Pages', count: showcaseComponents.filter(c => c.category === 'landing-pages').length },
  { id: 'cards', label: 'Cards', count: showcaseComponents.filter(c => c.category === 'cards').length },
  { id: 'mobile-ui', label: 'Mobile UI', count: showcaseComponents.filter(c => c.category === 'mobile-ui').length },
  { id: 'animations', label: 'Animations', count: showcaseComponents.filter(c => c.category === 'animations').length },
];
