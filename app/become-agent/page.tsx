'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight, FaCheck, FaCloudUploadAlt } from 'react-icons/fa';
import Link from 'next/link';

const stepVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

export default function BecomeAgentPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    name: '',
    email: '',
    phone: '',
    // Step 2: Professional Background
    licenseStatus: '',
    licenseNumber: '',
    licensedStates: '',
    yearsExperience: '',
    currentBrokerage: '',
    // Step 3: Expertise & Motivation
    areasOfExpertise: [] as string[],
    whyBecomeAgent: '',
    sponsorshipInterest: '',
    // Step 4: Documents
    resume: null as File | null,
  });

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCheckboxChange = (field: 'areasOfExpertise', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev.areasOfExpertise.includes(value)
        ? prev.areasOfExpertise.filter(item => item !== value)
        : [...prev.areasOfExpertise, value]
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, resume: file }));
      if (errors.resume) {
        setErrors(prev => ({ ...prev, resume: '' }));
      }
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
      if (!formData.name.trim()) newErrors.name = 'Full Name is required';
      if (!formData.email.trim()) newErrors.email = 'Email Address is required';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    } else if (step === 1) {
      if (!formData.licenseStatus) newErrors.licenseStatus = 'Please select license status';
      if (!formData.yearsExperience) newErrors.yearsExperience = 'Years of experience is required';
      if (formData.areasOfExpertise.length === 0) newErrors.areasOfExpertise = 'Please select at least one area of expertise';
    } else if (step === 2) {
      if (!formData.whyBecomeAgent.trim()) newErrors.whyBecomeAgent = 'This field is required';
    } else if (step === 3) {
      if (!formData.resume) newErrors.resume = 'Resume upload is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    console.log('Agent application submitted:', formData);
    setShowSuccess(true);

    // Redirect after showing success message
    setTimeout(() => {
      window.location.href = '/job-listings';
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <Link href="/job-listings" className="text-green-600 hover:text-green-700 flex items-center gap-2 mb-5 mt-8">
            <FaArrowLeft size={16} /> Back to Job Listings
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Become an Agent</h1>
          <h2 className="text-2xl font-semibold text-green-600 mb-4">Agent Sponsorship Application</h2>
          <p className="text-gray-600 mb-4">
            Join BS Realty LLC as a sponsored agent. We're looking for motivated real estate professionals nationwide who are ready to take their career to the next level. Fill out this application to start the sponsorship process.
          </p>
          <p className="text-sm text-gray-500">
            Questions? Contact us.....
          </p>
        </div>

        {/* Progress indicator */}
        <div className="mb-8 flex items-center justify-between">
          {['Personal Info', 'Professional Background', 'Expertise & Motivation', 'Documents'].map((step, index) => (
            <div key={step} className="flex items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  index < currentStep
                    ? 'bg-green-600 text-white'
                    : index === currentStep
                      ? 'bg-green-600 text-white ring-4 ring-green-300'
                      : 'bg-gray-300 text-gray-600'
                }`}
              >
                {index < currentStep ? <FaCheck size={14} /> : index + 1}
              </div>
              <div className="ml-2 text-sm font-medium text-gray-700 hidden md:block">{step}</div>
              {index < 3 && (
                <div
                  className={`flex-1 h-1 mx-1 transition-all ${
                    index < currentStep ? 'bg-green-600' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Success Message */}
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={() => setShowSuccess(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center border border-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.3, type: "spring", stiffness: 200 }}
                className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <FaCheck className="text-green-600 text-2xl" />
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="text-2xl font-bold text-gray-900 mb-4"
              >
                Application Submitted Successfully!
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="text-gray-600 mb-6"
              >
                Thank you for your interest in becoming a sponsored agent with BS Realty LLC. We have received your application and will review it carefully. Our team will reach out to you within 3-5 business days.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="space-y-3"
              >
                <p className="text-sm text-gray-500">
                  Questions? Contact us at (706) 261-8948 or bsrealtyllc@gmail.com
                </p>
                <Link href="/job-listings">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    Back to Job Listings
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* Form Container */}
        {!showSuccess && (
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 md:p-10">
            {/* Step 1: Personal Information */}
            {currentStep === 0 && (
              <motion.div
                key="step-0"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Personal Information</h3>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="your@email.com"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="(123) 456-7890"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Professional Background */}
            {currentStep === 1 && (
              <motion.div
                key="step-1"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Professional Background</h3>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Current Real Estate License Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.licenseStatus}
                      onChange={(e) => handleInputChange('licenseStatus', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors.licenseStatus ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select license status</option>
                      <option value="Licensed">Currently Licensed</option>
                      <option value="Inactive">Inactive License</option>
                      <option value="Expired">Expired License</option>
                      <option value="Pre-licensing">In Pre-licensing</option>
                      <option value="None">No License Yet</option>
                    </select>
                    {errors.licenseStatus && <p className="text-red-500 text-sm mt-1">{errors.licenseStatus}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        License Number
                      </label>
                      <input
                        type="text"
                        value={formData.licenseNumber}
                        onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Your license number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Licensed States
                      </label>
                      <input
                        type="text"
                        value={formData.licensedStates}
                        onChange={(e) => handleInputChange('licensedStates', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="e.g., CA, NY, FL"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Years of Experience <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.yearsExperience}
                      onChange={(e) => handleInputChange('yearsExperience', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors.yearsExperience ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select experience</option>
                      <option value="0-1 years">0-1 years</option>
                      <option value="1-3 years">1-3 years</option>
                      <option value="3-5 years">3-5 years</option>
                      <option value="5-10 years">5-10 years</option>
                      <option value="10+ years">10+ years</option>
                    </select>
                    {errors.yearsExperience && <p className="text-red-500 text-sm mt-1">{errors.yearsExperience}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Current Brokerage (if applicable)
                    </label>
                    <input
                      type="text"
                      value={formData.currentBrokerage}
                      onChange={(e) => handleInputChange('currentBrokerage', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Current brokerage name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Areas of Expertise (Check all that apply) <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        'Real Estate',
                        'Mortgage',
                        'Tax & Accounting',
                        'Insurance',
                        'Home Improvement',
                        'Others'
                      ].map((expertise) => (
                        <label key={expertise} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.areasOfExpertise.includes(expertise)}
                            onChange={() => handleCheckboxChange('areasOfExpertise', expertise)}
                            className="mr-2 text-green-600 focus:ring-green-500"
                          />
                          {expertise}
                        </label>
                      ))}
                    </div>
                    {errors.areasOfExpertise && <p className="text-red-500 text-sm mt-1">{errors.areasOfExpertise}</p>}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Expertise & Motivation */}
            {currentStep === 2 && (
              <motion.div
                key="step-2"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Expertise & Motivation</h3>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Why do you want to become a sponsored agent with BS Realty LLC? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={formData.whyBecomeAgent}
                      onChange={(e) => handleInputChange('whyBecomeAgent', e.target.value)}
                      rows={4}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors.whyBecomeAgent ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Tell us why you're interested in joining our team..."
                    />
                    {errors.whyBecomeAgent && <p className="text-red-500 text-sm mt-1">{errors.whyBecomeAgent}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      What are you looking for in a sponsorship arrangement?
                    </label>
                    <textarea
                      value={formData.sponsorshipInterest}
                      onChange={(e) => handleInputChange('sponsorshipInterest', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Describe what you hope to achieve..."
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Documents */}
            {currentStep === 3 && (
              <motion.div
                key="step-3"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Documents & Final Submission</h3>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Upload your resume <span className="text-red-500">*</span>
                    </label>
                    <p className="text-gray-600 mb-4">
                      PDF is preferred for your resume or professional background summary.
                    </p>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors">
                      <FaCloudUploadAlt className="mx-auto text-4xl text-gray-400 mb-4" />
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                        id="resume-upload"
                      />
                      <label htmlFor="resume-upload" className="cursor-pointer">
                        <span className="text-green-600 hover:text-green-700 font-medium">
                          Click to upload
                        </span>
                        <span className="text-gray-500"> or drag and drop</span>
                      </label>
                      <p className="text-sm text-gray-500 mt-2">
                        Document or PDF file types are accepted. Max 10 MB.
                      </p>
                      {formData.resume && (
                        <p className="text-green-600 mt-2 font-medium">
                          Selected: {formData.resume.name}
                        </p>
                      )}
                    </div>
                    {errors.resume && <p className="text-red-500 text-sm mt-1">{errors.resume}</p>}
                  </div>

                  <div className="bg-blue-50 p-6 rounded-lg">
                    <p className="text-blue-800 text-sm">
                      By submitting this application, you agree that the information provided is true and accurate to the best of your knowledge. BS Realty LLC will review your application for sponsorship eligibility.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-10 pt-6 border-t border-gray-200">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  <FaArrowLeft size={16} />
                  Previous
                </button>
              )}

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors ml-auto"
                >
                  Next
                  <FaArrowRight size={16} />
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors ml-auto font-semibold"
                >
                  Submit Application
                  <FaCheck size={16} />
                </button>
              )}
            </div>

            <div className="text-center mt-4 text-sm text-gray-500">
              Step {currentStep + 1} of 4
            </div>
          </form>
        )}
      </div>
    </div>
  );
}