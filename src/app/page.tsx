import Link from 'next/link'

export default function Home() {
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
    </div>
  )
}
