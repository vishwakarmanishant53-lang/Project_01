import React from 'react';
import { Link } from 'react-router-dom';
import { footerData } from '../data/mockData';

const Footer = () => {
  return (
    <footer className="bg-[#2C3E50] py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Footer Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-8">
          {footerData.links.map((link, index) => (
            <React.Fragment key={index}>
              <Link
                to={link.href}
                className="text-white/70 hover:text-white text-sm tracking-wide font-light transition-colors"
              >
                {link.label}
              </Link>
              {index < footerData.links.length - 1 && (
                <span className="text-white/30">|</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-white/50 text-xs tracking-wide font-light">
          © {new Date().getFullYear()} Montfort Group. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
