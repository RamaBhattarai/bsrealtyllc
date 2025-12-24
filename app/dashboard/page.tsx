'use client'

import { useState } from 'react'
import { FaUsers, FaEnvelope, FaUserTie, FaChartBar, FaCalendarAlt } from 'react-icons/fa'
import { useQuery } from '@tanstack/react-query'
import { contactAPI } from '../../lib/api/contact.api'
import { authAPI } from '../../lib/api/auth.api'
import { useAppointmentStats } from '../../hooks/useAppointment'

// Mock data for users and agents - replace with actual API calls when available
const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'client', status: 'active', createdAt: '2024-01-15' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'agent', status: 'active', createdAt: '2024-01-10' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'client', status: 'inactive', createdAt: '2024-01-05' },
]

const mockAgents = mockUsers.filter(user => user.role === 'agent')
const mockClients = mockUsers.filter(user => user.role === 'client')

interface MetricCardProps {
  title: string
  value: string | number
  icon: React.ComponentType<{ className?: string }>
  color: string
}

function MetricCard({ title, value, icon: Icon, color }: MetricCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  )
}

interface ContactRowProps {
  contact: {
    id: string
    name: string
    email: string
    phone: string
    subject: string
    status: string
    createdAt: string
  }
}

function ContactRow({ contact }: ContactRowProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'responded': return 'bg-blue-100 text-blue-800'
      case 'closed': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{contact.name}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.email}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.phone}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.subject}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(contact.status)}`}>
          {contact.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(contact.createdAt).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button className="text-blue-600 hover:text-blue-900">View</button>
      </td>
    </tr>
  )
}

export default function DashboardPage() {
  const [currentTab, setCurrentTab] = useState<'overview' | 'contacts' | 'users'>('overview')

  // Fetch contact stats
  const { data: contactStats, isLoading: statsLoading } = useQuery({
    queryKey: ['contact-stats'],
    queryFn: contactAPI.getStats,
  })

  // Fetch recent contacts
  const { data: contactsData, isLoading: contactsLoading } = useQuery({
    queryKey: ['contacts', { page: 1, limit: 10 }],
    queryFn: () => contactAPI.getAll({ page: 1, limit: 10 }),
  })

  // Fetch appointment stats
  const { data: appointmentStats, isLoading: appointmentStatsLoading } = useAppointmentStats()

  const metrics = [
    {
      title: 'Total Users',
      value: mockUsers.length,
      icon: FaUsers,
      color: 'bg-blue-500',
    },
    {
      title: 'Pending Appointments',
      value: appointmentStats?.pendingAppointments || 0,
      icon: FaCalendarAlt,
      color: 'bg-orange-500',
    },
    {
      title: 'Contacts Pending',
      value: contactStats?.pending || 0,
      icon: FaEnvelope,
      color: 'bg-yellow-500',
    },
    {
      title: 'Active Agents',
      value: mockAgents.filter(a => a.status === 'active').length,
      icon: FaUserTie,
      color: 'bg-green-500',
    },
    {
      title: 'Total Appointments',
      value: appointmentStats?.totalAppointments || 0,
      icon: FaChartBar,
      color: 'bg-purple-500',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentTab('overview')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              currentTab === 'overview'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setCurrentTab('contacts')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              currentTab === 'contacts'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Recent Contacts
          </button>
          <button
            onClick={() => setCurrentTab('users')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              currentTab === 'users'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Recent Users
          </button>
        </div>
      </div>

      {currentTab === 'overview' && (
        <>
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <MetricCard key={index} {...metric} />
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <FaEnvelope className="w-5 h-5 mr-2" />
                View All Contacts
              </button>
              <button className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <FaUsers className="w-5 h-5 mr-2" />
                Manage Users
              </button>
              <button className="flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                <FaChartBar className="w-5 h-5 mr-2" />
                View Reports
              </button>
            </div>
          </div>
        </>
      )}

      {currentTab === 'contacts' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Contact Submissions</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {contactsLoading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500">Loading...</td>
                  </tr>
                ) : contactsData?.contacts?.length ? (
                  contactsData.contacts.map((contact, index) => (
                    <ContactRow key={`${contact.id}-${index}`} contact={contact} />
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500">No contacts found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {currentTab === 'users' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent User Registrations</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{user.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}