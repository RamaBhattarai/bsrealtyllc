'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FaUser, FaUserTie, FaArrowLeft } from 'react-icons/fa'

export default function RegisterPage() {
  const [selectedRole, setSelectedRole] = useState<'agent' | 'client' | null>(null)

  const registerOptions = [
    {
      id: 'agent',
      title: 'Agent Registration',
      description: 'Register as a real estate agent',
      icon: FaUserTie,
      color: 'bg-blue-500 hover:bg-blue-600',
      formColor: 'border-blue-200 focus:border-blue-500 focus:ring-blue-500'
    },
    {
      id: 'client',
      title: 'Client Registration',
      description: 'Register as a property client',
      icon: FaUser,
      color: 'bg-green-500 hover:bg-green-600',
      formColor: 'border-green-200 focus:border-green-500 focus:ring-green-500'
    }
  ]

  const handleRegister = (role: string, formData: any) => {
    // TODO: Integrate with backend registration
    console.log(`Registering as ${role} with data:`, formData)
    alert(`Registration functionality for ${role} will be implemented with backend integration`)
  }

  if (selectedRole) {
    const roleData = registerOptions.find(option => option.id === selectedRole)
    if (!roleData) return null

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <button
              onClick={() => setSelectedRole(null)}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mb-4"
            >
              <FaArrowLeft className="mr-2" />
              Back to Registration Options
            </button>
          </div>

          <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
            <div className="text-center mb-6">
              <roleData.icon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">{roleData.title}</h2>
              <p className="text-gray-600">{roleData.description}</p>
            </div>

            <form className="space-y-6" onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.target as HTMLFormElement)
              const data = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                password: formData.get('password'),
                confirmPassword: formData.get('confirmPassword'),
                ...(selectedRole === 'agent' && {
                  licenseNumber: formData.get('licenseNumber'),
                  brokerage: formData.get('brokerage')
                })
              }
              handleRegister(selectedRole, data)
            }}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    className={`mt-1 appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 sm:text-sm ${roleData.formColor}`}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    className={`mt-1 appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 sm:text-sm ${roleData.formColor}`}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={`mt-1 appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 sm:text-sm ${roleData.formColor}`}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className={`mt-1 appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 sm:text-sm ${roleData.formColor}`}
                />
              </div>

              {selectedRole === 'agent' && (
                <>
                  <div>
                    <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700">
                      Real Estate License Number
                    </label>
                    <input
                      id="licenseNumber"
                      name="licenseNumber"
                      type="text"
                      required
                      className={`mt-1 appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 sm:text-sm ${roleData.formColor}`}
                    />
                  </div>
                  <div>
                    <label htmlFor="brokerage" className="block text-sm font-medium text-gray-700">
                      Brokerage Name
                    </label>
                    <input
                      id="brokerage"
                      name="brokerage"
                      type="text"
                      required
                      className={`mt-1 appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 sm:text-sm ${roleData.formColor}`}
                    />
                  </div>
                </>
              )}

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className={`mt-1 appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 sm:text-sm ${roleData.formColor}`}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className={`mt-1 appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 sm:text-sm ${roleData.formColor}`}
                />
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                  I agree to the{' '}
                  <Link href="/terms" className="text-indigo-600 hover:text-indigo-500">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-indigo-600 hover:text-indigo-500">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${roleData.color} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors`}
                >
                  Create {roleData.title.replace(' Registration', '')} Account
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">Choose your account type to get started</p>
        </div>

        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <div className="space-y-4">
            {registerOptions.map((option) => {
              const IconComponent = option.icon
              return (
                <button
                  key={option.id}
                  onClick={() => setSelectedRole(option.id as 'agent' | 'client')}
                  className="w-full flex items-center p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-md transition-all duration-200 group"
                >
                  <div className={`flex-shrink-0 w-12 h-12 rounded-lg ${option.color} flex items-center justify-center mr-4`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-gray-800">
                      {option.title}
                    </h3>
                    <p className="text-sm text-gray-500 group-hover:text-gray-600">
                      {option.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-gray-400 group-hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              )
            })}
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign in here
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}