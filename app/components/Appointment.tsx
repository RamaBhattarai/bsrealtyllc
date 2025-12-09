"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaCalendarAlt, FaClock, FaUser, FaEnvelope, FaPhone, FaList, FaComments, FaPaperPlane } from 'react-icons/fa';

export default function Appointment() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    category: '',
    preference: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Appointment data:', formData);
    // Handle form submission here
    alert('Appointment scheduled successfully!');
  };

  const categories = [
    'Real Estate Consultation',
    'Mortgage Services',
    'Home Improvement',
    'Tax and Accounting',
    'Other'
  ];

  const preferences = [
    'In-Person Meeting',
    'Virtual',
    'Hybrid',
  ];

  return (
    <div className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Make an <span className="text-blue-600">Appointment</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Schedule a consultation with our expert team. We're here to help you achieve your real estate and financial goals.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-10"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <label className="flex items-center text-gray-700 font-semibold text-sm">
                  <FaUser className="mr-2 text-blue-600" />
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-none text-sm"
                  placeholder="Enter your full name"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <label className="flex items-center text-gray-700 font-semibold text-sm">
                  <FaEnvelope className="mr-2 text-blue-600" />
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-none text-sm"
                  placeholder="your@email.com"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <label className="flex items-center text-gray-700 font-semibold text-sm">
                  <FaPhone className="mr-2 text-blue-600" />
                  Your Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-none text-sm"
                  placeholder="(555) 123-4567"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <label className="flex items-center text-gray-700 font-semibold text-sm">
                  <FaList className="mr-2 text-blue-600" />
                  Select Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-none bg-white text-sm"
                >
                  <option value="">Choose a service...</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
              </motion.div>
            </div>

            {/* Date and Time */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="space-y-2">
                <label className="flex items-center text-gray-700 font-semibold text-sm">
                  <FaCalendarAlt className="mr-2 text-blue-600" />
                  Preferred Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-none text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-gray-700 font-semibold text-sm">
                  <FaClock className="mr-2 text-blue-600" />
                  Preferred Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-none text-sm"
                />
              </div>
            </motion.div>

            {/* Appointment Preference */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="space-y-2"
            >
              <label className="flex items-center text-gray-700 font-semibold text-sm">
                <FaComments className="mr-2 text-blue-600" />
                Appointment Preference
              </label>
              <select
                name="preference"
                value={formData.preference}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-none bg-white text-sm"
              >
                <option value="">Select your preferred meeting type...</option>
                {preferences.map((preference, index) => (
                  <option key={index} value={preference}>{preference}</option>
                ))}
              </select>
            </motion.div>

            {/* Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              viewport={{ once: true }}
              className="space-y-2"
            >
              <label className="flex items-center text-gray-700 font-semibold text-sm">
                <FaComments className="mr-2 text-blue-600" />
                Message (Optional)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-none resize-none text-sm"
                placeholder="Tell us more about your needs or any specific questions you have..."
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              viewport={{ once: true }}
              className="text-center pt-4"
            >
              <motion.button
                type="submit"
                className="bg-blue-600 text-white px-10 py-3 rounded-full font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPaperPlane className="mr-2" />
                Schedule Appointment
              </motion.button>
            </motion.div>
          </form>
          </motion.div>

          {/* Right Side - Animated Person */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative flex items-center justify-center"
          >
            {/* Animated Person Illustration */}
            <div className="relative w-full max-w-md">
              {/* Background Circle */}
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full opacity-20"
              />

              {/* Person SVG Illustration */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative z-10"
              >
                <svg
                  viewBox="0 0 400 500"
                  className="w-full h-auto"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Background glow */}
                  <defs>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Body */}
                  <motion.circle
                    cx="200"
                    cy="350"
                    r="80"
                    fill="#3B82F6"
                    animate={{
                      scale: [1, 1.02, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />

                  {/* Head */}
                  <motion.circle
                    cx="200"
                    cy="200"
                    r="60"
                    fill="#FBBF24"
                    animate={{
                      scale: [1, 1.03, 1],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                  />

                  {/* Eyes */}
                  <circle cx="185" cy="185" r="8" fill="#1F2937" />
                  <circle cx="215" cy="185" r="8" fill="#1F2937" />

                  {/* Smile */}
                  <motion.path
                    d="M 180 210 Q 200 230 220 210"
                    stroke="#1F2937"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    animate={{
                      d: ["M 180 210 Q 200 230 220 210", "M 180 215 Q 200 225 220 215", "M 180 210 Q 200 230 220 210"]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />

                  {/* Arms */}
                  <motion.line
                    x1="140"
                    y1="320"
                    x2="120"
                    y2="280"
                    stroke="#3B82F6"
                    strokeWidth="20"
                    strokeLinecap="round"
                    animate={{
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                    style={{ transformOrigin: '140px 320px' }}
                  />

                  <motion.line
                    x1="260"
                    y1="320"
                    x2="280"
                    y2="280"
                    stroke="#3B82F6"
                    strokeWidth="20"
                    strokeLinecap="round"
                    animate={{
                      rotate: [0, -5, 5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.5
                    }}
                    style={{ transformOrigin: '260px 320px' }}
                  />

                  {/* Floating elements */}
                  <motion.circle
                    cx="120"
                    cy="150"
                    r="8"
                    fill="#10B981"
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0
                    }}
                  />

                  <motion.circle
                    cx="280"
                    cy="120"
                    r="6"
                    fill="#F59E0B"
                    animate={{
                      y: [0, -15, 0],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  />

                  <motion.circle
                    cx="100"
                    cy="200"
                    r="5"
                    fill="#EF4444"
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 2
                    }}
                  />
                </svg>
              </motion.div>

              {/* Speech bubble */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                className="absolute top-16 right-4 bg-white rounded-2xl shadow-lg p-4 max-w-xs"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                  className="text-center"
                >
                  <p className="text-gray-800 font-semibold text-sm mb-1">Let's Schedule!</p>
                  <p className="text-gray-600 text-xs">I'm here to help you</p>
                </motion.div>

                {/* Speech bubble tail */}
                <div className="absolute bottom-[-8px] right-8 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-white"></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      
      </div>
    </div>
  );
}