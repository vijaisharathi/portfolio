import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { projects } from '../data/projects';
import ProjectDetailModal from './ProjectDetailModal';

const { FiArrowUpRight, FiEye } = FiIcons;

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef(null);
  const bgTextRef = useRef(null);

  const handleCardClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    // Refresh ScrollTrigger so all section offsets and Lenis sync up
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    const ctx = gsap.context(() => {
      // Parallax for Background Text
      if (bgTextRef.current) {
        gsap.fromTo(
          bgTextRef.current,
          { x: -80 },
          {
            x: 80,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1
            }
          }
        );
      }
    }, sectionRef);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative min-h-screen w-full bg-[#050505] py-24 px-6 md:px-12 overflow-hidden border-t border-white/5"
    >
      {/* Huge Background Text - Matches "ABOUT" & "FULL STACK" styling */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full select-none pointer-events-none z-0">
        <h1
          ref={bgTextRef}
          className="text-[20vw] font-black text-[#141414] opacity-40 text-center leading-none tracking-tighter"
        >
          PROJECTS
        </h1>
      </div>

      {/* Subtle Background Accent Glows */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-blue-900/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-purple-900/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-gray-500 font-mono block mb-2">
              Featured Work
            </span>
            <h2 className="text-4xl md:text-6xl font-light text-white tracking-tight">
              Projects
            </h2>
          </div>
          <p className="text-gray-400 text-sm md:text-base max-w-md font-light leading-relaxed">
            A showcase of production-ready systems, intelligent agent architectures, and interactive digital platforms. Click any project to inspect its case study.
          </p>
        </div>

        {/* Responsive Project Grid: 2 columns on Desktop/Tablet, 1 column on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project) => (
            <div
              key={project.slug}
              role="button"
              tabIndex={0}
              onClick={() => handleCardClick(project)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(project);
                }
              }}
              className="project-card-item group relative flex flex-col bg-[#0a0a0a] border border-white/10 hover:border-white/30 rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-500 cursor-pointer shadow-xl shadow-black/40 hover:shadow-2xl hover:shadow-black/80"
            >
              {/* DOMINANT VISUAL ELEMENT: Website Preview */}
              <div className="relative aspect-[16/10] w-full bg-[#08090f] overflow-hidden border-b border-white/10">
                
                {/* Subtle Window Bar at top of preview */}
                <div className="absolute top-0 left-0 right-0 z-20 h-8 px-4 bg-[#0d0e16]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between pointer-events-none">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-white/20" />
                    <span className="w-2 h-2 rounded-full bg-white/20" />
                    <span className="w-2 h-2 rounded-full bg-white/20" />
                  </div>
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                    {project.number} / 04
                  </span>
                  {project.isFlagship && (
                    <span className="px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      Flagship
                    </span>
                  )}
                </div>

                {/* Preview Image with Smooth Scale on Hover */}
                <img
                  src={project.preview}
                  alt={`${project.title} Preview`}
                  className="w-full h-full object-cover object-top pt-8 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  onError={(e) => {
                    if (project.fallbackPreview && e.currentTarget.src !== project.fallbackPreview) {
                      e.currentTarget.src = project.fallbackPreview;
                    }
                  }}
                />

                {/* Hover Overlay with Action Pill */}
                <div className="absolute inset-0 pt-8 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6 pointer-events-none">
                  <span className="text-xs font-mono uppercase tracking-widest text-white/90">
                    Click to View Details
                  </span>
                  <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <SafeIcon icon={FiArrowUpRight} className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Card Meta Content Area */}
              <div className="p-6 md:p-8 flex flex-col flex-grow justify-between">
                <div>
                  {/* Category */}
                  <span className="text-xs font-mono uppercase tracking-widest text-gray-500 block mb-1">
                    {project.category}
                  </span>

                  {/* Title & Interactive Cue */}
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <h3 className="text-2xl md:text-3xl font-medium text-white group-hover:text-gray-200 transition-colors tracking-tight">
                      {project.title}
                    </h3>
                    <div className="w-8 h-8 rounded-full border border-white/10 group-hover:border-white/30 group-hover:bg-white group-hover:text-black flex items-center justify-center text-gray-400 transition-all duration-300 flex-shrink-0">
                      <SafeIcon icon={FiArrowUpRight} className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  {/* Short Description */}
                  <p className="text-sm text-gray-400 font-light leading-relaxed mb-6 line-clamp-2">
                    {project.shortDescription}
                  </p>
                </div>

                {/* Small Technology Tags */}
                <div className="flex flex-wrap items-center gap-1.5 pt-4 border-t border-white/5">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-[11px] font-mono text-gray-400 bg-white/[0.03] border border-white/5 rounded-md group-hover:border-white/10 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Internal Interactive Project Detail View (Split Layout Modal) */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default ProjectsSection;
