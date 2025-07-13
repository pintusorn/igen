"use client"

import { useState } from 'react'

interface CountryData {
  id: string
  name: string
  memberCount: number
  activities: string[]
  color: string
}

interface WorldMapProps {
  memberData: CountryData[]
}

export default function WorldMap({ memberData }: WorldMapProps) {
  const [hoveredCountry, setHoveredCountry] = useState<CountryData | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  const handleCountryHover = (country: CountryData) => {
    setHoveredCountry(country)
  }

  const handleCountryLeave = () => {
    setHoveredCountry(null)
  }

  // Create a map of country codes to data for quick lookup
  const countryDataMap = new Map(memberData.map(country => [country.id, country]))

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* World Map SVG */}
      <svg
        viewBox="0 0 1000 500"
        className="w-full h-auto"
        onMouseMove={handleMouseMove}
      >
        {/* Background */}
        <rect width="1000" height="500" fill="#f8fafc" />
        
        {/* World Map - More detailed and recognizable */}
        
        {/* North America */}
        {/* Canada */}
        <path
          d="M 120 80 L 280 80 L 300 120 L 280 160 L 120 160 Z"
          fill={countryDataMap.has('CA') ? '#dc2626' : '#e2e8f0'}
          stroke="#94a3b8"
          strokeWidth="1"
          onMouseEnter={() => countryDataMap.has('CA') && handleCountryHover(countryDataMap.get('CA')!)}
          onMouseLeave={handleCountryLeave}
          className="cursor-pointer transition-colors duration-200 hover:opacity-80"
        />
        
        {/* United States */}
        <path
          d="M 120 160 L 320 160 L 340 200 L 320 240 L 120 240 Z"
          fill={countryDataMap.has('US') ? '#dc2626' : '#e2e8f0'}
          stroke="#94a3b8"
          strokeWidth="1"
          onMouseEnter={() => countryDataMap.has('US') && handleCountryHover(countryDataMap.get('US')!)}
          onMouseLeave={handleCountryLeave}
          className="cursor-pointer transition-colors duration-200 hover:opacity-80"
        />
        
        {/* Mexico */}
        <path
          d="M 120 240 L 280 240 L 300 280 L 280 320 L 120 320 Z"
          fill={countryDataMap.has('MX') ? '#dc2626' : '#e2e8f0'}
          stroke="#94a3b8"
          strokeWidth="1"
          onMouseEnter={() => countryDataMap.has('MX') && handleCountryHover(countryDataMap.get('MX')!)}
          onMouseLeave={handleCountryLeave}
          className="cursor-pointer transition-colors duration-200 hover:opacity-80"
        />
        
        {/* Central America */}
        <path
          d="M 120 320 L 200 320 L 220 360 L 200 380 L 120 380 Z"
          fill="#e2e8f0"
          stroke="#94a3b8"
          strokeWidth="1"
          className="cursor-pointer transition-colors duration-200 hover:opacity-80"
        />
        
        {/* South America */}
        <path
          d="M 200 320 L 350 320 L 400 450 L 300 480 L 200 450 Z"
          fill={countryDataMap.has('BR') ? '#dc2626' : '#e2e8f0'}
          stroke="#94a3b8"
          strokeWidth="1"
          onMouseEnter={() => countryDataMap.has('BR') && handleCountryHover(countryDataMap.get('BR')!)}
          onMouseLeave={handleCountryLeave}
          className="cursor-pointer transition-colors duration-200 hover:opacity-80"
        />
        
        {/* Europe */}
        {/* UK */}
        <path
          d="M 450 140 L 480 140 L 480 160 L 450 160 Z"
          fill={countryDataMap.has('UK') ? '#dc2626' : '#e2e8f0'}
          stroke="#94a3b8"
          strokeWidth="1"
          onMouseEnter={() => countryDataMap.has('UK') && handleCountryHover(countryDataMap.get('UK')!)}
          onMouseLeave={handleCountryLeave}
          className="cursor-pointer transition-colors duration-200 hover:opacity-80"
        />
        
        {/* France */}
        <path
          d="M 440 150 L 470 150 L 470 170 L 440 170 Z"
          fill={countryDataMap.has('FR') ? '#dc2626' : '#e2e8f0'}
          stroke="#94a3b8"
          strokeWidth="1"
          onMouseEnter={() => countryDataMap.has('FR') && handleCountryHover(countryDataMap.get('FR')!)}
          onMouseLeave={handleCountryLeave}
          className="cursor-pointer transition-colors duration-200 hover:opacity-80"
        />
        
        {/* Germany */}
        <path
          d="M 460 150 L 490 150 L 490 170 L 460 170 Z"
          fill={countryDataMap.has('DE') ? '#dc2626' : '#e2e8f0'}
          stroke="#94a3b8"
          strokeWidth="1"
          onMouseEnter={() => countryDataMap.has('DE') && handleCountryHover(countryDataMap.get('DE')!)}
          onMouseLeave={handleCountryLeave}
          className="cursor-pointer transition-colors duration-200 hover:opacity-80"
        />
        
        {/* Italy */}
        <path
          d="M 460 170 L 480 170 L 480 190 L 460 190 Z"
          fill="#e2e8f0"
          stroke="#94a3b8"
          strokeWidth="1"
          className="cursor-pointer transition-colors duration-200 hover:opacity-80"
        />
        
        {/* Spain */}
        <path
          d="M 420 160 L 450 160 L 450 180 L 420 180 Z"
          fill="#e2e8f0"
          stroke="#94a3b8"
          strokeWidth="1"
          className="cursor-pointer transition-colors duration-200 hover:opacity-80"
        />
        
        {/* Scandinavia */}
        <path
          d="M 460 120 L 500 120 L 500 140 L 460 140 Z"
          fill="#e2e8f0"
          stroke="#94a3b8"
          strokeWidth="1"
          className="cursor-pointer transition-colors duration-200 hover:opacity-80"
        />
        
        {/* Africa */}
        <path
          d="M 450 200 L 550 200 L 580 350 L 500 380 L 450 350 Z"
          fill={countryDataMap.has('NG') ? '#dc2626' : '#e2e8f0'}
          stroke="#94a3b8"
          strokeWidth="1"
          onMouseEnter={() => countryDataMap.has('NG') && handleCountryHover(countryDataMap.get('NG')!)}
          onMouseLeave={handleCountryLeave}
          className="cursor-pointer transition-colors duration-200 hover:opacity-80"
        />
        
        {/* Middle East */}
        <path
          d="M 520 180 L 580 180 L 580 220 L 520 220 Z"
          fill="#e2e8f0"
          stroke="#94a3b8"
          strokeWidth="1"
          className="cursor-pointer transition-colors duration-200 hover:opacity-80"
        />
        
        {/* Asia */}
        {/* Russia */}
        <path
          d="M 500 80 L 750 80 L 750 160 L 500 160 Z"
          fill="#e2e8f0"
          stroke="#94a3b8"
          strokeWidth="1"
          className="cursor-pointer transition-colors duration-200 hover:opacity-80"
        />
        
        {/* China */}
        <path
          d="M 650 160 L 750 160 L 750 220 L 650 220 Z"
          fill={countryDataMap.has('CN') ? '#dc2626' : '#e2e8f0'}
          stroke="#94a3b8"
          strokeWidth="1"
          onMouseEnter={() => countryDataMap.has('CN') && handleCountryHover(countryDataMap.get('CN')!)}
          onMouseLeave={handleCountryLeave}
          className="cursor-pointer transition-colors duration-200 hover:opacity-80"
        />
        
        {/* India */}
        <path
          d="M 600 200 L 680 200 L 680 240 L 600 240 Z"
          fill={countryDataMap.has('IN') ? '#dc2626' : '#e2e8f0'}
          stroke="#94a3b8"
          strokeWidth="1"
          onMouseEnter={() => countryDataMap.has('IN') && handleCountryHover(countryDataMap.get('IN')!)}
          onMouseLeave={handleCountryLeave}
          className="cursor-pointer transition-colors duration-200 hover:opacity-80"
        />
        
        {/* Japan */}
        <path
          d="M 800 180 L 820 180 L 820 200 L 800 200 Z"
          fill={countryDataMap.has('JP') ? '#dc2626' : '#e2e8f0'}
          stroke="#94a3b8"
          strokeWidth="1"
          onMouseEnter={() => countryDataMap.has('JP') && handleCountryHover(countryDataMap.get('JP')!)}
          onMouseLeave={handleCountryLeave}
          className="cursor-pointer transition-colors duration-200 hover:opacity-80"
        />
        
        {/* Southeast Asia */}
        <path
          d="M 650 240 L 720 240 L 720 280 L 650 280 Z"
          fill="#e2e8f0"
          stroke="#94a3b8"
          strokeWidth="1"
          className="cursor-pointer transition-colors duration-200 hover:opacity-80"
        />
        
        {/* Australia */}
        <path
          d="M 750 320 L 850 320 L 850 420 L 750 420 Z"
          fill={countryDataMap.has('AU') ? '#dc2626' : '#e2e8f0'}
          stroke="#94a3b8"
          strokeWidth="1"
          onMouseEnter={() => countryDataMap.has('AU') && handleCountryHover(countryDataMap.get('AU')!)}
          onMouseLeave={handleCountryLeave}
          className="cursor-pointer transition-colors duration-200 hover:opacity-80"
        />
        
        {/* New Zealand */}
        <path
          d="M 800 440 L 820 440 L 820 460 L 800 460 Z"
          fill="#e2e8f0"
          stroke="#94a3b8"
          strokeWidth="1"
          className="cursor-pointer transition-colors duration-200 hover:opacity-80"
        />
        
        {/* Add country labels */}
        <text x="220" y="100" textAnchor="middle" className="text-xs fill-gray-600 font-medium">Canada</text>
        <text x="220" y="200" textAnchor="middle" className="text-xs fill-gray-600 font-medium">USA</text>
        <text x="200" y="280" textAnchor="middle" className="text-xs fill-gray-600 font-medium">Mexico</text>
        <text x="300" y="380" textAnchor="middle" className="text-xs fill-gray-600 font-medium">Brazil</text>
        <text x="465" y="150" textAnchor="middle" className="text-xs fill-gray-600 font-medium">UK</text>
        <text x="455" y="160" textAnchor="middle" className="text-xs fill-gray-600 font-medium">France</text>
        <text x="475" y="160" textAnchor="middle" className="text-xs fill-gray-600 font-medium">Germany</text>
        <text x="500" y="300" textAnchor="middle" className="text-xs fill-gray-600 font-medium">Nigeria</text>
        <text x="700" y="190" textAnchor="middle" className="text-xs fill-gray-600 font-medium">China</text>
        <text x="640" y="220" textAnchor="middle" className="text-xs fill-gray-600 font-medium">India</text>
        <text x="810" y="190" textAnchor="middle" className="text-xs fill-gray-600 font-medium">Japan</text>
        <text x="800" y="370" textAnchor="middle" className="text-xs fill-gray-600 font-medium">Australia</text>
        
        {/* Add some major cities as dots */}
        <circle cx="220" cy="200" r="2" fill="#dc2626" opacity="0.7" />
        <circle cx="465" cy="150" r="2" fill="#dc2626" opacity="0.7" />
        <circle cx="700" cy="190" r="2" fill="#dc2626" opacity="0.7" />
        <circle cx="640" cy="220" r="2" fill="#dc2626" opacity="0.7" />
        <circle cx="810" cy="190" r="2" fill="#dc2626" opacity="0.7" />
        <circle cx="800" cy="370" r="2" fill="#dc2626" opacity="0.7" />
        <circle cx="300" cy="380" r="2" fill="#dc2626" opacity="0.7" />
        <circle cx="500" cy="300" r="2" fill="#dc2626" opacity="0.7" />
      </svg>

      {/* Hover Tooltip */}
      {hoveredCountry && (
        <div
          className="absolute z-10 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-xs"
          style={{
            left: mousePosition.x + 10,
            top: mousePosition.y - 10,
            transform: 'translateY(-50%)'
          }}
        >
          <h3 className="font-semibold text-gray-900 mb-2">{hoveredCountry.name}</h3>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium">{hoveredCountry.memberCount}</span> iGEN members
          </p>
          {hoveredCountry.activities.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Activities:</p>
              <ul className="text-sm text-gray-600 space-y-1">
                {hoveredCountry.activities.map((activity, index) => (
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

      {/* Legend */}
      <div className="mt-6 flex items-center justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-600 rounded"></div>
          <span className="text-gray-700">Countries with iGEN members</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-200 rounded"></div>
          <span className="text-gray-700">Other countries</span>
        </div>
      </div>
    </div>
  )
} 