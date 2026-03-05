import React, { useEffect, useRef, useState } from 'react';
import { globalOffices } from '../data/mockData';

const GlobalOffices = () => {
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
      id="offices"
      className="relative py-24 px-6 bg-gradient-to-b from-[#8BA8BC] to-[#476A7C]"
    >
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <h2
          className={`text-2xl lg:text-4xl font-light text-white text-center leading-relaxed mb-16 transform transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          Established in the world's major trade hubs and financial markets with
          over 15 global offices, we connect and serve both emerging and mature
          markets worldwide.
        </h2>

        {/* Office Grid */}
        <div
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 transform transition-all duration-700 delay-200 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          {globalOffices.map((office, index) => (
            <div
              key={index}
              className="group relative p-6 bg-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/10 transition-all duration-300 cursor-pointer"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {/* Dot Indicator */}
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/50 group-hover:bg-white group-hover:scale-150 transition-all" />

              <div className="text-white font-light text-sm lg:text-base tracking-wide group-hover:tracking-wider transition-all">
                {office.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalOffices;
