import React from 'react';
import { ChevronDown } from 'lucide-react';
import { heroData, images } from '../data/mockData';

const HeroSection = () => {
  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${images.hero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#8BA8BC]/40 via-[#476A7C]/30 to-[#476A7C]/50" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          <div className="flex flex-col items-center justify-center w-16 h-16">
            <div className="grid grid-cols-3 gap-1">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-white" />
              ))}
            </div>
          </div>
          <h1 className="text-5xl lg:text-7xl font-extralight tracking-[0.3em] text-white">
            {heroData.logo}
          </h1>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-3 text-white hover:opacity-70 transition-opacity cursor-pointer group"
      >
        <span className="text-xs tracking-widest font-light">
          {heroData.scrollText}
        </span>
        <ChevronDown
          size={24}
          className="animate-bounce group-hover:translate-y-1 transition-transform"
        />
      </button>
    </section>
  );
};

export default HeroSection;
