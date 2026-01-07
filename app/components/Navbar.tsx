'use client'

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaChevronDown, FaIdCard } from "react-icons/fa";

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
  const [joinTeamDropdownOpen, setJoinTeamDropdownOpen] = useState(false);
  const [mobileJoinTeamDropdownOpen, setMobileJoinTeamDropdownOpen] = useState(false);
  const [mobileSolutionsDropdownOpen, setMobileSolutionsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setMobileDropdownOpen(false);
      setMobileSolutionsDropdownOpen(false);
      setSolutionsDropdownOpen(false);
      setResidentialDropdownOpen(false);
      setMortgagesDropdownOpen(false);
      setInsuranceDropdownOpen(false);
      setCommercialDropdownOpen(false);
      setHomeImprovementDropdownOpen(false);
      setTaxAccountingDropdownOpen(false);
      setOnlineCoursesDropdownOpen(false);
      setJoinTeamDropdownOpen(false);
      setMobileJoinTeamDropdownOpen(false);
    }
  };

  const toggleMobileDropdown = () => {
    setMobileDropdownOpen(!mobileDropdownOpen);
  };

  const closeAllDropdowns = () => {
    setIsOpen(false);
    setMobileDropdownOpen(false);
    setMobileSolutionsDropdownOpen(false);
    setSolutionsDropdownOpen(false);
    setResidentialDropdownOpen(false);
    setMortgagesDropdownOpen(false);
    setInsuranceDropdownOpen(false);
    setCommercialDropdownOpen(false);
    setHomeImprovementDropdownOpen(false);
    setTaxAccountingDropdownOpen(false);
    setOnlineCoursesDropdownOpen(false);
    setJoinTeamDropdownOpen(false);
    setMobileJoinTeamDropdownOpen(false);
  };

  const toggleMobileSolutions = () => {
    setMobileSolutionsDropdownOpen(!mobileSolutionsDropdownOpen);
  };

  const navLinkClass = "font-medium text-gray-700 hover:text-green-600 transition-all duration-300 relative group";
  const underlineClass = "after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 group-hover:after:w-full after:bg-linear-to-r after:from-green-500 after:to-green-600 after:transition-all after:duration-300";

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 md:top-9 top-0 ${
      scrolled 
        ? "bg-white shadow-lg" 
        : "bg-white/95 backdrop-blur-sm shadow-md"
    }`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo and Title */}
          <Link href="/" onClick={() => setIsOpen(false)} className="shrink-0 flex items-center gap-3 hover:opacity-80 transition-opacity">
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
                      type="button"
                      className="w-full text-left px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors flex items-center justify-between"
                    >
                      Residential Properties
                      <FaChevronDown className="text-sm transition-transform group-hover/sub:-rotate-180" />
                    </button>
                    <div className="opacity-0 invisible group-hover/sub:visible group-hover/sub:opacity-100 absolute right-full top-0 w-48 bg-white rounded-md shadow-lg border-l-4 border-green-500 transition-all duration-200">
                      <ul className="py-2">
                        <li>
                          <a
                            href="https://khadkabal.georgiamls.com/real-estate/?styp=sale&typ=sd"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm"
                          >
                            Property Search
                          </a>
                        </li>
                        <li><a href="https://khadkabal.georgiamls.com/real-estate-calculators/" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Home Affordability</a></li>
                        <li><Link href="https://khadkabal.georgiamls.com/local-schools/" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">School Information</Link></li>
                        <li><a href="https://dor.georgia.gov/property-records-online" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">County Public Records</a></li>
                      </ul>
                    </div>
                  </li>

                  {/* Mortgages */}
                  <li className="relative group/sub">
                    <button
                      type="button"
                      className="w-full text-left px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors flex items-center justify-between"
                    >
                      Mortgages
                      <FaChevronDown className="text-sm transition-transform group-hover/sub:-rotate-180" />
                    </button>
                    <div className="opacity-0 invisible group-hover/sub:visible group-hover/sub:opacity-100 absolute right-full top-0 w-48 bg-white rounded-md shadow-lg border-l-4 border-green-500 transition-all duration-200">
                      <ul className="py-2">
                        <li><Link href="https://www.loanfactory.com/balkhadka" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Mortgages</Link></li>
                        <li><Link href="https://www.loanfactory.com/balkhadka" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Refinance</Link></li>
                        <li><Link href="https://www.loanfactory.com/balkhadka" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Get Quote</Link></li>
                        <li><Link href="https://khadkabal.georgiamls.com/real-estate-calculators/mortgage.cfm" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Mortage Calculator</Link></li>
                        <li><Link href="https://khadkabal.georgiamls.com/real-estate-calculators/" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Home Affordability</Link></li>
                        <li><Link href="https://www.loanfactory.com/balkhadka"  target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Resources</Link></li>
                      </ul>
                    </div>
                  </li>

                  {/* Insurance */}
                  <li className="relative group/sub">
                    <button
                      type="button"
                      className="w-full text-left px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors flex items-center justify-between"
                    >
                      Insurance
                      <FaChevronDown className="text-sm transition-transform group-hover/sub:-rotate-180" />
                    </button>
                    <div className="opacity-0 invisible group-hover/sub:visible group-hover/sub:opacity-100 absolute right-full top-0 w-48 bg-white rounded-md shadow-lg border-l-4 border-green-500 transition-all duration-200">
                      <ul className="py-2">
                        <li><Link href="/insurance-quote" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Auto</Link></li>
                        <li><Link href="/insurance-quote" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Residential Property</Link></li>
                        <li><Link href="/insurance-quote"  target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Commercial Property</Link></li>
                        <li><Link href="/insurance-quote"target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Others</Link></li>
                      </ul>
                    </div>
                  </li>

                  {/* Commercial Properties */}
                  <li className="relative group/sub">
                    <button
                      type="button"
                      className="w-full text-left px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors flex items-center justify-between"
                    >
                      Commercial Properties
                      <FaChevronDown className="text-sm transition-transform group-hover/sub:-rotate-180" />
                    </button>
                    <div className="opacity-0 invisible group-hover/sub:visible group-hover/sub:opacity-100 absolute right-full top-0 w-48 bg-white rounded-md shadow-lg border-l-4 border-green-500 transition-all duration-200">
                      <ul className="py-2">
                        <li><Link href="/commercial-properties/buy" onClick={e => e.preventDefault()} className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Office Buildings</Link></li>
                        <li><Link href="/commercial-properties/sell" onClick={e => e.preventDefault()} className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Retail Property</Link></li>
                        <li><Link href="/commercial-properties/lease" onClick={e => e.preventDefault()} className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Industrial Property</Link></li>
                        <li><Link href="/commercial-properties/apartment-buildings" onClick={e => e.preventDefault()} className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Apartment Buildings</Link></li>
                        <li><Link href="/commercial-properties/hotels-and-hospitality" onClick={e => e.preventDefault()} className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Hotels and Hospitality</Link></li>
                        <li><Link href="/commercial-properties/mixed-use-properties" onClick={e => e.preventDefault()} className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Mixed-use Properties</Link></li>
                        <li><Link href="/commercial-properties/healthcare-facilities" onClick={e => e.preventDefault()} className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Healthcare Facilities</Link></li>
                        <li><Link href="/commercial-properties/land" onClick={e => e.preventDefault()} className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Land</Link></li>
                        <li><Link href="/commercial-properties/special-purpose-properties" onClick={e => e.preventDefault()} className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Special Purpose Properties</Link></li>
                        <li><Link href="/commercial-properties/data-centers" onClick={e => e.preventDefault()} className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Data Centers</Link></li>
                      </ul>
                    </div>
                  </li>

                  {/* Home Improvement */}
                  <li className="relative group/sub">
                    <button
                      type="button"
                      className="w-full text-left px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors flex items-center justify-between"
                    >
                      Home Improvement
                      <FaChevronDown className="text-sm transition-transform group-hover/sub:-rotate-180" />
                    </button>
                    <div className="opacity-0 invisible group-hover/sub:visible group-hover/sub:opacity-100 absolute right-full top-0 w-56 bg-white rounded-md shadow-lg border-l-4 border-green-500 transition-all duration-200">
                      <ul className="py-2">
                        <li><Link href="/home-improvement/electrical" onClick={e => e.preventDefault()} className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Electrical</Link></li>
                        <li><Link href="/home-improvement/hvac" onClick={e => e.preventDefault()} className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">HVAC</Link></li>
                        <li><Link href="/home-improvement/plumbing" onClick={e => e.preventDefault()} className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Plumbing</Link></li>
                        <li><Link href="/home-improvement/painting" onClick={e => e.preventDefault()} className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Painting</Link></li>
                        <li><Link href="/home-improvement/roofing" onClick={e => e.preventDefault()} className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Roofing</Link></li>
                        <li><Link href="/home-improvement/flooring" onClick={e => e.preventDefault()} className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Flooring</Link></li>
                        <li><Link href="/home-improvement/landscaping" onClick={e => e.preventDefault()} className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Landscaping</Link></li>
                        <li><Link href="/home-improvement/kitchen-bathroom" onClick={e => e.preventDefault()} className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Kitchen & Bathroom Remodeling</Link></li>
                      </ul>
                    </div>
                  </li>

                  {/* Tax and Accounting */}
                  <li className="relative group/sub">
                    <button
                      type="button"
                      className="w-full text-left px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors flex items-center justify-between"
                    >
                      Tax and Accounting
                      <FaChevronDown className="text-sm transition-transform group-hover/sub:-rotate-180" />
                    </button>
                    <div className="opacity-0 invisible group-hover/sub:visible group-hover/sub:opacity-100 absolute right-full top-0 w-64 bg-white rounded-md shadow-lg border-l-4 border-green-500 transition-all duration-200">
                      <ul className="py-2">
                        <li><Link href="/tax-accounting/preparation" onClick={e => e.preventDefault()} className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Tax Preparation</Link></li>
                        <li><Link href="/tax-accounting/planning" onClick={e => e.preventDefault()} className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Tax Planning</Link></li>
                        <li><Link href="/tax-accounting/advisory" onClick={e => e.preventDefault()} className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Tax Advisory</Link></li>
                        <li><Link href="/tax-accounting/bookkeeping" onClick={e => e.preventDefault()} className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Book Keeping</Link></li>
                        <li><Link href="/tax-accounting/reporting" onClick={e => e.preventDefault()} className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Financial Reporting</Link></li>
                        <li><Link href="/tax-accounting/payroll" onClick={e => e.preventDefault()} className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Payroll Accounting</Link></li>
                        <li><Link href="/tax-accounting/auditing" onClick={e => e.preventDefault()} className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Auditing</Link></li>
                        <li><Link href="/tax-accounting/small-business" onClick={e => e.preventDefault()} className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Small Business Accounting</Link></li>
                        <li><Link href="/tax-accounting/self-employed" onClick={e => e.preventDefault()} className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Self-Employed Tax Accounting</Link></li>
                      </ul>
                    </div>
                  </li>

                  {/* Online Courses */}
                  <li className="relative group/sub">
                    <button
                      type="button"
                      className="w-full text-left px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors flex items-center justify-between"
                    >
                      Online Courses
                      <FaChevronDown className="text-sm transition-transform group-hover/sub:-rotate-180" />
                    </button>
                    <div className="opacity-0 invisible group-hover/sub:visible group-hover/sub:opacity-100 absolute right-full top-0 w-64 bg-white rounded-md shadow-lg border-l-4 border-green-500 transition-all duration-200">
                      <ul className="py-2">
                        <li><Link href="/online-courses/real-estate-pre-licensing" onClick={e => e.preventDefault()} className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Real Estate Pre-Licensing</Link></li>
                        <li><Link href="/online-courses/real-estate-exam-prep" onClick={e => e.preventDefault()} className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Real Estate Exam Preparation</Link></li>
                        <li><Link href="/online-courses/real-estate-post-licensing" onClick={e => e.preventDefault()} className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Real Estate Post-Licensing</Link></li>
                        <li><Link href="/online-courses/real-estate-ce" onClick={e => e.preventDefault()} className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Real Estate CE Courses</Link></li>
                        <li><Link href="/online-courses/loan-officer-exam-prep" onClick={e => e.preventDefault()} className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Loan Officer Exam Preparation</Link></li>
                        <li><Link href="/online-courses/loan-officer-ce" onClick={e => e.preventDefault()} className="block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors text-sm">Loan Officer CE Courses</Link></li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </li>

            {/* Join Our Team dropdown */}
            <li className="relative group">
              <button type="button" className={`${navLinkClass} px-3 py-2 text-sm xl:text-base flex items-center gap-1`} aria-haspopup="true">
                Join Our Team <FaChevronDown className="text-sm transition-transform group-hover:-rotate-180" />
              </button>

              {/* Invisible hover extender to keep dropdown visible */}
              <div className="absolute top-full left-0 right-0 h-3 group-hover:block hidden" />

              <div className="opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-150 absolute left-0 top-full pt-3 w-56 bg-white rounded-md shadow-lg z-50">
                <ul className="py-2">
                  <li>
                    <Link href="/job-listings" className="block px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors">Apply for a Job</Link>
                  </li>
                  <li>
                    <Link href="/become-agent" className="block px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors">Become an Agent</Link>
                  </li>
                 
                </ul>
              </div>
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
              <button type="button" className={`${navLinkClass} px-3 py-2 text-sm xl:text-base flex items-center gap-1`} aria-haspopup="true">
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
                    <Link href="https://www.loanfactory.com/balkhadka" target="_blank" rel="noopener noreferrer" className="block px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors">Get Mortgage Quote</Link>
                  </li>
                  <li>
                    <Link href="/insurance-quote" className="block px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors">Get Insurance Quote</Link>
                  </li>
                  <li>
                    <Link href="/home-improvement-quote" className="block px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors">Home Improvement Quote</Link>
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



      {/* Mobile Menu - Simple Dropdown */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t z-50">
          <div className="container mx-auto px-4 py-4" style={{ maxHeight: 'calc(100vh - 80px)', overflowY: 'auto' }}>
            <ul className="flex flex-col space-y-1 pb-4">
              {/* Home */}
              <li>
                <Link
                  href="/"
                  className="block px-4 py-3 text-gray-700 font-medium hover:bg-green-50 hover:text-green-600 transition-colors rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
              </li>

              {/* About */}
              <li>
                <Link
                  href="/about"
                  className="block px-4 py-3 text-gray-700 font-medium hover:bg-green-50 hover:text-green-600 transition-colors rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
              </li>

              {/* Services */}
              <li>
                <Link
                  href="/services"
                  className="block px-4 py-3 text-gray-700 font-medium hover:bg-green-50 hover:text-green-600 transition-colors rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Services
                </Link>
              </li>

              {/* Solutions */}
              <li>
                <button
                  type="button"
                  onClick={toggleMobileSolutions}
                  className="w-full text-left px-4 py-3 text-gray-700 font-medium hover:bg-green-50 hover:text-green-600 transition-colors rounded-lg flex items-center justify-between"
                >
                  Solutions
                  <FaChevronDown className={`text-sm transition-transform duration-200 ${mobileSolutionsDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileSolutionsDropdownOpen && (
                  <ul className="mt-1 ml-4 space-y-2 bg-green-50 rounded-lg p-3">
                    {/* Residential Properties */}
                    <li>
                      <button
                        type="button"
                        onClick={() => setResidentialDropdownOpen(!residentialDropdownOpen)}
                        className="w-full text-left px-3 py-2 text-gray-600 hover:text-green-600 text-sm rounded flex items-center justify-between font-medium"
                      >
                        Residential Properties
                        <FaChevronDown className={`text-xs transition-transform duration-200 ${residentialDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {residentialDropdownOpen && (
                        <ul className="mt-1 ml-3 space-y-1">
                          <li><Link href="https://khadkabal.georgiamls.com/real-estate/?styp=sale&typ=sd" target="_blank" className="block px-3 py-2 text-gray-500 hover:text-green-600 text-sm" onClick={() => setIsOpen(false)}>Property Search</Link></li>
                          <li><Link href="https://khadkabal.georgiamls.com/real-estate-calculators/" target="_blank" className="block px-3 py-2 text-gray-500 hover:text-green-600 text-sm" onClick={() => setIsOpen(false)}>Home Affordability</Link></li>
                          <li><Link href="https://khadkabal.georgiamls.com/local-schools/" target="_blank" className="block px-3 py-2 text-gray-500 hover:text-green-600 text-sm" onClick={() => setIsOpen(false)}>School Information</Link></li>
                          <li><Link href="https://dor.georgia.gov/property-records-online" target="_blank" className="block px-3 py-2 text-gray-500 hover:text-green-600 text-sm" onClick={() => setIsOpen(false)}>County Public Records</Link></li>
                        </ul>
                      )}
                    </li>

                    {/* Mortgages */}
                    <li>
                      <button
                        type="button"
                        onClick={() => setMortgagesDropdownOpen(!mortgagesDropdownOpen)}
                        className="w-full text-left px-3 py-2 text-gray-600 hover:text-green-600 text-sm rounded flex items-center justify-between font-medium"
                      >
                        Mortgages
                        <FaChevronDown className={`text-xs transition-transform duration-200 ${mortgagesDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {mortgagesDropdownOpen && (
                        <ul className="mt-1 ml-3 space-y-1">
                          <li><Link href="https://www.loanfactory.com/balkhadka" target="_blank" className="block px-3 py-2 text-gray-500 hover:text-green-600 text-sm" onClick={() => setIsOpen(false)}>Mortgages</Link></li>
                          <li><Link href="https://www.loanfactory.com/balkhadka" target="_blank" className="block px-3 py-2 text-gray-500 hover:text-green-600 text-sm" onClick={() => setIsOpen(false)}>Refinance</Link></li>
                          <li><Link href="https://www.loanfactory.com/balkhadka" target="_blank" className="block px-3 py-2 text-gray-500 hover:text-green-600 text-sm" onClick={() => setIsOpen(false)}>Get Quote</Link></li>
                          <li><Link href="https://khadkabal.georgiamls.com/real-estate-calculators/mortgage.cfm" target="_blank" className="block px-3 py-2 text-gray-500 hover:text-green-600 text-sm" onClick={() => setIsOpen(false)}>Mortgage Calculator</Link></li>
                          <li><Link href="https://khadkabal.georgiamls.com/real-estate-calculators/" target="_blank" className="block px-3 py-2 text-gray-500 hover:text-green-600 text-sm" onClick={() => setIsOpen(false)}>Home Affordability</Link></li>
                          <li><Link href="https://www.loanfactory.com/balkhadka" target="_blank" className="block px-3 py-2 text-gray-500 hover:text-green-600 text-sm" onClick={() => setIsOpen(false)}>Resources</Link></li>
                        </ul>
                      )}
                    </li>

                    {/* Insurance */}
                    <li>
                      <button
                        type="button"
                        onClick={() => setInsuranceDropdownOpen(!insuranceDropdownOpen)}
                        className="w-full text-left px-3 py-2 text-gray-600 hover:text-green-600 text-sm rounded flex items-center justify-between font-medium"
                      >
                        Insurance
                        <FaChevronDown className={`text-xs transition-transform duration-200 ${insuranceDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {insuranceDropdownOpen && (
                        <ul className="mt-1 ml-3 space-y-1">
                          <li><Link href="/insurance-quote" className="block px-3 py-2 text-gray-500 hover:text-green-600 text-sm" onClick={() => setIsOpen(false)}>Auto</Link></li>
                          <li><Link href="/insurance-quote" className="block px-3 py-2 text-gray-500 hover:text-green-600 text-sm" onClick={() => setIsOpen(false)}>Residential Property</Link></li>
                          <li><Link href="/insurance-quote" className="block px-3 py-2 text-gray-500 hover:text-green-600 text-sm" onClick={() => setIsOpen(false)}>Commercial Property</Link></li>
                          <li><Link href="/insurance-quote" className="block px-3 py-2 text-gray-500 hover:text-green-600 text-sm" onClick={() => setIsOpen(false)}>Others</Link></li>
                        </ul>
                      )}
                    </li>

                    {/* Commercial Properties */}
                    <li>
                      <button
                        type="button"
                        onClick={() => setCommercialDropdownOpen(!commercialDropdownOpen)}
                        className="w-full text-left px-3 py-2 text-gray-600 hover:text-green-600 text-sm rounded flex items-center justify-between font-medium"
                      >
                        Commercial Properties
                        <FaChevronDown className={`text-xs transition-transform duration-200 ${commercialDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {commercialDropdownOpen && (
                        <ul className="mt-1 ml-3 space-y-1">
                          <li><Link href="/commercial-properties/buy" onClick={e => e.preventDefault()} className="block px-3 py-2 text-gray-500 hover:text-green-600 text-sm">Office Buildings</Link></li>
                          <li><Link href="/commercial-properties/sell" onClick={e => e.preventDefault()} className="block px-3 py-2 text-gray-500 hover:text-green-600 text-sm">Retail Property</Link></li>
                          <li><Link href="/commercial-properties/lease" onClick={e => e.preventDefault()} className="block px-3 py-2 text-gray-500 hover:text-green-600 text-sm">Industrial Property</Link></li>
                          <li><Link href="/commercial-properties/apartment-buildings" onClick={e => e.preventDefault()} className="block px-3 py-2 text-gray-500 hover:text-green-600 text-sm">Apartment Buildings</Link></li>
                          <li><Link href="/commercial-properties/hotels-and-hospitality" onClick={e => e.preventDefault()} className="block px-3 py-2 text-gray-500 hover:text-green-600 text-sm">Hotels and Hospitality</Link></li>
                          <li><Link href="/commercial-properties/mixed-use-properties" onClick={e => e.preventDefault()} className="block px-3 py-2 text-gray-500 hover:text-green-600 text-sm">Mixed-use Properties</Link></li>
                          <li><Link href="/commercial-properties/healthcare-facilities" onClick={e => e.preventDefault()} className="block px-3 py-2 text-gray-500 hover:text-green-600 text-sm">Healthcare Facilities</Link></li>
                          <li><Link href="/commercial-properties/land" onClick={e => e.preventDefault()} className="block px-3 py-2 text-gray-500 hover:text-green-600 text-sm">Land</Link></li>
                          <li><Link href="/commercial-properties/special-purpose-properties" onClick={e => e.preventDefault()} className="block px-3 py-2 text-gray-500 hover:text-green-600 text-sm">Special Purpose Properties</Link></li>
                          <li><Link href="/commercial-properties/data-centers" onClick={e => e.preventDefault()} className="block px-3 py-2 text-gray-500 hover:text-green-600 text-sm">Data Centers</Link></li>
                        </ul>
                      )}
                    </li>

                    {/* Home Improvement */}
                    <li>
                      <button
                        type="button"
                        onClick={() => setHomeImprovementDropdownOpen(!homeImprovementDropdownOpen)}
                        className="w-full text-left px-3 py-2 text-gray-600 hover:text-green-600 text-sm rounded flex items-center justify-between font-medium"
                      >
                        Home Improvement
                        <FaChevronDown className={`text-xs transition-transform duration-200 ${homeImprovementDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {homeImprovementDropdownOpen && (
                        <ul className="mt-1 ml-3 space-y-1">
                          <li><Link href="/home-improvement/electrical" onClick={e => e.preventDefault()} className="block px-3 py-2 text-gray-500 hover:text-green-600 text-sm">Electrical</Link></li>
                          <li><Link href="/home-improvement/hvac" onClick={e => e.preventDefault()} className="block px-3 py-2 text-gray-500 hover:text-green-600 text-sm">HVAC</Link></li>
                          <li><Link href="/home-improvement/plumbing" onClick={e => e.preventDefault()} className="block px-3 py-2 text-gray-500 hover:text-green-600 text-sm">Plumbing</Link></li>
                          <li><Link href="/home-improvement/painting" onClick={e => e.preventDefault()} className="block px-3 py-2 text-gray-500 hover:text-green-600 text-sm">Painting</Link></li>
                          <li><Link href="/home-improvement/roofing" onClick={e => e.preventDefault()} className="block px-3 py-2 text-gray-500 hover:text-green-600 text-sm">Roofing</Link></li>
                          <li><Link href="/home-improvement/flooring" onClick={e => e.preventDefault()} className="block px-3 py-2 text-gray-500 hover:text-green-600 text-sm">Flooring</Link></li>
                          <li><Link href="/home-improvement/landscaping" onClick={e => e.preventDefault()} className="block px-3 py-2 text-gray-500 hover:text-green-600 text-sm">Landscaping</Link></li>
                          <li><Link href="/home-improvement/kitchen-bathroom" onClick={e => e.preventDefault()} className="block px-3 py-2 text-gray-500 hover:text-green-600 text-sm">Kitchen & Bathroom Remodeling</Link></li>
                        </ul>
                      )}
                    </li>

                    {/* Tax and Accounting */}
                    <li>
                      <button
                        type="button"
                        onClick={() => setTaxAccountingDropdownOpen(!taxAccountingDropdownOpen)}
                        className="w-full text-left px-3 py-2 text-gray-600 hover:text-green-600 text-sm rounded flex items-center justify-between font-medium"
                      >
                        Tax and Accounting
                        <FaChevronDown className={`text-xs transition-transform duration-200 ${taxAccountingDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {taxAccountingDropdownOpen && (
                        <ul className="mt-1 ml-3 space-y-1">
                          <li><Link href="/tax-accounting/preparation" onClick={e => e.preventDefault()} className="block px-3 py-2 text-gray-500 hover:text-green-600 text-sm">Tax Preparation</Link></li>
                          <li><Link href="/tax-accounting/planning" onClick={e => e.preventDefault()} className="block px-3 py-2 text-gray-500 hover:text-green-600 text-sm">Tax Planning</Link></li>
                          <li><Link href="/tax-accounting/advisory" onClick={e => e.preventDefault()} className="block px-3 py-2 text-gray-500 hover:text-green-600 text-sm">Tax Advisory</Link></li>
                          <li><Link href="/tax-accounting/bookkeeping" onClick={e => e.preventDefault()} className="block px-3 py-2 text-gray-500 hover:text-green-600 text-sm">Book Keeping</Link></li>
                          <li><Link href="/tax-accounting/reporting" onClick={e => e.preventDefault()} className="block px-3 py-2 text-gray-500 hover:text-green-600 text-sm">Financial Reporting</Link></li>
                          <li><Link href="/tax-accounting/payroll" onClick={e => e.preventDefault()} className="block px-3 py-2 text-gray-500 hover:text-green-600 text-sm">Payroll Accounting</Link></li>
                          <li><Link href="/tax-accounting/auditing" onClick={e => e.preventDefault()} className="block px-3 py-2 text-gray-500 hover:text-green-600 text-sm">Auditing</Link></li>
                          <li><Link href="/tax-accounting/small-business" onClick={e => e.preventDefault()} className="block px-3 py-2 text-gray-500 hover:text-green-600 text-sm">Small Business Accounting</Link></li>
                          <li><Link href="/tax-accounting/self-employed" onClick={e => e.preventDefault()} className="block px-3 py-2 text-gray-500 hover:text-green-600 text-sm">Self-Employed Tax Accounting</Link></li>
                        </ul>
                      )}
                    </li>

                    {/* Online Courses */}
                    <li>
                      <button
                        type="button"
                        onClick={() => setOnlineCoursesDropdownOpen(!onlineCoursesDropdownOpen)}
                        className="w-full text-left px-3 py-2 text-gray-600 hover:text-green-600 text-sm rounded flex items-center justify-between font-medium"
                      >
                        Online Courses
                        <FaChevronDown className={`text-xs transition-transform duration-200 ${onlineCoursesDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {onlineCoursesDropdownOpen && (
                        <ul className="mt-1 ml-3 space-y-1">
                          <li><Link href="/online-courses/real-estate-pre-licensing" onClick={e => e.preventDefault()} className="block px-3 py-2 text-gray-500 hover:text-green-600 text-sm">Real Estate Pre-Licensing</Link></li>
                          <li><Link href="/online-courses/real-estate-exam-prep" onClick={e => e.preventDefault()} className="block px-3 py-2 text-gray-500 hover:text-green-600 text-sm">Real Estate Exam Preparation</Link></li>
                          <li><Link href="/online-courses/real-estate-post-licensing" onClick={e => e.preventDefault()} className="block px-3 py-2 text-gray-500 hover:text-green-600 text-sm">Real Estate Post-Licensing</Link></li>
                          <li><Link href="/online-courses/real-estate-ce" onClick={e => e.preventDefault()} className="block px-3 py-2 text-gray-500 hover:text-green-600 text-sm">Real Estate CE Courses</Link></li>
                          <li><Link href="/online-courses/loan-officer-exam-prep" onClick={e => e.preventDefault()} className="block px-3 py-2 text-gray-500 hover:text-green-600 text-sm">Loan Officer Exam Preparation</Link></li>
                          <li><Link href="/online-courses/loan-officer-ce" onClick={e => e.preventDefault()} className="block px-3 py-2 text-gray-500 hover:text-green-600 text-sm">Loan Officer CE Courses</Link></li>
                        </ul>
                      )}
                    </li>
                  </ul>
                )}
              </li>

              {/* Join Our Team */}
              <li>
                <button
                  onClick={() => setMobileJoinTeamDropdownOpen(!mobileJoinTeamDropdownOpen)}
                  className="w-full text-left px-4 py-3 text-gray-700 font-medium hover:bg-green-50 hover:text-green-600 transition-colors rounded-lg flex items-center justify-between"
                >
                  Join Our Team
                  <FaChevronDown className={`text-sm transition-transform duration-200 ${mobileJoinTeamDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileJoinTeamDropdownOpen && (
                  <ul className="mt-1 ml-4 space-y-1 bg-green-50 rounded-lg p-2">
                    <li>
                      <Link href="/job-listings" className="block px-3 py-2 text-gray-600 hover:text-green-600 text-sm rounded" onClick={() => setIsOpen(false)}>Apply for a Job</Link>
                    </li>
                    <li>
                      <Link href="/become-agent" className="block px-3 py-2 text-gray-600 hover:text-green-600 text-sm rounded" onClick={() => setIsOpen(false)}>Become an Agent</Link>
                    </li>
                    
                  </ul>
                )}
              </li>

              {/* Contact Us */}
              <li>
                <Link
                  href="/contact"
                  className="block px-4 py-3 text-gray-700 font-medium hover:bg-green-50 hover:text-green-600 transition-colors rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Contact Us
                </Link>
              </li>

              

              {/* Get Started */}
              <li>
                <button
                  onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                  className="w-full text-left px-4 py-3 text-gray-700 font-medium hover:bg-green-50 hover:text-green-600 transition-colors rounded-lg flex items-center justify-between"
                >
                  Get Started
                  <FaChevronDown className={`text-sm transition-transform duration-200 ${mobileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileDropdownOpen && (
                  <ul className="mt-1 ml-4 space-y-1 bg-green-50 rounded-lg p-2">
                    <li>
                      <Link href="/property-inquiry" className="block px-3 py-2 text-gray-600 hover:text-green-600 text-sm rounded" onClick={() => setIsOpen(false)}>Property Inquiry</Link>
                    </li>
                    <li>
                      <Link href="https://www.loanfactory.com/balkhadka" target="_blank" className="block px-3 py-2 text-gray-600 hover:text-green-600 text-sm rounded" onClick={() => setIsOpen(false)}>Get Mortgage Quote</Link>
                    </li>
                    <li>
                      <Link href="/insurance-quote" className="block px-3 py-2 text-gray-600 hover:text-green-600 text-sm rounded" onClick={() => setIsOpen(false)}>Get Insurance Quote</Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Login Button */}
              <li className="pt-3 border-t border-gray-200">
                <Link
                  href="/login"
                  className="block w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}

