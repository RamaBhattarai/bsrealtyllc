'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPhone, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa';

export default function TopBanner() {
  const [visible, setVisible] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if banner was previously closed
    const stored = localStorage.getItem('topBannerClosed');
    if (stored === 'true') {
      setVisible(false);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    // Set CSS variable for navbar positioning
    if (bannerRef.current) {
      const height = bannerRef.current.offsetHeight;
      document.documentElement.style.setProperty('--topbanner-height', `${height}px`);
    }
  }, [visible]);

  const handleClose = () => {
    setVisible(false);
    localStorage.setItem('topBannerClosed', 'true');
  };

  if (!isLoaded) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={bannerRef}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed top-0 left-0 right-0 w-full bg-gradient-to-r from-green-600 to-blue-600 shadow-lg relative overflow-hidden z-40"
        >
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-20 -translate-y-1/2 -translate-x-1/2"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-20 translate-y-1/2 translate-x-1/2"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 relative z-10">
            <div className="flex items-center justify-between flex-wrap gap-4">
              {/* Left Section: Contact Info */}
              <div className="flex items-center flex-wrap gap-6 md:gap-8">
                {/* Phone */}
                <motion.a
                  href="tel:+17062618948"
                  className="flex items-center gap-2 text-white hover:text-green-100 transition-colors duration-200 text-sm md:text-base font-medium group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPhone className="w-4 h-4 md:w-5 md:h-5 group-hover:animate-pulse" />
                  <span className="hidden sm:inline">+1 (706) 261-8948</span>
                  <span className="sm:hidden">Call Us</span>
                </motion.a>

                {/* Divider */}
                <div className="hidden md:block w-px h-6 bg-white/30"></div>

                {/* Location */}
                <motion.div
                  className="flex items-center gap-2 text-white text-sm md:text-base font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  <FaMapMarkerAlt className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <span>GA, USA</span>
                </motion.div>

                {/* Divider */}
                <div className="hidden md:block w-px h-6 bg-white/30"></div>

                {/* Email */}
                <motion.a
                  href="mailto:bsrealtyllc@gmail.com"
                  className="flex items-center gap-2 text-white hover:text-green-100 transition-colors duration-200 text-sm md:text-base font-medium group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaEnvelope className="w-4 h-4 md:w-5 md:h-5 group-hover:animate-pulse" />
                  <span className="hidden sm:inline">bsrealtyllc@gmail.com</span>
                  <span className="sm:hidden">Email</span>
                </motion.a>
              </div>

              {/* Right Section: Social Links and Close Button */}
              <div className="flex items-center gap-4 md:gap-6">
                {/* Social Links */}
                <div className="flex items-center gap-3 md:gap-4">
                  <motion.a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all duration-200 backdrop-blur-sm"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Facebook"
                  >
                    <FaFacebook className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </motion.a>

                  <motion.a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all duration-200 backdrop-blur-sm"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Instagram"
                  >
                    <FaInstagram className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </motion.a>

                  <motion.a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all duration-200 backdrop-blur-sm"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Twitter"
                  >
                    <FaTwitter className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </motion.a>
                </div>

                {/* Divider */}
                <div className="w-px h-6 bg-white/30"></div>

                {/* Close Button */}
                <motion.button
                  onClick={handleClose}
                  className="w-8 h-8 md:w-9 md:h-9 rounded-full hover:bg-white/20 flex items-center justify-center text-white transition-all duration-200 backdrop-blur-sm"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Close banner"
                  title="Close banner"
                >
                  <FaTimes className="w-4 h-4 md:w-5 md:h-5" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Shimmer animation effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
            animate={{
              x: ['100%', '-100%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear'
            }}
            style={{ pointerEvents: 'none' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
