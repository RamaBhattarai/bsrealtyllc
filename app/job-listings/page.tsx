'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin, Clock, DollarSign, ArrowRight } from 'lucide-react';
import { jobs } from '../../lib/jobsData';

export default function JobListingsPage() {
  return (
    <div className="min-h-screen -mt-16">
      {/* Header Section */}
      <section className="pt-45 pb-16 bg-[#0f1729]">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-green-500 font-semibold text-lg">Careers</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white my-6">
              Join Our Team
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Explore exciting career opportunities and be part of a dynamic team dedicated to excellence in real estate and financial services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="bg-linear-to-r from-gray-50 to-gray-100 py-6 pt-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-semibold">Job Listings</span>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-20 bg-linear-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative h-full">
                  {/* Card Background */}
                  <div className="absolute inset-0 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>

                  {/* Card */}
                  <div className="relative backdrop-blur-sm bg-white/80 border border-white/20 rounded-2xl p-8 h-full shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2">
                    {/* Job Title */}
                    <Link href={`/job-details/${job.slug}`}>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300 cursor-pointer">
                        {job.title}
                      </h3>
                    </Link>

                    {/* Job Details */}
                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.type}
                      </div>
                      {job.salary && (
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {job.salary}
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {job.description.length > 150 ? `${job.description.substring(0, 150)}...` : job.description}
                    </p>

                    {/* Requirements Preview */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Key Requirements:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {job.requirements.slice(0, 2).map((req: string, idx: number) => (
                          <li key={idx} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                            {req}
                          </li>
                        ))}
                        {job.requirements.length > 2 && (
                          <li className="text-blue-600 font-medium">+{job.requirements.length - 2} more</li>
                        )}
                      </ul>
                    </div>

                    {/* View Details Button */}
                    <Link href={`/job-details/${job.slug}`}>
                      <motion.button
                        whileHover={{ x: 5 }}
                        className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-300"
                      >
                        View Details
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </Link>

                    {/* Hover Effect Line */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-1 bg-linear-to-r from-blue-500 to-purple-600 rounded-b-2xl"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

     
      {/* CTA Section */}
      <section className="py-20 bg-linear-to-br from-blue-400 to-purple-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Don't See the Right Fit?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              We're always interested in meeting talented individuals. Send us your resume and let's discuss opportunities.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center bg-white text-blue-600 font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Contact Us
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

