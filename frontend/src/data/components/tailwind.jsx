import React, { useRef, useState } from 'react';
import { FiCheck, FiX, FiGithub, FiTwitter, FiFacebook } from 'react-icons/fi';
import { motion } from 'framer-motion';

export const tailwindCategories = [
  { id: 'all', label: 'All' },
  { id: 'buttons', label: 'Buttons' },
  { id: 'cards', label: 'Cards' },
  { id: 'inputs', label: 'Inputs' },
  { id: 'loaders', label: 'Loaders' },
  { id: 'feedback', label: 'Feedback' },
  { id: 'badges', label: 'Badges' }
];

export const tailwindComponents = [
  {
    id: 'btn-1',
    title: 'Primary Button',
    category: 'buttons',
    code: `<button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-lg shadow-blue-500/30">
  Button
</button>`,
    preview: () => (
      <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-lg shadow-blue-500/30">
        Button
      </button>
    )
  },
  {
    id: 'btn-2',
    title: 'Outline Button',
    category: 'buttons',
    code: `<button className="px-6 py-2 border border-white/20 hover:bg-white/10 text-white font-medium rounded-lg transition-colors">
  Button
</button>`,
    preview: () => (
      <button className="px-6 py-2 border border-white/20 hover:bg-white/10 text-white font-medium rounded-lg transition-colors">
        Button
      </button>
    )
  },
  {
    id: 'btn-3',
    title: 'Gradient Button',
    category: 'buttons',
    code: `<button className="px-6 py-2 bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white font-medium rounded-lg transition-all transform hover:scale-105">
  Gradient
</button>`,
    preview: () => (
      <button className="px-6 py-2 bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white font-medium rounded-lg transition-all transform hover:scale-105">
        Gradient
      </button>
    )
  },
  {
    id: 'btn-social',
    title: 'Social Login Group',
    category: 'buttons',
    code: `<div className="flex gap-2">
  <button className="p-3 bg-[#24292F] hover:bg-[#24292F]/90 text-white rounded-lg transition-colors">
    <FiGithub className="w-5 h-5" />
  </button>
  <button className="p-3 bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white rounded-lg transition-colors">
    <FiTwitter className="w-5 h-5" />
  </button>
  <button className="p-3 bg-[#4267B2] hover:bg-[#4267B2]/90 text-white rounded-lg transition-colors">
    <FiFacebook className="w-5 h-5" />
  </button>
</div>`,
    preview: () => (
      <div className="flex gap-2">
        <button className="p-3 bg-[#24292F] hover:bg-[#24292F]/90 text-white rounded-lg transition-colors">
          <FiGithub className="w-5 h-5" />
        </button>
        <button className="p-3 bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white rounded-lg transition-colors">
          <FiTwitter className="w-5 h-5" />
        </button>
        <button className="p-3 bg-[#4267B2] hover:bg-[#4267B2]/90 text-white rounded-lg transition-colors">
          <FiFacebook className="w-5 h-5" />
        </button>
      </div>
    )
  },
  {
    id: 'btn-magnetic',
    title: 'Magnetic Button',
    category: 'buttons',
    code: `import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

export default function MagneticButton() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    setPosition({ x: distanceX * 0.3, y: distanceY * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform"
    >
      Hover Me
    </motion.button>
  );
}`,
    preview: () => {
      const [position, setPosition] = useState({ x: 0, y: 0 });
      const buttonRef = useRef(null);

      const handleMouseMove = (e) => {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        setPosition({ x: distanceX * 0.3, y: distanceY * 0.3 });
      };

      const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
      };

      return (
        <motion.button
          ref={buttonRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          animate={{ x: position.x, y: position.y }}
          transition={{ type: 'spring', stiffness: 150, damping: 15 }}
          className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform"
        >
          Hover Me
        </motion.button>
      );
    }
  },
  {
    id: 'btn-gradient-border',
    title: 'Gradient Border Button',
    category: 'buttons',
    code: `export default function GradientBorderButton() {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
      <button className="relative px-7 py-4 bg-black rounded-lg leading-none flex items-center">
        <span className="text-white font-bold">Click Me</span>
      </button>
    </div>
  );
}

/* Add this to your CSS or Tailwind config */
@keyframes tilt {
  0%, 50%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(1deg);
  }
  75% {
    transform: rotate(-1deg);
  }
}

.animate-tilt {
  animation: tilt 10s infinite linear;
}`,
    preview: () => (
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
        <button className="relative px-7 py-4 bg-black rounded-lg leading-none flex items-center">
          <span className="text-white font-bold">Click Me</span>
        </button>
      </div>
    )
  },
  {
    id: 'card-1',
    title: 'Glassmorphism Card',
    category: 'cards',
    code: `<div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm max-w-sm w-full">
  <h3 className="text-xl font-bold text-white mb-2">Glass Card</h3>
  <p className="text-gray-400 text-sm">This is a beautiful glassmorphism card effect using backdrop-blur.</p>
</div>`,
    preview: () => (
      <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm max-w-sm w-full">
        <h3 className="text-xl font-bold text-white mb-2">Glass Card</h3>
        <p className="text-gray-400 text-sm">This is a beautiful glassmorphism card effect using backdrop-blur.</p>
      </div>
    )
  },
  {
    id: 'card-2',
    title: 'Feature Card',
    category: 'cards',
    code: `<div className="group p-6 rounded-xl bg-[#111] border border-white/10 hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10 max-w-sm w-full">
  <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform font-bold">
    ★
  </div>
  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">Feature</h3>
  <p className="text-gray-400 text-sm">Hover over this card to see the subtle interaction effects.</p>
</div>`,
    preview: () => (
      <div className="group p-6 rounded-xl bg-[#111] border border-white/10 hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10 max-w-sm w-full cursor-default">
        <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform font-bold">
          ★
        </div>
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">Feature</h3>
        <p className="text-gray-400 text-sm">Hover over this card to see the subtle interaction effects.</p>
      </div>
    )
  },
  {
    id: 'card-pricing',
    title: 'Pricing Card',
    category: 'cards',
    code: `<div className="p-8 rounded-2xl bg-[#0A0A0A] border border-white/10 max-w-sm w-full hover:border-white/20 transition-colors">
  <div className="mb-4">
    <span className="text-sm font-bold text-util-gray uppercase tracking-wider">Pro Plan</span>
    <h3 className="text-3xl font-bold text-white mt-2">$29<span className="text-lg text-util-gray font-normal">/mo</span></h3>
  </div>
  <ul className="space-y-3 mb-8">
    {['Unlimited Projects', 'Custom Domain', 'Analytics'].map(feature => (
      <li key={feature} className="flex items-center gap-3 text-sm text-gray-300">
        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
          <FiCheck className="w-3 h-3" />
        </div>
        {feature}
      </li>
    ))}
  </ul>
  <button className="w-full py-2.5 rounded-lg bg-white text-black font-bold text-sm hover:bg-gray-200 transition-colors">
    Get Started
  </button>
</div>`,
    preview: () => (
      <div className="p-8 rounded-2xl bg-[#0A0A0A] border border-white/10 max-w-sm w-full hover:border-white/20 transition-colors">
        <div className="mb-4">
          <span className="text-xs font-bold text-util-gray uppercase tracking-wider">Pro Plan</span>
          <h3 className="text-3xl font-bold text-white mt-2">$29<span className="text-lg text-util-gray font-normal">/mo</span></h3>
        </div>
        <ul className="space-y-3 mb-8">
          {['Unlimited Projects', 'Custom Domain', 'Analytics'].map(feature => (
            <li key={feature} className="flex items-center gap-3 text-sm text-gray-300">
              <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                <FiCheck className="w-3 h-3" />
              </div>
              {feature}
            </li>
          ))}
        </ul>
        <button className="w-full py-2.5 rounded-lg bg-white text-black font-bold text-sm hover:bg-gray-200 transition-colors">
          Get Started
        </button>
      </div>
    )
  },
  {
    id: 'card-spotlight',
    title: 'Spotlight Card',
    category: 'cards',
    code: `import { useRef, useState } from "react";

export default function SpotlightCard() {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className="relative flex h-48 w-full max-w-sm flex-col items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-black px-8 py-16 shadow-2xl"
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: \`radial-gradient(600px circle at \${position.x}px \${position.y}px, rgba(255,255,255,0.1), transparent 40%)\`,
        }}
      />
      <div className="relative z-10 text-center">
        <h3 className="mb-2 text-xl font-bold text-white">Spotlight Effect</h3>
        <p className="text-sm text-gray-400">Hover me!</p>
      </div>
    </div>
  );
}`,
    preview: () => {
      const divRef = useRef(null);
      const [position, setPosition] = useState({ x: 0, y: 0 });
      const [opacity, setOpacity] = useState(0);

      const handleMouseMove = (e) => {
        if (!divRef.current) return;
        const div = divRef.current;
        const rect = div.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      };

      return (
        <div
          ref={divRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setOpacity(1)}
          onMouseLeave={() => setOpacity(0)}
          className="relative flex h-48 w-full max-w-sm flex-col items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-black px-8 py-16 shadow-2xl"
        >
          <div
            className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
            style={{
              opacity,
              background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.1), transparent 40%)`,
            }}
          />
          <div className="relative z-10 text-center">
            <h3 className="mb-2 text-xl font-bold text-white">Spotlight Effect</h3>
            <p className="text-sm text-gray-400">Hover me!</p>
          </div>
        </div>
      );
    }
  },
  {
    id: 'inp-1',
    title: 'Modern Input',
    category: 'inputs',
    code: `<div className="w-full max-w-xs">
  <input 
    type="text" 
    placeholder="Type here..." 
    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
  />
</div>`,
    preview: () => (
      <div className="w-full max-w-xs">
        <input 
          type="text" 
          placeholder="Type here..." 
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
        />
      </div>
    )
  },
  {
    id: 'inp-2',
    title: 'Floating Label',
    category: 'inputs',
    code: `<div className="relative w-full max-w-xs">
  <input 
    type="text" 
    id="floating_input" 
    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-transparent rounded-lg border border-white/20 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
    placeholder=" " 
  />
  <label 
    htmlFor="floating_input" 
    className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#0A0A0A] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
  >
    Floating Label
  </label>
</div>`,
    preview: () => (
      <div className="relative w-full max-w-xs">
        <input 
          type="text" 
          id="floating_input" 
          className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-transparent rounded-lg border border-white/20 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
          placeholder=" " 
        />
        <label 
          htmlFor="floating_input" 
          className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#0A0A0A] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
        >
          Floating Label
        </label>
      </div>
    )
  },
  {
    id: 'load-1',
    title: 'Spin Loader',
    category: 'loaders',
    code: `<div className="w-10 h-10 border-4 border-white/20 border-t-blue-500 rounded-full animate-spin"></div>`,
    preview: () => (
      <div className="w-10 h-10 border-4 border-white/20 border-t-blue-500 rounded-full animate-spin"></div>
    )
  },
  {
    id: 'load-2',
    title: 'Pulse Loader',
    category: 'loaders',
    code: `<div className="flex gap-2">
  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse delay-75"></div>
  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse delay-150"></div>
</div>`,
    preview: () => (
      <div className="flex gap-2">
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse delay-75"></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse delay-150"></div>
      </div>
    )
  },
  {
    id: 'toast-1',
    title: 'Success Toast',
    category: 'feedback',
    code: `<div className="flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-[#111] rounded-lg shadow border border-white/10" role="alert">
  <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100/10 rounded-lg">
    <FiCheck className="w-5 h-5" />
  </div>
  <div className="ml-3 text-sm font-normal text-white">Item moved successfully.</div>
  <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-[#111] text-gray-400 hover:text-white rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-white/10 inline-flex h-8 w-8 items-center justify-center" aria-label="Close">
    <span className="sr-only">Close</span>
    <FiX className="w-4 h-4" />
  </button>
</div>`,
    preview: () => (
      <div className="flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-[#111] rounded-lg shadow border border-white/10" role="alert">
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100/10 rounded-lg">
          <FiCheck className="w-5 h-5" />
        </div>
        <div className="ml-3 text-sm font-normal text-white">Item moved successfully.</div>
        <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-[#111] text-gray-400 hover:text-white rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-white/10 inline-flex h-8 w-8 items-center justify-center" aria-label="Close">
          <span className="sr-only">Close</span>
          <FiX className="w-4 h-4" />
        </button>
      </div>
    )
  },
  {
    id: 'badge-1',
    title: 'Status Badges',
    category: 'badges',
    code: `<div className="flex gap-2">
  <span className="inline-flex items-center bg-green-100/10 text-green-400 text-xs font-medium px-2.5 py-0.5 rounded-full border border-green-400/20">
    <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></span>
    Active
  </span>
  <span className="inline-flex items-center bg-yellow-100/10 text-yellow-400 text-xs font-medium px-2.5 py-0.5 rounded-full border border-yellow-400/20">
    <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-1.5 animate-pulse"></span>
    Pending
  </span>
  <span className="inline-flex items-center bg-red-100/10 text-red-400 text-xs font-medium px-2.5 py-0.5 rounded-full border border-red-400/20">
    <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-1.5"></span>
    Error
  </span>
</div>`,
    preview: () => (
      <div className="flex gap-2">
        <span className="inline-flex items-center bg-green-100/10 text-green-400 text-xs font-medium px-2.5 py-0.5 rounded-full border border-green-400/20">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></span>
          Active
        </span>
        <span className="inline-flex items-center bg-yellow-100/10 text-yellow-400 text-xs font-medium px-2.5 py-0.5 rounded-full border border-yellow-400/20">
          <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-1.5 animate-pulse"></span>
          Pending
        </span>
        <span className="inline-flex items-center bg-red-100/10 text-red-400 text-xs font-medium px-2.5 py-0.5 rounded-full border border-red-400/20">
          <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-1.5"></span>
          Error
        </span>
      </div>
    )
  }
];
