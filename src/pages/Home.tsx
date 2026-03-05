import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import BusinessDivisions from '../components/BusinessDivisions';
import GlobalOffices from '../components/GlobalOffices';
import SustainabilitySection from '../components/SustainabilitySection';
import CSRSection from '../components/CSRSection';
import Footer from '../components/Footer';
import ScrollProgress from '../components/ScrollProgress';
import SectionNavigator from '../components/SectionNavigator';
import RevealOverlay from '../components/RevealOverlay';
import { AnimatePresence, motion } from 'motion/react';

const Home = () => {
  const [isRevealed, setIsRevealed] = useState(false);

  // Prevent scrolling until revealed
  useEffect(() => {
    if (!isRevealed) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isRevealed]);

  return (
    <div className="relative min-h-screen bg-[#f8f9fa]">
      <AnimatePresence>
        {!isRevealed && (
          <RevealOverlay onReveal={() => setIsRevealed(true)} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isRevealed ? 1 : 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className={!isRevealed ? 'pointer-events-none' : ''}
      >
        <ScrollProgress />
        <SectionNavigator />
        <Navigation />
        <HeroSection />
        <AboutSection />
        <BusinessDivisions />
        <GlobalOffices />
        <SustainabilitySection />
        <CSRSection />
        <Footer />
      </motion.div>
    </div>
  );
};

export default Home;
