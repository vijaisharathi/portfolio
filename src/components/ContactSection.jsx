import React, { useEffect, useRef, useState } from 'react';
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';
    import * as FiIcons from 'react-icons/fi';
    import { FaProductHunt } from 'react-icons/fa';
    import SafeIcon from '../common/SafeIcon';

    const { FiArrowUpRight, FiGithub, FiLinkedin, FiMail, FiMapPin, FiSend } = FiIcons;

    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    const ContactSection = () => {
      const sectionRef = useRef(null);
      const nameRef = useRef(null);
      const formRef = useRef(null);

      // Form State
      const [formState, setFormState] = useState({
        name: '',
        email: '',
        project: ''
      });

      const handleInputChange = (e) => {
        setFormState({
          ...formState,
          [e.target.name]: e.target.value
        });
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form Submitted:', formState);
      };

      // GSAP Animations
      useEffect(() => {
        const ctx = gsap.context(() => {
          // Animate the big name on scroll
          const letters = nameRef.current.querySelectorAll('.letter');
          gsap.fromTo(
            letters,
            { y: 100, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              stagger: 0.05,
              ease: "power4.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 60%",
                end: "bottom 90%",
                toggleActions: "play none none reverse"
              }
            }
          );

          // Animate content sections
          gsap.from(".anim-item", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            }
          });
        }, sectionRef);

        return () => ctx.revert();
      }, []);

      const socialLinks = [
        { name: 'LinkedIn', url: 'https://www.linkedin.com/vijaisharathi', icon: FiLinkedin },
        { name: 'GitHub', url: 'https://www.github.com/vijaisharathi', icon: FiGithub },
        // { name: 'Product Hunt', url: 'https://www.producthunt.com/', icon: FaProductHunt },
        { name: 'Resume', url: '#', icon: FiArrowUpRight },
      ];

      // Name Hover Animation
      const handleNameHover = (e) => {
        const target = e.currentTarget;
        const letters = target.querySelectorAll('.letter');
        
        gsap.to(letters, {
          y: (i) => (i % 2 === 0 ? -15 : 15),
          color: "#ffffff",
          textShadow: "0 0 20px rgba(255, 255, 255, 0.5)",
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.03
        });
      };

      const handleNameLeave = (e) => {
        const target = e.currentTarget;
        const letters = target.querySelectorAll('.letter');
        
        gsap.to(letters, {
          y: 0,
          color: "#ffffff",
          textShadow: "none",
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.03
        });
      };

      return (
        <section 
          ref={sectionRef} 
          id="contact" 
          className="relative min-h-screen w-full bg-gradient-to-b from-[#0a0a0a] to-[#020202] flex flex-col justify-between pt-24 px-6 md:px-12 overflow-hidden border-t border-white/5 pb-6"
        >
          <div className="w-full max-w-7xl mx-auto z-10 flex-grow">
            {/* Headline */}
            <div className="anim-item mb-16 md:mb-24">
              <h2 className="text-4xl md:text-6xl font-light text-white leading-tight">
                Have an idea? <br />
                <span className="text-gray-500">Let's build it together.</span>
              </h2>
            </div>

            <div className="flex flex-col md:flex-row gap-16 md:gap-24">
              {/* Left Column: Contact Form */}
              <div className="anim-item w-full md:w-3/5 order-2 md:order-1">
                <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-8">
                  <div className="group">
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-white transition-colors">What's your name?</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formState.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full bg-transparent border-b border-white/20 py-4 text-xl md:text-2xl text-white placeholder-gray-700 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-white transition-colors">What's your email?</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formState.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="w-full bg-transparent border-b border-white/20 py-4 text-xl md:text-2xl text-white placeholder-gray-700 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-white transition-colors">Tell me about your project</label>
                    <textarea 
                      name="project"
                      value={formState.project}
                      onChange={handleInputChange}
                      placeholder="Hello, I want to build..."
                      rows="1"
                      className="w-full bg-transparent border-b border-white/20 py-4 text-xl md:text-2xl text-white placeholder-gray-700 focus:outline-none focus:border-white transition-colors resize-none"
                      onInput={(e) => {
                        e.target.style.height = 'auto';
                        e.target.style.height = e.target.scrollHeight + 'px';
                      }}
                    />
                  </div>
                  <button type="submit" className="mt-8 self-start flex items-center gap-3 text-white text-lg font-medium group">
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                      <SafeIcon icon={FiSend} className="w-5 h-5 -ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                    <span className="uppercase tracking-widest text-sm text-gray-400 group-hover:text-white transition-colors">Send Message</span>
                  </button>
                </form>
              </div>

              {/* Right Column: Contact Details & Socials */}
              <div className="anim-item w-full md:w-2/5 flex flex-col gap-12 order-1 md:order-2">
                <div className="flex flex-col gap-8">
                  <h3 className="text-sm font-medium text-white uppercase tracking-widest border-b border-white/10 pb-4 mb-2">Contact Details</h3>
                  
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-gray-500 uppercase tracking-widest">Email</span>
                    <a href="mailto:vijaisharathi@gmail.com" className="text-lg md:text-xl text-gray-300 hover:text-white transition-colors font-light">
                      vijaisharathi@gmail.com
                    </a>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-gray-500 uppercase tracking-widest">Phone</span>
                    <p className="text-lg md:text-xl text-gray-300 font-light">+91 9597533152</p>
                  </div>

                  {/* <div className="flex flex-col gap-1">
                    <span className="text-xs text-gray-500 uppercase tracking-widest">Location</span>
                    <p className="text-lg md:text-xl text-gray-300 font-light">San Francisco, CA</p>
                  </div> */}
                </div>

                {/* Social Icons - Horizontal Row */}
                <div className="flex flex-col gap-4">
                  <span className="text-xs text-gray-500 uppercase tracking-widest">Socials</span>
                  <div className="flex items-center gap-4">
                    {socialLinks.map((link, idx) => (
                      <a 
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white transition-all duration-300 group"
                        title={link.name}
                      >
                        <SafeIcon icon={link.icon} className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Section - Full Width Breakout with Guitar String Effect */}
          <div className="w-screen relative left-1/2 -translate-x-1/2 mt-20 md:mt-32 pb-4">
            {/* Interactive Guitar String */}
            <InteractiveString />

            <div 
              ref={nameRef} 
              className="w-full overflow-hidden select-none cursor-default flex justify-center -mt-8 relative z-10 pointer-events-none"
              onMouseEnter={handleNameHover}
              onMouseLeave={handleNameLeave}
            >
              {/* Adjusted font size to safe limits to prevent cutoff */}
              <h1 className="text-[10vw] md:text-[11.5vw] font-black text-white text-center leading-[0.85] tracking-tighter uppercase flex justify-center items-center w-full whitespace-nowrap pointer-events-auto">
                {"Vijai Sharathi".split("").map((char, i) => (
                  <span 
                    key={i} 
                    className="letter inline-block transform-gpu will-change-transform px-[0.2vw] md:px-[0.4vw]"
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </h1>
            </div>
            
            <div className="w-full flex justify-center mt-6 md:mt-4">
              <span className="text-gray-600 font-mono text-xs md:text-sm tracking-[0.2em] uppercase">
                © 2025 Vijai Sharathi
              </span>
            </div>
          </div>
        </section>
      );
    };

    // Interactive String Component (Guitar Wire Effect)
    const InteractiveString = () => {
      const pathRef = useRef(null);
      const containerRef = useRef(null);

      useEffect(() => {
        // Set initial path
        const setPath = () => { 
          const width = window.innerWidth;
          if (pathRef.current) {
            pathRef.current.setAttribute("d", `M 0 50 Q ${width / 2} 50 ${width} 50`);
          }
        };
        
        setPath();
        window.addEventListener('resize', setPath);
        return () => window.removeEventListener('resize', setPath);
      }, []);

      const handleMouseMove = (e) => {
        if (!pathRef.current || !containerRef.current) return;
        
        const rect = containerRef.current.getBoundingClientRect();
        const y = e.clientY - rect.top;
        const width = window.innerWidth;
        
        // Animate path to follow mouse
        gsap.to(pathRef.current, {
          attr: { d: `M 0 50 Q ${e.clientX} ${y} ${width} 50` },
          duration: 0.1,
          ease: "power2.out"
        });
      };

      const handleMouseLeave = () => {
        if (!pathRef.current) return;
        const width = window.innerWidth;
        
        // Elastic bounce back
        gsap.to(pathRef.current, {
          attr: { d: `M 0 50 Q ${width / 2} 50 ${width} 50` },
          duration: 1.5,
          ease: "elastic.out(1, 0.2)"
        });
      };

      return (
        <div 
          ref={containerRef}
          className="w-full h-24 relative z-50 cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <svg className="w-full h-full absolute top-0 left-0 pointer-events-none overflow-visible">
            <path 
              ref={pathRef}
              d="" 
              stroke="rgba(255, 255, 255, 0.2)" 
              strokeWidth="1" 
              fill="transparent"
            />
          </svg>
        </div>
      );
    };

    export default ContactSection;