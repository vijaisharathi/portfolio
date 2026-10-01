import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
// Header is removed from here as it's now inside HeroSection
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import ExperienceSection from './components/ExperienceSection';
import ContactSection from './components/ContactSection';
import LandingScreen from './components/LandingScreen';
import CustomCursor from './components/CustomCursor';
import SmoothScroll from './components/SmoothScroll';
import './App.css';

function App() {
  const [showLanding, setShowLanding] = useState(true);

  return (
    <div className="app-container relative">
      <CustomCursor />
      
      {/* Landing Screen - Fades out to reveal content */}
      <AnimatePresence>
        {showLanding && (
          <LandingScreen onComplete={() => setShowLanding(false)} />
        )}
      </AnimatePresence>

      {/* Main Content with Smooth Scroll */}
      {!showLanding && (
        <SmoothScroll>
          {/* Header is now part of HeroSection */}
          <main>
            <HeroSection />
            <AboutSection />
            <ProjectsSection />
            {/* <ExperienceSection /> */}
            <ContactSection />
          </main>
        </SmoothScroll>
      )}
    </div>
  );
}

export default App;