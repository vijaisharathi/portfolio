import React, { useRef, useState, useEffect } from 'react';
    import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
    import Header from './Header';
    import MagnetButton from '../common/MagnetButton';

    const HeroSection = () => {
      const containerRef = useRef(null);
      
      // Motion values for parallax
      const x = useMotionValue(0);
      const y = useMotionValue(0);

      // Smooth spring animation for parallax
      const mouseXSpring = useSpring(x, { stiffness: 40, damping: 20 });
      const mouseYSpring = useSpring(y, { stiffness: 40, damping: 20 });

      const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const clientX = e.clientX;
        const clientY = e.clientY;
        // Update values for parallax (center based)
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate distance from center (-1 to 1)
        x.set((clientX - rect.left - centerX) / centerX);
        y.set((clientY - rect.top - centerY) / centerY);
      };

      const handleConnectClick = () => {
        window.location.href = "mailto:hello@example.com";
      };

      // Parallax transforms
      const textX = useTransform(mouseXSpring, [-1, 1], [15, -15]);
      const textY = useTransform(mouseYSpring, [-1, 1], [15, -15]);
      
      // Tags move slightly more for depth
      const tagsX = useTransform(mouseXSpring, [-1, 1], [-20, 20]);
      const tagsY = useTransform(mouseYSpring, [-1, 1], [-20, 20]);

      // Tags positioning
      const tags = [
        { text: "< UI/UX Design />", className: "top-[30%] left-[15%] md:left-[25%]" },
        { text: "< Frontend Dev />", className: "top-[25%] right-[15%] md:right-[25%]" },
        { text: "< Motion Design />", className: "top-[48%] left-[5%] md:left-[18%]" },
        { text: "< Web Apps />", className: "top-[52%] right-[5%] md:right-[18%]" },
        { text: "< Branding />", className: "bottom-[35%] left-[10%] md:left-[28%]" },
        { text: "< SEO />", className: "bottom-[30%] right-[10%] md:right-[28%]" },
      ];

      return (
        <section 
          ref={containerRef} 
          onMouseMove={handleMouseMove}
          id="home" 
          className="relative h-screen bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Header specifically placed INSIDE HeroSection so it scrolls away */}
          <Header />

          {/* Background Gradients */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-900/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-900/5 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

          <div className="relative w-full max-w-[95vw] mx-auto h-full flex flex-col items-center justify-center">
            
            {/* Intro Text */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute top-[15vh] left-0 right-0 text-center z-20"
            >
              <span className="text-gray-400 text-sm tracking-[0.2em] uppercase font-medium">
                Hello, I'm Vijai Sharathi
              </span>
            </motion.div>

            {/* Huge Background Text - FULL STACK - Perfectly Centered */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-max pointer-events-none select-none z-0 flex justify-center items-center">
              <motion.h1 
                style={{ x: textX, y: textY }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="text-[12vw] md:text-[16vw] font-black leading-none text-[#1a1a1a] whitespace-nowrap text-center"
              >
                FULL STACK
              </motion.h1>
            </div>

            {/* Profile Image Container - Larger Size */}
            <div className="relative z-10 flex items-center justify-center h-full w-full pointer-events-none">
              <SpotlightImage />
            </div>

            {/* Floating Tags */}
            {tags.map((tag, i) => (
              <motion.div 
                key={i}
                style={{ x: tagsX, y: tagsY }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + (i * 0.1), duration: 0.6 }}
                className={`absolute ${tag.className} z-30 pointer-events-none hidden md:block`}
              >
                <span className="text-gray-500/80 text-sm md:text-base font-medium tracking-wide whitespace-nowrap font-mono">
                  {tag.text}
                </span>
              </motion.div>
            ))}

            {/* Bottom Text - DEVELOPER */}
            {/* MOVED UP for Mobile: bottom-[24vh] to overwrite image */}
            <div className="absolute bottom-[24vh] md:bottom-[5vh] left-1/2 -translate-x-1/2 z-20 pointer-events-none flex justify-center w-max">
              <motion.h2 
                style={{ x: textX, y: textY }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-[15vw] md:text-[18vw] font-black leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-400 to-gray-600 whitespace-nowrap text-center"
              >
                DEVELOPER
              </motion.h2>
            </div>

            {/* Mobile Connect Button - Full Width */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-6 left-0 w-full px-5 z-40 md:hidden pointer-events-auto"
            >
              {/* Updated: Removed background, only border remains */}
              <MagnetButton 
                onClick={handleConnectClick}
                className="group relative flex items-center justify-center w-full py-4 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-colors duration-300 overflow-hidden"
              >
                <span className="relative z-10 text-sm font-medium uppercase tracking-widest">Connect</span>
              </MagnetButton>
            </motion.div>

          </div>
        </section>
      );
    };

    // Sub-component for clean spotlight logic
    const SpotlightImage = () => {
      const imgRef = useRef(null);
      const [cursor, setCursor] = useState({ x: -1000, y: -1000 });
      const [isMobile, setIsMobile] = useState(false);

      useEffect(() => {
        const checkMobile = () => {
          setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
      }, []);

      const handleMouseMove = (e) => {
        if (imgRef.current && !isMobile) {
          const rect = imgRef.current.getBoundingClientRect();
          setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }
      };

      return (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative h-[55vh] md:h-[85vh] w-auto aspect-[4/5] mt-0 pointer-events-auto"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setCursor({ x: -1000, y: -1000 })}
          ref={imgRef}
          // Added fade effect on bottom for mobile
          style={{
            maskImage: isMobile 
              ? 'linear-gradient(to bottom, black 70%, transparent 100%)' 
              : 'linear-gradient(to bottom, black 85%, transparent 100%)',
            WebkitMaskImage: isMobile 
              ? 'linear-gradient(to bottom, black 70%, transparent 100%)' 
              : 'linear-gradient(to bottom, black 85%, transparent 100%)'
          }}
        >
          {/* Base Dark Image - Hidden on Mobile */}
          <img 
            src="/src/components/profile_web.png" 
            alt="Profile" 
            className={`w-full h-full object-contain filter grayscale brightness-[0.2] ${isMobile ? 'hidden' : 'block'}`}
          />
          
          {/* Color Reveal Image - Fully visible on Mobile */}
          <img 
            src="/src/components/profile_web.png" 
            alt="Profile Color" 
            className="absolute inset-0 w-full h-full object-contain"
            style={!isMobile ? {
              maskImage: `radial-gradient(circle 120px at ${cursor.x}px ${cursor.y}px, black, transparent)`,
              WebkitMaskImage: `radial-gradient(circle 120px at ${cursor.x}px ${cursor.y}px, black, transparent)`,
            } : {
              // No mask on mobile, fully visible
              opacity: 1
            }}
          />
        </motion.div>
      );
    };

    export default HeroSection;