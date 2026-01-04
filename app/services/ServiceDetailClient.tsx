'use client'

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaDownload, FaPhone, FaEnvelope, FaFileAlt, FaFilePdf } from 'react-icons/fa';
import { FaCheckCircle, FaLightbulb, FaUsers, FaChartLine } from 'react-icons/fa';
import BlurText from '@/components/BlurText';
import Image from 'next/image';

type Props = {
  slug: string;
  allServices: string[];
};

const serviceContent = {
  'real-estate-services': {
    title: 'Real Estate Services',
    image: '/images/services/services.jpg',
    description: 'We provide comprehensive real estate services for buying, selling and renting residential and commercial properties. Our expert team helps you find the perfect property and ensures a smooth transaction from start to finish.',
    strategies: [
      {
        icon: FaCheckCircle,
        title: 'Comprehensive One-Stop Solution',
        description: 'We handle every detail so you can focus on what matters most - achieving your goals. From property transactions and improvement to utility setup and financial management, our holistic approach ensures nothing is overlooked.'
      },
      {
        icon: FaLightbulb,
        title: 'Expert Guidance',
        description: 'Our experienced team offers valuable insights and solutions tailored to your unique needs.'
      },
      {
        icon: FaUsers,
        title: 'Client-Centric Focus',
        description: 'Your satisfaction is our priority. We tailor our services to your unique needs, ensuring your goals are met efficiently and effectively. We work diligently to make the process efficient, transparent, and stress-free.'
      },
      {
        icon: FaChartLine,
        title: 'Market Expertise',
        description: 'With an in-depth understanding of the real estate and financial markets, we empower you to make well-informed decisions.'
      }
    ],
    cta: 'Whether you\'re buying your first home, expanding your portfolio, or managing financial transitions, BS Realty Services is here to guide you every step of the way.',
    additionalSection: null,
    uiType: 'standard'
  },
  'mortgage-solutions': {
    title: 'Mortgage Solutions',
    image: '/images/services/Mortgage.jpg',
    description: 'We offer tailored mortgage solutions to fit your financial needs. Whether you\'re a first-time homebuyer or refinancing, we provide access to a variety of loan products and guide you through the loan approval process.',
    strategies: [
      {
        icon: FaCheckCircle,
        title: 'Personalized Loan Options',
        description: 'We analyze your financial situation to recommend the best mortgage products that align with your goals and budget.'
      },
      {
        icon: FaLightbulb,
        title: 'Expert Pre-Approval Guidance',
        description: 'Our team helps you navigate the pre-approval process, strengthening your position in the competitive housing market.'
      },
      {
        icon: FaUsers,
        title: 'Refinancing Support',
        description: 'If you\'re looking to refinance, we compare current rates and options to help you save money and improve your financial standing.'
      }
    ],
    cta: 'Let us help you secure the perfect mortgage for your dream home. Contact us today to start the process.',
    
  },
  'tax-accounting': {
    title: 'Tax & Accounting Services',
    image: '/images/services/tax.jpg',
    description: 'Our comprehensive tax & accounting services are designed to help individuals and businesses stay financially organized, compliant, and positioned for growth. If you need assistance with tax planning, bookkeeping, payroll, or financial reporting, our expert team provides solutions.',
    strategies: [
      {
        icon: FaCheckCircle,
        title: 'Tax Preparation & Planning',
        description: 'We ensure accurate tax filings and help you minimize liabilities through strategic planning.'
      },
      {
        icon: FaLightbulb,
        title: 'Bookkeeping Services',
        description: 'Maintain accurate financial records with our professional bookkeeping solutions.'
      },
      {
        icon: FaUsers,
        title: 'Payroll Management',
        description: 'Streamline your payroll processes with our efficient and compliant services.'
      },
      {
        icon: FaChartLine,
        title: 'Financial Reporting',
        description: 'Get comprehensive financial reports to make informed business decisions.'
      },
      {
        icon: FaCheckCircle,
        title: 'Audit Support',
        description: 'Prepare for and navigate audits with our expert assistance.'
      }
    ],
    cta: 'Keep your finances in order and maximize your tax benefits. Our experts are ready to help.',
    additionalSection: null,
    uiType: 'cards'
  },
  'home-improvement': {
    title: 'Home Improvement Services',
    image: '/images/services/home.jpg',
    description: 'Our home improvement services cover everything from plumbing, electrical, and HVAC maintenance to renovations and repairs. We ensure your home is well-maintained and meets your comfort and safety standards.',
    strategies: [
      {
        icon: FaCheckCircle,
        title: 'Plumbing & Electrical',
        description: 'Expert repairs and installations for all your plumbing and electrical needs.'
      },
      {
        icon: FaLightbulb,
        title: 'HVAC Maintenance',
        description: 'Keep your home comfortable with regular heating and cooling system maintenance.'
      },
      {
        icon: FaUsers,
        title: 'Renovations & Repairs',
        description: 'Transform your space with our professional renovation and repair services.'
      }
    ],
    cta: 'Enhance your home\'s value and comfort with our comprehensive improvement services.',
    additionalSection: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-bold text-green-800">Before & After Gallery</h4>
          <p className="text-green-700">See examples of our work</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <h4 className="font-bold text-orange-800">Free Consultation</h4>
          <p className="text-orange-700">Get expert advice on your project</p>
        </div>
      </div>
    ),
    uiType: 'gallery'
  },
  'insurance-p-c': {
    title: 'Insurance P & C Services',
    image: '/images/services/insurance.jpg',
    description: 'We provide personalized auto, home, and commercial property insurance solutions designed to protect what matters most. Our licensed agents help you compare coverage options and secure the right protection at competitive rates.',
    strategies: [
      {
        icon: FaCheckCircle,
        title: 'Auto Insurance',
        description: 'Comprehensive coverage for your vehicles with competitive rates.'
      },
      {
        icon: FaLightbulb,
        title: 'Home Insurance',
        description: 'Protect your home and belongings with tailored policies.'
      },
      {
        icon: FaUsers,
        title: 'Commercial Property',
        description: 'Business insurance solutions to safeguard your commercial assets.'
      },
      {
        icon: FaChartLine,
        title: 'Claims Assistance',
        description: 'Expert help with filing and processing insurance claims.'
      }
    ],
    cta: 'Don\'t leave your assets unprotected. Get the right insurance coverage today.',
    additionalSection: null,
    uiType: 'standard'
  },
  'online-courses': {
    title: 'Online Courses',
    image: '/images/services/online.jpg',
    description: 'We offer flexible and practical online courses designed for individuals and professionals seeking knowledge and certification in real estate, mortgage, insurance, and related financial services. Our courses are structured to be easy to follow, industry-relevant, and accessible anytime, anywhere.',
    strategies: [
      {
        icon: FaCheckCircle,
        title: 'Licensing Exam Prep',
        description: 'Expert preparation and counseling for real estate and mortgage licensing exams to ensure success and career readiness.'
      },
      {
        icon: FaLightbulb,
        title: 'Business Counseling',
        description: 'Comprehensive guidance on business setup, tax, bookkeeping, payroll, and financial reporting for organized growth.'
      },
      {
        icon: FaUsers,
        title: 'Investment Strategies',
        description: 'Specialized training in diverse investment options like stocks, forex, ETFs, and real estate for informed decision-making.'
      }
    ],
    cta: 'Advance your career with our industry-leading online courses. Enroll today!',
    additionalSection: (
      <div className="bg-purple-50 p-6 rounded-lg mb-6">
        <h3 className="text-xl font-bold text-purple-800 mb-4">Course Catalog</h3>
        <ul className="list-disc list-inside text-purple-700 space-y-2">
          <li>Licensing Exam Prep - $149</li>
          <li>Business Counseling - $139</li>
          <li>Investment Strategies - $99</li>
        </ul>
        <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
          View All Courses
        </button>
      </div>
    ),
    uiType: 'courses'
  }
};

