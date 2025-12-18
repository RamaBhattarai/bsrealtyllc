"use client";

import { motion } from 'framer-motion';
import BlurText from './../BlurText';
import TextType from './../TextType';
import { GraduationCap, Briefcase, TrendingUp } from 'lucide-react';

const courses = [
  {
    icon: GraduationCap,
    title: 'Licensing Exam Prep',
    price: '$149',
    description: 'We offer expert prelicensing exam preparation and counseling for aspiring real estate professionals and mortgage loan officers. Our courses are designed to help you succeed in your licensing exams and provide comprehensive guidance to ensure you are fully equipped for a successful career in the real estate and mortgage industries.',
    balance: '50/65'
  },
  {
    icon: Briefcase,
    title: 'Business Counseling',
    price: '$139',
    description: 'We offer comprehensive business counseling services, including business establishment, tax preparation, bookkeeping, payroll, and financial reporting. Our goal is to help individuals and businesses stay financially organized and compliant, allowing them to focus on growth and success.',
    balance: '35/42'
  },
  {
    icon: TrendingUp,
    title: 'Investment Strategies',
    price: '$99',
    description: 'We offer specialized training to help individuals in varieties of investment strategies, such as stocks, forex, ETFs, bonds, notes, money market, REITs, MLPs, real estate, and more. Our courses are designed for beginners and experienced investors alike, providing the knowledge and tools needed to make informed decisions in the financial markets.',
    balance: ''
  }
];

export default function Courses() {
  return (
    <section className="py-20 bg-[#fdfefe] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <BlurText
              text="Courses"
              delay={100}
              animateBy="words"
              direction="top"
              className="text-4xl md:text-6xl font-bold text-gray-600 mb-6 align-items-center justify-center"
            />
            <div className="text-center max-w-4xl mx-auto">
              <TextType
                text="We offer a wide range of services including Business Counseling, online training on Investment Strategies, Real Estate and Mortgage pre-licensing, post-licensing, exam preparation, and continuing education courses."
                typingSpeed={75}
                pauseDuration={2000}
                showCursor={true}
                cursorCharacter="|"
                className="text-xl text-gray-600 leading-relaxed"
                startOnVisible={true}
                loop={false}
              />
            </div>
          </motion.div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-300 group"
            >
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-emerald-600/20 border border-emerald-500/50 rounded-lg flex items-center justify-center group-hover:bg-emerald-600/30 transition-all duration-300">
                  <course.icon className="w-8 h-8 text-emerald-500 group-hover:text-emerald-600 transition-colors duration-300" />
                </div>
              </div>

              {/* Title and Price */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-600 mb-2">{course.title}</h3>
                <div className="text-3xl font-bold text-green-600">{course.price}</div>
                {course.balance && (
                  <div className="text-sm text-gray-500 mt-2">Bal</div>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed text-align-left">
                {course.description}
              </p>

              
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}