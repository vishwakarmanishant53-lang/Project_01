import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { navigationLinks } from '../data/mockData';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="flex flex-col items-center justify-center w-10 h-10">
              <div className="grid grid-cols-3 gap-0.5">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full ${
                      isScrolled ? 'bg-[#476A7C]' : 'bg-white'
                    }`}
                  />
                ))}
              </div>
            </div>
            <span
              className={`text-xl font-light tracking-widest transition-colors ${
                isScrolled ? 'text-[#476A7C]' : 'text-white'
              }`}
            >
              MONTFORT
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className={`text-sm tracking-wider font-light hover:opacity-70 transition-opacity relative group ${
                  isScrolled ? 'text-[#476A7C]' : 'text-white'
                }`}
              >
                {link.label}
                {link.active && (
                  <div
                    className={`absolute -bottom-1 left-0 right-0 h-px ${
                      isScrolled ? 'bg-[#476A7C]' : 'bg-white'
                    }`}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link
              to="/news"
              className={`text-sm tracking-wider font-light hover:opacity-70 transition-opacity ${
                isScrolled ? 'text-[#476A7C]' : 'text-white'
              }`}
            >
              NEWS
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`flex items-center space-x-2 text-sm tracking-wider font-light hover:opacity-70 transition-opacity ${
                isScrolled ? 'text-[#476A7C]' : 'text-white'
              }`}
            >
              <span>MENU</span>
              <ChevronDown size={16} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2"
          >
            {isMobileMenuOpen ? (
              <X className={isScrolled ? 'text-[#476A7C]' : 'text-white'} />
            ) : (
              <Menu className={isScrolled ? 'text-[#476A7C]' : 'text-white'} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="px-6 py-4 space-y-4">
            {navigationLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className="block text-[#476A7C] text-sm tracking-wider font-light hover:opacity-70"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/news"
              className="block text-[#476A7C] text-sm tracking-wider font-light hover:opacity-70"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              NEWS
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
