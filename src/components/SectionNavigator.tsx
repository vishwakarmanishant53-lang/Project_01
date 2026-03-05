import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const SectionNavigator = () => {
  const [activeSection, setActiveSection] = useState(0);
  
  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'divisions', label: 'Divisions' },
    { id: 'offices', label: 'Offices' },
    { id: 'sustainability', label: 'Sustainability' },
    { id: 'csr', label: 'CSR' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      sections.forEach((section, index) => {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
      <div className="flex flex-col space-y-4">
        {sections.map((section, index) => (
          <motion.button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="group relative flex items-center"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                activeSection === index
                  ? 'bg-white border-white scale-125'
                  : 'bg-transparent border-white/50 hover:border-white'
              }`}
              animate={{
                scale: activeSection === index ? 1.3 : 1
              }}
            />
            <span className="absolute right-6 bg-white text-[#476A7C] px-3 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {section.label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default SectionNavigator;
