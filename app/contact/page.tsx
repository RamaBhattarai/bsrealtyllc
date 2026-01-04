'use client'

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaPaperPlane } from 'react-icons/fa';
import { useEffect } from 'react';
import { useSubmitContact } from '../../hooks/useContact';
import type { ContactFormData } from '../../lib/api/contact.api';

declare global {
  interface Window {
    grecaptcha: any;
    onRecaptchaSuccess: (token: string) => void;
    onRecaptchaExpired: () => void;
    onRecaptchaError: () => void;
  }
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    recaptcha: ''
  });

  const [recaptchaToken, setRecaptchaToken] = useState('');

  // React Query mutation hook from hooks folder for contact submission
  const submitContactMutation = useSubmitContact();

  // Define reCAPTCHA callback functions
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.onRecaptchaSuccess = (token: string) => {
        setRecaptchaToken(token);
        setErrors(prev => ({ ...prev, recaptcha: '' }));
      };

      window.onRecaptchaExpired = () => {
        setRecaptchaToken('');
        setErrors(prev => ({ ...prev, recaptcha: 'reCAPTCHA expired. Please try again.' }));
      };

      window.onRecaptchaError = () => {
        setErrors(prev => ({ ...prev, recaptcha: 'reCAPTCHA failed to load. Please refresh the page.' }));
      };
    }
  }, []);

  useEffect(() => {
    // Load reCAPTCHA script
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js`; // Load reCAPTCHA script
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      // Clean up script on unmount
      const existingScript = document.querySelector('script[src*="recaptcha"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      recaptcha: ''
    };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 5) {
      newErrors.message = 'Message must be at least 5 characters long';
    }

    // reCAPTCHA validation
    if (!recaptchaToken) {
      newErrors.recaptcha = 'Please complete the reCAPTCHA';
    }

    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Prepare data for backend API coming from contact.api.ts
    const submitData: ContactFormData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
      recaptchaToken: recaptchaToken
    };

    // Submit using React Query mutation
    submitContactMutation.mutate(submitData, {
      onSuccess: () => {
        // Reset form on success
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        setRecaptchaToken('');
        
        // Reset reCAPTCHA
        if (window.grecaptcha) {
          window.grecaptcha.reset();
        }
      }
    });
  };

  return (
    <div className="py-20 bg-linear-to-br from-blue-50 via-white to-indigo-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Contact <span className="text-green-600">Us</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with our nationwide team. We're here to help you with all your real estate needs across the country.
          </p>
        </motion.div>



        {/* Contact Section with Animated Character */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
          {/* Animated Character */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center text-center lg:text-left lg:col-span-1"
          >
            {/* Character Illustration */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative mb-6"
            >
              {/* Speech Bubble */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl px-4 py-2 shadow-lg border-2 border-green-200"
              >
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                <p className="text-green-600 font-bold text-sm whitespace-nowrap">Contact Us!</p>
              </motion.div>

              {/* Character SVG - Boy with Hat */}
              <svg
                width="220"
                height="280"
                viewBox="0 0 220 280"
                className="drop-shadow-xl"
              >
                {/* Shadow */}
                <ellipse cx="110" cy="270" rx="45" ry="10" fill="rgba(0,0,0,0.15)" />

                {/* Hat */}
                <ellipse cx="110" cy="55" rx="45" ry="15" fill="#1F2937" />
                <rect x="65" y="40" width="90" height="25" rx="45" fill="#1F2937" />

                {/* Head */}
                <circle cx="110" cy="90" r="40" fill="#FBBF24" />

                {/* Face */}
                <circle cx="100" cy="82" r="3" fill="#374151" /> {/* Left eye */}
                <circle cx="120" cy="82" r="3" fill="#374151" /> {/* Right eye */}
                <path d="M105 95 Q110 100 115 95" stroke="#374151" strokeWidth="2" fill="none" /> {/* Smile */}

                {/* Hair */}
                <path d="M70 70 Q75 60 85 65 Q95 55 105 60 Q115 55 125 60 Q135 65 145 70" fill="#1F2937" />

                {/* Body - Shirt */}
                <rect x="80" y="130" width="60" height="90" rx="30" fill="#3B82F6" />

                {/* Shirt Collar */}
                <path d="M95 130 Q110 140 125 130" fill="#1F2937" />

                {/* Arms */}
                <rect x="45" y="145" width="30" height="12" rx="6" fill="#FBBF24" /> {/* Left arm */}
                <rect x="145" y="145" width="30" height="12" rx="6" fill="#FBBF24" /> {/* Right arm */}

                {/* Pointing Hand */}
                <motion.g
                  animate={{
                    rotate: [0, 8, 0, -8, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{ transformOrigin: '165px 150px' }}
                >
                  <rect x="145" y="145" width="25" height="10" rx="5" fill="#FBBF24" />
                  <rect x="165" y="140" width="10" height="20" rx="5" fill="#FBBF24" />
                  <circle cx="170" cy="162" r="4" fill="#FBBF24" />
                </motion.g>

                {/* Pants */}
                <rect x="95" y="220" width="15" height="50" rx="7" fill="#1F2937" /> {/* Left leg */}
                <rect x="110" y="220" width="15" height="50" rx="7" fill="#1F2937" /> {/* Right leg */}

                {/* Shoes */}
                <ellipse cx="102" cy="275" rx="10" ry="5" fill="#374151" />
                <ellipse cx="117" cy="275" rx="10" ry="5" fill="#374151" />

                {/* Belt */}
                <rect x="85" y="210" width="50" height="8" rx="4" fill="#374151" />
                <circle cx="95" cy="214" r="2" fill="#D97706" />
                <circle cx="110" cy="214" r="2" fill="#D97706" />
                <circle cx="125" cy="214" r="2" fill="#D97706" />
              </svg>
            </motion.div>

            {/* Character Description */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="text-center"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Ready to Help!</h3>
              <p className="text-gray-600">Our nationwide team is here for all your real estate needs</p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="w-full lg:max-w-4xl lg:col-span-2"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-10 md:p-12 lg:p-14">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="space-y-2"
                  >
                    <label className="flex items-center text-gray-700 font-semibold text-base">
                      <FaUser className="mr-2 text-green-600" />
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white! border rounded-xl focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-300 outline-none text-base text-gray-900! placeholder:text-gray-500! ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="space-y-2"
                  >
                    <label className="flex items-center text-gray-700 font-semibold text-base">
                      <FaEnvelope className="mr-2 text-green-600" />
                      Your Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white! border rounded-xl focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-300 outline-none text-base text-gray-900! placeholder:text-gray-500! ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                  </motion.div>
                </div>

                {/* Phone and Subject */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    viewport={{ once: true }}
                    className="space-y-2"
                  >
                    <label className="flex items-center text-gray-700 font-semibold text-base">
                      <FaPhone className="mr-2 text-green-600" />
                      Your Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white! border rounded-xl focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-300 outline-none text-base text-gray-900! placeholder:text-gray-500! ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="(555) 123-4567"
                    />
                    {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    viewport={{ once: true }}
                    className="space-y-2"
                  >
                    <label className="flex items-center text-gray-700 font-semibold text-base">
                      <FaPaperPlane className="mr-2 text-green-600" />
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white! border rounded-xl focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-300 outline-none text-base text-gray-900! placeholder:text-gray-500! ${
                        errors.subject ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="What's this about?"
                    />
                    {errors.subject && <p className="text-red-500 text-xs">{errors.subject}</p>}
                  </motion.div>
                </div>

                {/* Message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  viewport={{ once: true }}
                  className="space-y-2"
                >
                  <label className="flex items-center text-gray-700 font-semibold text-base">
                    <FaEnvelope className="mr-2 text-green-600" />
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className={`w-full px-4 py-3 bg-white! border rounded-xl focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-300 outline-none resize-none text-base text-gray-900! placeholder:text-gray-500! ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Tell us how we can help you..."
                  />
                  {errors.message && <p className="text-red-500 text-xs">{errors.message}</p>}
                </motion.div>

                {/* reCAPTCHA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  viewport={{ once: true }}
                  className="space-y-2"
                >
                  <div
                    className="g-recaptcha"
                    data-sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                    data-callback="onRecaptchaSuccess"
                    data-expired-callback="onRecaptchaExpired"
                    data-error-callback="onRecaptchaError"
                  ></div>
                  {errors.recaptcha && <p className="text-red-500 text-xs">{errors.recaptcha}</p>}
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                  viewport={{ once: true }}
                  className="text-center pt-4"
                >
                  <motion.button
                    type="submit"
                    disabled={submitContactMutation.isPending}
                    className={`bg-green-600 text-white px-12 py-4 rounded-full font-semibold text-lg shadow-lg transition-all duration-300 flex items-center justify-center mx-auto ${
                      submitContactMutation.isPending ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl hover:scale-105'
                    }`}
                    whileHover={!submitContactMutation.isPending ? { scale: 1.05 } : {}}
                    whileTap={!submitContactMutation.isPending ? { scale: 0.95 } : {}}
                  >
                    <FaPaperPlane className="mr-2" />
                    {submitContactMutation.isPending ? 'Sending...' : 'Send Message'}
                  </motion.button>
                </motion.div>

                {/* Status Messages */}
                {submitContactMutation.isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center p-4 bg-green-50 border border-green-200 rounded-xl"
                  >
                    <p className="text-green-800 font-semibold">Message sent successfully! We'll get back to you soon.</p>
                  </motion.div>
                )}

                {submitContactMutation.isError && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center p-4 bg-red-50 border border-red-200 rounded-xl"
                  >
                    <p className="text-red-800 font-semibold">
                      {submitContactMutation.error?.message || 'Failed to send message. Please try again.'}
                    </p>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

