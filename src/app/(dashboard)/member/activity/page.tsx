'use client'

import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  CalendarIcon, 
  ClockIcon, 
  MapPinIcon,
  UserGroupIcon,
  TrophyIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

// Mock activity data - in a real app, this would come from the database
const mockActivities = [
  {
    id: 1,
    title: 'Community Cleanup Day',
    date: '2024-01-15',
    time: '09:00 AM - 12:00 PM',
    location: 'Central Park',
    status: 'completed',
    participants: 25,
    score: 50,
    description: 'Helped clean up the local park and collected recyclable materials.'
  },
  {
    id: 2,
    title: 'Elderly Care Visit',
    date: '2024-01-20',
    time: '02:00 PM - 04:00 PM',
    location: 'Sunset Nursing Home',
    status: 'completed',
    participants: 8,
    score: 30,
    description: 'Visited elderly residents and provided companionship and assistance.'
  },
  {
    id: 3,
    title: 'Food Bank Volunteering',
    date: '2024-02-05',
    time: '10:00 AM - 02:00 PM',
    location: 'Community Food Bank',
    status: 'upcoming',
    participants: 15,
    score: 40,
    description: 'Help sort and distribute food items to families in need.'
  },
  {
    id: 4,
    title: 'Blood Donation Drive',
    date: '2024-02-12',
    time: '09:00 AM - 05:00 PM',
    location: 'City Hospital',
    status: 'registered',
    participants: 50,
    score: 60,
    description: 'Participate in the annual blood donation drive to help save lives.'
  }
]

export default function MemberActivityPage() {
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
            <CheckCircleIcon className="h-3 w-3 mr-1" />
            Completed
          </span>
        )
      case 'upcoming':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <ClockIcon className="h-3 w-3 mr-1" />
            Upcoming
          </span>
        )
      case 'registered':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <CalendarIcon className="h-3 w-3 mr-1" />
            Registered
          </span>
        )
      default:
        return null
    }
  }

  const completedActivities = mockActivities.filter(activity => activity.status === 'completed')
  const upcomingActivities = mockActivities.filter(activity => activity.status === 'upcoming' || activity.status === 'registered')
  const totalScore = completedActivities.reduce((sum, activity) => sum + activity.score, 0)

  return (
    <ProtectedRoute requiredRole="member">
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Activities</h1>
            <p className="mt-2 text-gray-600">Track your volunteer activities and contributions</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <TrophyIcon className="h-8 w-8 text-yellow-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Score</p>
                    <p className="text-2xl font-bold text-gray-900">{totalScore}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CheckCircleIcon className="h-8 w-8 text-green-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Completed</p>
                    <p className="text-2xl font-bold text-gray-900">{completedActivities.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CalendarIcon className="h-8 w-8 text-red-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Upcoming</p>
                    <p className="text-2xl font-bold text-gray-900">{upcomingActivities.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activities List */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activities</h2>
            
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
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500">
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
                      </div>
                      
                      <div className="flex items-center mt-4 space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <UserGroupIcon className="h-4 w-4 mr-1" />
                          {activity.participants} participants
                        </div>
                        {activity.status === 'completed' && (
                          <div className="flex items-center text-green-600">
                            <TrophyIcon className="h-4 w-4 mr-1" />
                            +{activity.score} points
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="ml-4">
                      {activity.status === 'upcoming' && (
                        <Button variant="primary" size="sm">
                          Register
                        </Button>
                      )}
                      {activity.status === 'registered' && (
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      )}
                      {activity.status === 'completed' && (
                        <Button variant="outline" size="sm">
                          View Certificate
                        </Button>
                      )}
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
                  Start your volunteer journey by joining upcoming activities.
                </p>
                <Button variant="primary">
                  Browse Activities
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
} 