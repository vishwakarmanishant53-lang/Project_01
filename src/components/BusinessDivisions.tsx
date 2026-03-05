import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { businessDivisions, images } from '../data/mockData';
import { Button } from './ui/Button';

const BusinessDivisions = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const backgrounds = [images.mountain2, images.maritime, images.vessel, images.wind];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
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

  return (
    <section ref={sectionRef} id="divisions" className="relative py-24 px-6">
      {/* Background Image with Transition */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          backgroundImage: `url(${backgrounds[activeIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#476A7C]/60 via-[#476A7C]/50 to-[#8BA8BC]/60" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex items-start space-x-8 mb-16">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-px h-16 bg-white/50" />
            <span className="text-xs tracking-widest text-white/80 font-light">
              WHAT WE DO
            </span>
          </div>

          <h2
            className={`flex-1 text-3xl lg:text-5xl font-extralight text-white leading-relaxed tracking-wide transform transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ letterSpacing: '0.15em' }}
          >
            {'We provide energy solutions with integrity and efficiency through our different business divisions.'
              .split(' ')
              .map((word, idx) => (
                <span key={idx}>
                  {word.split('').join(' ')}
                  {idx < 13 && ' '}
                </span>
              ))}
          </h2>
        </div>

        {/* Business Division Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {businessDivisions.map((division, index) => (
            <div
              key={division.id}
              onMouseEnter={() => setActiveIndex(index)}
              className={`group relative bg-white/5 backdrop-blur-sm border border-white/20 p-8 lg:p-12 hover:bg-white/10 transition-all duration-500 cursor-pointer transform ${
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-12 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Number */}
              <div className="absolute top-6 left-6 text-6xl font-extralight text-white/20 group-hover:text-white/40 transition-colors">
                {division.id}
              </div>

              {/* Icon */}
              <div className="mb-6 mt-8">
                <div className="w-16 h-16 flex items-center justify-center border-2 border-white/40 group-hover:border-white transition-colors">
                  <span className="text-3xl text-white">{division.icon}</span>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl lg:text-3xl font-light text-white mb-4 tracking-wide">
                {division.title}
              </h3>
              <p
                className="text-base lg:text-lg font-extralight text-white/90 mb-6 tracking-wider"
                style={{ letterSpacing: '0.1em' }}
              >
                {division.subtitle.split('').join(' ')}
              </p>

              <Button
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#476A7C] transition-all duration-300 px-6 py-5 text-xs tracking-widest group-hover:translate-x-2"
              >
                {division.title.toUpperCase()}
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessDivisions;
