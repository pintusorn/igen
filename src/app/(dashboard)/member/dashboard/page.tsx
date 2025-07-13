'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { useAuth } from '@/contexts/AuthContext'
import { 
  UserIcon, 
  AcademicCapIcon, 
  BriefcaseIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline'
import Image from 'next/image'

export default function MemberDashboard() {
  const { user, logout, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <ProtectedRoute requiredRole="member">
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Welcome, {user.nickname}!</h1>
                <p className="text-gray-600">Member Dashboard</p>
              </div>
              <Button onClick={logout} className="bg-red-600 hover:bg-red-700">
                Logout
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <UserIcon className="h-5 w-5 mr-2" />
                    Profile
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center text-white text-2xl font-bold overflow-hidden mx-auto mb-4">
                      {user.profile_image_url ? (
                        <Image src={user.profile_image_url} alt="Profile" width={64} height={64} className="w-full h-full object-cover" />
                      ) : (
                        <span>{user.firstname.charAt(0)}{user.lastname.charAt(0)}</span>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold">{user.firstname} {user.lastname}</h3>
                    <p className="text-gray-600">@{user.username}</p>
                    <p className="text-sm text-gray-500">{user.igen_club}</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center">
                      <EnvelopeIcon className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm">{user.email}</span>
                    </div>
                    <div className="flex items-center">
                      <PhoneIcon className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm">{user.telephone}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPinIcon className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm">{user.current_city}, {user.current_country}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Full Name</label>
                      <p className="text-gray-900">{user.firstname} {user.lastname}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Nickname</label>
                      <p className="text-gray-900">{user.nickname}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                      <p className="text-gray-900">{new Date(user.dob).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Gender</label>
                      <p className="text-gray-900 capitalize">{user.gender}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Nationality</label>
                      <p className="text-gray-900">{user.nationality}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Religion</label>
                      <p className="text-gray-900">{user.religious}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Education/Work Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    {user.student_status === 'current_student' ? (
                      <>
                        <AcademicCapIcon className="h-5 w-5 mr-2" />
                        Education
                      </>
                    ) : (
                      <>
                        <BriefcaseIcon className="h-5 w-5 mr-2" />
                        Work
                      </>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {user.student_status === 'current_student' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">University</label>
                        <p className="text-gray-900">{user.university}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Study Year</label>
                        <p className="text-gray-900">{user.study_year}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Degree</label>
                        <p className="text-gray-900">{user.degree}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Faculty</label>
                        <p className="text-gray-900">{user.faculty}</p>
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-sm font-medium text-gray-500">Major</label>
                        <p className="text-gray-900">{user.major}</p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Occupation</label>
                      <p className="text-gray-900">{user.occupation}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Interests */}
              {user.interest && (
                <Card>
                  <CardHeader>
                    <CardTitle>Interests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {user.interest.split(', ').map((interest, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-100 text-red-800"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Score */}
              <Card>
                <CardHeader>
                  <CardTitle>Volunteer Score</CardTitle>
                  <CardDescription>Your contribution points</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-red-600">{user.current_score}</div>
                    <p className="text-gray-600">points earned</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
} 