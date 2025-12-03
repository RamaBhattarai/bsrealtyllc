"use client"; // client component to use links

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="p-2 border-b border-gray-300">
      <Link href="/" className="mr-2">Home</Link>
      <Link href="/about">About</Link>
    </nav>
  );
}
