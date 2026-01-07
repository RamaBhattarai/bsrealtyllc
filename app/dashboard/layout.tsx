'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FaTachometerAlt, FaUsers, FaEnvelope, FaUserTie, FaCog, FaSignOutAlt, FaBars, FaTimes, FaCalendarAlt, FaBriefcase, FaHome, FaShieldAlt, FaBell } from 'react-icons/fa'
import { useUpdateContactStatus } from '../../hooks/useContact';
import { useUpdatePropertyInquiryStatus } from '../../hooks/usePropertyInquiry';
import { useUpdateInsuranceQuoteStatus } from '../../hooks/useInsuranceQuote';
import { useUpdateAppointmentStatus } from '../../hooks/useAppointment';
import { useUpdateJobApplicationStatus } from '../../hooks/useJobApplication';
import { useUpdateAgentApplicationStatus } from '../../hooks/useAgentApplication';
import { useAuth, useLogout } from '../../hooks/useAuth';
import { useNotifications } from '../../hooks/useNotifications';
import Link from 'next/link'
import { toast } from 'react-hot-toast'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const adminNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: FaTachometerAlt },
  { name: 'Users', href: '/dashboard/users', icon: FaUsers },
  { name: 'Contacts', href: '/dashboard/contacts', icon: FaEnvelope },
  { name: 'Property Inquiries', href: '/dashboard/property-inquiries', icon: FaHome },
  { name: 'Insurance Quotes', href: '/dashboard/insurance-quotes', icon: FaShieldAlt },
  { name: 'Home Improvement Quotes', href: '/dashboard/home-improvement-quotes', icon: FaHome },
  { name: 'Appointments', href: '/dashboard/appointments', icon: FaCalendarAlt },
  { name: 'Job Applications', href: '/dashboard/job-applications', icon: FaBriefcase },
  { name: 'Agent Applications', href: '/dashboard/agent-applications', icon: FaUserTie },
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
  const [isHydrated, setIsHydrated] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const { user, isAdmin, isAgent, isClient, isLoading } = useAuth()
  const logoutMutation = useLogout()
  const router = useRouter()
  const { data: notifications } = useNotifications(isAdmin)
  const contactUpdater = useUpdateContactStatus()
  const propertyInquiryUpdater = useUpdatePropertyInquiryStatus()
  const insuranceQuoteUpdater = useUpdateInsuranceQuoteStatus()
  const appointmentUpdater = useUpdateAppointmentStatus()
  const jobApplicationUpdater = useUpdateJobApplicationStatus()
  const agentApplicationUpdater = useUpdateAgentApplicationStatus()
  const updateContactStatus = useUpdateContactStatus()

  // Select navigation based on user role
  const navigation = isAdmin ? adminNavigation : isAgent ? agentNavigation : clientNavigation
  const dashboardTitle = isAdmin ? 'Admin Dashboard' : isAgent ? 'Agent Dashboard' : 'Client Dashboard'

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    // Only redirect if we're hydrated, not loading, and the user is not authenticated
    if (isHydrated && !isLoading && !user) {
      router.push('/login')
    }
  }, [user, isLoading, router, isHydrated])

  // Close notifications dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsOpen && !(event.target as Element).closest('.notification-dropdown')) {
        setNotificationsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [notificationsOpen])

  // Show loading state while checking authentication, but only after hydration
  if (!isHydrated || isLoading) {
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
                className="group flex items-center px-4 py-3 text-base text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 cursor-pointer"
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
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 cursor-pointer"
              onClick={() => setSidebarOpen(true)}
            >
              <FaBars className="w-6 h-6" />
            </button>

            <div className="flex items-center space-x-4">
              {isAdmin && (
                <div className="relative">
                  <button
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    className="relative p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-md cursor-pointer"
                  >
                    <FaBell className="w-6 h-6" />
                    {(() => {
                      const total = notifications?.total;
                      return total && total > 0 ? (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {total > 99 ? '99+' : total}
                        </span>
                      ) : null;
                    })()}
                  </button>
                  {notificationsOpen && (
                    <div className="fixed right-6 top-20 w-80 bg-white rounded-md shadow-lg z-100 border border-gray-200 notification-dropdown">
                      <div className="p-4 border-b border-gray-200">
                        <h3 className="text-sm font-medium text-gray-900">Recent Notifications</h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {notifications?.total ? `${notifications.total} new submissions` : 'No new notifications'}
                        </p>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {(notifications?.recent && notifications.recent.length > 0) ? (
                          notifications.recent.map((item, index) => (
                            <div key={index} className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer" onClick={async () => {
                              setNotificationsOpen(false);
                              
                              // Update status when clicked to change from new to pending
                              if (item.type === 'contact') {
                                try {
                                  await contactUpdater.mutateAsync({ id: item.id, status: 'pending' });
                                } catch (error) {
                                  console.warn('Failed to update contact status:', error);
                                }
                              } else if (item.type === 'property-inquiry') {
                                try {
                                  await propertyInquiryUpdater.mutateAsync({ id: item.id, status: 'pending' });
                                } catch (error) {
                                  console.warn('Failed to update property inquiry status:', error);
                                }
                              } else if (item.type === 'insurance-quote') {
                                try {
                                  await insuranceQuoteUpdater.mutateAsync({ id: item.id, status: 'pending' });
                                } catch (error) {
                                  console.warn('Failed to update insurance quote status:', error);
                                }
                              } else if (item.type === 'appointment') {
                                try {
                                  await appointmentUpdater.mutateAsync({ id: item.id, status: 'pending' });
                                } catch (error) {
                                  console.warn('Failed to update appointment status:', error);
                                }
                              } else if (item.type === 'job-application') {
                                try {
                                  await jobApplicationUpdater.mutateAsync({ id: item.id, status: 'pending' });
                                } catch (error) {
                                  console.warn('Failed to update job application status:', error);
                                }
                              } else if (item.type === 'agent-application') {
                                try {
                                  await agentApplicationUpdater.mutateAsync({ id: item.id, status: 'pending' });
                                } catch (error) {
                                  console.warn('Failed to update agent application status:', error);
                                }
                              }
                              
                              // Navigate to the respective page
                              if (item.type === 'contact') {
                                router.push(`/dashboard/contacts?id=${item.id}`);
                              } else if (item.type === 'property-inquiry') {
                                router.push(`/dashboard/property-inquiries?id=${item.id}`);
                              } else if (item.type === 'insurance-quote') {
                                router.push(`/dashboard/insurance-quotes?id=${item.id}`);
                              } else if (item.type === 'appointment') {
                                router.push(`/dashboard/appointments?id=${item.id}`);
                              } else if (item.type === 'job-application') {
                                router.push(`/dashboard/job-applications?id=${item.id}`);
                              } else if (item.type === 'agent-application') {
                                router.push(`/dashboard/agent-applications?id=${item.id}`);
                              }
                            }}>
                              <p className="text-sm text-gray-900">
                                New {item.type.replace('-', ' ')} from {item.title}
                              </p>
                              <p className="text-xs text-gray-500">
                                {new Date(item.timestamp).toLocaleString()}
                              </p>
                            </div>
                          ))
                        ) : (
                          <div className="p-3 text-sm text-gray-500">No recent notifications</div>
                        )}
                      </div>
                      <div className="p-3 border-t border-gray-200">
                        <button
                          onClick={() => {
                            setNotificationsOpen(false);
                            router.push('/dashboard');
                          }}
                          className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
                        >
                          View all in dashboard
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
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
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
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