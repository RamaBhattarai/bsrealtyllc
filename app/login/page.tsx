'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FaUser, FaUserTie, FaUserShield, FaArrowLeft } from 'react-icons/fa'

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<'agent' | 'client' | 'admin' | null>(null)

  const loginOptions = [
    {
      id: 'agent',
      title: 'Agent Login',
      description: 'Login as a real estate agent',
      icon: FaUserTie,
      color: 'bg-blue-500 hover:bg-blue-600',
      formColor: 'border-blue-200 focus:border-blue-500 focus:ring-blue-500',
      showRegister: true
    },
    {
      id: 'client',
      title: 'Client Login',
      description: 'Login as a property client',
      icon: FaUser,
      color: 'bg-green-500 hover:bg-green-600',
      formColor: 'border-green-200 focus:border-green-500 focus:ring-green-500',
      showRegister: true
    },
    {
      id: 'admin',
      title: 'Admin Login',
      description: 'System administrator access (pre-configured)',
      icon: FaUserShield,
      color: 'bg-purple-500 hover:bg-purple-600',
      formColor: 'border-purple-200 focus:border-purple-500 focus:ring-purple-500',
      showRegister: false
    }
  ]

  const handleLogin = (role: string, email: string, password: string) => {
    // TODO: Integrate with backend authentication
    console.log(`Logging in as ${role} with email: ${email}`)
    alert(`Login functionality for ${role} will be implemented with backend integration`)
  }

  if (selectedRole) {
    const roleData = loginOptions.find(option => option.id === selectedRole)
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
              Back to Login Options
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
              const email = formData.get('email') as string
              const password = formData.get('password') as string
              handleLogin(selectedRole, email, password)
            }}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 sm:text-sm ${roleData.formColor}`}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 sm:text-sm ${roleData.formColor}`}
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${roleData.color} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors`}
                >
                  Sign in as {roleData.title.replace(' Login', '')}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              {roleData.showRegister && (
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Sign up
                  </Link>
                </p>
              )}
              {selectedRole === 'admin' && (
                <p className="text-sm text-gray-600">
                  Admin accounts are created by system administrators.
                  <br />
                  Contact support if you need admin access.
                </p>
              )}
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back !!</h1>
          <p className="text-gray-600">Choose your login type to continue</p>
        </div>

        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <div className="space-y-4">
            {loginOptions.map((option) => {
              const IconComponent = option.icon
              return (
                <button
                  key={option.id}
                  onClick={() => setSelectedRole(option.id as 'agent' | 'client' | 'admin')}
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
            <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}