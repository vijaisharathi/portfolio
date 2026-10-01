import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiArrowUpRight, FiX } = FiIcons;

const ProjectDetailModal = ({ project, isOpen, onClose }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!mounted || !project) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[90000] flex items-center justify-center p-3 sm:p-5 md:p-8"
          data-lenis-prevent
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-0"
          />

          {/* Modal Container: Strictly constrained to screen height */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.08 }}
            className="relative w-full max-w-6xl max-h-[92vh] md:max-h-[90vh] bg-[#09090b] border border-white/10 rounded-2xl md:rounded-3xl shadow-2xl shadow-black/90 z-10 flex flex-col overflow-hidden"
          >
            {/* Header Bar: ALWAYS visible at top with close button */}
            <div className="flex-shrink-0 flex items-center justify-between px-6 py-3.5 md:px-8 md:py-4 bg-[#0d0e15] border-b border-white/10 z-20">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">
                  Project {project.number} / 04
                </span>
                <span className="text-gray-600">•</span>
                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider hidden sm:inline">
                  {project.category}
                </span>
                {project.isFlagship && (
                  <span className="px-2.5 py-0.5 text-[10px] uppercase font-mono tracking-widest rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 border border-purple-500/30">
                    Flagship
                  </span>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="group relative flex items-center justify-center w-9 h-9 rounded-full border border-white/20 bg-white/5 hover:bg-white text-white hover:text-black transition-all duration-300 pointer-events-auto"
              >
                <SafeIcon icon={FiX} className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
              </button>
            </div>

            {/* Scrollable Body: Fits inside modal, never overflows viewport */}
            <div className="overflow-y-auto flex-grow p-6 md:p-8 lg:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                
                {/* LEFT SIDE: Project Information */}
                <div className="lg:col-span-6 flex flex-col order-1">
                  
                  {/* Category */}
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-gray-400 mb-1">
                    {project.category}
                  </span>

                  {/* Project Title */}
                  <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight mb-3">
                    {project.title}
                  </h2>

                  {/* Short Overview Tagline */}
                  <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed mb-6">
                    {project.shortDescription}
                  </p>

                  {/* ABSTRACT SECTION */}
                  <div className="mb-6 p-5 md:p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                    <h3 className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-3 border-b border-white/10 pb-2 flex items-center justify-between">
                      <span>Abstract</span>
                      <span className="text-[10px] font-mono text-gray-500 lowercase">case study breakdown</span>
                    </h3>

                    <div className="space-y-3.5 text-xs md:text-sm text-gray-300 font-light leading-relaxed">
                      <div>
                        <span className="text-[11px] font-medium uppercase tracking-wider text-white block mb-0.5">
                          Overview & Purpose
                        </span>
                        <p className="text-gray-400">{project.abstract.overview}</p>
                      </div>

                      <div>
                        <span className="text-[11px] font-medium uppercase tracking-wider text-white block mb-0.5">
                          Problem Addressed
                        </span>
                        <p className="text-gray-400">{project.abstract.problem}</p>
                      </div>

                      <div>
                        <span className="text-[11px] font-medium uppercase tracking-wider text-white block mb-0.5">
                          Solution & Implementation
                        </span>
                        <p className="text-gray-400">{project.abstract.solution}</p>
                      </div>

                      <div>
                        <span className="text-[11px] font-medium uppercase tracking-wider text-white block mb-0.5">
                          Intended Audience
                        </span>
                        <p className="text-gray-400">{project.abstract.intendedFor}</p>
                      </div>
                    </div>
                  </div>

                  {/* QUERYHOLIC SPECIFIC SECTION */}
                  {project.flagshipFocusAreas && (
                    <div className="mb-6 p-5 md:p-6 rounded-2xl bg-gradient-to-br from-purple-950/20 to-blue-950/20 border border-purple-500/20">
                      <h3 className="text-xs uppercase tracking-widest text-purple-300 font-semibold mb-1.5">
                        Queryholic Focus Areas
                      </h3>
                      <p className="text-xs text-gray-400 mb-3 font-light">
                        Queryholic is a multidisciplinary technology company delivering end-to-end expertise across:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {project.flagshipFocusAreas.map((area, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-gray-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                            <span>{area}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* VÉRONA SPECIFIC E-COMMERCE PILLARS SECTION */}
                  {project.ecommercePillars && (
                    <div className="mb-6 p-5 md:p-6 rounded-2xl bg-gradient-to-br from-amber-950/15 via-zinc-900/40 to-stone-900/30 border border-amber-500/20">
                      <h3 className="text-xs uppercase tracking-widest text-amber-200/90 font-semibold mb-1.5 flex items-center justify-between">
                        <span>Commerce & Operations Architecture</span>
                        <span className="text-[10px] font-mono text-amber-400/60 lowercase">end-to-end scope</span>
                      </h3>
                      <p className="text-xs text-gray-400 mb-4 font-light">
                        Engineered as a real-world enterprise retail system with integrated customer, operations, and architectural layers:
                      </p>
                      <div className="space-y-3.5">
                        {project.ecommercePillars.map((pillar, pIdx) => (
                          <div key={pIdx} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                            <span className="text-[11px] font-medium uppercase tracking-wider text-amber-300/90 block mb-2">
                              {pillar.title}
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {pillar.items.map((item, iIdx) => (
                                <div key={iIdx} className="flex items-start gap-2 text-xs text-gray-300 font-light">
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400/70 mt-1 flex-shrink-0" />
                                  <span className="leading-snug">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Highlights */}
                  {project.highlights && (
                    <div className="mb-6">
                      <h3 className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-2.5 border-b border-white/10 pb-1.5">
                        Key Architectural Highlights
                      </h3>
                      <ul className="space-y-1.5 text-xs text-gray-300 font-light">
                        {project.highlights.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-gray-500 mt-0.5">•</span>
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* TECHNOLOGY STACK */}
                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-2.5 border-b border-white/10 pb-1.5">
                      Technology Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 text-xs font-mono text-gray-300 bg-white/[0.04] border border-white/10 rounded-lg"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* RIGHT SIDE: Large Website Preview & Action Button */}
                <div className="lg:col-span-6 flex flex-col order-2 sticky lg:top-4">
                  
                  {/* Browser Window Mockup */}
                  <div className="w-full rounded-2xl border border-white/10 bg-[#0d0e15] overflow-hidden shadow-2xl shadow-black/80 flex flex-col">
                    
                    {/* Window Header Bar */}
                    <div className="h-9 px-4 bg-[#12131d] border-b border-white/10 flex items-center justify-between">
                      {/* Traffic Lights */}
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                      </div>

                      {/* Mockup Address Bar */}
                      <div className="w-1/2 max-w-[220px] px-2.5 py-0.5 rounded-md bg-black/40 border border-white/5 text-[10px] text-gray-400 font-mono text-center truncate">
                        {project.liveUrl.replace('https://', '')}
                      </div>

                      <div className="w-6" />
                    </div>

                    {/* Image Preview Container */}
                    <div className="relative aspect-[16/10] max-h-[360px] bg-[#07080f] overflow-hidden group">
                      <img
                        src={project.preview}
                        alt={`${project.title} Website Preview`}
                        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                        onError={(e) => {
                          if (project.fallbackPreview && e.currentTarget.src !== project.fallbackPreview) {
                            e.currentTarget.src = project.fallbackPreview;
                          }
                        }}
                      />
                    </div>
                  </div>

                  {/* Open Project Button - Directly Below Preview */}
                  <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                    <div className="text-xs text-gray-400 font-light text-center sm:text-left">
                      <span>Ready to explore the live application?</span>
                      <span className="block text-[10px] text-gray-500 font-mono mt-0.5">
                        Opens in a new browser tab
                      </span>
                    </div>

                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-full border border-white/20 bg-white/5 hover:bg-white text-white hover:text-black transition-all duration-300 text-xs font-medium uppercase tracking-widest pointer-events-auto"
                    >
                      <span>Open Project</span>
                      <SafeIcon 
                        icon={FiArrowUpRight} 
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
                      />
                    </a>
                  </div>

                </div>

              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ProjectDetailModal;
