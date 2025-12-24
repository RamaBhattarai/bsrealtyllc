'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaArrowRight, FaCheck, FaBath, FaUtensils, FaCouch, FaBed, FaWarehouse, FaCar, FaHome, FaEdit, FaChevronRight } from 'react-icons/fa';
import Link from 'next/link';

const stepVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

interface FormData {
  helpType: string;
  installReplaceItem: string;
  propertyType: 'residential' | 'commercial' | '';
  timeline: string;
  projectDescription: string;
  propertyUse: 'home' | 'business' | '';
  areasOfWork: string[];
  zipCode: string;
  phoneNumber: string;
  textUpdates: boolean;
  name: string;
  email: string;
  projectUpdates: boolean;
}

export default function HomeImprovementQuotePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [isCurrentStepValid, setIsCurrentStepValid] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    helpType: '',
    installReplaceItem: '',
    propertyType: '',
    timeline: '',
    projectDescription: '',
    propertyUse: '',
    areasOfWork: [],
    zipCode: '',
    phoneNumber: '',
    textUpdates: false,
    name: '',
    email: '',
    projectUpdates: false,
  });

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('homeImprovementQuote');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(parsed);
      } catch (error) {
        console.error('Error loading saved form data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever formData changes
  useEffect(() => {
    try {
      localStorage.setItem('homeImprovementQuote', JSON.stringify(formData));
    } catch (error) {
      console.error('Error saving form data:', error);
    }
    // Validate current step when form data changes
    validateStep(currentStep);
  }, [formData, currentStep]);

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCheckboxChange = (field: 'areasOfWork', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev.areasOfWork.includes(value)
        ? prev.areasOfWork.filter(item => item !== value)
        : [...prev.areasOfWork, value]
    }));
  };

  const handleSingleCheckboxChange = (field: 'textUpdates' | 'projectUpdates', checked: boolean) => {
    setFormData(prev => ({ ...prev, [field]: checked }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
      if (!formData.helpType) newErrors.helpType = 'Please select what you need help with';
    } else if (step === 1) {
      if (!formData.installReplaceItem) newErrors.installReplaceItem = 'Please select what needs to be installed or replaced';
    } else if (step === 2) {
      if (!formData.propertyType) newErrors.propertyType = 'Please select a property type';
    } else if (step === 3) {
      if (!formData.timeline) newErrors.timeline = 'Please select when you need this work done';
    } else if (step === 4) {
      // projectDescription is optional, no validation needed
    } else if (step === 5) {
      if (!formData.propertyUse) newErrors.propertyUse = 'Please select property use';
    } else if (step === 6) {
      if (formData.areasOfWork.length === 0) newErrors.areasOfWork = 'Please select at least one area';
    } else if (step === 7) {
      if (!formData.name.trim()) {
        newErrors.name = 'Full name is required';
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email address is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!formData.zipCode.trim()) {
        newErrors.zipCode = 'Zip code is required';
      } else if (!/^\d{5}$/.test(formData.zipCode)) {
        newErrors.zipCode = 'Please enter a valid 5-digit zip code';
      }
      if (!formData.phoneNumber.trim()) {
        newErrors.phoneNumber = 'Phone number is required';
      } else if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(formData.phoneNumber)) {
        newErrors.phoneNumber = 'Please enter a valid phone number';
      }
    }

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    if (step === currentStep) {
      setIsCurrentStepValid(isValid);
    }
    return isValid;
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const phoneNumber = value.replace(/\D/g, '');

    // Format as (XXX) XXX-XXXX
    if (phoneNumber.length <= 3) {
      return phoneNumber;
    } else if (phoneNumber.length <= 6) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    } else {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    }
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    handleInputChange('phoneNumber', formatted);
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    // TODO: API call to submit quote request
    console.log('Home improvement quote submitted:', formData);

    setShowSuccess(true);
    localStorage.removeItem('homeImprovementQuote'); // Clear saved data

    // Redirect after showing success message
    setTimeout(() => {
      window.location.href = '/';
    }, 5000);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && currentStep < 8) {
        e.preventDefault();
        if (validateStep(currentStep)) {
          setCurrentStep(prev => prev + 1);
        }
      } else if (e.key === 'Escape' && currentStep > 0) {
        e.preventDefault();
        setCurrentStep(prev => prev - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep]);

  const getProgressPercentage = () => {
    return Math.round(((currentStep + 1) / 9) * 100);
  };

  const areaIcons: Record<string, React.ReactElement> = {
    'Bathroom': <FaBath className="text-2xl" />,
    'Kitchen': <FaUtensils className="text-2xl" />,
    'Living room': <FaCouch className="text-2xl" />,
    'Bedroom': <FaBed className="text-2xl" />,
    'Basement': <FaWarehouse className="text-2xl" />,
    'Garage': <FaCar className="text-2xl" />,
    'Exterior': <FaHome className="text-2xl" />,
    'Other areas': <FaHome className="text-2xl" />,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 flex items-center gap-2 mb-4">
            <FaArrowLeft size={16} /> Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-700 mb-2">Home Improvement Quote</h1>
          <p className="text-gray-600 dark:text-gray-700">
            Connect with licensed contractors and get accurate project estimates for your home improvement needs
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-700">
              Step {currentStep + 1} of 5
            </span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-700">
              {getProgressPercentage()}% complete
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        </div>

        {/* Success Message */}
        <AnimatePresence>
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
                className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 max-w-md w-full text-center border border-gray-200 dark:border-gray-700"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.3, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <FaCheck className="text-green-600 dark:text-green-400 text-2xl" />
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="text-2xl font-bold text-gray-900 dark:text-white mb-4"
                >
                  Quote Request Submitted!
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  className="text-gray-600 dark:text-gray-300 mb-6"
                >
                  We'll connect you with trusted professionals in your area. Our team will reach out within 24 hours.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  <Link href="/">
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg transition-colors font-medium">
                      Back to Home
                    </button>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Container */}
        {!showSuccess && (
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-50 rounded-lg shadow-lg p-5 md:p-3" role="main" aria-labelledby="form-title">
            <div id="form-title" className="sr-only">Home Improvement Quote Form - Step {currentStep + 1} of 9</div>
            <AnimatePresence mode="wait">
              {/* Step 1: Help Type */}
              {currentStep === 0 && (
                <motion.div
                  key="step-0"
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-700 mb-4 ml-2">What do you need help with?</h3>

                  <div className="space-y-2">
                    <label className="flex items-center p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-green-400 dark:hover:border-green-500 cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="helpType"
                        value="install_replace"
                        checked={formData.helpType === 'install_replace'}
                        onChange={(e) => handleInputChange('helpType', e.target.value)}
                        className="text-green-600 focus:ring-green-500"
                      />
                      <span className="ml-3 text-gray-900 dark:text-gray-700 font-medium">Install or replace a plumbing fixture or appliance</span>
                    </label>

                    <label className="flex items-center p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-green-400 dark:hover:border-green-500 cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="helpType"
                        value="repair_leak"
                        checked={formData.helpType === 'repair_leak'}
                        onChange={(e) => handleInputChange('helpType', e.target.value)}
                        className="text-green-600 focus:ring-green-500"
                      />
                      <span className="ml-3 text-gray-900 dark:text-gray-700 font-medium">Repair a leaking pipe or faucet</span>
                    </label>

                    <label className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-green-400 dark:hover:border-green-500 cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="helpType"
                        value="clear_clog"
                        checked={formData.helpType === 'clear_clog'}
                        onChange={(e) => handleInputChange('helpType', e.target.value)}
                        className="text-green-600 focus:ring-green-500"
                      />
                      <span className="ml-3 text-gray-900 dark:text-gray-700 font-medium">Clear a clogged drain or toilet</span>
                    </label>

                    <label className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-green-400 dark:hover:border-green-500 cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="helpType"
                        value="repair_fixture"
                        checked={formData.helpType === 'repair_fixture'}
                        onChange={(e) => handleInputChange('helpType', e.target.value)}
                        className="text-green-600 focus:ring-green-500"
                      />
                      <span className="ml-3 text-gray-900 dark:text-gray-700 font-medium">Repair a plumbing fixture or appliance</span>
                    </label>

                    <label className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-green-400 dark:hover:border-green-500 cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="helpType"
                        value="other"
                        checked={formData.helpType === 'other'}
                        onChange={(e) => handleInputChange('helpType', e.target.value)}
                        className="text-green-600 focus:ring-green-500"
                      />
                      <span className="ml-3 text-gray-900 dark:text-gray-700 font-medium">Other</span>
                    </label>
                  </div>

                  {errors.helpType && <p className="text-red-500 text-sm mt-2">{errors.helpType}</p>}
                </motion.div>
              )}

              {/* Step 2: Install/Replace Item */}
              {currentStep === 1 && (
                <motion.div
                  key="step-1"
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-700 mb-4">What needs to be installed or replaced?</h3>

                  <div className="space-y-2">
                    <label className="flex items-center p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-green-400 dark:hover:border-green-500 cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="installReplaceItem"
                        value="sink_faucet"
                        checked={formData.installReplaceItem === 'sink_faucet'}
                        onChange={(e) => handleInputChange('installReplaceItem', e.target.value)}
                        className="text-green-600 focus:ring-green-500"
                      />
                      <span className="ml-3 text-gray-900 dark:text-gray-700 font-medium">Sink or faucet</span>
                    </label>

                    <label className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-green-400 dark:hover:border-green-500 cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="installReplaceItem"
                        value="toilet"
                        checked={formData.installReplaceItem === 'toilet'}
                        onChange={(e) => handleInputChange('installReplaceItem', e.target.value)}
                        className="text-green-600 focus:ring-green-500"
                      />
                      <span className="ml-3 text-gray-900 dark:text-gray-700 font-medium">Toilet</span>
                    </label>

                    <label className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-green-400 dark:hover:border-green-500 cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="installReplaceItem"
                        value="pipe"
                        checked={formData.installReplaceItem === 'pipe'}
                        onChange={(e) => handleInputChange('installReplaceItem', e.target.value)}
                        className="text-green-600 focus:ring-green-500"
                      />
                      <span className="ml-3 text-gray-900 dark:text-gray-700 font-medium">Pipe</span>
                    </label>

                    <label className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-green-400 dark:hover:border-green-500 cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="installReplaceItem"
                        value="specific_part"
                        checked={formData.installReplaceItem === 'specific_part'}
                        onChange={(e) => handleInputChange('installReplaceItem', e.target.value)}
                        className="text-green-600 focus:ring-green-500"
                      />
                      <span className="ml-3 text-gray-900 dark:text-gray-700 font-medium">Specific part (e.g., handle, valve)</span>
                    </label>

                    <label className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-green-400 dark:hover:border-green-500 cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="installReplaceItem"
                        value="shower"
                        checked={formData.installReplaceItem === 'shower'}
                        onChange={(e) => handleInputChange('installReplaceItem', e.target.value)}
                        className="text-green-600 focus:ring-green-500"
                      />
                      <span className="ml-3 text-gray-900 dark:text-gray-700 font-medium">Shower</span>
                    </label>

                    <label className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-green-400 dark:hover:border-green-500 cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="installReplaceItem"
                        value="garbage_disposal"
                        checked={formData.installReplaceItem === 'garbage_disposal'}
                        onChange={(e) => handleInputChange('installReplaceItem', e.target.value)}
                        className="text-green-600 focus:ring-green-500"
                      />
                      <span className="ml-3 text-gray-900 dark:text-gray-700 font-medium">Garbage disposal</span>
                    </label>

                    <label className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-green-400 dark:hover:border-green-500 cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="installReplaceItem"
                        value="bathtub"
                        checked={formData.installReplaceItem === 'bathtub'}
                        onChange={(e) => handleInputChange('installReplaceItem', e.target.value)}
                        className="text-green-600 focus:ring-green-500"
                      />
                      <span className="ml-3 text-gray-900 dark:text-gray-700 font-medium">Bathtub</span>
                    </label>

                    <label className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-green-400 dark:hover:border-green-500 cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="installReplaceItem"
                        value="appliance"
                        checked={formData.installReplaceItem === 'appliance'}
                        onChange={(e) => handleInputChange('installReplaceItem', e.target.value)}
                        className="text-green-600 focus:ring-green-500"
                      />
                      <span className="ml-3 text-gray-900 dark:text-gray-700 font-medium">Appliance</span>
                    </label>

                    <label className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-green-400 dark:hover:border-green-500 cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="installReplaceItem"
                        value="grab_bar"
                        checked={formData.installReplaceItem === 'grab_bar'}
                        onChange={(e) => handleInputChange('installReplaceItem', e.target.value)}
                        className="text-green-600 focus:ring-green-500"
                      />
                      <span className="ml-3 text-gray-900 dark:text-gray-700 font-medium">Grab bar or safety handle</span>
                    </label>

                    <label className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-green-400 dark:hover:border-green-500 cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="installReplaceItem"
                        value="other"
                        checked={formData.installReplaceItem === 'other'}
                        onChange={(e) => handleInputChange('installReplaceItem', e.target.value)}
                        className="text-green-600 focus:ring-green-500"
                      />
                      <span className="ml-3 text-gray-900 dark:text-gray-700 font-medium">Other</span>
                    </label>
                  </div>

                  {errors.installReplaceItem && <p className="text-red-500 text-sm mt-2">{errors.installReplaceItem}</p>}
                </motion.div>
              )}

              {/* Step 3: Property Type */}
              {currentStep === 2 && (
                <motion.div
                  key="step-2"
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-700 mb-4" id="property-type-description">What type of property is this for?</h3>

                  <div className="space-y-2">
                    <label className="flex items-center p-3 border border-gray-200 dark:border-gray-600 dark:text-gray-700 rounded-lg hover:border-green-400 dark:hover:border-green-500 cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="propertyType"
                        value="residential"
                        checked={formData.propertyType === 'residential'}
                        onChange={(e) => handleInputChange('propertyType', e.target.value)}
                        className="text-green-600 focus:ring-green-500 dark:text-gray-700"
                        aria-describedby="property-type-description"
                      />
                      <span className="ml-3 text-gray-900 dark:text-gray-700 font-medium">Residential Property</span>
                    </label>

                    <label className="flex items-center p-4 border border-gray-200 dark:border-gray-600 dark:text-gray-700 rounded-lg hover:border-green-400 dark:hover:border-green-500 cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="propertyType"
                        value="commercial"
                        checked={formData.propertyType === 'commercial'}
                        onChange={(e) => handleInputChange('propertyType', e.target.value)}
                        className="text-green-600 focus:ring-green-500 dark:text-gray-700"
                        aria-describedby="property-type-description"
                      />
                      <span className="ml-3 text-gray-900 dark:text-gray-700 font-medium">Commercial Property</span>
                    </label>
                  </div>

                  {errors.propertyType && <p className="text-red-500 text-sm mt-2">{errors.propertyType}</p>}
                </motion.div>
              )}

              {/* Step 4: Timeline */}
              {currentStep === 3 && (
                <motion.div
                  key="step-3"
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-700 mb-4">When do you need this work done?</h3>

                  <div className="space-y-2">
                    <label className="flex items-center p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-green-400 dark:hover:border-green-500 cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="timeline"
                        value="right_away"
                        checked={formData.timeline === 'right_away'}
                        onChange={(e) => handleInputChange('timeline', e.target.value)}
                        className="text-green-600 focus:ring-green-500"
                      />
                      <span className="ml-3 text-gray-900 dark:text-gray-700 font-medium">Right away - it's urgent</span>
                    </label>

                    <label className="flex items-center p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-green-400 dark:hover:border-green-500 cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="timeline"
                        value="soon"
                        checked={formData.timeline === 'soon'}
                        onChange={(e) => handleInputChange('timeline', e.target.value)}
                        className="text-green-600 focus:ring-green-500"
                      />
                      <span className="ml-3 text-gray-900 dark:text-gray-700 font-medium">Soon - but not an emergency</span>
                    </label>

                    <label className="flex items-center p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-green-400 dark:hover:border-green-500 cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="timeline"
                        value="few_weeks"
                        checked={formData.timeline === 'few_weeks'}
                        onChange={(e) => handleInputChange('timeline', e.target.value)}
                        className="text-green-600 focus:ring-green-500"
                      />
                      <span className="ml-3 text-gray-900 dark:text-gray-700 font-medium">In the next few weeks</span>
                    </label>

                    <label className="flex items-center p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-green-400 dark:hover:border-green-500 cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="timeline"
                        value="researching"
                        checked={formData.timeline === 'researching'}
                        onChange={(e) => handleInputChange('timeline', e.target.value)}
                        className="text-green-600 focus:ring-green-500"
                      />
                      <span className="ml-3 text-gray-900 dark:text-gray-700 font-medium">Just researching/budgeting</span>
                    </label>
                  </div>

                  {errors.timeline && <p className="text-red-500 text-sm mt-2">{errors.timeline}</p>}
                </motion.div>
              )}

              {/* Step 5: Project Description */}
              {currentStep === 4 && (
                <motion.div
                  key="step-4"
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-700 mb-4">Please tell us a little about your project.</h3>
                  <p className="text-gray-600 dark:text-gray-700 mb-4">How can a pro help you? The more details the better - it helps pros provide the most accurate quote! (Optional)</p>

                  <div className="space-y-4">
                    <textarea
                      value={formData.projectDescription}
                      onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-vertical"
                      placeholder="Describe your project..."
                      rows={4}
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 6: Property Use */}
              {currentStep === 5 && (
                <motion.div
                  key="step-5"
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-700 mb-4">Is this for a home or business property?</h3>

                  <div className="space-y-2">
                    <label className="flex items-center p-3 border border-gray-200 dark:border-gray-600 dark:text-gray-700 rounded-lg hover:border-green-400 dark:hover:border-green-500 cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="propertyUse"
                        value="home"
                        checked={formData.propertyUse === 'home'}
                        onChange={(e) => handleInputChange('propertyUse', e.target.value)}
                        className="text-green-600 focus:ring-green-500 dark:text-gray-700"
                      />
                      <span className="ml-3 text-gray-900 dark:text-gray-700 font-medium">Home</span>
                    </label>

                    <label className="flex items-center p-4 border border-gray-200 dark:border-gray-600 dark:text-gray-700 rounded-lg hover:border-green-400 dark:hover:border-green-500 cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="propertyUse"
                        value="business"
                        checked={formData.propertyUse === 'business'}
                        onChange={(e) => handleInputChange('propertyUse', e.target.value)}
                        className="text-green-600 focus:ring-green-500 dark:text-gray-700"
                      />
                      <span className="ml-3 text-gray-900 dark:text-gray-700 font-medium">Business</span>
                    </label>
                  </div>

                  {errors.propertyUse && <p className="text-red-500 text-sm mt-2">{errors.propertyUse}</p>}
                </motion.div>
              )}

              {/* Step 7: Areas of Work */}
              {currentStep === 6 && (
                <motion.div
                  key="step-6"
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-700 mb-4">What areas need improvement?</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      'Bathroom',
                      'Kitchen',
                      'Living room',
                      'Bedroom',
                      'Basement',
                      'Garage',
                      'Exterior',
                      'Other areas'
                    ].map((area) => (
                      <label key={area} className="flex items-center p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-green-400 dark:hover:border-green-500 cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          checked={formData.areasOfWork.includes(area)}
                          onChange={() => handleCheckboxChange('areasOfWork', area)}
                          className="text-green-600 focus:ring-green-500"
                        />
                        <div className="ml-3 flex items-center gap-3">
                          <span className="text-green-600 dark:text-green-400">{areaIcons[area]}</span>
                          <span className="text-gray-900 dark:text-gray-700 font-medium">{area}</span>
                        </div>
                      </label>
                    ))}
                  </div>

                  {errors.areasOfWork && <p className="text-red-500 text-sm mt-2">{errors.areasOfWork}</p>}
                </motion.div>
              )}

              {/* Step 8: Contact Information */}
              {currentStep === 7 && (
                <motion.div
                  key="step-7"
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-700 mb-2">Enter your contact information</h3>
                  <p className="text-gray-600 dark:text-gray-700 mb-4">89% complete</p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 dark:text-gray-700 mb-3">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
                          errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 dark:text-gray-700 mb-3">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-100 text-gray-900 dark:text-gray-700 placeholder-gray-500 dark:placeholder-gray-400 ${
                          errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder="your@email.com"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 dark:text-gray-700 mb-3">
                        Zip code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value.replace(/\D/g, '').slice(0, 5))}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-700 placeholder-gray-500 dark:placeholder-gray-400 ${
                          errors.zipCode ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder="Enter zip code"
                        maxLength={5}
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Double-check your zip!</p>
                      {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 dark:text-gray-700 mb-3">
                        Phone number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-100 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
                          errors.phoneNumber ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder="(555) 555-5555"
                      />
                      {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                    </div>

                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="textUpdates"
                        checked={formData.textUpdates}
                        onChange={(e) => handleSingleCheckboxChange('textUpdates', e.target.checked)}
                        className="mt-1 text-green-600 focus:ring-green-500"
                      />
                      <label htmlFor="textUpdates" className="text-sm text-gray-700 dark:text-gray-700 cursor-pointer">
                        Text me updates about my project
                      </label>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 9: Success/Confirmation */}
              {currentStep === 8 && (
                <motion.div
                  key="step-8"
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-700 mb-2">Review your information</h3>
                    <p className="text-gray-600 dark:text-gray-700">Please confirm your details are correct</p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-100 rounded-lg p-6 mb-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="text-left">
                        <p className="text-sm text-gray-600 dark:text-gray-900">Name</p>
                        <p className="font-medium text-gray-900 dark:text-gray-700">{formData.name || 'Not provided'}</p>
                      </div>
                      <Link href="#" onClick={() => setCurrentStep(3)} className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 flex items-center gap-1 text-sm">
                        <FaEdit size={12} /> Edit
                      </Link>
                    </div>

                    <div className="flex justify-between items-start mb-4">
                      <div className="text-left">
                        <p className="text-sm text-gray-600 dark:text-gray-900">Phone</p>
                        <p className="font-medium text-gray-900 dark:text-gray-700">{formData.phoneNumber || 'Not provided'}</p>
                      </div>
                      <Link href="#" onClick={() => setCurrentStep(3)} className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 flex items-center gap-1 text-sm">
                        <FaEdit size={12} /> Edit
                      </Link>
                    </div>

                    <div className="flex justify-between items-start">
                      <div className="text-left">
                        <p className="text-sm text-gray-600 dark:text-gray-900">Email</p>
                        <p className="font-medium text-gray-900 dark:text-gray-700">{formData.email || 'Not provided'}</p>
                      </div>
                      <Link href="#" onClick={() => setCurrentStep(3)} className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 flex items-center gap-1 text-sm">
                        <FaEdit size={12} /> Edit
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 mb-6">
                    <input
                      type="checkbox"
                      id="projectUpdates"
                      checked={formData.projectUpdates}
                      onChange={(e) => handleSingleCheckboxChange('projectUpdates', e.target.checked)}
                      className="mt-1 text-green-600 focus:ring-green-500"
                    />
                    <label htmlFor="projectUpdates" className="text-sm text-gray-700 dark:text-gray-700 cursor-pointer">
                      Text me project cost guides, how-to articles, and advice
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    Submit Quote Request
                    <FaChevronRight size={16} />
                  </button>

                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
                    By submitting, you agree to our Terms of Service and Privacy Policy
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            {currentStep < 8 && (
              <div className="flex justify-between mt-10 pt-6 border-t border-gray-200 dark:border-gray-600">
                {currentStep > 0 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    <FaArrowLeft size={16} />
                    Back
                  </button>
                )}

                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!isCurrentStepValid}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <FaArrowRight size={16} />
                </button>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}