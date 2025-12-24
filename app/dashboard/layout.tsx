'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FaTachometerAlt, FaUsers, FaEnvelope, FaUserTie, FaCog, FaSignOutAlt, FaBars, FaTimes, FaCalendarAlt } from 'react-icons/fa'
import { useAuth, useLogout } from '../../hooks/useAuth'
import Link from 'next/link'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const adminNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: FaTachometerAlt },
  { name: 'Users', href: '/dashboard/users', icon: FaUsers },
  { name: 'Contacts', href: '/dashboard/contacts', icon: FaEnvelope },
  { name: 'Appointments', href: '/dashboard/appointments', icon: FaCalendarAlt },
  { name: 'Agents', href: '/dashboard/agents', icon: FaUserTie },
  { name: 'Settings', href: '/dashboard/settings', icon: FaCog },
]

const agentNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: FaTachometerAlt },
  { name: 'My Appointments', href: '/dashboard/appointments', icon: FaCalendarAlt },
  { name: 'Settings', href: '/dashboard/settings', icon: FaCog },
]

const clientNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: FaTachometerAlt },
  { name: 'My Appointments', href: '/dashboard/appointments', icon: FaCalendarAlt },
  { name: 'Settings', href: '/dashboard/settings', icon: FaCog },
]

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, isAdmin, isAgent, isClient, isLoading } = useAuth()
  const logoutMutation = useLogout()
  const router = useRouter()

  // Select navigation based on user role
  const navigation = isAdmin ? adminNavigation : isAgent ? agentNavigation : clientNavigation
  const dashboardTitle = isAdmin ? 'Admin Dashboard' : isAgent ? 'Agent Dashboard' : 'Client Dashboard'

  useEffect(() => {
    // Only redirect if we're not loading and the user is not authenticated
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Don't render anything if user is not authenticated (will redirect)
  if (!user) {
    return null
  }

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0`}>
        <div className="flex items-center justify-center h-16 px-4 bg-blue-600">
          <h1 className="text-xl font-bold text-white">{dashboardTitle}</h1>
        </div>
        <nav className="mt-4 flex-1">
          <div className="px-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group flex items-center px-4 py-3 text-base text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="w-5 h-5 mr-3 text-gray-500 group-hover:text-blue-600" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
          
          
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              onClick={() => setSidebarOpen(true)}
            >
              <FaBars className="w-6 h-6" />
            </button>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {user?.name?.charAt(0).toUpperCase() || 'A'}
                  </span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{user?.name || 'Admin'}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FaSignOutAlt className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6 bg-gray-50 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  )
}