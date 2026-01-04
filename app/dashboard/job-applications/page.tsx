'use client'

import { useState, useMemo } from 'react'
import { FaSearch, FaEye, FaTrash, FaDownload, FaCalendarAlt, FaUser, FaBriefcase, FaFilter, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { useJobApplications, useUpdateJobApplicationStatus, useDeleteJobApplication, useDownloadResume, useExportJobApplications } from '../../../hooks/useJobApplication'
import type { JobApplication } from '../../../lib/api/jobApplication.api'

interface JobApplicationModalProps {
  application: JobApplication | null
  isOpen: boolean
  onClose: () => void
  onStatusUpdate: (id: string, status: 'pending' | 'reviewed' | 'accepted' | 'rejected') => void
  onDownloadResume: (id: string) => void
}

function JobApplicationModal({ application, isOpen, onClose, onStatusUpdate, onDownloadResume }: JobApplicationModalProps) {
  if (!isOpen || !application) return null

  const [expandedSections, setExpandedSections] = useState({
    whyWorkHere: false,
    pastProjects: false,
    recentProject: false,
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
          <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
            <h3 className="text-2xl font-bold text-gray-900">Job Application Details</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Applicant Name</label>
                <p className="mt-1 text-sm text-gray-900 flex items-center">
                  <FaUser className="w-4 h-4 mr-2 text-gray-400" />
                  {application.name}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-sm text-gray-900">{application.email}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <p className="mt-1 text-sm text-gray-900">{application.phone}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Position Applied For</label>
                <p className="mt-1 text-sm text-gray-900 flex items-center">
                  <FaBriefcase className="w-4 h-4 mr-2 text-gray-400" />
                  {application.position}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <div className="mt-1">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(application.status)}`}>
                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Application Date</label>
                <p className="mt-1 text-sm text-gray-900 flex items-center">
                  <FaCalendarAlt className="w-4 h-4 mr-2 text-gray-400" />
                  {new Date(application.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
                <p className="mt-1 text-sm text-gray-900">{application.yearsExperience}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Expected Compensation</label>
                <p className="mt-1 text-sm text-gray-900">{application.compensation}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Time Zones</label>
                <p className="mt-1 text-sm text-gray-900">{application.timeZones}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Startup Experience</label>
                <p className="mt-1 text-sm text-gray-900">{application.startupExperience}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Work Arrangement</label>
                <p className="mt-1 text-sm text-gray-900">{application.workArrangement}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Work Setting</label>
                <p className="mt-1 text-sm text-gray-900">{application.workSetting}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Availability</label>
                <p className="mt-1 text-sm text-gray-900">{application.availability}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Technical Skills</label>
                <p className="mt-1 text-sm text-gray-900">
                  {application.technicalSkills && application.technicalSkills.length > 0 
                    ? application.technicalSkills.join(', ') 
                    : 'None specified'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Programming Languages</label>
                <p className="mt-1 text-sm text-gray-900">
                  {application.programmingLanguages && application.programmingLanguages.length > 0 
                    ? application.programmingLanguages.join(', ') 
                    : 'None specified'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Certifications</label>
                <p className="mt-1 text-sm text-gray-900">{application.certifications || 'None specified'}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Referral</label>
                <p className="mt-1 text-sm text-gray-900">{application.referral || 'None'}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Portfolio Links</label>
                <p className="mt-1 text-sm text-gray-900 break-all">{application.portfolioLinks || 'Not provided'}</p>
              </div>

              {application.resume && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Resume</label>
                  <button
                    onClick={() => onDownloadResume(application._id)}
                    className="mt-1 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <FaDownload className="w-4 h-4 mr-1" />
                    Download Resume
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 border-t border-gray-200 pt-6">
            <button
              onClick={() => toggleSection('whyWorkHere')}
              className="flex items-center justify-between w-full text-left hover:bg-gray-50 p-2 rounded-md transition-colors"
            >
              <label className="block text-sm font-medium text-gray-700">Why do you want to work here?</label>
              {expandedSections.whyWorkHere ? (
                <FaChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <FaChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </button>
            {expandedSections.whyWorkHere && (
              <div className="mt-2 transition-all duration-200 ease-in-out">
                <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">{application.whyWorkHere || 'Not provided'}</p>
              </div>
            )}
          </div>

          <div className="mt-6">
            <button
              onClick={() => toggleSection('pastProjects')}
              className="flex items-center justify-between w-full text-left hover:bg-gray-50 p-2 rounded-md transition-colors"
            >
              <label className="block text-sm font-medium text-gray-700">Past Projects & Experience</label>
              {expandedSections.pastProjects ? (
                <FaChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <FaChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </button>
            {expandedSections.pastProjects && (
              <div className="mt-2 transition-all duration-200 ease-in-out">
                <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">{application.pastProjects || 'Not provided'}</p>
              </div>
            )}
          </div>

          <div className="mt-6">
            <button
              onClick={() => toggleSection('recentProject')}
              className="flex items-center justify-between w-full text-left hover:bg-gray-50 p-2 rounded-md transition-colors"
            >
              <label className="block text-sm font-medium text-gray-700">Recent Project</label>
              {expandedSections.recentProject ? (
                <FaChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <FaChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </button>
            {expandedSections.recentProject && (
              <div className="mt-2 transition-all duration-200 ease-in-out">
                <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">{application.recentProject || 'Not provided'}</p>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end space-x-3 border-t border-gray-200 pt-4">
            <button
              onClick={() => handleStatusChange('pending')}
              className="px-4 py-2 border border-yellow-300 rounded-md text-sm font-medium text-yellow-700 bg-yellow-50 hover:bg-yellow-100"
            >
              Mark Pending
            </button>
            <button
              onClick={() => handleStatusChange('reviewed')}
              className="px-4 py-2 border border-blue-300 rounded-md text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100"
            >
              Mark Reviewed
            </button>
            <button
              onClick={() => handleStatusChange('accepted')}
              className="px-4 py-2 border border-green-300 rounded-md text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100"
            >
              Accept
            </button>
            <button
              onClick={() => handleStatusChange('rejected')}
              className="px-4 py-2 border border-red-300 rounded-md text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100"
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function JobApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [positionFilter, setPositionFilter] = useState('')
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const { data: applicationsData, isLoading } = useJobApplications({
    page: currentPage,
    limit: pageSize,
    status: statusFilter || undefined,
    position: positionFilter || undefined,
    search: searchTerm || undefined,
  })

  // Extract data and pagination info
  const applications = applicationsData?.data || []
  const totalApplications = applicationsData?.total || 0
  const totalPages = applicationsData?.totalPages || 1

  const updateStatusMutation = useUpdateJobApplicationStatus()
  const deleteMutation = useDeleteJobApplication()
  const downloadResumeMutation = useDownloadResume()
  const exportMutation = useExportJobApplications()

  const handleStatusUpdate = (id: string, status: 'pending' | 'reviewed' | 'accepted' | 'rejected') => {
    updateStatusMutation.mutate({ id, status })
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      deleteMutation.mutate(id)
    }
  }

  const handleDownloadResume = (id: string) => {
    downloadResumeMutation.mutate(id)
  }

  const handleExport = () => {
    exportMutation.mutate()
  }

  // Pagination handlers
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handlePageSizeChange = (size: number) => {
    setPageSize(size)
    setCurrentPage(1) // Reset to first page when changing page size
  }

  // Reset to first page when filters change
  const handleFilterChange = () => {
    setCurrentPage(1)
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

  const uniquePositions = useMemo(() => {
    const positions = applications.map(app => app.position).filter(Boolean)
    return [...new Set(positions)]
  }, [applications])

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Job Applications</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage job applications submitted through the website.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={handleExport}
            className="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            <FaDownload className="w-4 h-4 mr-2" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-5">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700">
            Search
          </label>
          <div className="relative mt-1">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                handleFilterChange()
              }}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search by name, email..."
            />
          </div>
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value)
              handleFilterChange()
            }}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white! text-gray-900! rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div>
          <label htmlFor="position" className="block text-sm font-medium text-gray-700">
            Position
          </label>
          <select
            id="position"
            value={positionFilter}
            onChange={(e) => {
              setPositionFilter(e.target.value)
              handleFilterChange()
            }}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white! text-gray-900! rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">All Positions</option>
            {uniquePositions.map((position) => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="pageSize" className="block text-sm font-medium text-gray-700">
            Items per page
          </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white! text-gray-900! rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={() => {
              setSearchTerm('')
              setStatusFilter('')
              setPositionFilter('')
              setCurrentPage(1)
            }}
            className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FaFilter className="w-4 h-4 mr-2" />
            Clear Filters
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Applicant
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Position
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Experience
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Applied Date
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {isLoading ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8">
                        <div className="text-gray-500">Loading applications...</div>
                      </td>
                    </tr>
                  ) : applications.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8">
                        <div className="text-gray-500">No applications found</div>
                      </td>
                    </tr>
                  ) : (
                    applications.map((application) => (
                      <tr key={application._id} className="hover:bg-gray-50">
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                <FaUser className="h-5 w-5 text-gray-600" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">{application.name}</div>
                              <div className="text-gray-500">{application.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {application.position}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(application.status)}`}>
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {application.yearsExperience}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {new Date(application.createdAt).toLocaleDateString()}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => {
                                setSelectedApplication(application)
                                setIsModalOpen(true)
                              }}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <FaEye className="w-4 h-4" />
                            </button>
                            {application.resume && (
                              <button
                                onClick={() => handleDownloadResume(application._id)}
                                className="text-green-600 hover:text-green-900"
                              >
                                <FaDownload className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(application._id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <FaTrash className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing{' '}
              <span className="font-medium">
                {Math.min((currentPage - 1) * pageSize + 1, totalApplications)}
              </span>{' '}
              to{' '}
              <span className="font-medium">
                {Math.min(currentPage * pageSize, totalApplications)}
              </span>{' '}
              of{' '}
              <span className="font-medium">{totalApplications}</span> results
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                </svg>
              </button>
              <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Modal */}
      <JobApplicationModal
        application={selectedApplication}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onStatusUpdate={handleStatusUpdate}
        onDownloadResume={handleDownloadResume}
      />
    </div>
  )
}