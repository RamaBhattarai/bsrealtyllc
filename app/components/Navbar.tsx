"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white text-gray-800 p-4 shadow-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo on the left */}
        <div className="text-2xl font-bold ml-4 md:ml-10">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <Image
              src="/logo-bsrealtyllc.png"
              alt="BS Realty LLC"
              width={250}
              height={100}
              className="h-12 md:h-16 w-auto"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 lg:space-x-9 mr-4 lg:mr-16">
          <li>
            <Link href="/" className="font-medium relative text-[#444444] hover:text-gray-600 transition-all duration-200 transform hover:scale-105 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-green-600 after:transition-all after:duration-300">Home</Link>
          </li>
          <li>
            <Link href="/about" className="font-medium relative text-[#444444] hover:text-gray-600 transition-all duration-200 transform hover:scale-105 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-green-600 after:transition-all after:duration-300">About</Link>
          </li>
          <li>
            <Link href="/blog" className="font-medium relative text-[#444444] hover:text-gray-600 transition-all duration-200 transform hover:scale-105 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-green-600 after:transition-all after:duration-300">Blog</Link>
          </li>
          <li>
            <Link href="/services" className="font-medium relative text-[#444444] hover:text-gray-600 transition-all duration-200 transform hover:scale-105 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-green-600 after:transition-all after:duration-300">Services</Link>
          </li>
          <li>
            <Link href="/properties" className="font-medium relative text-[#444444] hover:text-gray-600 transition-all duration-200 transform hover:scale-105 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-green-600 after:transition-all after:duration-300">Properties</Link>
          </li>
          <li>
            <Link href="/teams" className="font-medium relative text-[#444444] hover:text-gray-600 transition-all duration-200 transform hover:scale-105 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-green-600 after:transition-all after:duration-300">Teams</Link>
          </li>
          <li>
            <Link href="/solutions" className="font-medium relative text-[#444444] hover:text-gray-600 transition-all duration-200 transform hover:scale-105 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-green-600 after:transition-all after:duration-300">Solutions</Link>
          </li>
          <li>
            <Link href="/get-started" className="font-medium relative text-[#444444] hover:text-gray-600 transition-all duration-200 transform hover:scale-105 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-green-600 after:transition-all after:duration-300">Get Started</Link>
          </li>
          <li>
            <Link href="/contact" className="font-medium relative text-[#444444] hover:text-gray-600 transition-all duration-200 transform hover:scale-105 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-green-600 after:transition-all after:duration-300">Contact</Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800 p-2"
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-white border-t border-gray-200 shadow-lg`}>
        <ul className="flex flex-col space-y-4 py-6 px-4">
          <li>
            <Link
              href="/"
              className="block font-medium text-[#444444] hover:text-gray-600 transition-colors duration-200 py-2 px-4 rounded-lg hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="block font-medium text-[#444444] hover:text-gray-600 transition-colors duration-200 py-2 px-4 rounded-lg hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className="block font-medium text-[#444444] hover:text-gray-600 transition-colors duration-200 py-2 px-4 rounded-lg hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              href="/services"
              className="block font-medium text-[#444444] hover:text-gray-600 transition-colors duration-200 py-2 px-4 rounded-lg hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="/properties"
              className="block font-medium text-[#444444] hover:text-gray-600 transition-colors duration-200 py-2 px-4 rounded-lg hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Properties
            </Link>
          </li>
          <li>
            <Link
              href="/teams"
              className="block font-medium text-[#444444] hover:text-gray-600 transition-colors duration-200 py-2 px-4 rounded-lg hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Teams
            </Link>
          </li>
          <li>
            <Link
              href="/solutions"
              className="block font-medium text-[#444444] hover:text-gray-600 transition-colors duration-200 py-2 px-4 rounded-lg hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Solutions
            </Link>
          </li>
          <li>
            <Link
              href="/get-started"
              className="block font-medium text-[#444444] hover:text-gray-600 transition-colors duration-200 py-2 px-4 rounded-lg hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="block font-medium text-[#444444] hover:text-gray-600 transition-colors duration-200 py-2 px-4 rounded-lg hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
