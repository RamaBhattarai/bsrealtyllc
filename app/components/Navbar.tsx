"use client"; // client component to use links

import Link from "next/link";
<<<<<<< HEAD
import Image from "next/image"; // Add this import

export default function Navbar() {
  return (
    <nav className="bg-white text-gray-800 p-4 shadow-md border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo on the left */}
       <div className="text-2xl font-bold ml-10">
          <Link href="/">
            <Image
              src="/logo-bsrealtyllc.png" // Path to your image in public/
              alt="BS Realty LLC"
              width={250} 
              height={100} 
              className="h-15 w-auto" 
            />
          </Link>
        </div>
        
        {/* Menu items on the right */}
        <ul className="flex space-x-9 mr-15">
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
      </div>
    </nav>
  );
}
=======

export default function Navbar() {
  return (
    <nav className="p-2 border-b border-gray-300">
      <Link href="/" className="mr-2">Home</Link>
      <Link href="/about">About</Link>
    </nav>
  );
}
>>>>>>> 687ea3826827044a2f9a388371c67475543bb124
