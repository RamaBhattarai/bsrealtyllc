'use client'

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight, FaCheck } from 'react-icons/fa';
import { propertyInquiryAPI, PropertyInquiryFormData } from '../../lib/api/propertyInquiry.api';
<<<<<<< HEAD
import { formatPhone } from '../../lib/utils/common';
=======
>>>>>>> 4425388098c5463f38228bd7572a2ef8fe333abf
import toast from 'react-hot-toast';

export default function PropertyInquiry() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Refs for required fields
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const preferredContactRef = useRef<HTMLDivElement>(null);
  const purchaseTypeRef = useRef<HTMLDivElement>(null);
  const loanOfficerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<PropertyInquiryFormData>({
    // Step 1: Personal Info & Real Estate Needs
    name: '',
    phone: '',
    email: '',
    preferredContact: 'Phone call',
    realEstateNeeds: [],
    propertyType: [],
    budgetRange: '',
    timeline: '',
    locations: '',
    // Step 2: Mortgage & Financing
    purchaseType: 'Cash purchase',
    loanOfficerAssistance: 'Yes',
    concerns: '',
    // Step 3: Insurance Needs
    investmentInterest: [],
    insuranceInterest: [],
    additionalInfo: '',
  });

  const handleInputChange = (field: string, value: any) => {
<<<<<<< HEAD
    // Format phone number if the field is phone
    const formattedValue = field === 'phone' ? formatPhone(value) : value;
    setFormData((prev) => ({ ...prev, [field]: formattedValue } as PropertyInquiryFormData));
=======
    setFormData((prev) => ({ ...prev, [field]: value } as PropertyInquiryFormData));
>>>>>>> 4425388098c5463f38228bd7572a2ef8fe333abf
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleCheckboxChange = (field: string, value: string) => {
    setFormData((prev) => {
      const current = prev[field as keyof typeof prev] as string[];
      return {
        ...prev,
        [field]: current.includes(value)
          ? current.filter((item) => item !== value)
          : [...current, value],
      } as PropertyInquiryFormData;
    });
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.preferredContact) newErrors.preferredContact = 'Please select a preferred contact method';
    } else if (step === 1) {
      if (!formData.purchaseType) newErrors.purchaseType = 'Please select a purchase type';
      if (!formData.loanOfficerAssistance) newErrors.loanOfficerAssistance = 'Please select an option';
    }

    setErrors(newErrors);
    
    // Scroll to first error field
    if (Object.keys(newErrors).length > 0) {
      setTimeout(() => {
        if (newErrors.name && nameRef.current) {
          nameRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
          nameRef.current.focus();
        } else if (newErrors.phone && phoneRef.current) {
          phoneRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
          phoneRef.current.focus();
        } else if (newErrors.preferredContact && preferredContactRef.current) {
          preferredContactRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (newErrors.purchaseType && purchaseTypeRef.current) {
          purchaseTypeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (newErrors.loanOfficerAssistance && loanOfficerRef.current) {
          loanOfficerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 0);
    }
    
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (validateStep(currentStep) && currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(2)) return;
    
    try {
      console.log('Form submitted:', formData);
      await propertyInquiryAPI.submit(formData);
      toast.success('Property inquiry submitted successfully!');
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setCurrentStep(0);
        setErrors({});
        setFormData({
          name: '',
          phone: '',
          email: '',
          preferredContact: 'Phone call',
          realEstateNeeds: [],
          propertyType: [],
          budgetRange: '',
          timeline: '',
          locations: '',
          purchaseType: 'Cash purchase',
          loanOfficerAssistance: 'Yes',
          concerns: '',
          investmentInterest: [],
          insuranceInterest: [],
          additionalInfo: '',
        });
      }, 3000);
    } catch (error: any) {
      console.error('Submission error:', error);
      toast.error(error.message || 'Failed to submit property inquiry');
    }
  };

  const stepVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-blue-50 pt-32 pb-12">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-green-600 hover:text-green-700 flex items-center gap-2 mb-4">
            <FaArrowLeft size={16} /> Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Property Inquiry</h1>
          <p className="text-gray-600">
            Thank you for choosing BS Realty Services. Please complete this questionnaire so we can better serve your needs.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Questions? Contact us at (706) 261-8948 or bsrealtyllc@gmail.com
          </p>
        </div>

        {/* Progress indicator */}
        <div className="mb-8 flex items-center justify-between">
          {[0, 1, 2].map((step) => (
            <div key={step} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  step < currentStep
                    ? 'bg-green-600 text-white'
                    : step === currentStep
                      ? 'bg-green-600 text-white ring-4 ring-green-300'
                      : 'bg-gray-300 text-gray-600'
                }`}
              >
                {step < currentStep ? <FaCheck size={18} /> : step + 1}
              </div>
              {step < 2 && (
                <div
                  className={`flex-1 h-1 mx-2 transition-all ${
                    step < currentStep ? 'bg-green-600' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
          {/* Step 1: Personal Info & Real Estate Needs */}
          {currentStep === 0 && (
            <motion.div
              key="step-0"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information & Real Estate Needs</h2>

              {/* Name */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  ref={nameRef}
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Phone */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  ref={phoneRef}
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              {/* Email */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>

              {/* Preferred Contact */}
              <div className="mb-6" ref={preferredContactRef}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Preferred Method of Contact <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {['Phone call', 'Text message', 'Email'].map((method) => (
                    <label key={method} className="flex items-center">
                      <input
                        type="radio"
                        name="preferredContact"
                        value={method}
                        checked={formData.preferredContact === method}
                        onChange={(e) => handleInputChange('preferredContact', e.target.value)}
                        className="w-4 h-4 text-green-600"
                      />
                      <span className="ml-2 text-gray-700">{method}</span>
                    </label>
                  ))}
                </div>
                {errors.preferredContact && <p className="text-red-500 text-sm mt-2">{errors.preferredContact}</p>}
              </div>

              {/* Real Estate Needs */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Real Estate Needs</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {['Buying a home', 'Selling a home', 'Renting a home/apartment', 'Buying land', 'Selling land', 'Commercial property'].map((need) => (
                    <label key={need} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.realEstateNeeds.includes(need)}
                        onChange={() => handleCheckboxChange('realEstateNeeds', need)}
                        className="w-4 h-4 text-green-600 rounded"
                      />
                      <span className="ml-2 text-gray-700">{need}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Property Type */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Property Type</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {['Single-family home', 'Multi-family property', 'Condo/Apartment', 'New construction', 'Land/Lot'].map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.propertyType.includes(type)}
                        onChange={() => handleCheckboxChange('propertyType', type)}
                        className="w-4 h-4 text-green-600 rounded"
                      />
                      <span className="ml-2 text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Budget Range */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Budget Range or Expected Selling Price</label>
                <select
                  value={formData.budgetRange}
                  onChange={(e) => handleInputChange('budgetRange', e.target.value)}
                  className="w-full px-4 py-2 border bg-white! text-gray-700! border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                  <option value="">Select a range</option>
                  <option value="Under $200,000">Under $200,000</option>
                  <option value="$200,000-$300,000">$200,000 - $300,000</option>
                  <option value="$300,000-$400,000">$300,000 - $400,000</option>
                  <option value="$400,000-$500,000">$400,000 - $500,000</option>
                  <option value="$500,000-$600,000">$500,000 - $600,000</option>
                  <option value="Over $700,000">Over $700,000</option>
                </select>
              </div>

              {/* Timeline */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Timeline</label>
                <select
                  value={formData.timeline}
                  onChange={(e) => handleInputChange('timeline', e.target.value)}
                  className="w-full px-4 py-2 border  bg-white! text-gray-700! border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                  <option value="">Select timeline</option>
                  <option value="Immediately (within 1 month)">Immediately (within 1 month)</option>
                  <option value="Within 1-3 months">Within 1-3 months</option>
                  <option value="More than 3 months">More than 3 months</option>
                  <option value="No preference">No preference</option>
                </select>
              </div>

              {/* Desired Locations */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Desired Locations</label>
                <textarea
                  placeholder="Enter your preferred locations"
                  value={formData.locations}
                  onChange={(e) => handleInputChange('locations', e.target.value)}
                  className="w-full px-4 py-2 border bg-white! border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 resize-none"
                  rows={3}
                />
              </div>
            </motion.div>
          )}

          {/* Step 2: Mortgage & Financing */}
          {currentStep === 1 && (
            <motion.div
              key="step-1"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Mortgage & Financing</h2>

              {/* Purchase Type */}
              <div className="mb-6" ref={purchaseTypeRef}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Will this be a cash purchase, mortgage loan, or refinance? <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {['Cash purchase', 'Mortgage loan', 'Refinance'].map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="radio"
                        name="purchaseType"
                        value={type}
                        checked={formData.purchaseType === type}
                        onChange={(e) => handleInputChange('purchaseType', e.target.value)}
                        className="w-4 h-4 text-green-600"
                      />
                      <span className="ml-2 text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
                {errors.purchaseType && <p className="text-red-500 text-sm mt-2">{errors.purchaseType}</p>}
              </div>

              {/* Loan Officer Assistance */}
              <div className="mb-6" ref={loanOfficerRef}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Would you like assistance connecting with a BS Realty loan officer? <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {['Yes', 'No', 'Maybe'].map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="loanOfficerAssistance"
                        value={option}
                        checked={formData.loanOfficerAssistance === option}
                        onChange={(e) => handleInputChange('loanOfficerAssistance', e.target.value)}
                        className="w-4 h-4 text-green-600"
                      />
                      <span className="ml-2 text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
                {errors.loanOfficerAssistance && <p className="text-red-500 text-sm mt-2">{errors.loanOfficerAssistance}</p>}
              </div>

              {/* Concerns */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Are there any potential challenges or concerns that may affect your ability to purchase a property?
                </label>
                <textarea
                  placeholder="e.g., legal issues, financing challenges, time constraints, etc."
                  value={formData.concerns}
                  onChange={(e) => handleInputChange('concerns', e.target.value)}
                  className="w-full px-4 py-2 bg-white! border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 resize-none"
                  rows={4}
                />
              </div>
            </motion.div>
          )}

          {/* Step 3: Insurance Needs */}
          {currentStep === 2 && (
            <motion.div
              key="step-2"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Insurance Needs</h2>

              {/* Investment Interest */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Are you interested in investment advice related to real estate?</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {['Residential investments', 'Commercial investments', 'Land development investments', 'Not at this time'].map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.investmentInterest.includes(option)}
                        onChange={() => handleCheckboxChange('investmentInterest', option)}
                        className="w-4 h-4 text-green-600 rounded"
                      />
                      <span className="ml-2 text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Insurance Interest */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Are you interested in insurance services through BS Realty?</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {['Homeowners Insurance', 'Renters Insurance', 'Auto Insurance', 'Business/Commercial Insurance', 'Not at this time'].map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.insuranceInterest.includes(option)}
                        onChange={() => handleCheckboxChange('insuranceInterest', option)}
                        className="w-4 h-4 text-green-600 rounded"
                      />
                      <span className="ml-2 text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Is there any additional information you would like to provide?</label>
                <textarea
                  placeholder="Please share any additional information"
                  value={formData.additionalInfo}
                  onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                  className="w-full px-4 py-2 bg-white! border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 resize-none"
                  rows={4}
                />
              </div>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between gap-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={(e) => prevStep(e)}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition-all ${
                currentStep === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FaArrowLeft size={18} /> Back
            </button>

            {currentStep === 2 ? (
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all transform hover:scale-105"
              >
                <FaCheck size={18} /> Submit
              </button>
            ) : (
              <button
                type="button"
                onClick={(e) => nextStep(e)}
                className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all transform hover:scale-105"
              >
                Next <FaArrowRight size={18} />
              </button>
            )}
          </div>
        </form>

        {/* Footer text */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Page {currentStep + 1} of 3
        </p>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full mx-4 text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6"
            >
              <FaCheck className="text-green-600 text-2xl" />
            </motion.div>

            <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600 mb-2">Your inquiry has been successfully submitted.</p>
            <p className="text-sm text-gray-500 mb-6">
              Our team will review your information and contact you shortly.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-green-800 font-medium">
                📧 We'll reach out to you at: <strong>{formData.email || formData.phone}</strong>
              </p>
            </div>

            <p className="text-xs text-gray-500">
              Redirecting you home in a moment...
            </p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

