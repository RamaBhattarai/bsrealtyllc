'use client'

import { usePathname } from 'next/navigation'
import TopBanner from "./components/TopBanner";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname()
  const isDashboard = pathname?.startsWith('/dashboard')

  return (
    <>
      {!isDashboard && <TopBanner />}
      {!isDashboard && <Navbar />}
      <main className="flex-1" style={!isDashboard ? { paddingTop: 'calc(var(--topbanner-height, 0px) + 64px)' } : undefined}>
        {children}
      </main>
      {!isDashboard && <Footer />}
    </>
  )
}