'use client'

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight, FaCheck, FaCloudUploadAlt } from 'react-icons/fa';
import { jobs } from '@/lib/jobsData';
import { useParams, useRouter } from 'next/navigation';

export default function JobApplicationForm() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const job = jobs.find(j => j.slug === slug);

  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  // Refs for required fields
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    // Step 1: Personal & Basic Info
    name: '',
    email: '',
    phone: '',
    timeZones: '',
    startupExperience: '',
    workArrangement: '',
    workSetting: '',
    availability: '',
    position: job?.title || '',
    compensation: '',
    yearsExperience: '',
    technicalSkills: [] as string[],
    programmingLanguages: [] as string[],
    portfolioLinks: '',
    pastProjects: '',
    certifications: '',
    recentProject: '',
    whyWorkHere: '',
    referral: '',
    // Step 2: Additional Info
    // Step 3: Resume Upload
    resume: null as File | null,
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

  const handleCheckboxChange = (field: string, value: string) => {
    setFormData((prev) => {
      const current = prev[field as keyof typeof prev] as string[];
      return {
        ...prev,
        [field]: current.includes(value)
          ? current.filter((item) => item !== value)
          : [...current, value],
      };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, resume: file }));
    if (errors.resume) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.resume;
        return newErrors;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
      if (!formData.name.trim()) newErrors.name = 'Full Name is required';
      if (!formData.email.trim()) newErrors.email = 'Email Address is required';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    } else if (step === 1) {
      if (!formData.timeZones) newErrors.timeZones = 'Please answer this question';
      if (!formData.startupExperience) newErrors.startupExperience = 'Please answer this question';
      if (!formData.workArrangement) newErrors.workArrangement = 'Please select work arrangement';
      if (!formData.workSetting) newErrors.workSetting = 'Please select work setting';
      if (!formData.availability) newErrors.availability = 'Please select availability';
      if (!formData.compensation.trim()) newErrors.compensation = 'Expected compensation is required';
    } else if (step === 2) {
      if (!formData.yearsExperience) newErrors.yearsExperience = 'Years of experience is required';
      if (formData.technicalSkills.length === 0) newErrors.technicalSkills = 'Please select at least one technical skill';
      if (formData.programmingLanguages.length === 0) newErrors.programmingLanguages = 'Please select at least one programming language';
    } else if (step === 3) {
      if (!formData.whyWorkHere.trim()) newErrors.whyWorkHere = 'This field is required';
      if (!formData.resume) newErrors.resume = 'Resume upload is required';
    }

    setErrors(newErrors);

    // Scroll to first error field
    if (Object.keys(newErrors).length > 0) {
      setTimeout(() => {
        if (newErrors.name && nameRef.current) {
          nameRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
          nameRef.current.focus();
        } else if (newErrors.email && emailRef.current) {
          emailRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
          emailRef.current.focus();
        } else if (newErrors.phone && phoneRef.current) {
          phoneRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
          phoneRef.current.focus();
        }
      }, 0);
    }

    return Object.keys(newErrors).length === 0;
  };

  const nextStep = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (validateStep(currentStep) && currentStep < 3) {
      setCurrentStep(currentStep + 1);
      // Scroll to top of form when moving to next step
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  };

  const prevStep = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;
    
    console.log('Job application submitted:', formData);
    setShowSuccess(true);
    
    // Redirect to job listings page after showing success message
    setTimeout(() => {
      router.push('/job-listings');
    }, 3000); // 3 seconds delay
  };

  const stepVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pt-32 pb-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <Link href={`/job-details/${job.slug}`} className="text-green-600 hover:text-green-700 flex items-center gap-2 mb-4">
            <FaArrowLeft size={16} /> Back to Job Details
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Job Application</h1>
          <h2 className="text-2xl font-semibold text-green-600 mb-4">Hiring</h2>
          <p className="text-gray-600 mb-4">
            We are looking for a passionate and experienced software development team to join us in creating cutting-edge solutions that will shape the future. Are you a skilled team of software developers ready to take on exciting and innovative projects? If so, please fill out the application as accurate as possible. After submitting we will review your application and get back to you as soon as possible.
          </p>
          <p className="text-sm text-gray-500">
            Questions? Contact us at (706) 261-8948 or bsrealtyllc@gmail.com
          </p>
        </div>

        {/* Progress indicator */}
        <div className="mb-8 flex items-center justify-between">
          {[0, 1, 2, 3].map((step) => (
            <div key={step} className="flex items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step < currentStep
                    ? 'bg-green-600 text-white'
                    : step === currentStep
                      ? 'bg-green-600 text-white ring-4 ring-green-300'
                      : 'bg-gray-300 text-gray-600'
                }`}
              >
                {step < currentStep ? <FaCheck size={14} /> : step + 1}
              </div>
              {step < 3 && (
                <div
                  className={`flex-1 h-1 mx-1 transition-all ${
                    step < currentStep ? 'bg-green-600' : 'bg-gray-300'
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
                Thank you for your interest in joining BS Realty LLC. We have received your application and will review it carefully. Our team will reach out to you within 3-5 business days.
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
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 md:p-10">
          {/* Step 1: Personal & Professional Info */}
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
                      ref={nameRef}
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
                      ref={emailRef}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      ref={phoneRef}
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Position You Are Applying For
                    </label>
                    <input
                      type="text"
                      value={formData.position}
                      onChange={(e) => handleInputChange('position', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Position title"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Work Preferences */}
          {currentStep === 1 && (
            <motion.div
              key="step-1"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Work Preferences</h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Are you open to work in different time zones? <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    {['Yes', 'No'].map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="radio"
                          name="timeZones"
                          value={option}
                          checked={formData.timeZones === option}
                          onChange={(e) => handleInputChange('timeZones', e.target.value)}
                          className="mr-2 text-green-600 focus:ring-green-500"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                  {errors.timeZones && <p className="text-red-500 text-sm mt-1">{errors.timeZones}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Have you worked in a startup environment before? <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    {['Yes', 'No'].map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="radio"
                          name="startupExperience"
                          value={option}
                          checked={formData.startupExperience === option}
                          onChange={(e) => handleInputChange('startupExperience', e.target.value)}
                          className="mr-2 text-green-600 focus:ring-green-500"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                  {errors.startupExperience && <p className="text-red-500 text-sm mt-1">{errors.startupExperience}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Preferred Work Arrangement <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.workArrangement}
                      onChange={(e) => handleInputChange('workArrangement', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors.workArrangement ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select arrangement</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Freelance">Freelance</option>
                    </select>
                    {errors.workArrangement && <p className="text-red-500 text-sm mt-1">{errors.workArrangement}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Work Setting <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.workSetting}
                      onChange={(e) => handleInputChange('workSetting', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors.workSetting ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select setting</option>
                      <option value="Remote">Remote</option>
                      <option value="On-site">On-site</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                    {errors.workSetting && <p className="text-red-500 text-sm mt-1">{errors.workSetting}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Availability to start <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.availability}
                      onChange={(e) => handleInputChange('availability', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors.availability ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select availability</option>
                      <option value="Immediately">Immediately</option>
                      <option value="2 weeks">2 weeks</option>
                      <option value="1 month">1 month</option>
                      <option value="2-3 months">2-3 months</option>
                      <option value="3+ months">3+ months</option>
                    </select>
                    {errors.availability && <p className="text-red-500 text-sm mt-1">{errors.availability}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Expected Compensation (Monthly/Project Based) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.compensation}
                      onChange={(e) => handleInputChange('compensation', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors.compensation ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="$50,000 or $50/hour"
                    />
                    {errors.compensation && <p className="text-red-500 text-sm mt-1">{errors.compensation}</p>}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Experience & Skills */}
          {currentStep === 2 && (
            <motion.div
              key="step-2"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Experience & Skills</h3>

              <div className="space-y-6">
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
                    Technical Skills (Check all that apply) <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      'Frontend Development',
                      'Backend Development',
                      'Full-stack Development',
                      'UI/UX Design',
                      'Mobile App Development',
                      'Database Management',
                      'DevOps',
                      'Quality Assurance',
                      'Other'
                    ].map((skill) => (
                      <label key={skill} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.technicalSkills.includes(skill)}
                          onChange={() => handleCheckboxChange('technicalSkills', skill)}
                          className="mr-2 text-green-600 focus:ring-green-500"
                        />
                        {skill}
                      </label>
                    ))}
                  </div>
                  {errors.technicalSkills && <p className="text-red-500 text-sm mt-1">{errors.technicalSkills}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Programming Languages & Technical Background (Check all that apply) <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      'Angular', 'React', 'Django', 'Node.js', 'Flutter', 'React Native',
                      'Kotlin', 'Swift', 'HTML/CSS/JavaScript', 'TypeScript', 'PHP', 'Python',
                      'MongoDB', 'MySQL', 'PostgreSQL', 'AWS', 'Firebase', 'Figma', 'Jira',
                      'API Development', 'Cloud Development', 'CI/CD', 'Version Control', 'Other'
                    ].map((lang) => (
                      <label key={lang} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.programmingLanguages.includes(lang)}
                          onChange={() => handleCheckboxChange('programmingLanguages', lang)}
                          className="mr-2 text-green-600 focus:ring-green-500"
                        />
                        {lang}
                      </label>
                    ))}
                  </div>
                  {errors.programmingLanguages && <p className="text-red-500 text-sm mt-1">{errors.programmingLanguages}</p>}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Portfolio & Resume */}
          {currentStep === 3 && (
            <motion.div
              key="step-3"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Portfolio & Resume</h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Portfolio Links (GitHub, personal website, etc.)
                  </label>
                  <textarea
                    value={formData.portfolioLinks}
                    onChange={(e) => handleInputChange('portfolioLinks', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="https://github.com/username, https://portfolio.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Past Projects & Experience
                  </label>
                  <textarea
                    value={formData.pastProjects}
                    onChange={(e) => handleInputChange('pastProjects', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Describe your relevant experience and projects..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Certifications
                  </label>
                  <textarea
                    value={formData.certifications}
                    onChange={(e) => handleInputChange('certifications', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="List any relevant certifications..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Recent Project Description
                  </label>
                  <textarea
                    value={formData.recentProject}
                    onChange={(e) => handleInputChange('recentProject', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Describe your most recent project and your role..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Why do you want to work at BS Realty LLC? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.whyWorkHere}
                    onChange={(e) => handleInputChange('whyWorkHere', e.target.value)}
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      errors.whyWorkHere ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Tell us why you're interested in joining our team..."
                  />
                  {errors.whyWorkHere && <p className="text-red-500 text-sm mt-1">{errors.whyWorkHere}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Referral Information
                  </label>
                  <textarea
                    value={formData.referral}
                    onChange={(e) => handleInputChange('referral', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Were you referred by someone? How did you hear about us?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Upload your resume <span className="text-red-500">*</span>
                  </label>
                  <p className="text-gray-600 mb-4">
                    PDF is preferred for your resume or cover letter.
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
                    By submitting this application, you agree that the information provided is true and accurate to the best of your knowledge.
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
      </div>
    </div>
  );
}