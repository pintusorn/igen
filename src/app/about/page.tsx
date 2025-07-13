import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { UsersIcon, HeartIcon, GlobeAltIcon, SparklesIcon } from '@heroicons/react/24/outline'

export default function AboutPage() {
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

      {/* Hero section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              About Our{' '}
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">Volunteer Club</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We are a community-driven organization dedicated to making a positive impact 
              through volunteer work, community service, and social responsibility.
            </p>
          </div>
        </div>
      </div>

      {/* Mission section */}
      <div className="mx-auto max-w-7xl px-6 sm:mt-40 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-red-600">Our Mission</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Empowering communities through volunteerism
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our mission is to connect passionate individuals with meaningful opportunities 
            to serve their communities, fostering a culture of giving back and creating 
            lasting positive change.
          </p>
        </div>
      </div>

      {/* Values section */}
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-red-600">Our Values</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What drives us forward
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            <div className="relative pl-9">
              <dt className="inline font-semibold text-gray-900">
                <HeartIcon className="absolute left-1 top-1 h-5 w-5 text-red-600" aria-hidden="true" />
                <span className="ml-2">Compassion</span>
              </dt>
              <dd className="inline"> - We approach every project with empathy and understanding, putting the needs of others first.</dd>
            </div>
            <div className="relative pl-9">
              <dt className="inline font-semibold text-gray-900">
                <UsersIcon className="absolute left-1 top-1 h-5 w-5 text-red-600" aria-hidden="true" />
                <span className="ml-2">Community</span>
              </dt>
              <dd className="inline"> - We believe in the power of collective action and building strong, supportive networks.</dd>
            </div>
            <div className="relative pl-9">
              <dt className="inline font-semibold text-gray-900">
                <GlobeAltIcon className="absolute left-1 top-1 h-5 w-5 text-red-600" aria-hidden="true" />
                <span className="ml-2">Sustainability</span>
              </dt>
              <dd className="inline"> - We create lasting impact through sustainable solutions and long-term partnerships.</dd>
            </div>
            <div className="relative pl-9">
              <dt className="inline font-semibold text-gray-900">
                <SparklesIcon className="absolute left-1 top-1 h-5 w-5 text-red-600" aria-hidden="true" />
                <span className="ml-2">Innovation</span>
              </dt>
              <dd className="inline"> - We embrace new ideas and creative approaches to solve community challenges.</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Team section */}
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-red-600">Our Team</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Meet the people behind our mission
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Sarah Johnson</CardTitle>
              <CardDescription>Founder & Executive Director</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Sarah has over 15 years of experience in community development and 
                nonprofit management. She founded our club with a vision of creating 
                meaningful volunteer opportunities.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Michael Chen</CardTitle>
              <CardDescription>Program Coordinator</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Michael oversees our volunteer programs and ensures that every project 
                creates maximum impact for both volunteers and the communities we serve.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Emily Rodriguez</CardTitle>
              <CardDescription>Community Outreach</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Emily builds partnerships with local organizations and coordinates 
                our community engagement initiatives across different neighborhoods.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Stats section */}
      <div className="bg-red-600">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Our Impact in Numbers
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-red-100">
                Together, we&apos;ve made a significant difference in our community
              </p>
            </div>
            <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col bg-white/5 p-8">
                <dt className="text-sm font-semibold leading-6 text-red-200">Active Volunteers</dt>
                <dd className="order-first text-3xl font-bold tracking-tight text-white">500+</dd>
              </div>
              <div className="flex flex-col bg-white/5 p-8">
                <dt className="text-sm font-semibold leading-6 text-red-200">Projects Completed</dt>
                <dd className="order-first text-3xl font-bold tracking-tight text-white">150+</dd>
              </div>
              <div className="flex flex-col bg-white/5 p-8">
                <dt className="text-sm font-semibold leading-6 text-red-200">Hours Donated</dt>
                <dd className="order-first text-3xl font-bold tracking-tight text-white">10,000+</dd>
              </div>
              <div className="flex flex-col bg-white/5 p-8">
                <dt className="text-sm font-semibold leading-6 text-red-200">Communities Served</dt>
                <dd className="order-first text-3xl font-bold tracking-tight text-white">25+</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
} 