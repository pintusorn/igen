'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  XMarkIcon,
  PlusIcon
} from '@heroicons/react/24/outline'
import { countries, nationalities, religions, studyYears, degrees, faculties, igens } from '@/lib/data/countries'

export default function RegisterPage() {
  const router = useRouter()
  const { isAuthenticated, user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const supabase = createClient()

  // Redirect authenticated users to their profile page
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'admin') {
        router.push('/admin/profile')
      } else {
        router.push('/member/profile')
      }
    }
  }, [isAuthenticated, user, router])
  
  // Form state
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstname: '',
    lastname: '',
    nickname: '',
    dob: '',
    gender: '',
    home_country: '',
    nationality: '',
    telephone: '',
    religious: '',
    current_country: '',
    current_city: '',
    student_status: 'not_student' as 'current_student' | 'alumni' | 'not_student',
    university: '',
    study_year: '',
    degree: '',
    faculty: '',
    major: '',
    occupation: '',
    interest: '',
    interests: [] as string[],
    igen_club: '',
    profile_image_url: '/user.png' // Default avatar
  })

  const [newInterest, setNewInterest] = useState('')
  const [showManualCountry, setShowManualCountry] = useState(false)
  const [showManualNationality, setShowManualNationality] = useState(false)

  // Handle form input changes
  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Handle interest addition
  const handleAddInterest = () => {
    if (newInterest.trim() && !formData.interests.includes(newInterest.trim())) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }))
      setNewInterest('')
    }
  }

  // Handle interest removal
  const handleRemoveInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      // Validate required fields
      const requiredFields = [
        'username', 'email', 'password', 'confirmPassword', 'firstname', 'lastname', 'nickname', 'dob',
        'gender', 'home_country', 'nationality', 'telephone', 'religious',
        'current_country', 'current_city', 'igen_club', 'profile_image_url'
      ]

      for (const field of requiredFields) {
        if (!formData[field as keyof typeof formData]) {
          throw new Error(`${field.replace('_', ' ')} is required`)
        }
      }

      // Validate password
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match')
      }

      if (formData.password.length < 6) {
        throw new Error('Password must be at least 6 characters long')
      }

      // Validate student-specific fields
      if (formData.student_status === 'current_student') {
        const studentFields = ['university', 'study_year', 'degree', 'faculty', 'major']
        for (const field of studentFields) {
          if (!formData[field as keyof typeof formData]) {
            throw new Error(`${field.replace('_', ' ')} is required for students`)
          }
        }
      } else {
        if (!formData.occupation) {
          throw new Error('Occupation is required for non-students')
        }
      }

      // Check if username already exists
      const { data: existingUser } = await supabase
        .from('users')
        .select('username')
        .eq('username', formData.username)
        .single()

      if (existingUser) {
        throw new Error('Username already exists')
      }

      // Check if email already exists
      const { data: existingEmail } = await supabase
        .from('users')
        .select('email')
        .eq('email', formData.email)
        .single()

      if (existingEmail) {
        throw new Error('Email already exists')
      }

      // Hash the password before saving
      const bcrypt = (await import('bcryptjs')).default
      const hashedPassword = await bcrypt.hash(formData.password, 10)

      // Prepare user data for insertion
      const userData = {
        username: formData.username,
        email: formData.email,
        password: hashedPassword,
        firstname: formData.firstname,
        lastname: formData.lastname,
        nickname: formData.nickname,
        dob: formData.dob,
        gender: formData.gender,
        home_country: formData.home_country,
        nationality: formData.nationality,
        telephone: formData.telephone,
        religious: formData.religious,
        current_country: formData.current_country,
        current_city: formData.current_city,
        student_status: formData.student_status,
        university: formData.student_status === 'current_student' ? formData.university : null,
        study_year: formData.student_status === 'current_student' ? parseInt(formData.study_year) : null,
        degree: formData.student_status === 'current_student' ? formData.degree : null,
        faculty: formData.student_status === 'current_student' ? formData.faculty : null,
        major: formData.student_status === 'current_student' ? formData.major : null,
        occupation: formData.student_status !== 'current_student' ? formData.occupation : null,
        interest: formData.interests.join(', '),
        igen_club: formData.igen_club,
        profile_image_url: formData.profile_image_url,
        current_score: 0,
        role: 'member',
        is_active: true
      }

      // Insert user data
      const { error: insertError } = await supabase
        .from('users')
        .insert([userData])
        .select()
        .single()

      if (insertError) {
        throw new Error(insertError.message)
      }

      setSuccess('Registration successful! You can now log in.')
      setTimeout(() => {
        router.push('/login')
      }, 2000)

    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Join Our Volunteer Club</h1>
          <p className="mt-2 text-gray-600">Create your account and start making a difference</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Registration Form</CardTitle>
            <CardDescription>
              Please fill in all required fields to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error and Success Messages */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
                  {success}
                </div>
              )}

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username *
                  </label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                    minLength={6}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                    minLength={6}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={formData.firstname}
                    onChange={(e) => handleInputChange('firstname', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={formData.lastname}
                    onChange={(e) => handleInputChange('lastname', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nickname *
                  </label>
                  <input
                    type="text"
                    value={formData.nickname}
                    onChange={(e) => handleInputChange('nickname', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => handleInputChange('dob', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender *
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telephone *
                  </label>
                  <input
                    type="tel"
                    value={formData.telephone}
                    onChange={(e) => handleInputChange('telephone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
              </div>

              {/* Location Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Home Country *
                  </label>
                  {!showManualCountry ? (
                    <div className="space-y-2">
                      <select
                        value={formData.home_country}
                        onChange={(e) => {
                          if (e.target.value === 'manual') {
                            setShowManualCountry(true)
                            handleInputChange('home_country', '')
                          } else {
                            handleInputChange('home_country', e.target.value)
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                      >
                        <option value="">Select Country</option>
                        {countries.map(country => (
                          <option key={country} value={country}>{country}</option>
                        ))}
                        <option value="manual">📝 Enter manually</option>
                      </select>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={formData.home_country}
                        onChange={(e) => handleInputChange('home_country', e.target.value)}
                        placeholder="Enter your country name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setShowManualCountry(false)
                          handleInputChange('home_country', '')
                        }}
                        className="text-sm text-red-600 hover:text-red-800"
                      >
                        ← Back to dropdown
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nationality *
                  </label>
                  {!showManualNationality ? (
                    <div className="space-y-2">
                      <select
                        value={formData.nationality}
                        onChange={(e) => {
                          if (e.target.value === 'manual') {
                            setShowManualNationality(true)
                            handleInputChange('nationality', '')
                          } else {
                            handleInputChange('nationality', e.target.value)
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                      >
                        <option value="">Select Nationality</option>
                        {nationalities.map(nationality => (
                          <option key={nationality} value={nationality}>{nationality}</option>
                        ))}
                        <option value="manual">📝 Enter manually</option>
                      </select>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={formData.nationality}
                        onChange={(e) => handleInputChange('nationality', e.target.value)}
                        placeholder="Enter your nationality"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setShowManualNationality(false)
                          handleInputChange('nationality', '')
                        }}
                        className="text-sm text-red-600 hover:text-red-800"
                      >
                        ← Back to dropdown
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Country *
                  </label>
                  <select
                    value={formData.current_country}
                    onChange={(e) => handleInputChange('current_country', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  >
                    <option value="">Select Country</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                    <option value="manual">📝 Enter manually</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current City *
                  </label>
                  <input
                    type="text"
                    value={formData.current_city}
                    onChange={(e) => handleInputChange('current_city', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Religion *
                  </label>
                  <select
                    value={formData.religious}
                    onChange={(e) => handleInputChange('religious', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  >
                    <option value="">Select Religion</option>
                    {religions.map(religion => (
                      <option key={religion} value={religion}>{religion}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    iGEN Club *
                  </label>
                  <select
                    value={formData.igen_club}
                    onChange={(e) => handleInputChange('igen_club', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  >
                    <option value="">Select iGEN Club</option>
                    {igens.map(igen => (
                      <option key={igen} value={igen}>{igen}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Student Status Selection */}
              <div className="border-t pt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student Status *
                  </label>
                  <select
                    value={formData.student_status}
                    onChange={(e) => handleInputChange('student_status', e.target.value as 'current_student' | 'alumni' | 'not_student')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  >
                    <option value="not_student">Not a student</option>
                    <option value="current_student">Current university student</option>
                    <option value="alumni">University alumni</option>
                  </select>
                </div>
              </div>

              {/* Student Information */}
              {formData.student_status === 'current_student' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      University *
                    </label>
                    <input
                      type="text"
                      value={formData.university}
                      onChange={(e) => handleInputChange('university', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Study Year *
                    </label>
                    <select
                      value={formData.study_year}
                      onChange={(e) => handleInputChange('study_year', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    >
                      <option value="">Select Year</option>
                      {studyYears.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Degree *
                    </label>
                    <select
                      value={formData.degree}
                      onChange={(e) => handleInputChange('degree', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    >
                      <option value="">Select Degree</option>
                      {degrees.map(degree => (
                        <option key={degree} value={degree}>{degree}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Faculty *
                    </label>
                    <select
                      value={formData.faculty}
                      onChange={(e) => handleInputChange('faculty', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    >
                      <option value="">Select Faculty</option>
                      {faculties.map(faculty => (
                        <option key={faculty} value={faculty}>{faculty}</option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Major *
                    </label>
                    <input
                      type="text"
                      value={formData.major}
                      onChange={(e) => handleInputChange('major', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Occupation for Non-Students */}
              {formData.student_status !== 'current_student' && (
                <div className="border-t pt-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Occupation *
                    </label>
                    <input
                      type="text"
                      value={formData.occupation}
                      onChange={(e) => handleInputChange('occupation', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Interests */}
              <div className="border-t pt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interests
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddInterest())}
                    placeholder="Type an interest and press Enter"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <Button
                    type="button"
                    onClick={handleAddInterest}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-100 text-red-800"
                    >
                      {interest}
                      <button
                        type="button"
                        onClick={() => handleRemoveInterest(interest)}
                        className="ml-2 text-red-600 hover:text-red-800"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="border-t pt-6">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 disabled:opacity-50"
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </div>

              {/* Login Link */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link href="/login" className="text-red-600 hover:text-red-500">
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 