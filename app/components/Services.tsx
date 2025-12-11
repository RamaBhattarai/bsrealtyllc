'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import BlurText from './BlurText';
import { FaHome, FaMoneyBillWave, FaCalculator, FaTools, FaTruck, FaBriefcase } from 'react-icons/fa';
import Link from 'next/link';

const services = [
  {
    id: 1,
    title: "Real Estate Services",
    description: "We provide comprehensive real estate services for buying, selling and renting residential and commercial properties. Our expert team helps you find the perfect property and ensures a smooth transaction from start to finish.",
    icon: FaHome,
    color: "from-blue-500 to-blue-600"
  },
  {
    id: 2,
    title: "Mortgage Solutions",
    description: "We offer tailored mortgage solutions to fit your financial needs. Whether you're a first-time homebuyer or refinancing, we provide access to a variety of loan products and guide you through the loan approval process.",
    icon: FaMoneyBillWave,
    color: "from-green-500 to-green-600"
  },
  {
    id: 3,
    title: "Tax & Accounting",
    description: "Our comprehensive tax & accounting services are designed to help individuals and businesses stay financially organized, compliant, and positioned for growth. If you need assistance with tax planning, bookkeeping, payroll, or financial reporting, our expert team provides solutions to meet your unique needs.",
    icon: FaCalculator,
    color: "from-purple-500 to-purple-600"
  },
  {
    id: 4,
    title: "Home Improvement",
    description: "Our home improvement services cover everything from plumbing, electrical, and HVAC maintenance to renovations and repairs. We ensure your home is well-maintained and meets your comfort and safety standards.",
    icon: FaTools,
    color: "from-orange-500 to-orange-600"
  },
  {
    id: 5,
    title: "Utility Setup & Moving Assistance",
    description: "To make your move as seamless as possible, we help you set up essential utilities such as electricity, water, gas, and internet in your new property including relocation services, so you can settle in without any hassle.",
    icon: FaTruck,
    color: "from-teal-500 to-teal-600"
  },
  {
    id: 6,
    title: "Consulting Services",
    description: "We offer expert consulting services for real estate, mortgage, tax, accounting, investments, market trends, and financing options. Our team provides personalized advice to help you make informed decisions on strategic tax planning, financial advice, property and mortgage matters.",
    icon: FaBriefcase,
    color: "from-indigo-500 to-indigo-600"
  }
];

const ServiceCard = ({ service, index }: { service: typeof services[0], index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="group relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative h-full">
        {/* Card Background with Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${service.color} rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>

        {/* Glassmorphism Card */}
        <div className="relative backdrop-blur-sm bg-white/80 border border-white/20 rounded-2xl p-8 h-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
          {/* Icon */}
          <div className="text-3xl mb-6 transform group-hover:scale-110 transition-transform duration-300 text-blue-600 group-hover:text-blue-700">
            <IconComponent />
          </div>

          {/* Title */}
          <div className="mb-4">
            <BlurText
              text={service.title}
              delay={100}
              animateBy="words"
              direction="top"
              className="text-2xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300"
            />
          </div>

          {/* Description */}
          <div>
            <BlurText
              text={service.description}
              delay={50}
              animateBy="words"
              direction="top"
              className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300"
            />
          </div>

          {/* Hover Effect Line */}
          <motion.div
            className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${service.color} rounded-b-2xl`}
            initial={{ width: 0 }}
            animate={{ width: isHovered ? '100%' : 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default function Services() {
  const handleAnimationComplete = () => {
    console.log('Services title animation completed!');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <BlurText
              text="Our Services"
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 text-center justify-center"
            />
            <BlurText
              text="We provide comprehensive real estate solutions tailored to your needs, ensuring a seamless experience from start to finish."
              delay={50}
              animateBy="words"
              direction="top"
              className="text-xl text-gray-600 max-w-3xl mx-auto text-center justify-center leading-relaxed"
            />
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <span className="text-gray-600">Ready to get started?</span>
            <Link href="/contact">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                Contact Us Today
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}