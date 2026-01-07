'use client'

import { useState, useMemo, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { FaSearch, FaFilter, FaEye, FaEdit, FaTrash, FaDownload, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { contactAPI } from '../../../lib/api/contact.api'
import { formatPhone } from '../../../lib/utils/common'
import toast from 'react-hot-toast'

interface ContactModalProps {
  contact: any
  isOpen: boolean
  onClose: () => void
  onStatusUpdate: (id: string, status: string) => void
  formatPhone: (phone: string) => string
}

function ContactModal({ contact, isOpen, onClose, onStatusUpdate, formatPhone }: ContactModalProps) {
  if (!isOpen || !contact) return null

  const handleStatusChange = (status: 'pending' | 'responded' | 'closed') => {
    const id = contact.id || contact._id;
    if (!id) {
      toast.error('Invalid contact ID');
      return;
    }
    onStatusUpdate(id, status)
    onClose()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'responded': return 'bg-blue-100 text-blue-800'
      case 'closed': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-white" style={{ zIndex: 9999 }}>
      <div className="min-h-screen">
        <div className="w-full p-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Contact Details</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{contact.name}</h3>
                  <p className="text-gray-600">{contact.email}</p>
                  <p className="text-gray-600">{formatPhone(contact.phone)}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(contact.status)}`}>
                    {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">
                    Submitted: {new Date(contact.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Information */}
                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-700 mb-3">Contact Information</h4>
                  <div className="space-y-2 text-sm dark:text-gray-700">
                    <p><span className="font-medium">Name:</span> {contact.name}</p>
                    <p><span className="font-medium">Email:</span> {contact.email}</p>
                    <p><span className="font-medium">Phone:</span> {formatPhone(contact.phone)}</p>
                    <p><span className="font-medium">Subject:</span> {contact.subject}</p>
                  </div>
                </div>

                {/* Message */}
                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="font-semibold text-gray-900 mb-3 dark:text-gray-700">Message</h4>
                  <div className="text-sm bg-gray-50 p-3 rounded dark:text-gray-700">
                    {contact.message}
                  </div>
                </div>
              </div>
            </div>

            {/* Status Update Actions */}
            <div className="flex justify-between items-center">
              <div className="flex space-x-3">
                <button
                  onClick={() => handleStatusChange('pending')}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  Mark as Pending
                </button>
                <button
                  onClick={() => handleStatusChange('responded')}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Mark as Responded
                </button>
                <button
                  onClick={() => handleStatusChange('closed')}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Mark as Closed
                </button>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ContactsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedContact, setSelectedContact] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const itemsPerPage = 10

  const queryClient = useQueryClient()
  const searchParams = useSearchParams()
  const highlightId = searchParams.get('id')

  // Fetch contacts with pagination and filters
  const { data: contactsData, isLoading } = useQuery({
    queryKey: ['contacts', { page: currentPage, limit: itemsPerPage, status: statusFilter, search: searchTerm }],
    queryFn: () => contactAPI.getAll({
      page: currentPage,
      limit: itemsPerPage,
      status: statusFilter || undefined,
      search: searchTerm || undefined,
    }),
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5000, // Refetch every 5 seconds
    refetchOnWindowFocus: true,
  })

  useEffect(() => {
    if (highlightId && contactsData?.contacts) {
      const row = document.getElementById(`contact-${highlightId}`)
      if (row) {
        row.scrollIntoView({ behavior: 'smooth', block: 'center' })
        row.classList.add('bg-blue-100')
        setTimeout(() => row.classList.remove('bg-blue-100'), 5000)
      }
    }
  }, [contactsData, highlightId])

  // Update contact status mutation
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'pending' | 'responded' | 'closed' }) =>
      contactAPI.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] })
      toast.success('Contact status updated successfully')
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update contact status')
    },
  })

  // Delete contact mutation
  const deleteMutation = useMutation({
    mutationFn: contactAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] })
      toast.success('Contact deleted successfully')
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete contact')
    },
  })

  const handleViewContact = (contact: any) => {
    setSelectedContact(contact)
    setIsModalOpen(true)
  }

  const handleStatusUpdate = (id: string | undefined, status: string) => {
    if (!id) {
      toast.error('Invalid contact ID');
      return;
    }
    updateStatusMutation.mutate({ id: id as string, status: status as 'pending' | 'responded' | 'closed' })
  }

  const handleDelete = (id: string | undefined) => {
    if (!id) {
      toast.error('Invalid contact ID');
      return;
    }
    if (confirm('Are you sure you want to delete this contact?')) {
      deleteMutation.mutate(id as string)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'responded': return 'bg-blue-100 text-blue-800'
      case 'closed': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const totalPages = contactsData?.totalPages || 1

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <FaDownload className="w-4 h-4 mr-2" />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="sm:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 bg-white! text-gray-900! rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="responded">Responded</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
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
              {isLoading ? (
                <tr key="loading">
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    Loading contacts...
                  </td>
                </tr>
              ) : contactsData?.contacts?.length ? (
                contactsData.contacts.map((contact, index) => (
                  <tr key={contact.id || `contact-${index}`} id={`contact-${contact.id || contact._id}`} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {contact.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {contact.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatPhone(contact.phone)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {contact.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(contact.status)}`}>
                        {contact.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleViewContact(contact)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <FaEye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(contact.id || contact._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr key="empty">
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    No contacts found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing page <span className="font-medium">{currentPage}</span> of{' '}
                  <span className="font-medium">{totalPages}</span>
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <FaChevronLeft className="w-4 h-4" />
                  </button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          page === currentPage
                            ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    )
                  })}
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <FaChevronRight className="w-4 h-4" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Contact Modal */}
      <ContactModal
        contact={selectedContact}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onStatusUpdate={handleStatusUpdate}
        formatPhone={formatPhone}
      />
    </div>
  )
}