export default function ServiceDetailClient({ slug, allServices }: Props) {
  const slugify = (title: string) => title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');

  const content = serviceContent[slug as keyof typeof serviceContent] || serviceContent['real-estate-services'];

  const renderMainContent = () => {
    switch (slug) {
      case 'real-estate-services':
        return (
          <div className="p-6 md:p-8">
            <div className="mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-2xl"></div>
              <Image
                src={content.image}
                alt={content.title}
                width={1200}
                height={480}
                className="w-full h-auto rounded-2xl object-cover shadow-xl relative z-10"
              />
              <div className="absolute bottom-4 left-4 z-20">
                <span className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-gray-800 dark:text-white">
                  Premium Service
                </span>
              </div>
            </div>
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Why Choose BS Realty {content.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-700 leading-relaxed mb-8 text-base">
                {content.description}
              </p>
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.12 } },
                }}
                className="space-y-6 mb-10"
              >
                {content.strategies.map((strategy, index) => (
                  <motion.li
                    key={index}
                    variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
                    whileHover={{ x: 6, scale: 1.02 }}
                    className={`flex items-start gap-4 p-6 rounded-2xl border transition-all duration-200 hover:shadow-lg ${
                      index % 2 === 0 
                        ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/30' 
                        : 'bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800/30'
                    }`}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                      <strategy.icon className="text-white text-xl" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-700 mb-2">{strategy.title}</h3>
                      <p className="text-gray-600 dark:text-gray-700 leading-relaxed text-sm">{strategy.description}</p>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 rounded-3xl shadow-xl">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <span className="mr-3">🚀</span> Start your Journey Today!
                </h3>
                <p className="text-base leading-relaxed mb-6 opacity-95">{content.cta}</p>
                <p className="text-base leading-relaxed font-semibold">
                  Let us help you turn your dreams into reality with services designed to fit your lifestyle and aspirations. <strong>Your success is our mission!</strong>
                </p>
              </div>
            </div>
            <div className="text-center">
              <Link href="/contact" className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                <FaPhone className="text-lg" />
                Contact Us Today
              </Link>
            </div>
          </div>
        );

      case 'mortgage-solutions':
        return (
          <div className="p-6 md:p-8">
            <div className="mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-2xl"></div>
              <Image
                src={content.image}
                alt={content.title}
                width={1200}
                height={480}
                className="w-full h-auto rounded-2xl object-cover shadow-xl relative z-10"
              />
              <div className="absolute bottom-4 left-4 z-20">
                <span className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-gray-800 dark:text-white">
                  💰 Financial Solutions
                </span>
              </div>
            </div>
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-6">
                Why Choose BS Realty {content.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-700 leading-relaxed mb-8 text-base">
                {content.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {content.strategies.map((strategy, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="text-center p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800/30 shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <strategy.icon className="text-white text-2xl" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-700 mb-3">{strategy.title}</h3>
                    <p className="text-gray-600 dark:text-gray-700 leading-relaxed text-sm">{strategy.description}</p>
                  </motion.div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 rounded-3xl shadow-xl">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <span className="mr-3">🏦</span> Start your Journey Today!
                </h3>
                <p className="text-base leading-relaxed mb-6 opacity-95">{content.cta}</p>
                <p className="text-base leading-relaxed font-semibold">
                  Let us help you turn your dreams into reality with services designed to fit your lifestyle and aspirations. <strong>Your success is our mission!</strong>
                </p>
              </div>
            </div>
            <div className="text-center">
              <Link href="/contact" className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                <FaPhone className="text-lg" />
                Contact Us Today
              </Link>
            </div>
          </div>
        );

      case 'tax-accounting':
        return (
          <div className="bg-white text-gray-900 rounded-lg shadow-md p-8">
            <div className="mb-6">
              <Image
                src={content.image}
                alt={content.title}
                width={1200}
                height={480}
                className="w-full h-auto rounded-md object-cover"
              />
            </div>
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose BS Realty {content.title}</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {content.description}
              </p>
              <div className="space-y-6 mb-8">
                {content.strategies.map((strategy, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`border-l-4 pl-6 ${index % 2 === 0 ? 'border-green-500 bg-green-50' : 'border-blue-500 bg-blue-50'}`}
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{strategy.title}</h3>
                    <p className="text-gray-600">{strategy.description}</p>
                  </motion.div>
                ))}
              </div>
              <div className="bg-[#D2EBE9] text-black p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Start your Journey Today!</h3>
                <p className="text-lg leading-relaxed mb-6">{content.cta}</p>
                <p className="text-lg leading-relaxed">
                  Let us help you turn your dreams into reality with services designed to fit your lifestyle and aspirations. <strong>Your success is our mission!</strong>
                </p>
              </div>
            </div>
            <div className="text-center">
              <Link href="/contact" className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl">
                Contact Us Today
              </Link>
            </div>
          </div>
        );

      case 'home-improvement':
        return (
          <div className="p-6 md:p-8">
            <div className="mb-8 relative">
              <div className="absolute inset-0 bg-[#377D71] rounded-2xl"></div>
              <Image
                src={content.image}
                alt={content.title}
                width={1200}
                height={480}
                className="w-full h-auto rounded-2xl object-cover shadow-xl relative z-10"
              />
              <div className="absolute bottom-4 left-4 z-20">
                <span className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-gray-800 dark:text-white">
                  🏠 Home Services
                </span>
              </div>
            </div>
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-6">
                Why Choose BS Realty {content.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-700 leading-relaxed mb-8 text-base">
                {content.description}
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                <div className="space-y-6">
                  {content.strategies.map((strategy, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ x: 5, scale: 1.02 }}
                      className="flex items-center gap-4 p-4 bg-[#90E0AB] dark:bg-[#90E0AB] rounded-2xl border border-[#90E0AB]/30 dark:border-[#90E0AB]/20 transition-all duration-200 hover:shadow-lg"
                    >
                      <div className="w-10 h-10 bg-[#90E0AB] rounded-xl flex items-center justify-center flex-shrink-0">
                        <strategy.icon className="text-white" />
                      </div>
                      <span className="font-bold text-gray-800 dark:text-gray-700 text-lg">{strategy.title}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="bg-[#90E0AB]/10 dark:bg-[#90E0AB]/5 p-6 rounded-2xl border border-[#90E0AB] dark:border-[#90E0AB]/20 shadow-lg">
                  <h4 className="font-bold text-gray-800 dark:text-gray-700 mb-6 text-lg flex items-center">
                    <span className="mr-3">⭐</span> Service Highlights
                  </h4>
                  <ul className="space-y-4 text-gray-700 dark:text-gray-700">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#90E0AB] rounded-full"></div>
                      <span className="font-medium">Licensed professionals</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#90E0AB] rounded-full"></div>
                      <span className="font-medium">Quality materials</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#90E0AB] rounded-full"></div>
                      <span className="font-medium">Warranty included</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#90E0AB] rounded-full"></div>
                      <span className="font-medium">Emergency repairs</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="bg-[#90E0AB] text-white p-6 rounded-3xl shadow-xl">
                <h3 className="text-xl font-bold text-black mb-4 flex items-center">
                  <span className="mr-3">🔨</span> Start your Journey Today!
                </h3>
                <p className="text-base leading-relaxed mb-6 opacity-95 dark:text-gray-700">{content.cta}</p>
                <p className="text-base leading-relaxed font-semibold dark:text-gray-700">
                  Let us help you turn your dreams into reality with services designed to fit your lifestyle and aspirations. <strong>Your success is our mission!</strong>
                </p>
              </div>
            </div>
            <div className="text-center">
              <Link href="/contact" className="inline-flex items-center gap-3 bg-[#389356] hover:bg-[#1c9043] text-white px-8 py-4 rounded-2xl font-bold transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                <FaPhone className="text-lg" />
                Contact Us Today
              </Link>
            </div>
          </div>
        );

      case 'insurance-p-c':
        return (
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="mb-6">
              <Image
                src={content.image}
                alt={content.title}
                width={1200}
                height={480}
                className="w-full h-auto rounded-md object-cover"
              />
            </div>
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose BS Realty {content.title}</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {content.description}
              </p>
              <div className="space-y-6 mb-8">
                {content.strategies.map((strategy, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`p-6 rounded-lg border-l-4 ${
                      index === 0 ? 'bg-red-50 border-red-500' :
                      index === 1 ? 'bg-blue-50 border-blue-500' :
                      'bg-green-50 border-green-500'
                    }`}
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{strategy.title}</h3>
                    <p className="text-gray-600">{strategy.description}</p>
                  </motion.div>
                ))}
              </div>
              <div className="bg-[#D2EBE9] text-black p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Start your Journey Today!</h3>
                <p className="text-lg leading-relaxed mb-6">{content.cta}</p>
                <p className="text-lg leading-relaxed">
                  Let us help you turn your dreams into reality with services designed to fit your lifestyle and aspirations. <strong>Your success is our mission!</strong>
                </p>
              </div>
            </div>
            <div className="text-center">
              <Link href="/contact" className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl">
                Contact Us Today
              </Link>
            </div>
          </div>
        );

      case 'online-courses':
        return (
          <div className="p-6 md:p-8">
            <div className="mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-2xl"></div>
              <Image
                src={content.image}
                alt={content.title}
                width={1200}
                height={480}
                className="w-full h-auto rounded-2xl object-cover shadow-xl relative z-10"
              />
              <div className="absolute bottom-4 left-4 z-20">
                <span className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-gray-800 dark:text-white">
                  🎓 Online Learning
                </span>
              </div>
            </div>
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Why Choose BS Realty {content.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-700 leading-relaxed mb-8 text-base">
                {content.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-8 rounded-2xl border border-purple-100 dark:border-purple-800/30 shadow-lg">
                  <h3 className="text-lg font-bold text-purple-800 dark:text-gray-700 mb-6 flex items-center">
                    <span className="mr-3">📚</span> Available Courses
                  </h3>
                  <ul className="space-y-3 text-purple-700 dark:text-gray-700">
                    {content.strategies.map((strategy, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="font-medium">{strategy.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-8 rounded-2xl border border-green-100 dark:border-green-800/30 shadow-lg">
                  <h3 className="text-lg font-bold text-green-800 dark:text-gray-700 mb-6 flex items-center">
                    <span className="mr-3">✨</span> Course Features
                  </h3>
                  <ul className="space-y-3 text-green-700 dark:text-gray-700">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="font-medium">Self-paced learning</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="font-medium">Certification included</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="font-medium">Expert instructors</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="font-medium">Lifetime access</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-3xl shadow-xl">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <span className="mr-3">🚀</span> Start your Journey Today!
                </h3>
                <p className="text-base leading-relaxed mb-6 opacity-95">{content.cta}</p>
                <p className="text-base leading-relaxed font-semibold">
                  Let us help you turn your dreams into reality with services designed to fit your lifestyle and aspirations. <strong>Your success is our mission!</strong>
                </p>
              </div>
            </div>
            <div className="text-center">
              <Link href="/contact" className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                <FaPhone className="text-lg" />
                Contact Us Today
              </Link>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="mb-6">
              <Image
                src={content.image}
                alt={content.title}
                width={1200}
                height={480}
                className="w-full h-auto rounded-md object-cover"
              />
            </div>
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose BS Realty {content.title}</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {content.description}
              </p>
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.12 } },
                }}
                className="space-y-4 mb-8"
              >
                {content.strategies.map((strategy, index) => (
                  <motion.li
                    key={index}
                    variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
                    whileHover={{ x: 6 }}
                    className="flex items-start gap-3 transition-transform"
                  >
                    <span className="mt-1 text-green-600"><strategy.icon size={20} /></span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{strategy.title}</h3>
                      <p className="text-gray-600 text-sm">{strategy.description}</p>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
              <div className="bg-[#D2EBE9] text-black p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Start your Journey Today!</h3>
                <p className="text-lg leading-relaxed mb-6">{content.cta}</p>
                <p className="text-lg leading-relaxed">
                  Let us help you turn your dreams into reality with services designed to fit your lifestyle and aspirations. <strong>Your success is our mission!</strong>
                </p>
              </div>
            </div>
            <div className="text-center">
              <Link href="/contact" className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl">
                Contact Us Today
              </Link>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-100 dark:via-gray-200 dark:to-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Enhanced Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm text-gray-600 dark:text-gray-400 mb-8 flex items-center space-x-2"
        >
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center">
            <span className="mr-1">🏠</span> Home
          </Link>
          <span className="text-gray-400">/</span>
          <Link href="/services" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Services
          </Link>
          <span className="text-gray-400">/</span>
          <span className="font-semibold text-gray-800 dark:text-white bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {content.title}
          </span>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Enhanced Sidebar */}
          <motion.aside
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="bg-white/80 dark:bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-200/20 p-6">
              <BlurText text="Services List" className="text-lg font-bold mb-6 text-gray-800 dark:text-gray-900 flex items-center" />
              <ul className="space-y-2">
                {allServices.map((serviceName, index) => {
                  const serviceSlug = slugify(serviceName);
                  const isActive = serviceSlug === slug;
                  return (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Link
                        href={`/services/${serviceSlug}`}
                        className={`block px-4 py-3 rounded-xl transition-all duration-200 dark:text-gray-900  ${
                          isActive
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-lg transform scale-105'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-700/60 hover:shadow-md hover:transform hover:scale-102'
                        }`}
                      >
                        {serviceName}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </div>

            <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/80 dark:bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-200/20 p-6"
            >
              <BlurText text="Download Catalog" className="text-lg font-bold mb-6 text-gray-800 dark:text-gray-900  flex items-center" />
              <div className="space-y-3">
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="flex items-center px-4 py-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-gray-100/80 dark:to-gray-200/80 text-red-700 dark:text-red-700 rounded-xl hover:shadow-lg transition-all duration-200 cursor-pointer border border-red-100 dark:border-gray-200/30"
                >
                  <FaFilePdf className="mr-3 text-xl" />
                  <div>
                    <div className="font-semibold">Catalog PDF</div>
                    <div className="text-sm opacity-75">Download full catalog</div>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="flex items-center px-4 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-100/80 dark:to-gray-200/80 text-blue-700 dark:text-blue-700 rounded-xl hover:shadow-lg transition-all duration-200 cursor-pointer border border-blue-100 dark:border-gray-200/30"
                >
                  <FaFileAlt className="mr-3 text-xl" />
                  <div>
                    <div className="font-semibold">Catalog DOC</div>
                    <div className="text-sm opacity-75">Editable format</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-100/80 dark:to-gray-200/80 backdrop-blur-lg rounded-2xl shadow-xl border border-green-100 dark:border-gray-200/30 p-6"
            >
              <BlurText text="Have a Question?" className="text-lg font-bold mb-6 text-gray-800 dark:text-gray-700 " />
              <div className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center p-3 bg-white/60 dark:bg-white/60 rounded-xl hover:shadow-md transition-all duration-200"
                >
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <FaPhone className="text-green-600 dark:text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-700 ">Call Us</p>
                    <p className="text-gray-600 dark:text-gray-700 text-sm">+1 (706) 261-8948</p>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center p-3 bg-white/60 dark:bg-white/60 rounded-xl hover:shadow-md transition-all duration-200"
                >
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <FaEnvelope className="text-blue-600 dark:text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-700">Email</p>
                    <p className="text-gray-600 dark:text-gray-700 text-sm">bsrealtyllc@gmail.com</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.aside>

          {/* Enhanced Main Content */}
          <motion.main
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="bg-white/90 dark:bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 dark:border-gray-200/20 overflow-hidden">
              {renderMainContent()}
            </div>
          </motion.main>
        </div>
      </div>
    </div>
  );
}

