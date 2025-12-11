'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import BlurText from './../BlurText';
import { FaHome, FaMoneyBillWave, FaCalculator, FaTools, FaTruck, FaBriefcase, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';

const services = [
  {
    id: 1,
    title: "Real Estate Services",
    description: "We provide comprehensive real estate services for buying, selling and renting residential and commercial properties. Our expert team helps you find the perfect property.",
    icon: FaHome,
    color: "from-blue-500 to-blue-600",
    features: ["Property Search", "Market Analysis", "Negotiation Support"]
  },
  {
    id: 2,
    title: "Mortgage Solutions",
    description: "We offer tailored mortgage solutions to fit your financial needs. Whether you're a first-time homebuyer or refinancing, we provide access to varied loan products.",
    icon: FaMoneyBillWave,
    color: "from-green-500 to-green-600",
    features: ["Loan Options", "Fast Approval", "Expert Guidance"]
  },
  {
    id: 3,
    title: "Tax & Accounting",
    description: "Our comprehensive tax & accounting services are designed to help individuals and businesses stay financially organized and compliant.",
    icon: FaCalculator,
    color: "from-purple-500 to-purple-600",
    features: ["Tax Planning", "Bookkeeping", "Financial Reporting"]
  },
  {
    id: 4,
    title: "Home Improvement",
    description: "Our home improvement services cover everything from plumbing, electrical, and HVAC maintenance to renovations and repairs for your comfort.",
    icon: FaTools,
    color: "from-orange-500 to-orange-600",
    features: ["Maintenance", "Renovations", "Quality Work"]
  },
  {
    id: 5,
    title: "Utility Setup & Moving",
    description: "We help you set up essential utilities such as electricity, water, gas, and internet in your new property with relocation services.",
    icon: FaTruck,
    color: "from-teal-500 to-teal-600",
    features: ["Utilities Setup", "Relocation", "Hassle-Free Service"]
  },
  {
    id: 6,
    title: "Consulting Services",
    description: "We offer expert consulting services for real estate, mortgage, tax, accounting, and investments to help you make informed decisions.",
    icon: FaBriefcase,
    color: "from-indigo-500 to-indigo-600",
    features: ["Strategic Advice", "Market Insights", "Financial Planning"]
  }
];

const ServiceCard = ({ service, index }: { service: typeof services[0], index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = service.icon;

  const colorMap: { [key: string]: string } = {
    "from-blue-500 to-blue-600": "text-blue-600",
    "from-green-500 to-green-600": "text-green-600",
    "from-purple-500 to-purple-600": "text-purple-600",
    "from-orange-500 to-orange-600": "text-orange-600",
    "from-teal-500 to-teal-600": "text-teal-600",
    "from-indigo-500 to-indigo-600": "text-indigo-600",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      viewport={{ once: true }}
      className="group relative h-full"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative h-full">
        {/* Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${service.color} rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300 blur-xl`}></div>

        {/* Card */}
        <div className="relative bg-white border border-gray-200 rounded-2xl p-8 h-full shadow-md hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105 group-hover:-translate-y-1">
          {/* Top Section with Icon and Badge */}
          <div className="flex items-start justify-between mb-6">
            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
              <IconComponent className="w-8 h-8 text-white" />
            </div>
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
            >
              <FaArrowRight className={`w-5 h-5 ${colorMap[service.color]}`} />
            </motion.div>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors duration-300">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed mb-6 group-hover:text-gray-700 transition-colors duration-300 text-sm">
            {service.description}
          </p>

          {/* Features List */}
          <motion.ul
            className="space-y-2 mb-6"
            initial={{ opacity: 0 }}
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {service.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color}`}></div>
                {feature}
              </li>
            ))}
          </motion.ul>

          {/* Bottom Accent Line */}
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
    <section className="py-24 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
              What We Offer
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Our <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We provide comprehensive real estate solutions tailored to your needs, ensuring a seamless experience from start to finish with expert guidance at every step.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
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
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to get started?</h3>
              <p className="text-gray-600">Let our experts help you find the perfect solution.</p>
            </div>
            <Link href="/contact">
              <button className="whitespace-nowrap bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2">
                Contact Us Today
                <FaArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}