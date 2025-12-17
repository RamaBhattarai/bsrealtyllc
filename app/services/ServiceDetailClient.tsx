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

export default function ServiceDetailClient({ slug, allServices }: Props) {
  const slugify = (title: string) => title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-green-600">Home</Link>
          <span className="mx-2">/</span>
          <span className="font-semibold">Service Details</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Sidebar */}
          <motion.aside
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <BlurText text="Services List" className="text-lg font-semibold mb-4 text-gray-800" />
              <ul className="space-y-3">
                {allServices.map((serviceName, index) => {
                  const serviceSlug = slugify(serviceName);
                  const isActive = serviceSlug === slug;
                  return (
                    <li key={index}>
                      <Link
                        href={`/services/${serviceSlug}`}
                        className={`block px-3 py-2 rounded transition-colors ${
                          isActive
                            ? 'bg-green-100 text-green-700 font-semibold'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                        }`}
                      >
                        {serviceName}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <motion.div initial={{ x: -30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }} className="bg-white rounded-lg shadow-md p-6 mb-6">
              <BlurText text="Download Catalog" className="text-lg font-semibold mb-4 text-gray-800 flex items-center" />
              <div className="space-y-3">
                <motion.div whileHover={{ scale: 1.03 }} className="flex items-center px-4 py-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors cursor-pointer">
                  <FaFilePdf className="mr-2" />
                  Catalog PDF
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} className="flex items-center px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
                  <FaFileAlt className="mr-2" />
                  Catalog DOC
                </motion.div>
              </div>
            </motion.div>

            <motion.div initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="bg-white rounded-lg shadow-md p-6">
              <BlurText text="Have a Question?" className="text-lg font-semibold mb-4 text-gray-800" />
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaPhone className="mr-3 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-700">Call Us</p>
                    <p className="text-gray-600 text-sm">+1 (706) 261-8948</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="mr-3 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-700">Email</p>
                    <p className="text-gray-600 text-sm">bsrealtyllc@gmail.com</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.aside>

          {/* Main Content */}
          <motion.main initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="mb-6">
                <Image
                  src="/images/services/services.jpg"
                  alt="Services"
                  width={1200}
                  height={480}
                  className="w-full h-auto rounded-md object-cover"
                />
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose BS Realty Services</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  We provide comprehensive, one-stop solution for all your real estate and financial needs. Whether you're
                  navigating the process of buying, selling, renting residential or commercial properties, improving your home,
                  or managing your finances, we're here to make your journey seamless and stress-free. Our service strategies:
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
                  <motion.li
                    variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
                    whileHover={{ x: 6 }}
                    className="flex items-start gap-3 transition-transform"
                  >
                    <span className="mt-1 text-green-600"><FaCheckCircle size={20} /></span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Comprehensive One-Stop Solution</h3>
                      <p className="text-gray-600 text-sm">
                        We handle every detail so you can focus on what matters most - achieving your goals. From property
                        transactions and improvement to utility setup and financial management, our holistic approach ensures
                        nothing is overlooked.
                      </p>
                    </div>
                  </motion.li>

                  <motion.li
                    variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
                    whileHover={{ x: 6 }}
                    className="flex items-start gap-3 transition-transform"
                  >
                    <span className="mt-1 text-green-600"><FaLightbulb size={20} /></span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Expert Guidance</h3>
                      <p className="text-gray-600 text-sm">Our experienced team offers valuable insights and solutions tailored to your unique needs.</p>
                    </div>
                  </motion.li>

                  <motion.li
                    variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
                    whileHover={{ x: 6 }}
                    className="flex items-start gap-3 transition-transform"
                  >
                    <span className="mt-1 text-green-600"><FaUsers size={20} /></span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Client-Centric Focus</h3>
                      <p className="text-gray-600 text-sm">
                        Your satisfaction is our priority. We tailor our services to your unique needs, ensuring your goals
                        are met efficiently and effectively. We work diligently to make the process efficient, transparent,
                        and stress-free.
                      </p>
                    </div>
                  </motion.li>

                  <motion.li
                    variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
                    whileHover={{ x: 6 }}
                    className="flex items-start gap-3 transition-transform"
                  >
                    <span className="mt-1 text-green-500"><FaChartLine size={20} /></span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Market Expertise</h3>
                      <p className="text-gray-600 text-sm">With an in-depth understanding of the real estate and financial markets, we empower you to make well-informed decisions.</p>
                    </div>
                  </motion.li>
                </motion.ul>

                <div className="bg-[#D2EBE9] text-black p-8 rounded-lg">
                  <h3 className="text-2xl font-bold mb-4">Start your Journey Today!</h3>
                  <p className="text-lg leading-relaxed mb-6">
                    Whether you're buying your first home, expanding your portfolio, or managing financial transitions,
                    BS Realty Services is here to guide you every step of the way.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Let us help you turn your dreams into reality with services designed to fit your lifestyle and aspirations.
                    <strong> Your success is our mission!</strong>
                  </p>
                </div>
              </div>

              <div className="text-center">
                <Link
                  href="/contact"
                  className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
                >
                  Contact Us Today
                </Link>
              </div>
            </div>
          </motion.main>
        </div>
      </div>
    </div>
  );
}
