'use client'

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
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
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/services", label: "Services" },
    { href: "/properties", label: "Properties" },
    { href: "/teams", label: "Teams" },
    { href: "/solutions", label: "Solutions" },
    { href: "/contact", label: "Contact" },
  ];

  const navLinkClass = "font-medium text-gray-700 hover:text-green-600 transition-all duration-300 relative group";
  const underlineClass = "after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 group-hover:after:w-full after:bg-gradient-to-r after:from-green-500 after:to-green-600 after:transition-all after:duration-300";

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-white shadow-lg" 
        : "bg-white/95 backdrop-blur-sm shadow-md"
    }`} style={{ top: 'var(--topbanner-height, 0)' }}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo and Title */}
          <Link href="/" onClick={() => setIsOpen(false)} className="flex-shrink-0 flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image
              src="/logo-bsrealtyllc.png"
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
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${navLinkClass} ${underlineClass} px-3 py-2 text-sm xl:text-base`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA Button - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/get-started"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              Get Started
            </Link>
          </div>

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
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white border-t border-gray-100 shadow-xl">
          <ul className="flex flex-col divide-y divide-gray-100 py-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block px-4 py-3 text-gray-700 font-medium hover:bg-green-50 hover:text-green-600 transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2 mt-2">
              <Link
                href="/get-started"
                className="block mx-4 mb-2 bg-green-600 hover:bg-green-700 text-white text-center font-semibold px-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
