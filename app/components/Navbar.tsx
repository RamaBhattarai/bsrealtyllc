'use client'

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [residentialDropdownOpen, setResidentialDropdownOpen] = useState(false);
  const [mortgagesDropdownOpen, setMortgagesDropdownOpen] = useState(false);
  const [insuranceDropdownOpen, setInsuranceDropdownOpen] = useState(false);
  const [commercialDropdownOpen, setCommercialDropdownOpen] = useState(false);
  const [homeImprovementDropdownOpen, setHomeImprovementDropdownOpen] = useState(false);
  const [taxAccountingDropdownOpen, setTaxAccountingDropdownOpen] = useState(false);
  const [onlineCoursesDropdownOpen, setOnlineCoursesDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setMobileDropdownOpen(false); // Reset dropdown when closing menu
      setSolutionsDropdownOpen(false); // Reset solutions dropdown when closing menu
      setResidentialDropdownOpen(false);
      setMortgagesDropdownOpen(false);
      setInsuranceDropdownOpen(false);
      setCommercialDropdownOpen(false);
      setHomeImprovementDropdownOpen(false);
      setTaxAccountingDropdownOpen(false);
      setOnlineCoursesDropdownOpen(false);
    }
  };

  const toggleMobileDropdown = () => {
    setMobileDropdownOpen(!mobileDropdownOpen);
  };

  const navLinkClass = "font-medium text-gray-700 hover:text-green-600 transition-all duration-300 relative group";
  const underlineClass = "after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 group-hover:after:w-full after:bg-gradient-to-r after:from-green-500 after:to-green-600 after:transition-all after:duration-300";

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 md:top-[36px] top-0 ${
      scrolled 
        ? "bg-white shadow-lg" 
        : "bg-white/95 backdrop-blur-sm shadow-md"
    }`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo and Title */}
          <Link href="/" onClick={() => setIsOpen(false)} className="flex-shrink-0 flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image
              src="/images/logo/logo.wbg.png"
              alt="BS Realty LLC"
              width={200}
              height={80}
              className="h-12 md:h-14 w-auto"
              priority
            />
            <div className="hidden sm:flex flex-col">
              <h1 className="text-lg md:text-xl font-bold text-gray-900">BS Realty</h1>
              <p className="text-xs md:text-sm text-green-600 font-semibold">Mortgage Services</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {/* Home */}
            <li>
              <Link
                href="/"
                className={`${navLinkClass} ${underlineClass} px-3 py-2 text-sm xl:text-base`}
              >
                Home
              </Link>
            </li>

            {/* About */}
            <li>
              <Link
                href="/about"
                className={`${navLinkClass} ${underlineClass} px-3 py-2 text-sm xl:text-base`}
              >
                About
              </Link>
            </li>

            {/* Services */}
            <li>
              <Link
                href="/services"
                className={`${navLinkClass} ${underlineClass} px-3 py-2 text-sm xl:text-base`}
              >
                Services
              </Link>
            </li>

            {/* Solutions hover dropdown */}
            <li className="relative group">
              <button className={`${navLinkClass} px-3 py-2 text-sm xl:text-base flex items-center gap-1`} aria-haspopup="true">
                Solutions <FaChevronDown className="text-sm transition-transform group-hover:-rotate-180" />
              </button>

              {/* Invisible hover extender to keep dropdown visible */}
              <div className="absolute top-full left-0 right-0 h-3 group-hover:block hidden" />

              <div className="opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-150 absolute left-0 top-full pt-3 w-80 bg-white rounded-md shadow-lg z-50">
                <ul className="py-2">
                  {/* Residential Properties */}
                  <li className="relative group/sub">
                    <button 
                      className="w-full text-left px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors flex items-center justify-between"
                    >
                      Residential Properties
                      <FaChevronDown className="text-sm transition-transform group-hover/sub:-rotate-180" />
                    </button>
                    <div className="opacity-0 invisible group-hover/sub:visible group-hover/sub:opacity-100 absolute right-full top-0 w-48 bg-white rounded-md shadow-lg border-l-4 border-green-500 transition-all duration-200">
                      <ul className="py-2">
                        <li><Link href="/residential-properties/property-search" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Property Search</Link></li>
                        <li><Link href="/residential-properties/home-affordability" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Home Affordability</Link></li>
                        <li><Link href="/residential-properties/school-information" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">School Information</Link></li>
                        <li><Link href="/residential-properties/county-public-records" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">County Public Records</Link></li>
                      </ul>
                    </div>
                  </li>

                  {/* Mortgages */}
                  <li className="relative group/sub">
                    <button 
                      className="w-full text-left px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors flex items-center justify-between"
                    >
                      Mortgages
                      <FaChevronDown className="text-sm transition-transform group-hover/sub:-rotate-180" />
                    </button>
                    <div className="opacity-0 invisible group-hover/sub:visible group-hover/sub:opacity-100 absolute right-full top-0 w-48 bg-white rounded-md shadow-lg border-l-4 border-green-500 transition-all duration-200">
                      <ul className="py-2">
                        <li><Link href="/mortgages/mortgages" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Mortgages</Link></li>
                        <li><Link href="/mortgages/refinance" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Refinance</Link></li>
                        <li><Link href="/mortgages/get-quote" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Get Quote</Link></li>
                        <li><Link href="/mortgages/mortage-calculator" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Mortage Calculator</Link></li>
                        <li><Link href="/mortgages/home-affordability" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Home Affordability</Link></li>
                        <li><Link href="/mortgages/resources" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Resources</Link></li>
                      </ul>
                    </div>
                  </li>

                  {/* Insurance */}
                  <li className="relative group/sub">
                    <button 
                      className="w-full text-left px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors flex items-center justify-between"
                    >
                      Insurance
                      <FaChevronDown className="text-sm transition-transform group-hover/sub:-rotate-180" />
                    </button>
                    <div className="opacity-0 invisible group-hover/sub:visible group-hover/sub:opacity-100 absolute right-full top-0 w-48 bg-white rounded-md shadow-lg border-l-4 border-green-500 transition-all duration-200">
                      <ul className="py-2">
                        <li><Link href="/insurance/auto" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Auto</Link></li>
                        <li><Link href="/insurance/residential-property" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Residential Property</Link></li>
                        <li><Link href="/insurance/commercial-property" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Commercial Property</Link></li>
                        <li><Link href="/insurance/others" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Others</Link></li>
                      </ul>
                    </div>
                  </li>

                  {/* Commercial Properties */}
                  <li className="relative group/sub">
                    <button 
                      className="w-full text-left px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors flex items-center justify-between"
                    >
                      Commercial Properties
                      <FaChevronDown className="text-sm transition-transform group-hover/sub:-rotate-180" />
                    </button>
                    <div className="opacity-0 invisible group-hover/sub:visible group-hover/sub:opacity-100 absolute right-full top-0 w-48 bg-white rounded-md shadow-lg border-l-4 border-green-500 transition-all duration-200">
                      <ul className="py-2">
                        <li><Link href="/commercial-properties/buy" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Office Buildings</Link></li>
                        <li><Link href="/commercial-properties/sell" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Retail Property</Link></li>
                        <li><Link href="/commercial-properties/lease" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Industrial Property</Link></li>
                        <li><Link href="/commercial-properties/apartment-buildings" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Apartment Buildings</Link></li>
                        <li><Link href="/commercial-properties/hotels-and-hospitality" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Hotels and Hospitality</Link></li>
                        <li><Link href="/commercial-properties/mixed-use-properties" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Mixed-use Properties</Link></li>
                        <li><Link href="/commercial-properties/healthcare-facilities" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Healthcare Facilities</Link></li>
                        <li><Link href="/commercial-properties/land" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Land</Link></li>
                        <li><Link href="/commercial-properties/special-purpose-properties" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Special Purpose Properties</Link></li>
                        <li><Link href="/commercial-properties/data-centers" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Data Centers</Link></li>
                      </ul>
                    </div>
                  </li>

                  {/* Home Improvement */}
                  <li className="relative group/sub">
                    <button 
                      className="w-full text-left px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors flex items-center justify-between"
                    >
                      Home Improvement
                      <FaChevronDown className="text-sm transition-transform group-hover/sub:-rotate-180" />
                    </button>
                    <div className="opacity-0 invisible group-hover/sub:visible group-hover/sub:opacity-100 absolute right-full top-0 w-56 bg-white rounded-md shadow-lg border-l-4 border-green-500 transition-all duration-200">
                      <ul className="py-2">
                        <li><Link href="/home-improvement/electrical" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Electrical</Link></li>
                        <li><Link href="/home-improvement/hvac" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">HVAC</Link></li>
                        <li><Link href="/home-improvement/plumbing" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Plumbing</Link></li>
                        <li><Link href="/home-improvement/painting" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Painting</Link></li>
                        <li><Link href="/home-improvement/roofing" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Roofing</Link></li>
                        <li><Link href="/home-improvement/flooring" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Flooring</Link></li>
                        <li><Link href="/home-improvement/landscaping" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Landscaping</Link></li>
                        <li><Link href="/home-improvement/kitchen-bathroom" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Kitchen & Bathroom Remodeling</Link></li>
                      </ul>
                    </div>
                  </li>

                  {/* Tax and Accounting */}
                  <li className="relative group/sub">
                    <button 
                      className="w-full text-left px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors flex items-center justify-between"
                    >
                      Tax and Accounting
                      <FaChevronDown className="text-sm transition-transform group-hover/sub:-rotate-180" />
                    </button>
                    <div className="opacity-0 invisible group-hover/sub:visible group-hover/sub:opacity-100 absolute right-full top-0 w-64 bg-white rounded-md shadow-lg border-l-4 border-green-500 transition-all duration-200">
                      <ul className="py-2">
                        <li><Link href="/tax-accounting/preparation" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Tax Preparation</Link></li>
                        <li><Link href="/tax-accounting/planning" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Tax Planning</Link></li>
                        <li><Link href="/tax-accounting/advisory" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Tax Advisory</Link></li>
                        <li><Link href="/tax-accounting/bookkeeping" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Book Keeping</Link></li>
                        <li><Link href="/tax-accounting/reporting" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Financial Reporting</Link></li>
                        <li><Link href="/tax-accounting/payroll" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Payroll Accounting</Link></li>
                        <li><Link href="/tax-accounting/auditing" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Auditing</Link></li>
                        <li><Link href="/tax-accounting/small-business" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Small Business Accounting</Link></li>
                        <li><Link href="/tax-accounting/self-employed" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Self-Employed Tax Accounting</Link></li>
                      </ul>
                    </div>
                  </li>

                  {/* Online Courses */}
                  <li className="relative group/sub">
                    <button 
                      className="w-full text-left px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors flex items-center justify-between"
                    >
                      Online Courses
                      <FaChevronDown className="text-sm transition-transform group-hover/sub:-rotate-180" />
                    </button>
                    <div className="opacity-0 invisible group-hover/sub:visible group-hover/sub:opacity-100 absolute right-full top-0 w-64 bg-white rounded-md shadow-lg border-l-4 border-green-500 transition-all duration-200">
                      <ul className="py-2">
                        <li><Link href="/online-courses/real-estate-pre-licensing" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Real Estate Pre-Licensing</Link></li>
                        <li><Link href="/online-courses/real-estate-exam-prep" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Real Estate Exam Preparation</Link></li>
                        <li><Link href="/online-courses/real-estate-post-licensing" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Real Estate Post-Licensing</Link></li>
                        <li><Link href="/online-courses/real-estate-ce" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Real Estate CE Courses</Link></li>
                        <li><Link href="/online-courses/loan-officer-exam-prep" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Loan Officer Exam Preparation</Link></li>
                        <li><Link href="/online-courses/loan-officer-ce" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Loan Officer CE Courses</Link></li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </li>

            {/* Join Our Team */}
            <li>
              <Link
                href="/join"
                className={`${navLinkClass} ${underlineClass} px-3 py-2 text-sm xl:text-base`}
              >
                Join Our Team
              </Link>
            </li>

            {/* Contact Us */}
            <li>
              <Link
                href="/contact"
                className={`${navLinkClass} ${underlineClass} px-3 py-2 text-sm xl:text-base`}
              >
                Contact Us
              </Link>
            </li>

            {/* Get Started hover dropdown */}
            <li className="relative group">
              <button className={`${navLinkClass} px-3 py-2 text-sm xl:text-base flex items-center gap-1`} aria-haspopup="true">
                Get Started <FaChevronDown className="text-sm transition-transform group-hover:-rotate-180" />
              </button>

              {/* Invisible hover extender to keep dropdown visible */}
              <div className="absolute top-full left-0 right-0 h-3 group-hover:block hidden" />

              <div className="opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-150 absolute right-0 top-full pt-3 w-56 bg-white rounded-md shadow-lg z-50">
                <ul className="py-2">
                  <li>
                    <Link href="/property-inquiry" className="block px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors">Property Inquiry</Link>
                  </li>
                  <li>
                    <Link href="/get-mortgage-quote" className="block px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors">Get Mortgage Quote</Link>
                  </li>
                  <li>
                    <Link href="/insurance-quote" className="block px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors">Get Insurance Quote</Link>
                  </li>
                </ul>
              </div>
            </li>

            {/* Login Button */}
            <li>
              <Link
                href="/login"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300 ml-4"
              >
                Login
              </Link>
            </li>
          </ul>


          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <FaTimes className="text-gray-700" size={24} />
            ) : (
              <FaBars className="text-gray-700" size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? ((mobileDropdownOpen || solutionsDropdownOpen || residentialDropdownOpen || mortgagesDropdownOpen || insuranceDropdownOpen || commercialDropdownOpen || homeImprovementDropdownOpen || taxAccountingDropdownOpen || onlineCoursesDropdownOpen) ? "max-h-[1200px] opacity-100" : "max-h-96 opacity-100") : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white border-t border-gray-100 shadow-xl">
          <ul className="flex flex-col divide-y divide-gray-100 py-2">
            {/* Home */}
            <li>
              <Link
                href="/"
                className="block px-4 py-3 text-gray-700 font-medium hover:bg-green-50 hover:text-green-600 transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>

            {/* About */}
            <li>
              <Link
                href="/about"
                className="block px-4 py-3 text-gray-700 font-medium hover:bg-green-50 hover:text-green-600 transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
            </li>

            {/* Services */}
            <li>
              <Link
                href="/services"
                className="block px-4 py-3 text-gray-700 font-medium hover:bg-green-50 hover:text-green-600 transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
            </li>

            {/* Solutions Mobile Dropdown */}
            <li className="pt-2 mt-2">
              <button
                onClick={() => setSolutionsDropdownOpen(!solutionsDropdownOpen)}
                className="w-full text-left px-4 py-3 text-gray-700 font-medium hover:bg-green-50 hover:text-green-600 transition-all duration-200 flex items-center justify-between"
              >
                Solutions
                <FaChevronDown className={`text-sm transition-transform duration-200 ${solutionsDropdownOpen ? '-rotate-180' : ''}`} />
              </button>
              
              {/* Solutions Mobile Dropdown */}
              <div className={`overflow-hidden transition-all duration-200 ease-in-out ${solutionsDropdownOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <ul className="bg-gray-50 py-1">
                  {/* Residential Properties Mobile */}
                  <li>
                    <button
                      onClick={() => setResidentialDropdownOpen(!residentialDropdownOpen)}
                      className="w-full text-left flex items-center justify-between px-6 py-3 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm"
                    >
                      Residential Properties
                      <FaChevronDown className={`text-xs transition-transform duration-200 ${residentialDropdownOpen ? '-rotate-180' : ''}`} />
                    </button>
                    <div className={`overflow-y-auto transition-all duration-200 ease-in-out ${residentialDropdownOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <ul className="bg-gray-100 py-1">
                        <li><Link href="/residential-properties/property-search" className="block px-8 py-2 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors text-xs" onClick={() => { setIsOpen(false); setSolutionsDropdownOpen(false); setResidentialDropdownOpen(false); }}>Property Search</Link></li>
                        <li><Link href="/residential-properties/home-affordability" className="block px-8 py-2 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors text-xs" onClick={() => { setIsOpen(false); setSolutionsDropdownOpen(false); setResidentialDropdownOpen(false); }}>Home Affordability</Link></li>
                        <li><Link href="/residential-properties/school-information" className="block px-8 py-2 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors text-xs" onClick={() => { setIsOpen(false); setSolutionsDropdownOpen(false); setResidentialDropdownOpen(false); }}>School Information</Link></li>
                        <li><Link href="/residential-properties/county-public-records" className="block px-8 py-2 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors text-xs" onClick={() => { setIsOpen(false); setSolutionsDropdownOpen(false); setResidentialDropdownOpen(false); }}>County Public Records</Link></li>
                      </ul>
                    </div>
                  </li>

                  {/* Mortgages Mobile */}
                  <li>
                    <button
                      onClick={() => setMortgagesDropdownOpen(!mortgagesDropdownOpen)}
                      className="w-full text-left flex items-center justify-between px-6 py-3 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm"
                    >
                      Mortgages
                      <FaChevronDown className={`text-xs transition-transform duration-200 ${mortgagesDropdownOpen ? '-rotate-180' : ''}`} />
                    </button>
                    <div className={`overflow-y-auto transition-all duration-200 ease-in-out ${mortgagesDropdownOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <ul className="bg-gray-100 py-1">
                        <li><Link href="/mortgages/mortgages" className="block px-8 py-2 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors text-xs" onClick={() => { setIsOpen(false); setSolutionsDropdownOpen(false); setMortgagesDropdownOpen(false); }}>Mortgages</Link></li>
                        <li><Link href="/mortgages/refinance" className="block px-8 py-2 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors text-xs" onClick={() => { setIsOpen(false); setSolutionsDropdownOpen(false); setMortgagesDropdownOpen(false); }}>Refinance</Link></li>
                        <li><Link href="/mortgages/get-quote" className="block px-8 py-2 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors text-xs" onClick={() => { setIsOpen(false); setSolutionsDropdownOpen(false); setMortgagesDropdownOpen(false); }}>Get Quote</Link></li>
                        <li><Link href="/mortgages/mortgage-calculator" className="block px-8 py-2 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors text-xs" onClick={() => { setIsOpen(false); setSolutionsDropdownOpen(false); setMortgagesDropdownOpen(false); }}>Mortgage Calculator</Link></li>
                        <li><Link href="/mortgages/home-affordability" className="block px-8 py-2 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors text-xs" onClick={() => { setIsOpen(false); setSolutionsDropdownOpen(false); setMortgagesDropdownOpen(false); }}>Home Affordability</Link></li>
                        <li><Link href="/mortgages/resources" className="block px-8 py-2 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors text-xs" onClick={() => { setIsOpen(false); setSolutionsDropdownOpen(false); setMortgagesDropdownOpen(false); }}>Resources</Link></li>
                      </ul>
                    </div>
                  </li>

                  {/* Insurance Mobile */}
                  <li>
                    <button
                      onClick={() => setInsuranceDropdownOpen(!insuranceDropdownOpen)}
                      className="w-full text-left flex items-center justify-between px-6 py-3 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm"
                    >
                      Insurance
                      <FaChevronDown className={`text-xs transition-transform duration-200 ${insuranceDropdownOpen ? '-rotate-180' : ''}`} />
                    </button>
                    <div className={`overflow-y-auto transition-all duration-200 ease-in-out ${insuranceDropdownOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <ul className="bg-gray-100 py-1">
                        <li><Link href="/insurance/auto" className="block px-8 py-2 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors text-xs" onClick={() => { setIsOpen(false); setSolutionsDropdownOpen(false); setInsuranceDropdownOpen(false); }}>Auto</Link></li>
                        <li><Link href="/insurance/residential-property" className="block px-8 py-2 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors text-xs" onClick={() => { setIsOpen(false); setSolutionsDropdownOpen(false); setInsuranceDropdownOpen(false); }}>Residential Property</Link></li>
                        <li><Link href="/insurance/commercial-property" className="block px-8 py-2 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors text-xs" onClick={() => { setIsOpen(false); setSolutionsDropdownOpen(false); setInsuranceDropdownOpen(false); }}>Commercial Property</Link></li>
                        <li><Link href="/insurance/others" className="block px-8 py-2 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors text-xs" onClick={() => { setIsOpen(false); setSolutionsDropdownOpen(false); setInsuranceDropdownOpen(false); }}>Others</Link></li>
                      </ul>
                    </div>
                  </li>

                  {/* Commercial Properties Mobile */}
                  <li>
                    <button
                      onClick={() => setCommercialDropdownOpen(!commercialDropdownOpen)}
                      className="w-full text-left flex items-center justify-between px-6 py-3 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm"
                    >
                      Commercial Properties
                      <FaChevronDown className={`text-xs transition-transform duration-200 ${commercialDropdownOpen ? '-rotate-180' : ''}`} />
                    </button>
                    <div className={`overflow-y-auto transition-all duration-200 ease-in-out ${commercialDropdownOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <ul className="bg-gray-100 py-1">
                        <li><Link href="/commercial-properties/buy" className="block px-8 py-2 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors text-xs" onClick={() => { setIsOpen(false); setSolutionsDropdownOpen(false); setCommercialDropdownOpen(false); }}>Office Buildings</Link></li>
                        <li><Link href="/commercial-properties/sell" className="block px-8 py-2 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors text-xs" onClick={() => { setIsOpen(false); setSolutionsDropdownOpen(false); setCommercialDropdownOpen(false); }}>Retail Property</Link></li>
                        <li><Link href="/commercial-properties/lease" className="block px-8 py-2 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors text-xs" onClick={() => { setIsOpen(false); setSolutionsDropdownOpen(false); setCommercialDropdownOpen(false); }}>Industrial Property</Link></li>
                        <li><Link href="/commercial-properties/apartment-buildings" className="block px-8 py-2 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors text-xs" onClick={() => { setIsOpen(false); setSolutionsDropdownOpen(false); setCommercialDropdownOpen(false); }}>Apartment Buildings</Link></li>
                        <li><Link href="/commercial-properties/hotels-and-hospitality" className="block px-8 py-2 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors text-xs" onClick={() => { setIsOpen(false); setSolutionsDropdownOpen(false); setCommercialDropdownOpen(false); }}>Hotels and Hospitality</Link></li>
                        <li><Link href="/commercial-properties/mixed-use-properties" className="block px-8 py-2 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors text-xs" onClick={() => { setIsOpen(false); setSolutionsDropdownOpen(false); setCommercialDropdownOpen(false); }}>Mixed-use Properties</Link></li>
                        <li><Link href="/commercial-properties/healthcare-facilities" className="block px-8 py-2 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors text-xs" onClick={() => { setIsOpen(false); setSolutionsDropdownOpen(false); setCommercialDropdownOpen(false); }}>Healthcare Facilities</Link></li>
                        <li><Link href="/commercial-properties/land" className="block px-8 py-2 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors text-xs" onClick={() => { setIsOpen(false); setSolutionsDropdownOpen(false); setCommercialDropdownOpen(false); }}>Land</Link></li>
                        <li><Link href="/commercial-properties/special-purpose-properties" className="block px-8 py-2 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors text-xs" onClick={() => { setIsOpen(false); setSolutionsDropdownOpen(false); setCommercialDropdownOpen(false); }}>Special Purpose Properties</Link></li>
                        <li><Link href="/commercial-properties/data-centers" className="block px-8 py-2 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors text-xs" onClick={() => { setIsOpen(false); setSolutionsDropdownOpen(false); setCommercialDropdownOpen(false); }}>Data Centers</Link></li>
                      </ul>
                    </div>
                  </li>

                  {/* Home Improvement Mobile */}
                  <li>
                    <button
                      onClick={() => setHomeImprovementDropdownOpen(!homeImprovementDropdownOpen)}
                      className="w-full text-left flex items-center justify-between px-6 py-3 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm"
                    >
                      Home Improvement
                      <FaChevronDown className={`text-xs transition-transform duration-200 ${homeImprovementDropdownOpen ? '-rotate-180' : ''}`} />
                    </button>
                    <div className={`overflow-y-auto transition-all duration-200 ease-in-out ${homeImprovementDropdownOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <ul className="bg-gray-100 py-1">
                        <li><Link href="/home-improvement/electrical" className="block px-8 py-2 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors text-xs" onClick={() => { setIsOpen(false); setSolutionsDropdownOpen(false); setHomeImprovementDropdownOpen(false); }}>Electrical</Link></li>
                        <li><Link href="/home-improvement/hvac" className="block px-8 py-2 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors text-xs" onClick={() => { setIsOpen(false); setSolutionsDropdownOpen(false); setHomeImprovementDropdownOpen(false); }}>HVAC</Link></li>
                        <li><Link href="/home-improvement/plumbing" className="block px-8 py-2 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors text-xs" onClick={() => { setIsOpen(false); setSolutionsDropdownOpen(false); setHomeImprovementDropdownOpen(false); }}>Plumbing</Link></li>
                        <li><Link href="/home-improvement/painting" className="block px-8 py-2 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors text-xs" onClick={() => { setIsOpen(false); setSolutionsDropdownOpen(false); setHomeImprovementDropdownOpen(false); }}>Painting</Link></li>
                        <li><Link href="/home-improvement/roofing" className="block px-8 py-2 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors text-xs" onClick={() => { setIsOpen(false); setSolutionsDropdownOpen(false); setHomeImprovementDropdownOpen(false); }}>Roofing</Link></li>
                        <li><Link href="/home-improvement/flooring" className="block px-8 py-2 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors text-xs" onClick={() => { setIsOpen(false); setSolutionsDropdownOpen(false); setHomeImprovementDropdownOpen(false); }}>Flooring</Link></li>
                        <li><Link href="/home-improvement/landscaping" className="block px-8 py-2 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors text-xs" onClick={() => { setIsOpen(false); setSolutionsDropdownOpen(false); setHomeImprovementDropdownOpen(false); }}>Landscaping</Link></li>
                        <li><Link href="/home-improvement/kitchen-bathroom" className="block px-8 py-2 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors text-xs" onClick={() => { setIsOpen(false); setSolutionsDropdownOpen(false); setHomeImprovementDropdownOpen(false); }}>Kitchen & Bathroom Remodeling</Link></li>
                      </ul>
                    </div>
                  </li>

                  {/* Tax and Accounting Mobile */}
                  <li>
                    <button
                      onClick={() => setTaxAccountingDropdownOpen(!taxAccountingDropdownOpen)}
                      className="w-full text-left flex items-center justify-between px-6 py-3 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm"
                    >
                      Tax and Accounting
                      <FaChevronDown className={`text-xs transition-transform duration-200 ${taxAccountingDropdownOpen ? '-rotate-180' : ''}`} />
                    </button>
                    <div className={`overflow-y-auto transition-all duration-200 ease-in-out ${taxAccountingDropdownOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <ul className="bg-gray-100 py-1">
                        <li><Link href="/tax-accounting/preparation" className="block px-8 py-2 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors text-xs" onClick={() => { setIsOpen(false); setSolutionsDropdownOpen(false); setTaxAccountingDropdownOpen(false); }}>Tax Preparation</Link></li>
                        <li><Link href="/tax-accounting/planning" className="block px-8 py-2 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors text-xs" onClick={() => { setIsOpen(false); setSolutionsDropdownOpen(false); setTaxAccountingDropdownOpen(false); }}>Tax Planning</Link></li>
                        <li><Link href="/tax-accounting/advisory" className="block px-8 py-2 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors text-xs" onClick={() => { setIsOpen(false); setSolutionsDropdownOpen(false); setTaxAccountingDropdownOpen(false); }}>Tax Advisory</Link></li>
                        <li><Link href="/tax-accounting/bookkeeping" className="block px-8 py-2 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors text-xs" onClick={() => { setIsOpen(false); setSolutionsDropdownOpen(false); setTaxAccountingDropdownOpen(false); }}>Book Keeping</Link></li>
                        <li><Link href="/tax-accounting/reporting" className="block px-8 py-2 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors text-xs" onClick={() => { setIsOpen(false); setSolutionsDropdownOpen(false); setTaxAccountingDropdownOpen(false); }}>Financial Reporting</Link></li>
                        <li><Link href="/tax-accounting/payroll" className="block px-8 py-2 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors text-xs" onClick={() => { setIsOpen(false); setSolutionsDropdownOpen(false); setTaxAccountingDropdownOpen(false); }}>Payroll Accounting</Link></li>
                        <li><Link href="/tax-accounting/auditing" className="block px-8 py-2 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors text-xs" onClick={() => { setIsOpen(false); setSolutionsDropdownOpen(false); setTaxAccountingDropdownOpen(false); }}>Auditing</Link></li>
                        <li><Link href="/tax-accounting/small-business" className="block px-8 py-2 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors text-xs" onClick={() => { setIsOpen(false); setSolutionsDropdownOpen(false); setTaxAccountingDropdownOpen(false); }}>Small Business Accounting</Link></li>
                        <li><Link href="/tax-accounting/self-employed" className="block px-8 py-2 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors text-xs" onClick={() => { setIsOpen(false); setSolutionsDropdownOpen(false); setTaxAccountingDropdownOpen(false); }}>Self-Employed Tax Accounting</Link></li>
                      </ul>
                    </div>
                  </li>

                  {/* Online Courses Mobile */}
                  <li>
                    <button
                      onClick={() => setOnlineCoursesDropdownOpen(!onlineCoursesDropdownOpen)}
                      className="w-full text-left flex items-center justify-between px-6 py-3 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm"
                    >
                      Online Courses
                      <FaChevronDown className={`text-xs transition-transform duration-200 ${onlineCoursesDropdownOpen ? '-rotate-180' : ''}`} />
                    </button>
                    <div className={`overflow-y-auto transition-all duration-200 ease-in-out ${onlineCoursesDropdownOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <ul className="bg-gray-100 py-1">
                        <li><Link href="/online-courses/real-estate-pre-licensing" className="block px-8 py-2 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors text-xs" onClick={() => { setIsOpen(false); setSolutionsDropdownOpen(false); setOnlineCoursesDropdownOpen(false); }}>Real Estate Pre-Licensing</Link></li>
                        <li><Link href="/online-courses/real-estate-exam-prep" className="block px-8 py-2 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors text-xs" onClick={() => { setIsOpen(false); setSolutionsDropdownOpen(false); setOnlineCoursesDropdownOpen(false); }}>Real Estate Exam Preparation</Link></li>
                        <li><Link href="/online-courses/real-estate-post-licensing" className="block px-8 py-2 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors text-xs" onClick={() => { setIsOpen(false); setSolutionsDropdownOpen(false); setOnlineCoursesDropdownOpen(false); }}>Real Estate Post-Licensing</Link></li>
                        <li><Link href="/online-courses/real-estate-ce" className="block px-8 py-2 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors text-xs" onClick={() => { setIsOpen(false); setSolutionsDropdownOpen(false); setOnlineCoursesDropdownOpen(false); }}>Real Estate CE Courses</Link></li>
                        <li><Link href="/online-courses/loan-officer-exam-prep" className="block px-8 py-2 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors text-xs" onClick={() => { setIsOpen(false); setSolutionsDropdownOpen(false); setOnlineCoursesDropdownOpen(false); }}>Loan Officer Exam Preparation</Link></li>
                        <li><Link href="/online-courses/loan-officer-ce" className="block px-8 py-2 text-gray-500 hover:bg-green-50 hover:text-green-600 transition-colors text-xs" onClick={() => { setIsOpen(false); setSolutionsDropdownOpen(false); setOnlineCoursesDropdownOpen(false); }}>Loan Officer CE Courses</Link></li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </li>

            {/* Join Our Team */}
            <li>
              <Link
                href="/join"
                className="block px-4 py-3 text-gray-700 font-medium hover:bg-green-50 hover:text-green-600 transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                Join Our Team
              </Link>
            </li>

            {/* Contact Us */}
            <li>
              <Link
                href="/contact"
                className="block px-4 py-3 text-gray-700 font-medium hover:bg-green-50 hover:text-green-600 transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                Contact Us
              </Link>
            </li>
            <li className="pt-2 mt-2">
              <button
                onClick={toggleMobileDropdown}
                className="w-full text-left px-4 py-3 text-gray-700 font-medium hover:bg-green-50 hover:text-green-600 transition-all duration-200 flex items-center justify-between"
              >
                Get Started
                <FaChevronDown className={`text-sm transition-transform duration-200 ${mobileDropdownOpen ? '-rotate-180' : ''}`} />
              </button>
              
              {/* Mobile Dropdown */}
              <div className={`overflow-hidden transition-all duration-200 ease-in-out ${mobileDropdownOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                <ul className="bg-gray-50 py-1">
                  <li>
                    <Link
                      href="/property-inquiry"
                      className="block px-6 py-3 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm"
                      onClick={() => {
                        setIsOpen(false);
                        setMobileDropdownOpen(false);
                      }}
                    >
                      Property Inquiry
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/get-mortgage-quote"
                      className="block px-6 py-3 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm"
                      onClick={() => {
                        setIsOpen(false);
                        setMobileDropdownOpen(false);
                      }}
                    >
                      Get Mortgage Quote
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/insurance-quote"
                      className="block px-6 py-3 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm"
                      onClick={() => {
                        setIsOpen(false);
                        setMobileDropdownOpen(false);
                      }}
                    >
                      Get Insurance Quote
                    </Link>
                  </li>
                </ul>
              </div>
            </li>

            {/* Login Button Mobile */}
            <li>
              <Link
                href="/login"
                className="block px-4 py-3 text-center bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-300 mx-4 my-2"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
