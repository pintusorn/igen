import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import Link from 'next/link'

export default function JoinUsPage() {
  return (
    <div className="bg-gradient-to-br from-red-50 via-white to-blue-50">
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large blob 1 */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse"></div>
        
        {/* Large blob 2 */}
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Medium blob 3 */}
        <div className="absolute top-1/2 left-1/4 w-60 h-60 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Small blob 4 */}
        <div className="absolute top-1/3 right-1/3 w-40 h-40 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-red-400/40 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-blue-400/40 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/2 w-1.5 h-1.5 bg-purple-400/40 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Join Our{' '}
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">Community</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Ready to make a difference? Join our volunteer club and become part of 
              a community dedicated to positive change.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/register">
                <Button size="lg">
                  Get Started Today
                </Button>
              </Link>
              <Link href="/projects" className="text-sm font-semibold leading-6 text-gray-900">
                View Projects <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-red-600">How to Join</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Simple steps to get started
          </p>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>1. Sign Up</CardTitle>
              <CardDescription>Create your account</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Register for a free account and tell us about your interests and skills.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>2. Browse Projects</CardTitle>
              <CardDescription>Find your perfect match</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Explore our current projects and find opportunities that align with your passions.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>3. Start Volunteering</CardTitle>
              <CardDescription>Make an impact</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Join projects, connect with other volunteers, and start making a difference.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 