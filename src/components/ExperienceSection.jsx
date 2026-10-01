import React, { useState, useRef, useEffect } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';

    // Experience Data with HTML formatting for highlights
    const experienceData = [
      {
        id: 1,
        title: "Project Alpha",
        year: "2024",
        role: "Lead Developer",
        description: "Led the development of a dynamic web application builder, focusing on core features like <span class='text-white font-medium'>user authentication</span>, <span class='text-white font-medium'>real-time editing</span>, and <span class='text-white font-medium'>deployment pipelines</span>.",
        image: null
      },
      {
        id: 2,
        title: "Project Beta",
        year: "2023",
        role: "Frontend Developer",
        description: "Developed an automation platform using modern frontend technologies to <span class='text-white font-medium'>streamline business workflows</span> and improve <span class='text-white font-medium'>operational efficiency</span> and user experience.",
        image: null
      },
      {
        id: 4,
        title: "E-commerce Platform",
        year: "2022",
        role: "Full Stack Developer",
        description: "Built a scalable e-commerce site from scratch with a focus on <span class='text-white font-medium'>performance and SEO</span>, resulting in a <span class='text-white font-medium'>30% increase</span> in organic traffic.",
        image: null
      },
      {
        id: 5,
        title: "Customer Support Portal",
        year: "2021",
        role: "UI/UX Designer & Developer",
        description: "Engineered a customer support portal with a <span class='text-white font-medium'>ticketing system</span> and knowledge base to improve <span class='text-white font-medium'>user satisfaction</span> and reduce support calls.",
        image: null,
      },
      {
        id: 3,
        title: "Open Source Contribution",
        year: "2020-Present",
        role: "Contributor",
        description: "Actively contributed to several open-source libraries, focusing on <span class='text-white font-medium'>improving accessibility</span>, performance, and adding <span class='text-white font-medium'>new features</span> to benefit the developer community.",
        image: null
      },
      {
        id: 6,
        title: "API Integration",
        year: "2020",
        role: "Software Engineer",
        description: "Integrated various third-party APIs for <span class='text-white font-medium'>payment processing</span> (Stripe), <span class='text-white font-medium'>marketing automation</span> (HubSpot), and <span class='text-white font-medium'>CRM management</span> (Salesforce).",
        image: null
      }
    ];

    const ExperienceSection = () => {
      const [activeItem, setActiveItem] = useState(null);
      const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
      const sectionRef = useRef(null);

      const handleMouseMove = (e) => {
        setCursorPos({ x: e.clientX, y: e.clientY });
      };

      useEffect(() => {
        const ctx = gsap.context(() => {
          // Blur effect when scrolling out to Contact
          // Starts only when 50% of the section has scrolled past the top
          gsap.to(sectionRef.current, {
            filter: "blur(8px)",
            opacity: 0.6,
            scale: 0.98,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "center top", // Starts when center of section hits top of viewport (50% scrolled out)
              end: "bottom top", 
              scrub: true
            }
          });

          gsap.from(".experience-item", {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              end: "bottom 90%",
              toggleActions: "play none none reverse"
            }
          });
        }, sectionRef);

        return () => ctx.revert();
      }, []);

      return (
        <section 
          ref={sectionRef} 
          id="experience" 
          className="relative min-h-screen w-full bg-[#050505] py-20 px-6 md:px-12 overflow-hidden will-change-transform"
          onMouseMove={handleMouseMove}
        >
          <div className="max-w-7xl mx-auto relative z-10">
            {/* Main Title */}
            <h2 className="text-4xl md:text-6xl font-light text-white mb-12 tracking-tight">Experience</h2>
            
            {/* Company Header */}
            <div className="mb-8 pl-4 md:pl-12">
              <div className="flex flex-col md:flex-row md:items-baseline gap-4 mb-4">
                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-wide">Tech Solutions Inc.</h3>
                <span className="text-gray-500 text-sm uppercase tracking-widest font-medium">2020 - Present • Remote</span>
              </div>
              <div className="w-full h-[1px] bg-white/10"></div>
            </div>

            {/* Experience List */}
            <div className="flex flex-col pl-8 md:pl-20">
              {experienceData.map((item) => (
                <div 
                  key={item.id} 
                  className="experience-item group relative border-b border-white/5 py-6 transition-colors duration-300 hover:bg-white/[0.01] rounded-lg px-4"
                  onMouseEnter={() => item.image && setActiveItem(item)}
                  onMouseLeave={() => setActiveItem(null)}
                >
                  <div className="grid md:grid-cols-12 gap-4 md:gap-8 items-start">
                    {/* Title, Role & Year */}
                    <div className="md:col-span-4 flex flex-col">
                      <h3 className="text-lg font-medium text-white group-hover:text-gray-200 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 mt-1 text-xs uppercase tracking-wider font-semibold">
                        {item.role}
                      </p>
                      <span className="text-sm font-mono text-gray-500 mt-1">({item.year})</span>
                    </div>

                    {/* Description */}
                    <div className="md:col-span-8">
                      <p 
                        className="text-gray-400 leading-relaxed text-base font-light group-hover:text-gray-300 transition-colors duration-300"
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating Image Reveal */}
          <AnimatePresence>
            {activeItem && activeItem.image && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  x: cursorPos.x + 20, 
                  y: cursorPos.y - (activeItem.isPortrait ? 200 : 120) // Adjust Y offset for taller images
                }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
                className={`fixed top-0 left-0 rounded-lg overflow-hidden z-50 pointer-events-none shadow-2xl shadow-black/50 hidden md:block border border-white/10 bg-[#0a0a0a] ${
                  activeItem.isPortrait 
                    ? 'w-[240px] h-[380px]' // Portrait Dimensions
                    : 'w-[360px] h-[220px]' // Landscape Dimensions
                }`}
              >
                <img 
                  src={activeItem.image} 
                  alt="Project Preview" 
                  className="w-full h-full object-cover opacity-90" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      );
    };

    export default ExperienceSection;