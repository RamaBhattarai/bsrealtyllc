'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ArrowRight, Upload, CheckCircle } from 'lucide-react';
import { jobs } from '@/lib/jobsData';
import { useParams } from 'next/navigation';

export default function JobApplicationPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const job = jobs.find(j => j.slug === slug);

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

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    coverLetter: '',
    resume: null as File | null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, resume: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // In a real app, this would send the data to the backend
    console.log('Application submitted for job:', job.title, formData);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen -mt-16 flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto px-6 text-center"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for applying for the {job.title} position. We'll review your application and get back to you soon.
            </p>
            <Link href="/job-listings">
              <button className="inline-flex items-center justify-center bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                Back to Job Listings
              </button>
            </Link>
          </div>
        </motion.div>
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
            <span className="text-green-500 font-semibold text-lg">Apply Now</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white my-6">
              {job.title}
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Submit your application and join our team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="bg-gradient-to-r from-gray-50 to-gray-100 py-6 pt-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/job-listings" className="hover:text-gray-900 transition-colors">Job Listings</Link>
            <span>/</span>
            <Link href={`/job-details/${job.slug}`} className="hover:text-gray-900 transition-colors">{job.title}</Link>
            <span>/</span>
            <span className="text-gray-900 font-semibold">Apply</span>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-2xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Apply for {job.title}</h2>
              <p className="text-gray-600">Fill out the form below to submit your application.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              {/* Contact Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              {/* Cover Letter */}
              <div>
                <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Letter
                </label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  rows={6}
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical"
                  placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                />
              </div>

              {/* Resume Upload */}
              <div>
                <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
                  Resume/CV *
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    required
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors">
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        {formData.resume ? formData.resume.name : 'Click to upload your resume (PDF, DOC, DOCX)'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}