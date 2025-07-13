"use client"

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { HeartIcon, GlobeAltIcon, UsersIcon, StarIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import InteractiveWorldMap from '@/components/ui/InteractiveWorldMap';
import React, { useState } from 'react';

// Move igenCountries outside the Home component
interface IgenCountry {
  id: string;
  name: string;
  memberCount: number;
  activities: string[];
}
const igenCountries: IgenCountry[] = [
  { id: 'US', name: 'United States', memberCount: 45, activities: ['Environmental Cleanup', 'Youth Mentoring', 'Food Bank Support'] },
  { id: 'CA', name: 'Canada', memberCount: 23, activities: ['Community Gardens', 'Elder Care', 'Education Programs'] },
  { id: 'GB', name: 'United Kingdom', memberCount: 31, activities: ['Homeless Support', 'Animal Welfare', 'Arts & Culture'] },
  { id: 'DE', name: 'Germany', memberCount: 18, activities: ['Refugee Support', 'Environmental Protection', 'Tech Education'] },
  { id: 'FR', name: 'France', memberCount: 15, activities: ['Cultural Exchange', 'Social Services', 'Healthcare Support'] },
  { id: 'IN', name: 'India', memberCount: 67, activities: ['Rural Development', 'Women Empowerment', 'Education for All'] },
  { id: 'JP', name: 'Japan', memberCount: 12, activities: ['Disaster Relief', 'Elder Care', 'Cultural Preservation'] },
  { id: 'AU', name: 'Australia', memberCount: 28, activities: ['Wildlife Conservation', 'Indigenous Support', 'Community Health'] },
  { id: 'BR', name: 'Brazil', memberCount: 34, activities: ['Rainforest Protection', 'Urban Development', 'Sports Programs'] },
  { id: 'NG', name: 'Nigeria', memberCount: 41, activities: ['Youth Development', 'Healthcare Access', 'Economic Empowerment'] },
  { id: 'CN', name: 'China', memberCount: 20, activities: ['Tech for Good', 'Education', 'Health'] },
];

export default function Home() {
  const [currentReview, setCurrentReview] = useState(0)

  const reviews = [
    {
      name: "Sarah Johnson",
      role: "Volunteer",
      content: "iGEN has transformed my perspective on community service. The international programs opened my eyes to global issues and connected me with amazing people worldwide.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Program Participant",
      content: "The Inner Peace Program helped me find balance in my hectic life. I learned valuable techniques for emotional resilience that I now share with others.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Cultural Exchange Participant",
      content: "The cultural exchange program in Nepal was life-changing. I experienced incredible hospitality and learned so much about sustainable community development.",
      rating: 5
    },
    {
      name: "David Kim",
      role: "Youth Volunteer",
      content: "Being part of the International Volunteer Youth Program taught me leadership skills and the importance of cross-cultural collaboration.",
      rating: 5
    },
    {
      name: "Lisa Wang",
      role: "Peace Program Graduate",
      content: "The Inner Peace Program gave me tools to handle stress and anxiety. I'm now able to help others find their inner calm too.",
      rating: 5
    }
  ]

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  return (
    <div>
      {/* Hero section with gradient blob background */}
      <div className="h-screen relative overflow-hidden bg-gradient-to-br from-red-50 via-white to-blue-50">
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
        
        {/* Hero content */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 sm:py-48 lg:px-8 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
              We aim to promote world peace through<br />
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                sustainable self-improvement
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl max-w-3xl mx-auto">
              Join our volunteer club and be part of something bigger. Help communities, 
              learn new skills, and create lasting friendships while making a positive impact.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/join-us"
                className="rounded-md bg-gradient-to-r from-red-600 to-pink-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Join Our Community
              </Link>
              <Link 
                href="/projects" 
                className="text-sm font-semibold leading-6 text-gray-700 hover:text-red-600 transition-colors duration-200"
              >
                View Projects <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Mission
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Empowering youth to create positive change through sustainable self-improvement and global community service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Our Story */}
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <HeartIcon className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Our Story</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Founded with a vision to unite young people across cultures, iGEN began as a small community of passionate volunteers. Today, we've grown into a global movement that has touched thousands of lives through our innovative programs and initiatives.
                </p>
              </CardContent>
            </Card>

            {/* Our Vision */}
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <GlobeAltIcon className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We envision a world where every young person has the opportunity to develop their potential, connect with diverse communities, and contribute to creating a more peaceful and sustainable future for all.
                </p>
              </CardContent>
            </Card>

            {/* Our Values */}
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <UsersIcon className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Our Values</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Compassion, diversity, sustainability, and innovation drive everything we do. We believe in the power of collective action and the importance of nurturing both individual growth and community well-being.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* iGEN Community Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              iGEN Community
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Discover the vibrant community that makes iGEN special. Watch our story and see how we're making a difference together.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-lg">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/tCn2EMb1zBo"
                title="iGEN Community Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Where our members are from Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Where Our Members Are From
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Our global community spans across continents, bringing together passionate volunteers from diverse backgrounds and cultures.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <WorldMapWithTooltip />
          </div>
        </div>
      </div>

      {/* iGEN Projects Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              iGEN Projects
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our flagship programs that are transforming lives and communities around the world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* International Volunteer Youth Program */}
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-xl">International Volunteer Youth Program</CardTitle>
                <CardDescription>Global Youth Volunteer Camp</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  A global youth volunteer camp focused on self-development through sharing ideas, cultures, and inspirations. The program establishes unity amid diversity and collaboratively delivers positive impacts to local communities.
                </p>
                <div className="mt-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    International
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 ml-2">
                    Youth
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Inner Peace Program */}
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-xl">Inner Peace Program</CardTitle>
                <CardDescription>Emotional Resilience Initiative</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  An initiative supporting youth in pausing from chaos, reconnecting with their inner peace, and building stable emotional resilience. Participants are then empowered to spread the power of peace to others.
                </p>
                <div className="mt-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Wellness
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 ml-2">
                    Mental Health
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Cultural Youth Exchange Program */}
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-xl">Cultural Youth Exchange Program</CardTitle>
                <CardDescription>Global Cultural Exchange</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  A cultural exchange program that raises awareness of global diversity and creates social impact through international volunteer projects. Examples include peace volunteer programs in Nepal, Mongolia, Malaysia, India, Taiwan, and Japan.
                </p>
                <div className="mt-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Cultural
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 ml-2">
                    Exchange
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* iGEN Reviews Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              iGEN Reviews
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from our members and participants about their transformative experiences with iGEN programs.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Review Card */}
              <Card className="text-center p-8">
                <CardContent>
                  <div className="flex justify-center mb-4">
                    {[...Array(reviews[currentReview].rating)].map((_, i) => (
                      <StarIcon key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-lg text-gray-700 mb-6 italic">
                    "{reviews[currentReview].content}"
                  </blockquote>
                  <div>
                    <p className="font-semibold text-gray-900">{reviews[currentReview].name}</p>
                    <p className="text-gray-600">{reviews[currentReview].role}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Navigation Buttons */}
              <button
                onClick={prevReview}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
              >
                <ArrowLeftIcon className="h-6 w-6 text-gray-600" />
              </button>
              <button
                onClick={nextReview}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
              >
                <ArrowRightIcon className="h-6 w-6 text-gray-600" />
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReview(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentReview ? 'bg-red-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function WorldMapWithTooltip() {
  const [hovered, setHovered] = React.useState<IgenCountry | null>(null);
  const [mouse, setMouse] = React.useState<{ x: number; y: number }>({ x: 0, y: 0 });

  return (
    <div className="relative">
      <InteractiveWorldMap
        igenCountries={igenCountries}
        onCountryHover={(country, e) => {
          setHovered(country);
          setMouse({ x: e.clientX, y: e.clientY });
        }}
        onCountryLeave={() => setHovered(null)}
      />
      {hovered && (
        <div
          className="absolute z-10 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-xs"
          style={{
            left: mouse.x - 100,
            top: mouse.y - 180,
            pointerEvents: 'none',
          }}
        >
          <h3 className="font-semibold text-gray-900 mb-2">{hovered.name}</h3>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium">{hovered.memberCount}</span> iGEN members
          </p>
          {hovered.activities.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Activities:</p>
              <ul className="text-sm text-gray-600 space-y-1">
                {hovered.activities.map((activity, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-2"></span>
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
