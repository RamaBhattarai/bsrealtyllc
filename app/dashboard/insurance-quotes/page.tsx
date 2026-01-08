'use client'

import { useState, useMemo, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { FaSearch, FaFilter, FaEye, FaTrash, FaDownload, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { insuranceQuoteAPI } from '../../../lib/api/insuranceQuote.api'
import { formatPhone } from '../../../lib/utils/common'
import toast from 'react-hot-toast'

interface InsuranceQuoteModalProps {
  quote: any
  isOpen: boolean
  onClose: () => void
  onStatusUpdate: (id: string, status: string) => void
}

function InsuranceQuoteModal({ quote, isOpen, onClose, onStatusUpdate }: InsuranceQuoteModalProps) {
  if (!isOpen || !quote) return null

  const handleStatusChange = (status: 'pending' | 'responded' | 'closed') => {
    const id = quote.id || quote._id;
    if (!id) {
      toast.error('Invalid quote ID');
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
 //view modal
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-white" style={{ zIndex: 9999 }}>
      <div className="min-h-screen">
        <div className="w-full p-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Insurance Quote Details</h2>
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
                  <h3 className="text-xl font-semibold text-gray-900">{quote.fullName}</h3>
                  <p className="text-gray-600">{quote.email}</p>
                  <p className="text-gray-600">{formatPhone(quote.phone)}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(quote.status)}`}>
                    {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">
                    Submitted: {new Date(quote.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="bg-white dark:text-gray-700 p-4 rounded-lg border">
                  <h4 className="font-semibold text-gray-900 mb-3">Personal Information</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Full Name:</span> {quote.fullName}</p>
                    <p><span className="font-medium">Date of Birth:</span> {new Date(quote.dateOfBirth).toLocaleDateString()}</p>
                    <p><span className="font-medium">Gender:</span> {quote.gender}</p>
                    <p><span className="font-medium">Email:</span> {quote.email}</p>
                    <p><span className="font-medium">Phone:</span> {formatPhone(quote.phone)}</p>
                    <p><span className="font-medium">DL Number:</span> {quote.dlNumber}</p>
                    <p><span className="font-medium">DL Status:</span> {quote.dlStatus}</p>
                    <p><span className="font-medium">Marital Status:</span> {quote.maritalStatus}</p>
                    <p><span className="font-medium">Occupation:</span> {quote.occupation}</p>
                  </div>
                </div>

                {/* Co-Applicant Information */}
                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="font-semibold text-gray-900 mb-3">Co-Applicant Information</h4>
                  <div className="space-y-2 text-sm dark:text-gray-700">
                    {quote.coApplicantFullName ? (
                      <>
                        <p><span className="font-medium">Full Name:</span> {quote.coApplicantFullName}</p>
                        {quote.coApplicantDOB && <p><span className="font-medium">Date of Birth:</span> {new Date(quote.coApplicantDOB).toLocaleDateString()}</p>}
                        {quote.coApplicantDLNumber && <p><span className="font-medium">DL Number:</span> {quote.coApplicantDLNumber}</p>}
                        {quote.coApplicantRelationship && <p><span className="font-medium">Relationship:</span> {quote.coApplicantRelationship}</p>}
                        {quote.coApplicantMilitary && <p><span className="font-medium">Military:</span> {quote.coApplicantMilitary}</p>}
                      </>
                    ) : (
                      <p className="text-gray-500">No co-applicant information provided.</p>
                    )}
                  </div>
                </div>

                {/* Property Information */}
                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="font-semibold text-gray-900 mb-3">Property Information</h4>
                  <div className="space-y-2 dark:text-gray-700 text-sm">
                    <p><span className="font-medium">Property Address:</span> {quote.propertyAddress}</p>
                    <p><span className="font-medium">Dwelling Usage:</span> {quote.dwellingUsage}</p>
                    <p><span className="font-medium">Occupancy Type:</span> {quote.occupancyType}</p>
                    <p><span className="font-medium">Foundation Type:</span> {quote.foundationType}</p>
                    <p><span className="font-medium">Roof Type:</span> {quote.roofType}</p>
                  </div>
                </div>

                {/* Auto Information */}
                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-700 mb-3">Auto Information</h4>
                  <div className="space-y-2  dark:text-gray-700 text-sm">
                    <p><span className="font-medium">VIN:</span> {quote.vin}</p>
                    <p><span className="font-medium">Vehicle Use:</span> {quote.vehicleUse}</p>
                    <p><span className="font-medium">Date Purchased:</span> {new Date(quote.datePurchased).toLocaleDateString()}</p>
                    {quote.bodilyInjury && <p><span className="font-medium">Bodily Injury:</span> {quote.bodilyInjury}</p>}
                    {quote.propertyDamage && <p><span className="font-medium">Property Damage:</span> {quote.propertyDamage}</p>}
                  </div>
                </div>

                {/* Additional Info */}
                <div className="bg-white p-4 rounded-lg border md:col-span-2">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-700 mb-3">Additional Information</h4>
                  <div className="text-sm dark:text-gray-700">
                    {quote.additionalInfo || 'No additional information provided.'}
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

export default function InsuranceQuotesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [dwellingUsageFilter, setDwellingUsageFilter] = useState('')
  const [occupancyTypeFilter, setOccupancyTypeFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedQuote, setSelectedQuote] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const itemsPerPage = 10

  const queryClient = useQueryClient()
  const searchParams = useSearchParams()
  const highlightId = searchParams.get('id')

  // Fetch insurance quotes with pagination and filters
  const { data: quotesData, isLoading } = useQuery({
    queryKey: ['insurance-quotes', { page: currentPage, limit: itemsPerPage, status: statusFilter, dwellingUsage: dwellingUsageFilter, occupancyType: occupancyTypeFilter, search: searchTerm }],
    queryFn: () => insuranceQuoteAPI.getAll({
      page: currentPage,
      limit: itemsPerPage,
      status: statusFilter || undefined,
      dwellingUsage: dwellingUsageFilter || undefined,
      occupancyType: occupancyTypeFilter || undefined,
      search: searchTerm || undefined,
    }),
  })

  useEffect(() => {
    if (highlightId && quotesData?.quotes) {
      const row = document.getElementById(`quote-${highlightId}`)
      if (row) {
        row.scrollIntoView({ behavior: 'smooth', block: 'center' })
        row.classList.add('bg-blue-100')
        setTimeout(() => row.classList.remove('bg-blue-100'), 1000)
      }
    }
  }, [quotesData, highlightId])

  // Update quote status mutation
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'pending' | 'responded' | 'closed' }) =>
      insuranceQuoteAPI.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['insurance-quotes'] })
      toast.success('Quote status updated successfully')
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update quote status')
    },
  })

  // Delete quote mutation
  const deleteMutation = useMutation({
    mutationFn: insuranceQuoteAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['insurance-quotes'] })
      toast.success('Quote deleted successfully')
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete quote')
    },
  })

  const handleViewQuote = (quote: any) => {
    setSelectedQuote(quote)
    setIsModalOpen(true)
  }

  const handleStatusUpdate = (id: string | undefined, status: string) => {
    if (!id) {
      toast.error('Invalid quote ID');
      return;
    }
    updateStatusMutation.mutate({ id: id as string, status: status as 'pending' | 'responded' | 'closed' })
  }

  const handleDelete = (id: string | undefined) => {
    if (!id) {
      toast.error('Invalid quote ID');
      return;
    }
    if (confirm('Are you sure you want to delete this quote?')) {
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

  const totalPages = quotesData?.pagination?.pages || 1

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Insurance Quotes</h1>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <FaDownload className="w-4 h-4 mr-2" />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search quotes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300  bg-white! text-gray-900! rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="responded">Responded</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <div>
            <select
              value={dwellingUsageFilter}
              onChange={(e) => setDwellingUsageFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 bg-white! text-gray-900! rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Dwelling Usage</option>
              <option value="Primary Home">Primary Home</option>
              <option value="Secondary Home">Secondary Home</option>
              <option value="Seasonal Home">Seasonal Home</option>
              <option value="Farm">Farm</option>
              <option value="Rental Property">Rental Property</option>
              <option value="Commercial Property">Commercial Property</option>
            </select>
          </div>
          <div>
            <select
              value={occupancyTypeFilter}
              onChange={(e) => setOccupancyTypeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 bg-white! text-gray-900! rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Occupancy Type</option>
              <option value="Owner Occupied">Owner Occupied</option>
              <option value="Renter Occupied">Renter Occupied</option>
              <option value="Unoccupied">Unoccupied</option>
              <option value="Vacant">Vacant</option>
              <option value="Business">Business</option>
            </select>
          </div>
        </div>
      </div>

      {/* Quotes Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dwelling Usage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr key="loading">
                  <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                    Loading insurance quotes...
                  </td>
                </tr>
              ) : quotesData?.quotes?.length ? (
                quotesData.quotes.map((quote, index) => (
                  <tr key={quote.id || `quote-${index}`} id={`quote-${quote.id || quote._id}`} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {quote.fullName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {quote.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatPhone(quote.phone)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {quote.propertyAddress}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {quote.dwellingUsage}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(quote.status)}`}>
                        {quote.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(quote.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleViewQuote(quote)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <FaEye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(quote.id || quote._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr key="empty">
                  <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                    No insurance quotes found
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

      {/* Insurance Quote Modal */}
      <InsuranceQuoteModal
        quote={selectedQuote}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onStatusUpdate={handleStatusUpdate}
      />
    </div>
  )
}