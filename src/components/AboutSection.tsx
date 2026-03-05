import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { aboutData, images } from '../data/mockData';
import { Button } from './ui/Button';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen flex items-center justify-center py-24 px-6 overflow-hidden"
      style={{
        backgroundImage: `url(${images.mountain1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#8BA8BC]/50 via-[#476A7C]/40 to-[#476A7C]/60" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Side Label */}
        <div className="flex items-start space-x-8 mb-12">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-px h-16 bg-white/50" />
            <span
              className={`text-xs tracking-widest text-white/80 font-light transform transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              {aboutData.label}
            </span>
          </div>

          <div className="flex-1 space-y-8">
            <h2
              className={`text-4xl lg:text-6xl font-extralight text-white leading-relaxed tracking-wide transform transition-all duration-700 delay-100 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ letterSpacing: '0.15em' }}
            >
              {aboutData.title.split(' ').map((word, idx) => (
                <span key={idx}>
                  {word.split('').join(' ')}
                  {idx < aboutData.title.split(' ').length - 1 && ' '}
                </span>
              ))}
            </h2>

            <p
              className={`text-lg lg:text-xl text-white/90 font-light leading-relaxed max-w-3xl transform transition-all duration-700 delay-200 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              {aboutData.description}
            </p>

            <Button
              className={`bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#476A7C] transition-all duration-300 px-8 py-6 text-sm tracking-widest transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              } delay-300`}
            >
              {aboutData.buttonText.toUpperCase()}
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
