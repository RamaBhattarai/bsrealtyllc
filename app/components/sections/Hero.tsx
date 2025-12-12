'use client'

import Image from "next/image";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";

const heroSlides = [
  {
    id: 1,
    location: "Augusta, Georgia",
    address: "33620 Columbine Dr.",
    status: "Sold",
    price: "$ 472,000",
    backgroundImage: "/realestate2.jpg"
  },
  {
    id: 2,
    location: "Snellville, Georgia",
    address: "1250 Preserve Park Dr",
    status: "For Sale",
    price: "$ 485,000",
    backgroundImage: "/realestate.jpg"
  },
  {
    id: 3,
    location: "Lawrenceville, Georgia",
    address: "1785 Riverside Pkwy",
    status: "Pending",
    price: "$ 395,000",
    backgroundImage: "/realestate.jpg"
  },
  {
    id: 4,
    location: "Grayson, Georgia",
    address: "2450 Rose Garden Way",
    status: "Sold",
    price: "$ 650,000",
    backgroundImage: "/realestate.jpg"
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
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900/20 via-blue-900/30 to-indigo-900/20 -mt-20 md:-mt-24">
      {/* Background Image with Infinite Loop */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={heroSlides[currentSlide].backgroundImage}
            alt="Hero Background"
            fill
            className="object-cover brightness-110 contrast-105 saturate-110"
            priority
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-slate-900/10 to-blue-900/20"></div>
        </motion.div>
      </AnimatePresence>

      {/* Slider Container with Infinite Loop */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="w-full"
            >
              {/* Glassmorphism Content */}
              <div className="backdrop-blur-md bg-white/15 border border-white/30 rounded-3xl p-8 md:p-12 shadow-2xl max-w-4xl mx-auto">
                <div className="text-center">
                  {/* Location */}
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl md:text-2xl font-light text-white/90 mb-4 tracking-wide"
                  >
                    {heroSlides[currentSlide].location}
                  </motion.h2>

                  {/* Address */}
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl md:text-4xl font-bold text-white mb-8 tracking-tight leading-tight"
                  >
                    {heroSlides[currentSlide].address}
                  </motion.h1>

                  {/* Status and Price */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8"
                  >
                    <span className={`inline-flex items-center px-8 py-4 rounded-full backdrop-blur-sm border text-xl font-semibold shadow-lg ${
                      heroSlides[currentSlide].status === 'Sold'
                        ? 'bg-green-500/30 border-green-400/40 text-green-100'
                        : heroSlides[currentSlide].status === 'Pending'
                        ? 'bg-yellow-500/30 border-yellow-400/40 text-yellow-100'
                        : 'bg-blue-500/30 border-blue-400/40 text-blue-100'
                    }`}>
                      {heroSlides[currentSlide].status}
                    </span>
                    <span className="text-4xl md:text-4xl font-bold text-white drop-shadow-lg">
                      {heroSlides[currentSlide].price}
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 shadow-lg hover:scale-110"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 shadow-lg hover:scale-110"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-4">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-white scale-125 shadow-lg'
                    : 'bg-white/50 hover:bg-white/75 hover:scale-110'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

    
    </section>
  );
}