'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin, Clock, DollarSign, ArrowRight, CheckCircle } from 'lucide-react';
import { jobs } from '../../../lib/jobsData';
import { useParams } from 'next/navigation';

export default function JobDetailsPage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  console.log('JobDetailsPage - params:', params);
  console.log('JobDetailsPage - slug:', slug);
  console.log('JobDetailsPage - available jobs:', jobs.map(j => j.slug));
  
  const job = jobs.find(j => j.slug === slug);
  
  console.log('JobDetailsPage - found job:', job);

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Job Not Found</h1>
          <p className="text-gray-600 mb-4">The job you're looking for doesn't exist.</p>
          <Link href="/job-listings" className="text-blue-600 hover:underline">
            Back to Job Listings
          </Link>
        </div>
      </div>
    );
  }

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
            <span className="text-green-500 font-semibold text-lg">Career Opportunity</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white my-6">
              {job.title}
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Join our team and make a difference in the real estate industry.
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
            <Link href="/job-listings" className="hover:text-gray-900 transition-colors">Job Listings</Link>
            <span>/</span>
            <span className="text-gray-900 font-semibold">{job.title}</span>
          </div>
        </div>
      </section>

      {/* Job Details */}
      <section className="py-20 bg-linear-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Left Side */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
              >
                {/* Job Meta */}
                <div className="flex flex-wrap gap-6 mb-8 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span>{job.type}</span>
                  </div>
                  {job.salary && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <DollarSign className="w-5 h-5 text-blue-600" />
                      <span>{job.salary}</span>
                    </div>
                  )}
                </div>

                {/* Job Description */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h2>
                  <p className="text-gray-600 leading-relaxed">
                    {job.description}
                  </p>
                </div>

                {/* Requirements */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
                  <ul className="space-y-3">
                    {job.requirements.map((req: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                        <span className="text-gray-600">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Experience */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Experience Required</h2>
                  <p className="text-gray-600">{job.experience}</p>
                </div>

                {/* Qualifications */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Qualifications and Work Experience</h2>
                  <ul className="space-y-3">
                    {job.qualifications.map((qual: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                        <span className="text-gray-600">{qual}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Soft Skills */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Required Soft Skills</h2>
                  <ul className="space-y-3">
                    {job.softSkills.map((skill: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                        <span className="text-gray-600">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What We Offer */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Offer</h2>
                  <ul className="space-y-3">
                    {job.whatWeOffer.map((offer: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                        <span className="text-gray-600">{offer}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Important Note */}
                <div className="mb-8 p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0">
                      <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-yellow-800 mb-1">Important Note</h3>
                      <p className="text-sm text-yellow-700">
                        Please apply only through this website. Applications submitted through other sources will not be considered.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Apply Button - Mobile */}
                <div className="text-center lg:hidden">
                  <Link href={`/job-listings/apply/${job.slug}`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Apply for this Job
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Sidebar - Right Side */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Job Summary Card */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
                >
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-linear-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-white">
                        {job.title.charAt(0)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                    <p className="text-sm text-gray-500">BS Realty LLC</p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Location</span>
                      <span className="text-sm font-medium text-gray-900">{job.location}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Job Type</span>
                      <span className="text-sm font-medium text-gray-900">{job.type}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Experience</span>
                      <span className="text-sm font-medium text-gray-900">{job.experience}</span>
                    </div>
                    {job.salary && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-600">Salary</span>
                        <span className="text-sm font-medium text-gray-900">{job.salary}</span>
                      </div>
                    )}
                  </div>

                  {/* Apply Button - Desktop */}
                  <Link href={`/job-listings/apply/${job.slug}`}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold px-6 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 mb-4"
                    >
                      Apply Now
                    </motion.button>
                  </Link>

                  <Link href="/job-listings">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full border-2 border-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
                    >
                      Back to All Jobs
                    </motion.button>
                  </Link>
                </motion.div>

                {/* Other Jobs Card */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
                >
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Other Job Openings</h4>
                  <div className="space-y-4">
                    {jobs.filter(j => j.slug !== job.slug).map((otherJob, idx) => (
                      <Link key={otherJob.id} href={`/job-details/${otherJob.slug}`}>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-300 cursor-pointer"
                        >
                          <h5 className="font-semibold text-gray-900 text-sm mb-2">{otherJob.title}</h5>
                          <div className="flex flex-wrap gap-2 mb-2">
                            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
                              {otherJob.type}
                            </span>
                            <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded-full">
                              {otherJob.location}
                            </span>
                          </div>
                          {otherJob.salary && (
                            <p className="text-xs text-gray-600 font-medium">{otherJob.salary}</p>
                          )}
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <Link href="/job-listings">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full text-blue-600 font-semibold text-sm py-2 hover:text-blue-700 transition-colors duration-300"
                      >
                        View All Job Openings →
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Listings */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Link href="/job-listings">
            <motion.button
              whileHover={{ x: -5 }}
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-300"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Back to Job Listings
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
}