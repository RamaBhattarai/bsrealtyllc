'use client';

import { useState, useEffect, useRef } from 'react';
import { FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaTwitter, FaHome, FaCalculator, FaBuilding, FaHeadset } from 'react-icons/fa';

export default function TopBanner() {
  const [visible, setVisible] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if banner was previously closed
    // const stored = localStorage.getItem('topBannerClosed');
    // if (stored === 'true') {
    //   setVisible(false);
    // }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    // Set CSS variable for navbar positioning
    if (bannerRef.current) {
      const height = bannerRef.current.offsetHeight;
      document.documentElement.style.setProperty('--topbanner-height', `${height}px`);
    }
  }, [visible]);

  if (!isLoaded) return null;

  return (
    <>
      {visible && (
        <div
          ref={bannerRef}
          className="fixed top-0 left-0 right-0 w-full bg-[#1B3C53] text-white py-2 px-4 z-[60] hidden md:block"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
            {/* Left Section: Contact Info */}
            <div className="flex items-center gap-6">
              <a
                href="tel:+17062618948"
                className="flex items-center gap-2 hover:text-green-400 transition-colors"
              >
                <FaPhone className="w-4 h-4" />
                <span>Call Us</span>
              </a>

              <a
                href="mailto:bsrealtyllc@gmail.com"
                className="flex items-center gap-2 hover:text-green-400 transition-colors"
              >
                <FaEnvelope className="w-4 h-4" />
                <span>Email Us</span>
              </a>
            </div>

            {/* Center Section: Marquee Text */}
            <div className="flex-1 mx-6 overflow-hidden">
              <div className="animate-marquee whitespace-nowrap text-white">
                <FaHome className="inline mr-2" /> Welcome to BS Realty LLC - Your Trusted Real Estate Partner | 
                <FaCalculator className="inline mx-2" /> Competitive Mortgage Rates | 
                <FaBuilding className="inline mx-2" /> Expert Property Management | 
                <FaHeadset className="inline mx-2" /> Call Now for Free Consultation 
              </div>
            </div>

            {/* Right Section: Social Media Icons */}
            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-6 h-6 flex items-center justify-center text-gray-300 hover:text-green-400 transition-colors duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <FaFacebook className="w-4 h-4" />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-6 h-6 flex items-center justify-center text-gray-300 hover:text-green-400 transition-colors duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <FaInstagram className="w-4 h-4" />
              </a>

              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noreferrer"
                className="w-6 h-6 flex items-center justify-center text-gray-300 hover:text-green-400 transition-colors duration-300 hover:scale-110"
                aria-label="Whatsapp"
              >
                <FaTwitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
