"use client"
// @ts-nocheck - Temporarily disable TypeScript checking for this file

import { useState, useEffect, Fragment } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
// import { createClient } from '@/lib/supabase/client' // Unused import
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { EnvelopeIcon, PhoneIcon, MapPinIcon, AcademicCapIcon, BriefcaseIcon, HeartIcon, UserIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import { User } from '@/types'

function getRank(score: number) {
  if (score >= 50) return { label: 'Legend', bg: 'bg-red-100', text: 'text-red-800' }
  if (score >= 40) return { label: 'Elite Member', bg: 'bg-purple-100', text: 'text-purple-800' }
  if (score >= 30) return { label: 'Senior Member', bg: 'bg-orange-100', text: 'text-orange-800' }
  if (score >= 20) return { label: 'Core Member', bg: 'bg-yellow-100', text: 'text-yellow-800' }
  if (score >= 10) return { label: 'Active Member', bg: 'bg-blue-100', text: 'text-blue-800' }
  return { label: 'New Member', bg: 'bg-green-100', text: 'text-green-800' }
}

export default function EditMemberProfilePage() {
  const { user, updateUser } = useAuth()
  const router = useRouter()
  // const supabase = createClient() // Unused variable
  const [formData, setFormData] = useState<Partial<User> | null>(null)
  const [avatarModalOpen, setAvatarModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (user) {
      setFormData({ ...user } as Partial<User>)
    }
  }, [user])

  if (!formData || !user) return null

  const handleInputChange = (field: keyof User, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleAvatarClick = () => setAvatarModalOpen(true)
  const handleAvatarSelect = (url: string) => {
    setFormData((prev) => ({ ...prev, profile_image_url: url }))
    setAvatarModalOpen(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')
    try {
      if (!user) throw new Error('User not found')
      // @ts-ignore - Type mismatch between AuthContext and types User
      await updateUser({ ...formData })
      setSuccess('Profile updated!')
      setTimeout(() => router.push('/member/profile'), 1500)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setIsLoading(false)
    }
  }

  // Avatar list for modal - used in the modal component below

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <button type="button" onClick={handleAvatarClick} className="focus:outline-none">
                    <div className="w-24 h-24 rounded-full overflow-hidden">
                      {formData?.profile_image_url ? (
                        <Image src={formData.profile_image_url as string} alt="Profile" width={400} height={400} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-red-500 flex items-center justify-center text-white text-2xl font-bold">
                          <span>{formData?.firstname?.toString().charAt(0)}{formData?.lastname?.toString().charAt(0)}</span>
                        </div>
                      )}
                    </div>
                  </button>
                </div>
                <CardTitle className="text-xl">
                  <input type="text" value={formData.firstname} onChange={e => handleInputChange('firstname', e.target.value)} className="text-center font-bold w-full border-b border-gray-200 focus:border-red-500 bg-transparent" />
                  <input type="text" value={formData.lastname} onChange={e => handleInputChange('lastname', e.target.value)} className="text-center font-bold w-full border-b border-gray-200 focus:border-red-500 bg-transparent mt-1" />
                </CardTitle>
                <CardDescription>@{user.username}</CardDescription>
                <div className="mt-4">
                  {(() => {
                    const rank = getRank(user.current_score)
                    return (
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${rank.bg} ${rank.text}`}>
                        <ShieldCheckIcon className="w-4 h-4 mr-1" />
                        {rank.label}
                      </span>
                    )
                  })()}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                    <input type="email" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} className="text-sm text-gray-600 border-b border-gray-200 focus:border-red-500 bg-transparent w-full" />
                  </div>
                  <div className="flex items-center space-x-3">
                    <PhoneIcon className="h-5 w-5 text-gray-400" />
                    <input type="text" value={formData.telephone} onChange={e => handleInputChange('telephone', e.target.value)} className="text-sm text-gray-600 border-b border-gray-200 focus:border-red-500 bg-transparent w-full" />
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPinIcon className="h-5 w-5 text-gray-400" />
                    <input type="text" value={formData.current_city} onChange={e => handleInputChange('current_city', e.target.value)} className="text-sm text-gray-600 border-b border-gray-200 focus:border-red-500 bg-transparent w-1/2" />
                    <input type="text" value={formData.current_country} onChange={e => handleInputChange('current_country', e.target.value)} className="text-sm text-gray-600 border-b border-gray-200 focus:border-red-500 bg-transparent w-1/2" />
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Avatar Selection Modal */}
            <Transition.Root show={avatarModalOpen} as={Fragment}>
              <Dialog as="div" className="relative z-50" onClose={setAvatarModalOpen}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                  <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                      enterTo="opacity-100 translate-y-0 sm:scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                      leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                      <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                        <div>
                          <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 mb-4">
                            Choose Your Avatar
                          </Dialog.Title>
                          <div className="grid grid-cols-4 gap-4">
                            {Array.from({ length: 20 }, (_, i) => (
                              <button
                                key={i + 1}
                                onClick={() => handleAvatarSelect(`/avatars/avatar${i + 1}.png`)}
                                className="w-16 h-16 rounded-full overflow-hidden hover:ring-2 hover:ring-red-500 transition-all"
                              >
                                <Image
                                  src={`/avatars/avatar${i + 1}.png`}
                                  alt={`Avatar ${i + 1}`}
                                  width={200}
                                  height={200}
                                  className="w-full h-full object-cover"
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="mt-5 sm:mt-6">
                          <button
                            type="button"
                            className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm"
                            onClick={() => setAvatarModalOpen(false)}
                          >
                            Close
                          </button>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition.Root>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <div className="text-red-600">{error}</div>}
              {success && <div className="text-green-600">{success}</div>}
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
                      <input type="text" value={formData.nickname} onChange={e => handleInputChange('nickname', e.target.value)} className="w-full border rounded px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                      <input type="date" value={formData.dob} onChange={e => handleInputChange('dob', e.target.value)} className="w-full border rounded px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Gender</label>
                      <input type="text" value={formData.gender} onChange={e => handleInputChange('gender', e.target.value)} className="w-full border rounded px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nationality</label>
                      <input type="text" value={formData.nationality} onChange={e => handleInputChange('nationality', e.target.value)} className="w-full border rounded px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Home Country</label>
                      <input type="text" value={formData.home_country} onChange={e => handleInputChange('home_country', e.target.value)} className="w-full border rounded px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Religion</label>
                      <input type="text" value={formData.religious} onChange={e => handleInputChange('religious', e.target.value)} className="w-full border rounded px-3 py-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Academic/Professional Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    {formData.student_status === 'current_student' ? (
                      <AcademicCapIcon className="h-5 w-5" />
                    ) : (
                      <BriefcaseIcon className="h-5 w-5" />
                    )}
                    <span>{formData.student_status === 'current_student' ? 'Academic Information' : 'Professional Information'}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <input type="text" value={formData.student_status} onChange={e => handleInputChange('student_status', e.target.value)} className="w-full border rounded px-3 py-2" />
                    </div>
                    {formData.student_status === 'current_student' ? (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">University</label>
                          <input type="text" value={formData.university} onChange={e => handleInputChange('university', e.target.value)} className="w-full border rounded px-3 py-2" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Study Year</label>
                          <input type="text" value={formData.study_year} onChange={e => handleInputChange('study_year', e.target.value)} className="w-full border rounded px-3 py-2" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Degree</label>
                          <input type="text" value={formData.degree} onChange={e => handleInputChange('degree', e.target.value)} className="w-full border rounded px-3 py-2" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Faculty</label>
                          <input type="text" value={formData.faculty} onChange={e => handleInputChange('faculty', e.target.value)} className="w-full border rounded px-3 py-2" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Major</label>
                          <input type="text" value={formData.major} onChange={e => handleInputChange('major', e.target.value)} className="w-full border rounded px-3 py-2" />
                        </div>
                      </>
                    ) : (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Occupation</label>
                        <input type="text" value={formData.occupation} onChange={e => handleInputChange('occupation', e.target.value)} className="w-full border rounded px-3 py-2" />
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
                      <input type="text" value={formData.igen_club} onChange={e => handleInputChange('igen_club', e.target.value)} className="w-full border rounded px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Interests</label>
                      <input type="text" value={formData.interest} onChange={e => handleInputChange('interest', e.target.value)} className="w-full border rounded px-3 py-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
} 