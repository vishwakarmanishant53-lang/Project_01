import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { images } from '../data/mockData';

interface RevealOverlayProps {
  onReveal: () => void;
}

const RevealOverlay: React.FC<RevealOverlayProps> = ({ onReveal }) => {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(onReveal, 1000);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.05,
        transition: { duration: 1.2, ease: [0.4, 0, 0.2, 1] }
      }}
      className="fixed inset-0 z-[200] bg-[#f8f9fa] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Light Overlay */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ 
          scale: isHovered ? 1.15 : 1.1,
          opacity: 0.15 
        }}
        transition={{ duration: 2, ease: "easeOut" }}
        style={{
          backgroundImage: `url(${images.mountain1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'grayscale(100%) brightness(1.2)'
        }}
      />
      
      {/* Soft Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-white/80 via-white/40 to-white/80" />

      <motion.div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative z-20 cursor-pointer group"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo Grid & Name */}
        <div className="flex items-center justify-center space-x-8">
          <div className="flex flex-col items-center justify-center w-14 h-14">
            <div className="grid grid-cols-3 gap-1.5">
              {[...Array(9)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-[#476A7C]"
                  animate={{
                    scale: isHovered ? [1, 1.4, 1] : 1,
                    opacity: isHovered ? [1, 0.4, 1] : 1,
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: isHovered ? Infinity : 0,
                    ease: "easeInOut",
                    delay: i * 0.08
                  }}
                />
              ))}
            </div>
          </div>
          
          <motion.h1 
            className="text-5xl lg:text-7xl font-extralight tracking-[0.5em] text-[#476A7C]"
            animate={{
              letterSpacing: isHovered ? "0.7em" : "0.5em",
              opacity: isHovered ? 0.6 : 1,
              x: isHovered ? 10 : 0
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            MONTFORT
          </motion.h1>
        </div>

        {/* Subtle decorative line */}
        <motion.div 
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 h-px bg-[#476A7C]/20"
          initial={{ width: 0 }}
          animate={{ width: isHovered ? "120%" : "40%" }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Interactive Radial Glow */}
      <motion.div 
        className="absolute inset-0 z-15 pointer-events-none"
        animate={{
          background: isHovered 
            ? "radial-gradient(circle at center, rgba(71, 106, 124, 0.08) 0%, transparent 60%)"
            : "radial-gradient(circle at center, rgba(71, 106, 124, 0) 0%, transparent 60%)"
        }}
        transition={{ duration: 1 }}
      />
    </motion.div>
  );
};

export default RevealOverlay;
