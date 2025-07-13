'use client'

import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  CalendarIcon, 
  ClockIcon, 
  MapPinIcon,
  UserGroupIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon
} from '@heroicons/react/24/outline'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

// Mock activity data for admin view
const mockActivities = [
  {
    id: 1,
    title: 'Community Cleanup Day',
    date: '2024-01-15',
    time: '09:00 AM - 12:00 PM',
    location: 'Central Park',
    status: 'completed',
    participants: 25,
    maxParticipants: 30,
    score: 50,
    description: 'Help clean up the local park and collect recyclable materials.',
    organizer: 'John Smith'
  },
  {
    id: 2,
    title: 'Elderly Care Visit',
    date: '2024-01-20',
    time: '02:00 PM - 04:00 PM',
    location: 'Sunset Nursing Home',
    status: 'completed',
    participants: 8,
    maxParticipants: 15,
    score: 30,
    description: 'Visit elderly residents and provide companionship and assistance.',
    organizer: 'Sarah Johnson'
  },
  {
    id: 3,
    title: 'Food Bank Volunteering',
    date: '2024-02-05',
    time: '10:00 AM - 02:00 PM',
    location: 'Community Food Bank',
    status: 'upcoming',
    participants: 15,
    maxParticipants: 20,
    score: 40,
    description: 'Help sort and distribute food items to families in need.',
    organizer: 'Mike Davis'
  },
  {
    id: 4,
    title: 'Blood Donation Drive',
    date: '2024-02-12',
    time: '09:00 AM - 05:00 PM',
    location: 'City Hospital',
    status: 'upcoming',
    participants: 50,
    maxParticipants: 100,
    score: 60,
    description: 'Annual blood donation drive to help save lives.',
    organizer: 'Lisa Chen'
  }
]

export default function AdminActivityPage() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading activities...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Completed
          </span>
        )
      case 'upcoming':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Upcoming
          </span>
        )
      case 'draft':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Draft
          </span>
        )
      default:
        return null
    }
  }

  const totalActivities = mockActivities.length
  const completedActivities = mockActivities.filter(activity => activity.status === 'completed')
  const upcomingActivities = mockActivities.filter(activity => activity.status === 'upcoming')
  const totalParticipants = mockActivities.reduce((sum, activity) => sum + activity.participants, 0)

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Activity Management</h1>
              <p className="mt-2 text-gray-600">Manage and oversee all club activities</p>
            </div>
            <Button variant="primary" className="flex items-center space-x-2">
              <PlusIcon className="h-4 w-4" />
              <span>Create Activity</span>
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CalendarIcon className="h-8 w-8 text-red-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Activities</p>
                    <p className="text-2xl font-bold text-gray-900">{totalActivities}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <UserGroupIcon className="h-8 w-8 text-green-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Participants</p>
                    <p className="text-2xl font-bold text-gray-900">{totalParticipants}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <ClockIcon className="h-8 w-8 text-yellow-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Upcoming</p>
                    <p className="text-2xl font-bold text-gray-900">{upcomingActivities.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CalendarIcon className="h-8 w-8 text-purple-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Completed</p>
                    <p className="text-2xl font-bold text-gray-900">{completedActivities.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activities List */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">All Activities</h2>
            
            {mockActivities.map((activity) => (
              <Card key={activity.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{activity.title}</h3>
                        {getStatusBadge(activity.status)}
                      </div>
                      
                      <p className="text-gray-600 mb-4">{activity.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          {new Date(activity.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <ClockIcon className="h-4 w-4 mr-2" />
                          {activity.time}
                        </div>
                        <div className="flex items-center">
                          <MapPinIcon className="h-4 w-4 mr-2" />
                          {activity.location}
                        </div>
                        <div className="flex items-center">
                          <UserGroupIcon className="h-4 w-4 mr-2" />
                          {activity.participants}/{activity.maxParticipants} participants
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-500">
                        <span className="font-medium">Organizer:</span> {activity.organizer}
                      </div>
                    </div>
                    
                    <div className="ml-4 flex space-x-2">
                      <Button variant="outline" size="sm" className="flex items-center space-x-1">
                        <EyeIcon className="h-3 w-3" />
                        <span>View</span>
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center space-x-1">
                        <PencilIcon className="h-3 w-3" />
                        <span>Edit</span>
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center space-x-1 text-red-600 hover:text-red-700">
                        <TrashIcon className="h-3 w-3" />
                        <span>Delete</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {mockActivities.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No activities yet</h3>
                <p className="text-gray-600 mb-4">
                  Create your first activity to get started.
                </p>
                <Button variant="primary" className="flex items-center space-x-2">
                  <PlusIcon className="h-4 w-4" />
                  <span>Create Activity</span>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
} 