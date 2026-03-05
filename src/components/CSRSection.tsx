import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { csrData, images } from '../data/mockData';
import { Button } from './ui/Button';

const CSRSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % csrData.pillars.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + csrData.pillars.length) % csrData.pillars.length
    );
  };

  return (
    <section
      ref={sectionRef}
      id="csr"
      className="relative py-24 px-6"
      style={{
        backgroundImage: `url(${images.windSunset})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#8BA8BC]/70 via-[#476A7C]/60 to-[#476A7C]/80" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex items-start space-x-8 mb-12">
          <div className="text-6xl font-extralight text-white/30">
            {csrData.number}
          </div>
          <div className="flex-1">
            <h3
              className={`text-3xl lg:text-4xl font-light text-white mb-6 tracking-wider transform transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ letterSpacing: '0.1em' }}
            >
              {csrData.title.split('').join(' ')}
            </h3>
            <p
              className={`text-lg font-light text-white/90 leading-relaxed transform transition-all duration-700 delay-100 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              {csrData.description}
            </p>
          </div>
        </div>

        {/* Carousel */}
        <div
          className={`relative bg-white/5 backdrop-blur-sm border border-white/20 p-8 lg:p-12 transform transition-all duration-700 delay-200 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          {/* Current Slide */}
          <div className="min-h-[300px]">
            <h4
              className="text-2xl lg:text-3xl font-light text-white mb-6 tracking-wider"
              style={{ letterSpacing: '0.1em' }}
            >
              {csrData.pillars[currentSlide].title.split('').join(' ')}
            </h4>
            <p className="text-base lg:text-lg font-light text-white/90 leading-relaxed mb-8">
              {csrData.pillars[currentSlide].description}
            </p>

            {/* Partner Badges */}
            <div className="flex flex-wrap gap-4">
              {csrData.pillars[currentSlide].partners.map((partner, index) => (
                <div
                  key={index}
                  className="px-6 py-3 bg-white/10 border border-white/30 text-white text-sm tracking-wide font-light"
                >
                  {partner}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8">
            <Button
              onClick={prevSlide}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#476A7C] transition-all duration-300 p-3"
            >
              <ChevronLeft size={24} />
            </Button>

            {/* Indicators */}
            <div className="flex space-x-2">
              {csrData.pillars.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-white scale-125'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={nextSlide}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#476A7C] transition-all duration-300 p-3"
            >
              <ChevronRight size={24} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CSRSection;
