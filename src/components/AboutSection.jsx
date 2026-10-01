import React, { useEffect, useRef, useState } from 'react';
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';
    import FallingText from './FallingText';

    const AboutSection = () => {
      const sectionRef = useRef(null);
      const textRef = useRef(null);
      const quoteTopRef = useRef(null);
      const quoteBottomRef = useRef(null);
      const bgTextRef = useRef(null);

      // State for responsive font size
      const [fontSize, setFontSize] = useState('1.5rem');

      useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth < 768) {
            // Mobile view: Half of desktop size
            setFontSize('0.75rem');
          } else {
            // Desktop view: Decreased from previous 2rem
            setFontSize('1.5rem');
          }
        };

        // Initial check
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

      useEffect(() => {
        const ctx = gsap.context(() => {
          // Blur effect when scrolling out
          gsap.to(sectionRef.current, {
            filter: "blur(8px)",
            opacity: 0.6,
            scale: 0.98,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "center top",
              end: "bottom top",
              scrub: true
            }
          });

          // Animate the main text revealing line by line
          gsap.fromTo(
            textRef.current.children,
            { y: 50, opacity: 0, skewY: 7 },
            {
              y: 0,
              opacity: 1,
              skewY: 0,
              duration: 1.5,
              ease: "power4.out",
              stagger: 0.1,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 60%",
                end: "bottom 80%",
                toggleActions: "play none none reverse"
              }
            }
          );

          // Parallax for Background Text
          gsap.fromTo(
            bgTextRef.current,
            { x: -100 },
            {
              x: 100,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
              }
            }
          );

          // Parallax effect for quotes
          gsap.to(quoteTopRef.current, {
            y: -50,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1
            }
          });

          gsap.to(quoteBottomRef.current, {
            y: 50,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1
            }
          });
        }, sectionRef);

        return () => ctx.revert();
      }, []);

      const skillsText = "HTML CSS JavaScript TypeScript React.js Next.js SASS Tailwind_CSS Framer_Motion GSAP WebGL Three.js Figma Adobe_XD UI_Design UX_Research Branding SEO Content_Strategy Git REST_APIs Headless_CMS";

      return (
        <section 
          ref={sectionRef} 
          id="about" 
          className="relative h-screen w-full bg-[#050505] flex flex-col items-center justify-center overflow-hidden will-change-transform"
        >
          {/* Falling Text Background Layer */}
          <div className="absolute inset-0 z-0 opacity-60">
            <FallingText 
              text={skillsText}
              trigger="scroll"
              gravity={0.2}
              fontSize={fontSize} // Pass dynamic font size
              mouseConstraintStiffness={0.2}
            />
          </div>

          {/* Huge Background "ABOUT" Text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full select-none pointer-events-none z-0">
            <h1 
              ref={bgTextRef}
              className="text-[25vw] font-black text-[#1a1a1a] opacity-30 text-center leading-none tracking-tighter"
            >
              ABOUT
            </h1>
          </div>

          {/* Subtle Background Accent */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none z-0" />

          <div className="max-w-4xl w-full relative z-10 flex flex-col items-center px-6 pointer-events-none">
            {/* Main Quote Content */}
            <div className="text-center relative max-w-2xl mx-auto">
              {/* Opening Quote */}
              <span 
                ref={quoteTopRef}
                className="absolute -top-12 -left-4 md:-top-16 md:-left-12 text-6xl md:text-9xl font-serif text-white/20 select-none will-change-transform"
              >
                &ldquo;
              </span>
              
              {/* GSAP Target Container */}
              <div ref={textRef} className="overflow-hidden relative z-10">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-light italic text-gray-300 leading-relaxed tracking-wide font-['Manrope'] block">
                  I build beautiful and functional
                </h2>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-light italic text-gray-300 leading-relaxed tracking-wide font-['Manrope'] block">
                  web experiences where <span className="text-white font-normal not-italic border-b border-white/20 pb-0.5 inline-block">design</span> meets <span className="text-white font-normal not-italic border-b border-white/20 pb-0.5 inline-block">code</span>.
                </h2>
                
                <div className="h-6 block"></div>

                <span className="block mt-4 text-gray-400 font-light text-lg md:text-xl transform-gpu">
                  Passionate about clean aesthetics
                </span>
                <span className="block text-gray-400 font-light text-lg md:text-xl transform-gpu">
                  and intuitive user interfaces,
                </span>
                <span className="block text-gray-400 font-light text-lg md:text-xl transform-gpu">
                  I craft digital products that are
                </span>
                <span className="block text-gray-400 font-light text-lg md:text-xl transform-gpu">
                  not only visually appealing but also
                </span>
                <span className="block text-gray-400 font-light text-lg md:text-xl transform-gpu">
                  highly performant and user-friendly.
                </span>
              </div>

              {/* Closing Quote */}
              <span 
                ref={quoteBottomRef}
                className="absolute -bottom-12 -right-4 md:-bottom-16 md:-right-12 text-6xl md:text-9xl font-serif text-white/20 select-none will-change-transform"
              >
                &rdquo;
              </span>
            </div>
          </div>
        </section>
      );
    };

    export default AboutSection;