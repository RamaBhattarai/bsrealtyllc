"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    id: 1,
    title: "Augusta, Georgia",
    location: "3620 Columbine Dr.",
    price: "$485,000",
    image: "/property1.jpg",
    status: "Sold",
  },
  {
    id: 2,
    title: "Luxury Townhouse",
    location: "Snellville, GA",
    price: "$395,000",
    image: "/property2.jpg",
    status: "For Sale",
  },
  {
    id: 3,
    title: "Contemporary Villa",
    location: "Lawrenceville, GA",
    price: "$650,000",
    image: "/property3.jpg",
    status: "Pending",
  },
  {
    id: 4,
    title: "Cozy Cottage",
    location: "Grayson, GA",
    price: "$325,000",
    image: "/property4.jpg",
    status: "For Sale",
  }
];

export default function PropertySlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [autoPlay]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setAutoPlay(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setAutoPlay(false);
  };

  const statusColors: { [key: string]: string } = {
    "Sold": "bg-red-500",
    "For Sale": "bg-green-600",
    "Pending": "bg-yellow-500",
  };

  return (
    <section className="py-20 bg-linear-to-b from-gray-50 via-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured <span className="bg-linear-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Properties</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover exceptional homes in the most desirable neighborhoods across Georgia
          </p>
        </motion.div>

        {/* Slider Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl shadow-2xl bg-white"
          onMouseEnter={() => setAutoPlay(false)}
          onMouseLeave={() => setAutoPlay(true)}
        >
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
            <AnimatePresence mode="wait">
              {slides.map((slide, index) => (
                index === currentSlide && (
                  <motion.div
                    key={slide.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    {/* Background Image or Placeholder */}
                    <div className="absolute inset-0 bg-linear-to-br from-blue-500 via-blue-600 to-blue-700 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-8xl mb-4 opacity-20">🏠</div>
                        <p className="text-white/30 text-lg">Property Image</p>
                      </div>
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent">
                      <div className="absolute top-6 right-6">
                        <span className={`${statusColors[slide.status]} text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg`}>
                          {slide.status}
                        </span>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                          className="max-w-2xl"
                        >
                          <h3 className="text-3xl md:text-5xl font-bold text-white mb-3">
                            {slide.title}
                          </h3>
                          <div className="flex items-center gap-2 mb-4">
                            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                            </svg>
                            <p className="text-xl text-gray-300">
                              {slide.location}
                            </p>
                          </div>

                          <div className="flex items-end gap-4">
                            <div>
                              <p className="text-gray-300 text-sm mb-1">Price</p>
                              <p className="text-4xl md:text-5xl font-bold text-white">
                                {slide.price}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 shadow-lg hover:scale-110 z-10"
            aria-label="Previous property"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 shadow-lg hover:scale-110 z-10"
            aria-label="Next property"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentSlide
                    ? 'bg-white w-8 h-3'
                    : 'bg-white/40 hover:bg-white/60 w-3 h-3'
                }`}
                whileHover={{ scale: 1.2 }}
                aria-label={`Go to property ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Slide Counter and CTA */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-12 gap-6">
          <div className="flex items-center gap-4">
            <p className="text-gray-600 font-medium">
              Property <span className="text-green-600 font-bold text-xl">{currentSlide + 1}</span> of <span className="font-bold text-lg">{slides.length}</span>
            </p>
          </div>
          <button className="bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-3 rounded-lg text-base font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
            View All Properties
          </button>
        </div>
      </div>
    </section>
  );
}

