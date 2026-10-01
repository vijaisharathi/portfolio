import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const greetings = [
  { text: "hello", font: "font-mea" }, // English
  { text: "नमस्ते", font: "font-hindi-display" }, // Hindi
  { text: "নমস্কার", font: "font-['Noto_Serif_Bengali']" }, // Bengali
  { text: "bonjour", font: "font-mea" }, // French
  { text: "holla", font: "font-mea" }, // Spanish
];

const LandingScreen = ({ onComplete }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Faster text cycling for a snappier feel
    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev < greetings.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(onComplete, 400); // Quick exit after last greeting
          return prev;
        }
      });
    }, 500); // 500ms per greeting (faster)

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center cursor-default"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }} // Faster exit dissolve
    >
      <div className="relative w-full text-center flex justify-center items-center h-full">
        <AnimatePresence mode="wait">
          <motion.h1
            key={index}
            initial={{ opacity: 0, filter: 'blur(10px)', scale: 0.9 }}
            animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.1 }}
            transition={{ duration: 0.2, ease: "easeOut" }} // Fast dissolve animation
            className={`text-white leading-none ${greetings[index].font}`}
            style={{
              fontSize: 'clamp(60px, 12vw, 150px)', 
              fontWeight: '400',
              color: '#ffffff'
            }}
          >
            {greetings[index].text}
          </motion.h1>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default LandingScreen;