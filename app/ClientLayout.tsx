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
  const isCard = pathname === '/card'

  if (isCard) {
    return (
      <div style={{
        margin: 0,
        fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, "Apple Color Emoji","Segoe UI Emoji"',
        background: 'radial-gradient(1200px 600px at 20% 0%, rgba(96,165,250,.25), transparent 55%), radial-gradient(800px 500px at 90% 10%, rgba(34,197,94,.22), transparent 55%), #0b0f19',
        color: '#e5e7eb',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '22px'
      }}>
        {children}
      </div>
    )
  }

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