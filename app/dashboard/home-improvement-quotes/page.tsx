'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useHomeImprovementQuotes, useDeleteHomeImprovementQuote, useUpdateHomeImprovementQuoteStatus } from '../../../hooks/useHomeImprovementQuote';
import { formatPhone } from '../../../lib/utils/common';

interface Quote {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  propertyType: string;
  timeline: string;
  helpType: string[];
  installReplaceItem: string[];
  areasOfWork: string[];
  address: string;
  projectDescription: string;
  textUpdates: boolean;
  projectUpdates: boolean;
  status: 'new' | 'pending' | 'responded' | 'closed';
  createdAt: string;
}

interface QuoteModalProps {
  quote: Quote;
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdate: (id: string, status: 'new' | 'pending' | 'responded' | 'closed') => void;
}

function QuoteModal({ quote, isOpen, onClose, onStatusUpdate }: QuoteModalProps) {
  if (!isOpen || !quote) return null

  const handleStatusChange = (status: 'pending' | 'responded' | 'closed') => {
    onStatusUpdate(quote._id, status)
    onClose()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-red-100 text-red-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'responded': return 'bg-blue-100 text-blue-800'
      case 'closed': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }
//  view model
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-white" style={{ zIndex: 9999 }}>
      <div className="min-h-screen">
        <div className="w-full p-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Home Improvement Quote Details</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6 dark:text-gray-700">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{quote.name}</h3>
                  <p className="text-gray-600">{quote.email}</p>
                  <p className="text-gray-600">{formatPhone(quote.phoneNumber)}</p>
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
                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="font-semibold text-gray-900 mb-3">Personal Information</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Name:</span> {quote.name}</p>
                    <p><span className="font-medium">Email:</span> {quote.email}</p>
                    <p><span className="font-medium">Phone:</span> {formatPhone(quote.phoneNumber)}</p>
                    <p><span className="font-medium">Address:</span> {quote.address}</p>
                  </div>
                </div>

                {/* Project Details */}
                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="font-semibold text-gray-900 mb-3">Project Details</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Property Type:</span> {quote.propertyType}</p>
                    <p><span className="font-medium">Timeline:</span> {quote.timeline.replace('_', ' ')}</p>
                    <p><span className="font-medium">Help Type:</span> {quote.helpType.join(', ')}</p>
                    <p><span className="font-medium">Install/Replace:</span> {quote.installReplaceItem.join(', ')}</p>
                  </div>
                </div>

                {/* Areas of Work */}
                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="font-semibold text-gray-900 mb-3">Areas of Work</h4>
                  <div className="flex flex-wrap gap-2">
                    {quote.areasOfWork.map((area, idx) => (
                      <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Communication Preferences */}
                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="font-semibold text-gray-900 mb-3">Communication Preferences</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Text Updates:</span> {quote.textUpdates ? 'Yes' : 'No'}</p>
                    <p><span className="font-medium">Project Updates:</span> {quote.projectUpdates ? 'Yes' : 'No'}</p>
                  </div>
                </div>
              </div>

              {/* Project Description */}
              {quote.projectDescription && (
                <div className="bg-white p-4 rounded-lg border mt-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Project Description</h4>
                  <div className="text-sm bg-gray-50 p-3 rounded">
                    {quote.projectDescription}
                  </div>
                </div>
              )}
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

export default function HomeImprovementQuotesPage() {
  const [filters, setFilters] = useState({
    propertyType: '',
    timeline: '',
    status: '',
    page: 1,
    limit: 10
  });
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);

  const { data: quotesData, isLoading: loading } = useHomeImprovementQuotes(filters);
  const deleteQuoteMutation = useDeleteHomeImprovementQuote();
  const updateStatusMutation = useUpdateHomeImprovementQuoteStatus();

  const searchParams = useSearchParams();
  const highlightId = searchParams.get('id');

  const quotes = quotesData?.quotes || [];
  const total = quotesData?.pagination?.total || 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-red-100 text-red-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'responded': return 'bg-blue-100 text-blue-800'
      case 'closed': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  };

  useEffect(() => {
    if (highlightId && quotes.length > 0) {
      const row = document.getElementById(`quote-${highlightId}`)
      if (row) {
        row.scrollIntoView({ behavior: 'smooth', block: 'center' })
        row.classList.add('bg-blue-100')
        setTimeout(() => row.classList.remove('bg-blue-100'), 1000)
      }
    }
  }, [quotes, highlightId])

  const deleteQuote = async (id: string) => {
    if (confirm('Are you sure you want to delete this quote?')) {
      deleteQuoteMutation.mutate(id);
    }
  };

  const handleStatusUpdate = (id: string, status: 'new' | 'pending' | 'responded' | 'closed') => {
    updateStatusMutation.mutate({ id, status });
  };

  const resetFilters = () => {
    setFilters({
      propertyType: '',
      timeline: '',
      status: '',
      page: 1,
      limit: 10
    });
  };

  if (loading && quotes.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading quotes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Home Improvement Quotes</h1>
        <Link
          href="/dashboard"
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Back to Dashboard
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg dark:text-gray-700 font-semibold mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property Type
            </label>
            <select
              value={filters.propertyType}
              onChange={(e) => setFilters({ ...filters, propertyType: e.target.value, page: 1 })}
              className="w-full border border-gray-300 bg-white! text-gray-900! rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Types</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Timeline
            </label>
            <select
              value={filters.timeline}
              onChange={(e) => setFilters({ ...filters, timeline: e.target.value, page: 1 })}
              className="w-full border border-gray-300 bg-white! text-gray-900! rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Timelines</option>
              <option value="right_away">Right Away</option>
              <option value="soon">Soon</option>
              <option value="few_weeks">Few Weeks</option>
              <option value="researching">Researching</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value, page: 1 })}
              className="w-full border border-gray-300 bg-white! text-gray-900! rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Statuses</option>
              <option value="new">New</option>
              <option value="pending">Pending</option>
              <option value="responded">Responded</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Items per page
            </label>
            <select
              value={filters.limit}
              onChange={(e) => setFilters({ ...filters, limit: parseInt(e.target.value), page: 1 })}
              className="w-full border border-gray-300 bg-white! text-gray-900! rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={resetFilters}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900">Total Quotes</h3>
          <p className="text-3xl font-bold text-blue-600">{total}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900">Residential</h3>
          <p className="text-3xl font-bold text-green-600">
            {quotes.filter(q => q.propertyType === 'residential').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900">Commercial</h3>
          <p className="text-3xl font-bold text-purple-600">
            {quotes.filter(q => q.propertyType === 'commercial').length}
          </p>
        </div>
      </div>

      {/* Quotes Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timeline
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {quotes.map((quote) => (
                <tr key={quote._id} id={`quote-${quote._id}`} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{quote.name}</div>
                    <div className="text-sm text-gray-500">{quote.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatPhone(quote.phoneNumber)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      quote.propertyType === 'residential'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {quote.propertyType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {quote.timeline.replace('_', ' ')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(quote.status)}`}>
                      {quote.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(quote.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setSelectedQuote(quote)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      View
                    </button>
                    <button
                      onClick={() => deleteQuote(quote._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {quotes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No quotes found matching your filters.</p>
          </div>
        )}
      </div>

      {/* Modal for quote details */}
      {selectedQuote && (
        <QuoteModal
          quote={selectedQuote}
          isOpen={!!selectedQuote}
          onClose={() => setSelectedQuote(null)}
          onStatusUpdate={handleStatusUpdate}
        />
      )}

      {/* Pagination */}
      {total > filters.limit && (
        <div className="flex justify-center mt-6">
          <div className="flex space-x-2">
            <button
              onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
              disabled={filters.page === 1}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700">
              Page {filters.page} of {Math.ceil(total / filters.limit)}
            </span>
            <button
              onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
              disabled={filters.page >= Math.ceil(total / filters.limit)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* View Quote Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Quote Details</h3>
                <button
                  onClick={() => setSelectedQuote(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="text-2xl">&times;</span>
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-700">Name</label>
                    <p className="text-sm text-gray-900">{selectedQuote.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-700">Email</label>
                    <p className="text-sm text-gray-900">{selectedQuote.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-700">Phone</label>
                    <p className="text-sm text-gray-900">{formatPhone(selectedQuote.phoneNumber)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-700">Property Type</label>
                    <p className="text-sm text-gray-900 capitalize">{selectedQuote.propertyType}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-700">Timeline</label>
                    <p className="text-sm text-gray-900">{selectedQuote.timeline.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-700">Address</label>
                    <p className="text-sm text-gray-900">{selectedQuote.address}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Help Type</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedQuote.helpType.map((type, idx) => (
                      <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {type.replace('_', ' ')}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Install/Replace Items</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedQuote.installReplaceItem.map((item, idx) => (
                      <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {item.replace('_', ' ')}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Areas of Work</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedQuote.areasOfWork.map((area, idx) => (
                      <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedQuote.projectDescription && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Description</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded">{selectedQuote.projectDescription}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Text Updates</label>
                    <p className="text-sm text-gray-900">{selectedQuote.textUpdates ? 'Yes' : 'No'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Project Updates</label>
                    <p className="text-sm text-gray-900">{selectedQuote.projectUpdates ? 'Yes' : 'No'}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Submitted</label>
                  <p className="text-sm text-gray-900">{new Date(selectedQuote.createdAt).toLocaleString()}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleStatusUpdate(selectedQuote._id, 'pending')}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        selectedQuote.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-300'
                          : 'bg-gray-100 text-gray-800 hover:bg-yellow-100 hover:text-yellow-800'
                      }`}
                    >
                      Pending
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(selectedQuote._id, 'responded')}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        selectedQuote.status === 'responded'
                          ? 'bg-blue-100 text-blue-800 border-2 border-blue-300'
                          : 'bg-gray-100 text-gray-800 hover:bg-blue-100 hover:text-blue-800'
                      }`}
                    >
                      Responded
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(selectedQuote._id, 'closed')}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        selectedQuote.status === 'closed'
                          ? 'bg-green-100 text-green-800 border-2 border-green-300'
                          : 'bg-gray-100 text-gray-800 hover:bg-green-100 hover:text-green-800'
                      }`}
                    >
                      Closed
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setSelectedQuote(null)}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}