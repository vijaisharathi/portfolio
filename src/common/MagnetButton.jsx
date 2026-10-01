import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const MagnetButton = ({ children, className = "", onClick }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Calculate center of the button
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Calculate distance from center
    const x = (clientX - centerX) * 0.3; // 0.3 is the magnetic pull strength
    const y = (clientY - centerY) * 0.3;
    
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.button
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.button>
  );
};

export default MagnetButton;