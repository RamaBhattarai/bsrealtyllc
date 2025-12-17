'use client'

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight, FaCheck } from 'react-icons/fa';

export default function InsuranceQuote() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Refs for required fields
  const fullNameRef = useRef<HTMLInputElement>(null);
  const dobRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const dlNumberRef = useRef<HTMLInputElement>(null);
  const dlStatusRef = useRef<HTMLDivElement>(null);
  const dlSuspendedRef = useRef<HTMLDivElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const yearsAtAddressRef = useRef<HTMLInputElement>(null);
  const maritalStatusRef = useRef<HTMLDivElement>(null);
  const occupationRef = useRef<HTMLInputElement>(null);
  const militaryRef = useRef<HTMLDivElement>(null);
  const paperlessRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    fullName: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    phone: '',
    dlNumber: '',
    dlState: '',
    ageLicensed: '',
    dlStatus: '',
    licenseSuspendedYears: '',
    primaryAddress: '',
    yearsAtAddress: '',
    monthsAtAddress: '',
    previousAddress: '',
    maritalStatus: '',
    occupation: '',
    military: '',
    paperless: '',

    // Step 2: Co-Applicant
    coApplicantRelationship: '',
    coApplicantFullName: '',
    coApplicantDOB: '',
    coApplicantDLNumber: '',
    coApplicantMilitary: '',

    // Step 3: Auto Section
    priorCarrier: '',
    yearsWithPrior: '',
    priorExpirationDate: '',
    newEffectiveDate: '',
    vin: '',
    datePurchased: '',
    vehicleUse: '',
    milesPerDay: '',
    ownershipType: '',
    bodilyInjury: '',
    propertyDamage: '',
    uninsuredMotor: '',
    comprehensiveDeduction: '',
    collisionDeduction: '',
    towingCoverage: '',
    rentalCoverage: '',

    // Step 4: Property Section
    propertyAddress: '',
    propertyPriorCarrier: '',
    propertyPurchaseDate: '',
    currentPolicyExpiration: '',
    yearsWithPriorPolicy: '',
    yearsContinuousPolicy: '',
    newPropertyEffectiveDate: '',
    dwellingUsage: '',
    occupancyType: '',
    foundationType: '',
    roofType: '',
    additionalInfo: '',
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData.gender) newErrors.gender = 'Gender is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.dlNumber.trim()) newErrors.dlNumber = 'Driver license number is required';
      if (!formData.dlStatus) newErrors.dlStatus = 'Driver license status is required';
      if (!formData.licenseSuspendedYears) newErrors.licenseSuspendedYears = 'Please select an option';
      if (!formData.primaryAddress.trim()) newErrors.primaryAddress = 'Primary address is required';
      if (!formData.yearsAtAddress) newErrors.yearsAtAddress = 'Years at address is required';
      if (!formData.maritalStatus) newErrors.maritalStatus = 'Marital status is required';
      if (!formData.occupation.trim()) newErrors.occupation = 'Occupation is required';
      if (!formData.military) newErrors.military = 'Military service is required';
      if (!formData.paperless) newErrors.paperless = 'Paperless preference is required';
    } else if (step === 2) {
      if (!formData.vin.trim()) newErrors.vin = 'VIN is required';
      if (!formData.datePurchased) newErrors.datePurchased = 'Date purchased is required';
      if (!formData.vehicleUse.trim()) newErrors.vehicleUse = 'Vehicle use is required';
    } else if (step === 3) {
      if (!formData.propertyAddress.trim()) newErrors.propertyAddress = 'Property address is required';
      if (!formData.dwellingUsage) newErrors.dwellingUsage = 'Dwelling usage is required';
      if (!formData.occupancyType) newErrors.occupancyType = 'Occupancy type is required';
      if (!formData.foundationType) newErrors.foundationType = 'Foundation type is required';
      if (!formData.roofType) newErrors.roofType = 'Roof type is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setTimeout(() => {
        if (newErrors.fullName && fullNameRef.current) {
          fullNameRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
          fullNameRef.current.focus();
        } else if (newErrors.dateOfBirth && dobRef.current) {
          dobRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
          dobRef.current.focus();
        } else if (newErrors.gender && genderRef.current) {
          genderRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (newErrors.email && emailRef.current) {
          emailRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
          emailRef.current.focus();
        }
      }, 0);
    }

    return Object.keys(newErrors).length === 0;
  };

  const nextStep = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (validateStep(currentStep) && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    console.log('Insurance Quote submitted:', formData);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setCurrentStep(0);
      setErrors({});
      setFormData({
        fullName: '',
        dateOfBirth: '',
        gender: '',
        email: '',
        phone: '',
        dlNumber: '',
        dlState: '',
        ageLicensed: '',
        dlStatus: '',
        licenseSuspendedYears: '',
        primaryAddress: '',
        yearsAtAddress: '',
        monthsAtAddress: '',
        previousAddress: '',
        maritalStatus: '',
        occupation: '',
        military: '',
        paperless: '',
        coApplicantRelationship: '',
        coApplicantFullName: '',
        coApplicantDOB: '',
        coApplicantDLNumber: '',
        coApplicantMilitary: '',
        priorCarrier: '',
        yearsWithPrior: '',
        priorExpirationDate: '',
        newEffectiveDate: '',
        vin: '',
        datePurchased: '',
        vehicleUse: '',
        milesPerDay: '',
        ownershipType: '',
        bodilyInjury: '',
        propertyDamage: '',
        uninsuredMotor: '',
        comprehensiveDeduction: '',
        collisionDeduction: '',
        towingCoverage: '',
        rentalCoverage: '',
        propertyAddress: '',
        propertyPriorCarrier: '',
        propertyPurchaseDate: '',
        currentPolicyExpiration: '',
        yearsWithPriorPolicy: '',
        yearsContinuousPolicy: '',
        newPropertyEffectiveDate: '',
        dwellingUsage: '',
        occupancyType: '',
        foundationType: '',
        roofType: '',
        additionalInfo: '',
      });
    }, 3000);
  };

  const stepVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 pt-32 pb-12">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-700 flex items-center gap-2 mb-4">
            <FaArrowLeft size={16} /> Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Request an Insurance Quote</h1>
          <p className="text-gray-600">
            Use this form to request a quote for Auto, Home, or Commercial Property Insurance. There is no obligation to purchase insurance by submitting this form.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            A licensed agent will review your information and follow up with you shortly.
          </p>
          <p className="text-xs text-gray-500 mt-2 italic">
            Note: Submission of this form does not guarantee coverage or bind a policy. Coverage is subject to underwriting approval and carrier guidelines.
          </p>
        </div>

        {/* Progress indicator */}
        <div className="mb-8 flex items-center justify-between">
          {[0, 1, 2, 3].map((step) => (
            <div key={step} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  step < currentStep
                    ? 'bg-blue-600 text-white'
                    : step === currentStep
                      ? 'bg-blue-600 text-white ring-4 ring-blue-300'
                      : 'bg-gray-300 text-gray-600'
                }`}
              >
                {step < currentStep ? <FaCheck size={18} /> : step + 1}
              </div>
              {step < 3 && (
                <div
                  className={`flex-1 h-1 mx-2 transition-all ${
                    step < currentStep ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>

              {/* Full Name */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  ref={fullNameRef}
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>

              {/* Date of Birth */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  ref={dobRef}
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
                {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
              </div>

              {/* Gender */}
              <div className="mb-6" ref={genderRef}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Gender <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {['Male', 'Female', 'Not Specified'].map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value={option}
                        checked={formData.gender === option}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="ml-2 text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
                {errors.gender && <p className="text-red-500 text-sm mt-2">{errors.gender}</p>}
              </div>

              {/* Email */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  ref={emailRef}
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Phone Number */}
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              {/* Driver License Number */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Driver License Number <span className="text-red-500">*</span>
                </label>
                <input
                  ref={dlNumberRef}
                  type="text"
                  placeholder="Enter your driver license number"
                  value={formData.dlNumber}
                  onChange={(e) => handleInputChange('dlNumber', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
                {errors.dlNumber && <p className="text-red-500 text-sm mt-1">{errors.dlNumber}</p>}
              </div>

              {/* DL State and Age Licensed */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">DL State</label>
                  <input
                    type="text"
                    placeholder="e.g., CA, NY, TX"
                    value={formData.dlState}
                    onChange={(e) => handleInputChange('dlState', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Age Licensed</label>
                  <input
                    type="number"
                    placeholder="Age"
                    value={formData.ageLicensed}
                    onChange={(e) => handleInputChange('ageLicensed', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              {/* DL Status */}
              <div className="mb-6" ref={dlStatusRef}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  DL Status <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {['Valid', 'Permit', 'Expired', 'Suspended', 'Cancelled', 'Permanently Revoked'].map((status) => (
                    <label key={status} className="flex items-center">
                      <input
                        type="radio"
                        name="dlStatus"
                        value={status}
                        checked={formData.dlStatus === status}
                        onChange={(e) => handleInputChange('dlStatus', e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="ml-2 text-gray-700">{status}</span>
                    </label>
                  ))}
                </div>
                {errors.dlStatus && <p className="text-red-500 text-sm mt-2">{errors.dlStatus}</p>}
              </div>

              {/* License Suspended/Revoked */}
              <div className="mb-6" ref={dlSuspendedRef}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  License Suspended/Revoked (last 5 years) <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {['Yes', 'No'].map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="licenseSuspendedYears"
                        value={option}
                        checked={formData.licenseSuspendedYears === option}
                        onChange={(e) => handleInputChange('licenseSuspendedYears', e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="ml-2 text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
                {errors.licenseSuspendedYears && <p className="text-red-500 text-sm mt-2">{errors.licenseSuspendedYears}</p>}
              </div>

              {/* Primary Address */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Primary Address <span className="text-red-500">*</span>
                </label>
                <input
                  ref={addressRef}
                  type="text"
                  placeholder="Enter your primary address"
                  value={formData.primaryAddress}
                  onChange={(e) => handleInputChange('primaryAddress', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
                {errors.primaryAddress && <p className="text-red-500 text-sm mt-1">{errors.primaryAddress}</p>}
              </div>

              {/* Years and Months at Address */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Years at Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    ref={yearsAtAddressRef}
                    type="number"
                    placeholder="Years"
                    value={formData.yearsAtAddress}
                    onChange={(e) => handleInputChange('yearsAtAddress', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                  {errors.yearsAtAddress && <p className="text-red-500 text-sm mt-1">{errors.yearsAtAddress}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Months</label>
                  <input
                    type="number"
                    placeholder="Months"
                    value={formData.monthsAtAddress}
                    onChange={(e) => handleInputChange('monthsAtAddress', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              {/* Previous Address */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Address for Last Three Years if Primary Address is Below 3 Years
                </label>
                <input
                  type="text"
                  placeholder="Enter previous address if applicable"
                  value={formData.previousAddress}
                  onChange={(e) => handleInputChange('previousAddress', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Marital Status */}
              <div className="mb-6" ref={maritalStatusRef}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Marital Status <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {['Single', 'Married', 'Domestic Partner', 'Divorced', 'Widowed', 'Separated'].map((status) => (
                    <label key={status} className="flex items-center">
                      <input
                        type="radio"
                        name="maritalStatus"
                        value={status}
                        checked={formData.maritalStatus === status}
                        onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="ml-2 text-gray-700">{status}</span>
                    </label>
                  ))}
                </div>
                {errors.maritalStatus && <p className="text-red-500 text-sm mt-2">{errors.maritalStatus}</p>}
              </div>

              {/* Occupation */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Occupation <span className="text-red-500">*</span>
                </label>
                <input
                  ref={occupationRef}
                  type="text"
                  placeholder="Enter your occupation"
                  value={formData.occupation}
                  onChange={(e) => handleInputChange('occupation', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
                {errors.occupation && <p className="text-red-500 text-sm mt-1">{errors.occupation}</p>}
              </div>

              {/* Military Service */}
              <div className="mb-6" ref={militaryRef}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Are you currently enlisted or have you previously served in the military? <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {['Yes', 'No'].map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="military"
                        value={option}
                        checked={formData.military === option}
                        onChange={(e) => handleInputChange('military', e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="ml-2 text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
                {errors.military && <p className="text-red-500 text-sm mt-2">{errors.military}</p>}
              </div>

              {/* Paperless */}
              <div className="mb-6" ref={paperlessRef}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Paperless <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {['Yes', 'No'].map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="paperless"
                        value={option}
                        checked={formData.paperless === option}
                        onChange={(e) => handleInputChange('paperless', e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="ml-2 text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
                {errors.paperless && <p className="text-red-500 text-sm mt-2">{errors.paperless}</p>}
              </div>
            </motion.div>
          )}

          {/* Step 2: Co-Applicant */}
          {currentStep === 1 && (
            <motion.div
              key="step-1"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Co-Applicant Information</h2>
              <p className="text-gray-600 mb-6 text-sm">This section is optional. Fill in if you have a co-applicant.</p>

              {/* Relationship */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Relationship</label>
                <select
                  value={formData.coApplicantRelationship}
                  onChange={(e) => handleInputChange('coApplicantRelationship', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">Select relationship</option>
                  {['Spouse', 'Child', 'Parent', 'Domestic Partner', 'Relative', 'Others'].map((rel) => (
                    <option key={rel} value={rel}>
                      {rel}
                    </option>
                  ))}
                </select>
              </div>

              {/* Co-Applicant Full Name */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter co-applicant full name"
                  value={formData.coApplicantFullName}
                  onChange={(e) => handleInputChange('coApplicantFullName', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Co-Applicant DOB */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth</label>
                <input
                  type="date"
                  value={formData.coApplicantDOB}
                  onChange={(e) => handleInputChange('coApplicantDOB', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Co-Applicant DL Number */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Driver License Number</label>
                <input
                  type="text"
                  placeholder="Enter co-applicant driver license number"
                  value={formData.coApplicantDLNumber}
                  onChange={(e) => handleInputChange('coApplicantDLNumber', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Co-Applicant Military */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Are you currently enlisted or have you previously served in the military?
                </label>
                <div className="space-y-2">
                  {['Yes', 'No'].map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="coApplicantMilitary"
                        value={option}
                        checked={formData.coApplicantMilitary === option}
                        onChange={(e) => handleInputChange('coApplicantMilitary', e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="ml-2 text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <p className="text-sm text-gray-500 italic mt-8">
                Additional co-applicants can be added by contacting our office directly.
              </p>
            </motion.div>
          )}

          {/* Step 3: Auto Section */}
          {currentStep === 2 && (
            <motion.div
              key="step-2"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Auto Insurance Information</h2>
              <p className="text-gray-600 mb-6 text-sm">All fields below are mandatory for auto insurance</p>

              {/* Prior Carrier */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Prior Carrier</label>
                <input
                  type="text"
                  placeholder="Enter your previous insurance carrier"
                  value={formData.priorCarrier}
                  onChange={(e) => handleInputChange('priorCarrier', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Years with Prior */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Years with Prior Policy</label>
                <input
                  type="number"
                  placeholder="Years"
                  value={formData.yearsWithPrior}
                  onChange={(e) => handleInputChange('yearsWithPrior', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* VIN */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Vehicle Identification Number (VIN) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter VIN"
                  value={formData.vin}
                  onChange={(e) => handleInputChange('vin', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
                {errors.vin && <p className="text-red-500 text-sm mt-1">{errors.vin}</p>}
              </div>

              {/* Date Purchased */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date Purchased <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.datePurchased}
                  onChange={(e) => handleInputChange('datePurchased', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
                {errors.datePurchased && <p className="text-red-500 text-sm mt-1">{errors.datePurchased}</p>}
              </div>

              {/* Vehicle Use */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Vehicle Use <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Commute, Business, Pleasure"
                  value={formData.vehicleUse}
                  onChange={(e) => handleInputChange('vehicleUse', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
                {errors.vehicleUse && <p className="text-red-500 text-sm mt-1">{errors.vehicleUse}</p>}
              </div>

              {/* Miles Per Day */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Miles Used per Day</label>
                <input
                  type="number"
                  placeholder="Average miles"
                  value={formData.milesPerDay}
                  onChange={(e) => handleInputChange('milesPerDay', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Coverage Options */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Bodily Injury Liability</label>
                <select
                  value={formData.bodilyInjury}
                  onChange={(e) => handleInputChange('bodilyInjury', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">Select coverage</option>
                  {['State Minimum', '25/50', '50/100', '100/300'].map((cov) => (
                    <option key={cov} value={cov}>
                      {cov}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Property Damage Liability</label>
                <select
                  value={formData.propertyDamage}
                  onChange={(e) => handleInputChange('propertyDamage', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">Select coverage</option>
                  {['State Minimum', '25000', '50000', '100000', '250000'].map((cov) => (
                    <option key={cov} value={cov}>
                      {cov}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Uninsured/Underinsured Motorist Coverage</label>
                <div className="space-y-2">
                  {['Yes', 'No'].map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="uninsuredMotor"
                        value={option}
                        checked={formData.uninsuredMotor === option}
                        onChange={(e) => handleInputChange('uninsuredMotor', e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="ml-2 text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Comprehensive Deduction</label>
                <select
                  value={formData.comprehensiveDeduction}
                  onChange={(e) => handleInputChange('comprehensiveDeduction', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">Select deduction</option>
                  {['No coverage', '$0', '$50', '$100', '$200', '$500', '$1000', '$2000', '$2500'].map((ded) => (
                    <option key={ded} value={ded}>
                      {ded}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Collision Deduction</label>
                <select
                  value={formData.collisionDeduction}
                  onChange={(e) => handleInputChange('collisionDeduction', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">Select deduction</option>
                  {['No coverage', '$0', '$50', '$100', '$200', '$500', '$1000', '$2000', '$2500'].map((ded) => (
                    <option key={ded} value={ded}>
                      {ded}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>
          )}

          {/* Step 4: Property Section */}
          {currentStep === 3 && (
            <motion.div
              key="step-3"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Property Insurance Information</h2>
              <p className="text-gray-600 mb-6 text-sm">All fields below are mandatory for Property insurance</p>

              {/* Property Address */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Property Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter property address"
                  value={formData.propertyAddress}
                  onChange={(e) => handleInputChange('propertyAddress', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
                {errors.propertyAddress && <p className="text-red-500 text-sm mt-1">{errors.propertyAddress}</p>}
              </div>

              {/* Property Prior Carrier */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Prior Carrier</label>
                <input
                  type="text"
                  placeholder="Enter previous property insurance carrier"
                  value={formData.propertyPriorCarrier}
                  onChange={(e) => handleInputChange('propertyPriorCarrier', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Property Purchase Date */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Property Purchased Date</label>
                <input
                  type="date"
                  value={formData.propertyPurchaseDate}
                  onChange={(e) => handleInputChange('propertyPurchaseDate', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Dwelling Usage */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Dwelling Usage <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.dwellingUsage}
                  onChange={(e) => handleInputChange('dwellingUsage', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                >
                  <option value="">Select usage</option>
                  {['Primary Home', 'Secondary Home', 'Seasonal Home', 'Farm', 'Rental Property', 'Commercial Property'].map((usage) => (
                    <option key={usage} value={usage}>
                      {usage}
                    </option>
                  ))}
                </select>
                {errors.dwellingUsage && <p className="text-red-500 text-sm mt-1">{errors.dwellingUsage}</p>}
              </div>

              {/* Occupancy Type */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Occupancy Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.occupancyType}
                  onChange={(e) => handleInputChange('occupancyType', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                >
                  <option value="">Select occupancy type</option>
                  {['Owner Occupied', 'Renter Occupied', 'Unoccupied', 'Vacant', 'Business'].map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.occupancyType && <p className="text-red-500 text-sm mt-1">{errors.occupancyType}</p>}
              </div>

              {/* Foundation Type */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Foundation Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.foundationType}
                  onChange={(e) => handleInputChange('foundationType', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                >
                  <option value="">Select foundation type</option>
                  {[
                    'Basement - Finished',
                    'Basement - Partially Finished',
                    'Basement - Unfinished',
                    'Crawl Space - Enclosed',
                    'Crawl Space - Open',
                    'Slab',
                    'Piers',
                    'Pilings/stilts',
                    'Hillside Foundation',
                    'Other',
                  ].map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.foundationType && <p className="text-red-500 text-sm mt-1">{errors.foundationType}</p>}
              </div>

              {/* Roof Type */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Roof Type (Main Material) <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.roofType}
                  onChange={(e) => handleInputChange('roofType', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                >
                  <option value="">Select roof type</option>
                  {[
                    'Architectural Shingles',
                    'Asphalt Shingles',
                    'Composition',
                    'Copper',
                    'Corrugated Steel',
                    'Fiberglass',
                    'Foam',
                    'Gravel',
                    'Metal',
                    'Plastic',
                    'Tar',
                    'Slate',
                    'Other',
                  ].map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.roofType && <p className="text-red-500 text-sm mt-1">{errors.roofType}</p>}
              </div>

              {/* Additional Information */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Additional Information
                </label>
                <textarea
                  placeholder="Updates, Year Built, Construction Style, endorsement, coverage, etc."
                  value={formData.additionalInfo}
                  onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
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

            {currentStep === 3 ? (
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all transform hover:scale-105"
              >
                <FaCheck size={18} /> Submit
              </button>
            ) : (
              <button
                type="button"
                onClick={(e) => nextStep(e)}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all transform hover:scale-105"
              >
                Next <FaArrowRight size={18} />
              </button>
            )}
          </div>
        </form>

        {/* Footer text */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Page {currentStep + 1} of 4
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
              className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6"
            >
              <FaCheck className="text-blue-600 text-2xl" />
            </motion.div>

            <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600 mb-2">Your insurance quote request has been received.</p>
            <p className="text-sm text-gray-500 mb-6">
              A licensed agent will review your information and contact you within 24 hours.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800 font-medium">
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
