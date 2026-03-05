import React, { useEffect, useRef, useState } from 'react';
import { sustainabilityData, images } from '../data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/Tabs';

const SustainabilitySection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
    <section
      ref={sectionRef}
      id="sustainability"
      className="relative py-24 px-6"
      style={{
        backgroundImage: `url(${images.solar})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#476A7C]/70 via-[#476A7C]/60 to-[#8BA8BC]/70" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Intro */}
        <p
          className={`text-xl lg:text-2xl font-light text-white text-center leading-relaxed mb-20 transform transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          {sustainabilityData.intro}
        </p>

        {/* Sustainability Sections */}
        <div className="space-y-20">
          {sustainabilityData.sections.map((section, index) => (
            <div
              key={section.id}
              className={`transform transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Section Number and Title */}
              <div className="flex items-start space-x-8 mb-8">
                <div className="text-6xl font-extralight text-white/30">
                  {section.number}
                </div>
                <div className="flex-1">
                  <h3
                    className="text-3xl lg:text-4xl font-light text-white mb-6 tracking-wider"
                    style={{ letterSpacing: '0.1em' }}
                  >
                    {section.title.split('').join(' ')}
                  </h3>
                  <p className="text-base lg:text-lg font-light text-white/90 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>

              {/* Tabs for ESG Section */}
              {section.tabs && (
                <Tabs defaultValue="Environmental" className="mt-8">
                  <TabsList className="bg-white/10 border border-white/20">
                    {section.tabs.map((tab) => (
                      <TabsTrigger
                        key={tab.label}
                        value={tab.label}
                        className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white"
                      >
                        {tab.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {section.tabs.map((tab) => (
                    <TabsContent
                      key={tab.label}
                      value={tab.label}
                      className="mt-6 p-6 bg-white/5 backdrop-blur-sm border border-white/20"
                    >
                      <p className="text-white/90 font-light leading-relaxed">
                        {tab.content}
                      </p>
                    </TabsContent>
                  ))}
                </Tabs>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SustainabilitySection;
