'use client'

import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon, 
  AcademicCapIcon,
  BriefcaseIcon,
  HeartIcon,
  ShieldCheckIcon,
  UsersIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import Image from 'next/image'

export default function AdminProfilePage() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Profile</h1>
            <p className="mt-2 text-gray-600">Manage your administrative account and club operations</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-24 h-24 rounded-full bg-red-500 flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
                      {user.profile_image_url ? (
                        <Image src={user.profile_image_url} alt="Profile" width={96} height={96} className="w-full h-full object-cover" />
                      ) : (
                        <span>{user.firstname.charAt(0)}{user.lastname.charAt(0)}</span>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-xl">
                    {user.firstname} {user.lastname}
                  </CardTitle>
                  <CardDescription>
                    @{user.username}
                  </CardDescription>
                  <div className="mt-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                      <ShieldCheckIcon className="h-4 w-4 mr-1" />
                      Administrator
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-600">{user.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <PhoneIcon className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-600">{user.telephone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPinIcon className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {user.current_city}, {user.current_country}
                      </span>
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
                  <CardTitle className="flex items-center space-x-2">
                    <UserIcon className="h-5 w-5" />
                    <span>Personal Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nickname</label>
                      <p className="mt-1 text-sm text-gray-900">{user.nickname}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                      <p className="mt-1 text-sm text-gray-900">{user.dob}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Gender</label>
                      <p className="mt-1 text-sm text-gray-900">{user.gender}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nationality</label>
                      <p className="mt-1 text-sm text-gray-900">{user.nationality}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Home Country</label>
                      <p className="mt-1 text-sm text-gray-900">{user.home_country}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Religion</label>
                      <p className="mt-1 text-sm text-gray-900">{user.religious}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Academic/Professional Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    {user.student_status === 'student' ? (
                      <AcademicCapIcon className="h-5 w-5" />
                    ) : (
                      <BriefcaseIcon className="h-5 w-5" />
                    )}
                    <span>
                      {user.student_status === 'student' ? 'Academic Information' : 'Professional Information'}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <p className="mt-1 text-sm text-gray-900 capitalize">{user.student_status}</p>
                    </div>
                    {user.student_status === 'student' ? (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">University</label>
                          <p className="mt-1 text-sm text-gray-900">{user.university}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Study Year</label>
                          <p className="mt-1 text-sm text-gray-900">{user.study_year}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Degree</label>
                          <p className="mt-1 text-sm text-gray-900">{user.degree}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Faculty</label>
                          <p className="mt-1 text-sm text-gray-900">{user.faculty}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Major</label>
                          <p className="mt-1 text-sm text-gray-900">{user.major}</p>
                        </div>
                      </>
                    ) : (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Occupation</label>
                        <p className="mt-1 text-sm text-gray-900">{user.occupation}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Club Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <HeartIcon className="h-5 w-5" />
                    <span>Club Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">iGEN Club</label>
                      <p className="mt-1 text-sm text-gray-900">{user.igen_club}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Current Score</label>
                      <p className="mt-1 text-sm text-gray-900">{user.current_score} points</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Interests</label>
                      <p className="mt-1 text-sm text-gray-900">{user.interest}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Admin Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <ShieldCheckIcon className="h-5 w-5" />
                    <span>Administrative Actions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="primary" className="flex items-center justify-center space-x-2">
                      <UsersIcon className="h-4 w-4" />
                      <span>Manage Members</span>
                    </Button>
                    <Button variant="outline" className="flex items-center justify-center space-x-2">
                      <ChartBarIcon className="h-4 w-4" />
                      <span>View Analytics</span>
                    </Button>
                    <Button variant="outline" className="flex items-center justify-center space-x-2">
                      <HeartIcon className="h-4 w-4" />
                      <span>Manage Activities</span>
                    </Button>
                    <Button variant="outline" className="flex items-center justify-center space-x-2">
                      <UserIcon className="h-4 w-4" />
                      <span>Edit Profile</span>
                    </Button>
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