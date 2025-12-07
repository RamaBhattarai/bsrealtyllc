"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

const slides = [
  {
    id: 1,
    title: "Augusta, Georgia",
    location: "3620 Columbine Dr.",
    price: "$485,000",
    image: "/property1.jpg", // Add these images to public folder
    
  },
  {
    id: 2,
    title: "Luxury Townhouse",
    location: "Snellville, GA",
    price: "$395,000",
    image: "/property2.jpg",
    
  },
  {
    id: 3,
    title: "Contemporary Villa",
    location: "Lawrenceville, GA",
    price: "$650,000",
    image: "/property3.jpg",
    
  },
  {
    id: 4,
    title: "Cozy Cottage",
    location: "Grayson, GA",
    price: "$325,000",
    image: "/property4.jpg",
    
  }
];

export default function PropertySlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Auto-slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Properties
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover exceptional homes in the most desirable neighborhoods
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-white">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide) => (
              <div key={slide.id} className="w-full flex-shrink-0 relative">
                <div className="relative h-[600px] md:h-[500px]">
                  {/* Background Image Placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-6xl mb-4">🏠</div>
                      <p className="text-xl">Property Image</p>
                    </div>
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                      <div className="max-w-md">
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                          {slide.title}
                        </h3>
                        <p className="text-xl text-gray-200 mb-4">
                          {slide.location}
                        </p>
                        
                        <div className="text-4xl font-bold text-white">
                          {slide.price}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 shadow-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 shadow-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-white scale-125'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
            View All Properties
          </button>
        </div>
      </div>
    </section>
  );
}