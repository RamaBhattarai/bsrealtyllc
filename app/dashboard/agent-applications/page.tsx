'use client'

import { useState, useMemo } from 'react'
import { FaSearch, FaEye, FaTrash, FaDownload, FaCalendarAlt, FaUser, FaBriefcase, FaFilter, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { useAgentApplications, useUpdateAgentApplicationStatus, useDeleteAgentApplication, useDownloadAgentResume, useDownloadAgentLicense, useDownloadAgentIdCard, useAgentApplicationFilters } from '../../../hooks/useAgentApplication'
import type { AgentApplication } from '../../../lib/api/agentApplication.api'

interface AgentApplicationModalProps {
  application: AgentApplication | null
  isOpen: boolean
  onClose: () => void
  onStatusUpdate: (id: string, status: 'pending' | 'reviewed' | 'accepted' | 'rejected') => void
  onDownloadResume: (id: string) => void
  onDownloadLicense: (id: string, filename: string) => void
  onDownloadIdCard: (id: string, filename: string) => void
}

function AgentApplicationModal({ application, isOpen, onClose, onStatusUpdate, onDownloadResume, onDownloadLicense, onDownloadIdCard }: AgentApplicationModalProps) {
  if (!isOpen || !application) return null

  const [expandedSections, setExpandedSections] = useState({
    areasOfExpertise: false,
    referrerName: false,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handleStatusChange = (status: 'pending' | 'reviewed' | 'accepted' | 'rejected') => {
    onStatusUpdate(application._id, status)
    onClose()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'reviewed': return 'bg-blue-100 text-blue-800'
      case 'accepted': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-white" style={{ zIndex: 9999 }}>
      <div className="min-h-screen">
        <div className="w-full p-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Agent Application Details</h2>
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
                  <h3 className="text-xl font-semibold text-gray-900">{application.name}</h3>
                  <p className="text-gray-600">{application.email}</p>
                  <p className="text-gray-600">{application.phone}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">
                    Applied: {new Date(application.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <FaUser className="mr-2 text-blue-500" />
                    Personal Information
                  </h4>
                  <div className="space-y-2 text-sm dark:text-gray-700">
                    <p><span className="font-medium">Name:</span> {application.name}</p>
                    <p><span className="font-medium">Email:</span> {application.email}</p>
                    <p><span className="font-medium">Phone:</span> {application.phone}</p>
                  </div>
                </div>

                {/* Professional Background */}
                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <FaBriefcase className="mr-2 text-green-500" />
                    Professional Background
                  </h4>
                  <div className="space-y-2 text-sm  dark:text-gray-700">
                    <p><span className="font-medium">License Status:</span> {application.licenseStatus}</p>
                    {application.licenseNumber && <p><span className="font-medium">License Number:</span> {application.licenseNumber}</p>}
                    {application.licensedStates && <p><span className="font-medium">Licensed States:</span> {application.licensedStates}</p>}
                    <p><span className="font-medium">Experience:</span> {application.yearsExperience}</p>
                    {application.currentBrokerage && <p><span className="font-medium">Current Brokerage:</span> {application.currentBrokerage}</p>}
                  </div>
                </div>

                {/* Areas of Expertise */}
                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="font-semibold text-gray-900  dark:text-gray-700 mb-3 cursor-pointer flex items-center justify-between"
                      onClick={() => toggleSection('areasOfExpertise')}>
                    <span>Areas of Expertise</span>
                    {expandedSections.areasOfExpertise ? <FaChevronUp /> : <FaChevronDown />}
                  </h4>
                  {expandedSections.areasOfExpertise && (
                    <div className="text-sm">
                      <div className="flex flex-wrap gap-2">
                        {application.areasOfExpertise.map((area, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Questionnaire */}
                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="font-semibold text-gray-900 mb-3">Questionnaire</h4>
                  <div className="space-y-2 text-sm  dark:text-gray-700">
                    <p><span className="font-medium">Availability:</span> {application.availability}</p>
                    <p><span className="font-medium">Work Eligibility:</span> {application.workEligibility}</p>
                    <p><span className="font-medium">How did you hear:</span> {application.howDidYouHear}</p>
                    {application.referrerName && (
                      <div>
                        <p className="font-medium cursor-pointer flex items-center justify-between"
                           onClick={() => toggleSection('referrerName')}>
                          <span>Referrer Name</span>
                          {expandedSections.referrerName ? <FaChevronUp /> : <FaChevronDown />}
                        </p>
                        {expandedSections.referrerName && (
                          <p className="text-gray-600 mt-1">{application.referrerName}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* File Downloads */}
              <div className="bg-white p-4 rounded-lg border mt-6">
                <h4 className="font-semibold text-gray-900 mb-3">Documents</h4>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => onDownloadResume(application._id)}
                    className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <FaDownload className="mr-2" />
                    Download Resume
                  </button>
                  {application.license && (
                    <button
                      onClick={() => onDownloadLicense(application._id, application.license!)}
                      className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <FaDownload className="mr-2" />
                      Download License
                    </button>
                  )}
                  {application.idCard && (
                    <button
                      onClick={() => onDownloadIdCard(application._id, application.idCard!)}
                      className="flex items-center px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                    >
                      <FaDownload className="mr-2" />
                      Download ID Card
                    </button>
                  )}
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
                  onClick={() => handleStatusChange('reviewed')}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Mark as Reviewed
                </button>
                <button
                  onClick={() => handleStatusChange('accepted')}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Accept Application
                </button>
                <button
                  onClick={() => handleStatusChange('rejected')}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Reject Application
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

export default function AgentApplicationsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All Status')
  const [selectedApplication, setSelectedApplication] = useState<AgentApplication | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const { data: applicationsData, isLoading, error } = useAgentApplications({
    page: currentPage,
    limit: 10,
    status: statusFilter !== 'All Status' ? statusFilter.toLowerCase() : undefined,
    search: searchTerm || undefined,
  })

  const { data: filtersData } = useAgentApplicationFilters()

  const updateStatusMutation = useUpdateAgentApplicationStatus()
  const deleteMutation = useDeleteAgentApplication()
  const downloadResumeMutation = useDownloadAgentResume()
  const downloadLicenseMutation = useDownloadAgentLicense()
  const downloadIdCardMutation = useDownloadAgentIdCard()



  const applications = applicationsData?.data || []
  const totalPages = applicationsData?.totalPages || 1

  const handleStatusUpdate = (id: string, status: 'pending' | 'reviewed' | 'accepted' | 'rejected') => {
    updateStatusMutation.mutate({ id, status })
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this application? This action cannot be undone.')) {
      deleteMutation.mutate(id)
    }
    setDeleteConfirm(null)
  }

  const handleDownloadResume = (id: string) => {
    downloadResumeMutation.mutate(id)
  }

  const handleDownloadLicense = (id: string, filename: string) => {
    downloadLicenseMutation.mutate({ id, filename })
  }

  const handleDownloadIdCard = (id: string, filename: string) => {
    downloadIdCardMutation.mutate({ id, filename })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'reviewed': return 'bg-blue-100 text-blue-800'
      case 'accepted': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const statusOptions = ['All Status', 'Pending', 'Reviewed', 'Accepted', 'Rejected']

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading applications. Please try again.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Agent Applications</h1>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {statusOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  License Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Experience
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applied Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((application) => (
                <tr key={application._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{application.name}</div>
                      <div className="text-sm text-gray-500">{application.email}</div>
                      <div className="text-sm text-gray-500">{application.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{application.licenseStatus}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{application.yearsExperience}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(application.status)}`}>
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(application.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedApplication(application)
                          setIsModalOpen(true)
                        }}
                        className="text-blue-600 hover:text-blue-900"
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => handleDownloadResume(application._id)}
                        className="text-green-600 hover:text-green-900"
                        title="Download Resume"
                      >
                        <FaDownload />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(application._id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete Application"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {applications.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No agent applications found.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-500 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="px-3 py-2 text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-500 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg font-medium text-gray-900">Delete Application</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete this application? This action cannot be undone.
                </p>
              </div>
              <div className="flex items-center px-4 py-3 space-x-4">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-4 py-2 bg-gray-300 text-gray-900 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Application Modal */}
      <AgentApplicationModal
        application={selectedApplication}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedApplication(null)
        }}
        onStatusUpdate={handleStatusUpdate}
        onDownloadResume={handleDownloadResume}
        onDownloadLicense={handleDownloadLicense}
        onDownloadIdCard={handleDownloadIdCard}
      />
    </div>
  )
}