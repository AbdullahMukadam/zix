import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

// Register the Draggable plugin with GSAP
gsap.registerPlugin(Draggable);

export const Handlebars = ({ children, className = "w-64 md:w-80 h-16" }) => {
  // Refs for the elements we'll be animating or interacting with
  const containerRef = useRef(null);
  const leftHandleRef = useRef(null);
  const rightHandleRef = useRef(null);
  const contentRef = useRef(null);

  // Refs to store the Draggable instances
  const leftDraggableRef = useRef(null);
  const rightDraggableRef = useRef(null);

  // State to hold the width of the container
  const [width, setWidth] = useState(0);

  // This effect runs once to set up a ResizeObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setWidth(entry.contentRect.width);
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Initialize draggables and set up initial positions
  useEffect(() => {
    if (
      !leftHandleRef.current ||
      !rightHandleRef.current ||
      !contentRef.current ||
      width === 0
    ) {
      return;
    }

    // Clean up existing draggables if they exist
    if (leftDraggableRef.current) {
      leftDraggableRef.current[0].kill();
    }
    if (rightDraggableRef.current) {
      rightDraggableRef.current[0].kill();
    }

    // Set initial positions
    gsap.set(leftHandleRef.current, { x: 0 });
    gsap.set(rightHandleRef.current, { x: width - 28 });

    // Helper function to update the CSS mask
    const updateMask = () => {
      if (
        !contentRef.current ||
        !leftDraggableRef.current ||
        !rightDraggableRef.current
      )
        return;

      const leftX = leftDraggableRef.current[0].x;
      const rightX = rightDraggableRef.current[0].x + 28; // Add handle width to right position

      const leftPercent = Math.max(0, Math.min(100, (leftX / width) * 100));
      const rightPercent = Math.max(0, Math.min(100, (rightX / width) * 100));

      const maskValue = `linear-gradient(90deg, 
        transparent 0%, 
        transparent ${leftPercent}%, 
        black ${leftPercent}%, 
        black ${rightPercent}%, 
        transparent ${rightPercent}%, 
        transparent 100%)`;

      gsap.set(contentRef.current, {
        mask: maskValue,
        webkitMask: maskValue,
      });
    };

    // Create Left Draggable Handle
    leftDraggableRef.current = Draggable.create(leftHandleRef.current, {
      type: "x",
      bounds: { minX: 0, maxX: width - 28 },
      onDrag: function () {
        updateMask();
        // Update right handle bounds
        if (rightDraggableRef.current) {
          rightDraggableRef.current[0].applyBounds({
            minX: this.x + 28,
            maxX: width - 28,
          });
        }
      },
      onPress: function () {
        gsap.to(this.target, { scale: 1.1, duration: 0.2 });
      },
      onRelease: function () {
        gsap.to(this.target, { scale: 1, duration: 0.2 });
      },
    });

    // Create Right Draggable Handle
    rightDraggableRef.current = Draggable.create(rightHandleRef.current, {
      type: "x",
      bounds: { minX: 28, maxX: width - 28 },
      onDrag: function () {
        updateMask();
        // Update left handle bounds
        if (leftDraggableRef.current) {
          leftDraggableRef.current[0].applyBounds({
            minX: 0,
            maxX: this.x - 28,
          });
        }
      },
      onPress: function () {
        gsap.to(this.target, { scale: 1.1, duration: 0.2 });
      },
      onRelease: function () {
        gsap.to(this.target, { scale: 1, duration: 0.2 });
      },
    });

    // Set initial mask to show full content
    updateMask();

    // Cleanup function
    return () => {
      leftDraggableRef.current?.[0].kill();
      rightDraggableRef.current?.[0].kill();
    };
  }, [width]);

  return (
    <div className="flex justify-center gap-4 w-full">
      <div
        ref={containerRef}
        className={`relative -rotate-[2.76deg] mt-0.5 ${className}`}
      >
        {/* The main container for the content and handles */}
        <div className="absolute inset-0 w-full h-full rounded-full border border-yellow-500/50 flex justify-between z-10 pointer-events-none">
          {/* Left Handle */}
          <div
            ref={leftHandleRef}
            className="absolute z-20 h-full border border-yellow-500 w-7 rounded-full bg-[#1a1a1a] flex items-center justify-center select-none cursor-grab active:cursor-grabbing pointer-events-auto "
            style={{ left: 0 }}
          >
            <div className="w-1.5 h-6 rounded-full bg-yellow-500" />
          </div>

          {/* Right Handle */}
          <div
            ref={rightHandleRef}
            className="absolute z-20 h-full border border-yellow-500 w-7 rounded-full bg-[#1a1a1a] flex items-center justify-center select-none cursor-grab active:cursor-grabbing pointer-events-auto"
            style={{ left: 0 }}
          >
            <div className="w-1.5 h-6 rounded-full bg-yellow-500" />
          </div>
        </div>

        {/* The content that gets masked */}
        <span
          ref={contentRef}
          className="absolute inset-0 flex items-center justify-center w-full h-full px-9 bg-[#1a1a1a] rounded-full border border-white/10 text-white font-bold text-lg whitespace-nowrap overflow-hidden"
        >
          {children}
        </span>

      </div>
    </div>
  );
};

// Default export for the showcase preview
export const HandlebarsPreview = () => {
  return (
    <div className="w-full h-64 flex justify-center items-center rounded-lg p-4">
      <Handlebars>
        <span className="text-6xl text-white md:text-6xl font-extrabold tracking-tighter">
          DRAG ME
        </span>
      </Handlebars>
    </div>
  );
};

export const HandlebarsLandingPage = ({ children }) => {
  return (
    <div className="w-full h-fit rounded-lg mt-1">
      <Handlebars className="w-[360px] md:w-[510px] h-20">
        <span className="text-6xl md:text-8xl text-white">
          {children}
        </span>
      </Handlebars>
    </div>
  );
};


