'use client'

import Image from "next/image";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import TextType from '../TextType';

const heroSlides = [
  {
    id: 1,
    location: "Augusta, Georgia",
    address: "33620 Columbine Dr.",
    status: "Sold",
    price: "$ 472,000",
    backgroundImage: "/images/hero/hero1.png"
  },
  {
    id: 2,
    location: "Snellville, Georgia",
    address: "1250 Preserve Park Dr",
    status: "For Sale",
    price: "$ 485,000",
    backgroundImage: "/images/hero/hero2.png"
  },
  {
    id: 3,
    location: "Lawrenceville, Georgia",
    address: "1785 Riverside Pkwy",
    status: "Pending",
    price: "$ 395,000",
    backgroundImage: "/images/hero/hero3.png"
  },
  {
    id: 4,
    location: "Grayson, Georgia",
    address: "2450 Rose Garden Way",
    status: "Sold",
    price: "$ 650,000",
    backgroundImage: "/images/hero/hero2.png"
  }
];export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000); // Auto-slide every 6 seconds

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image with Infinite Loop */}
      <AnimatePresence mode="sync">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={heroSlides[currentSlide].backgroundImage}
            alt="Hero Background"
            fill
            className="object-cover object-center"
            priority
            quality={90}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/25"></div>
        </motion.div>
      </AnimatePresence>

      {/* Hero Content - Centered and Fixed */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 py-20 md:py-20">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center mb-6"
        >
          <TextType
            text="A to Z Solution in Your Real Estate Journey"
            typingSpeed={100}
            pauseDuration={3000}
            showCursor={true}
            cursorCharacter="|"
            cursorClassName="animate-pulse"
            className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-4xl mx-auto inline-block"
            style={{
              color: '#F4F4F4',
              textShadow: '0 2px 4px rgba(0,0,0,0.9), 0 4px 8px rgba(0,0,0,0.7), 0 8px 16px rgba(0,0,0,0.5), 0 0 20px rgba(19,171,196,0.5)',
              WebkitTextStroke: '1px rgba(19,171,196,0.3)',
              filter: 'brightness(1.2) contrast(1.1)'
            }}
            startOnVisible={true}
            loop={true}
          />
        </motion.div>

        {/* Property Search */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="w-full max-w-sm md:max-w-md lg:max-w-lg"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search properties..."
              className="w-full px-6 py-4 text-base md:text-lg bg-white/95 backdrop-blur-md border-0 rounded-full shadow-2xl focus:outline-none focus:ring-4 focus:ring-green-400/50 focus:bg-white transition-all duration-300 placeholder-gray-500"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center text-white transition-colors duration-300 shadow-lg"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-14 md:h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 shadow-lg hover:scale-110"
      >
        <svg className="w-5 h-5 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-14 md:h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 shadow-lg hover:scale-110"
      >
        <svg className="w-5 h-5 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-2 md:space-x-4">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white scale-125 shadow-lg'
                : 'bg-white/50 hover:bg-white/75 hover:scale-110'
            }`}
          />
        ))}
      </div>

    
    </section>
  );
}