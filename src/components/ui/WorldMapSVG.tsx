import React from 'react';

interface SVGWorldMapProps {
  onCountryHover?: (countryId: string, event: React.MouseEvent<SVGPathElement, MouseEvent>) => void;
  onCountryLeave?: () => void;
  highlightedCountries?: string[];
}

// This SVG is a simplified world map with country codes as IDs for interactivity
const SVGWorldMap: React.FC<SVGWorldMapProps> = ({
  onCountryHover,
  onCountryLeave,
  highlightedCountries = [],
}) => (
  <svg
    viewBox="0 0 2000 1001"
    className="w-full h-auto"
    xmlns="http://www.w3.org/2000/svg"
    style={{ background: '#f8fafc', borderRadius: 16 }}
  >
    {/* Example: Only a few countries for demo. You can expand with more paths as needed. */}
    <g>
      {/* United States */}
      <path
        id="US"
        d="M 300 400 L 500 400 L 520 500 L 320 500 Z"
        fill={highlightedCountries.includes('US') ? '#dc2626' : '#e2e8f0'}
        stroke="#94a3b8"
        strokeWidth="2"
        onMouseEnter={e => onCountryHover && onCountryHover('US', e)}
        onMouseLeave={onCountryLeave}
        className="cursor-pointer transition-colors duration-200 hover:opacity-80"
      />
      {/* Canada */}
      <path
        id="CA"
        d="M 300 300 L 500 300 L 500 400 L 300 400 Z"
        fill={highlightedCountries.includes('CA') ? '#dc2626' : '#e2e8f0'}
        stroke="#94a3b8"
        strokeWidth="2"
        onMouseEnter={e => onCountryHover && onCountryHover('CA', e)}
        onMouseLeave={onCountryLeave}
        className="cursor-pointer transition-colors duration-200 hover:opacity-80"
      />
      {/* Brazil */}
      <path
        id="BR"
        d="M 700 700 L 900 700 L 900 900 L 700 900 Z"
        fill={highlightedCountries.includes('BR') ? '#dc2626' : '#e2e8f0'}
        stroke="#94a3b8"
        strokeWidth="2"
        onMouseEnter={e => onCountryHover && onCountryHover('BR', e)}
        onMouseLeave={onCountryLeave}
        className="cursor-pointer transition-colors duration-200 hover:opacity-80"
      />
      {/* United Kingdom */}
      <path
        id="GB"
        d="M 1100 300 L 1150 300 L 1150 350 L 1100 350 Z"
        fill={highlightedCountries.includes('GB') ? '#dc2626' : '#e2e8f0'}
        stroke="#94a3b8"
        strokeWidth="2"
        onMouseEnter={e => onCountryHover && onCountryHover('GB', e)}
        onMouseLeave={onCountryLeave}
        className="cursor-pointer transition-colors duration-200 hover:opacity-80"
      />
      {/* France */}
      <path
        id="FR"
        d="M 1200 400 L 1250 400 L 1250 450 L 1200 450 Z"
        fill={highlightedCountries.includes('FR') ? '#dc2626' : '#e2e8f0'}
        stroke="#94a3b8"
        strokeWidth="2"
        onMouseEnter={e => onCountryHover && onCountryHover('FR', e)}
        onMouseLeave={onCountryLeave}
        className="cursor-pointer transition-colors duration-200 hover:opacity-80"
      />
      {/* Germany */}
      <path
        id="DE"
        d="M 1300 400 L 1350 400 L 1350 450 L 1300 450 Z"
        fill={highlightedCountries.includes('DE') ? '#dc2626' : '#e2e8f0'}
        stroke="#94a3b8"
        strokeWidth="2"
        onMouseEnter={e => onCountryHover && onCountryHover('DE', e)}
        onMouseLeave={onCountryLeave}
        className="cursor-pointer transition-colors duration-200 hover:opacity-80"
      />
      {/* Nigeria */}
      <path
        id="NG"
        d="M 1400 700 L 1450 700 L 1450 750 L 1400 750 Z"
        fill={highlightedCountries.includes('NG') ? '#dc2626' : '#e2e8f0'}
        stroke="#94a3b8"
        strokeWidth="2"
        onMouseEnter={e => onCountryHover && onCountryHover('NG', e)}
        onMouseLeave={onCountryLeave}
        className="cursor-pointer transition-colors duration-200 hover:opacity-80"
      />
      {/* India */}
      <path
        id="IN"
        d="M 1700 700 L 1750 700 L 1750 750 L 1700 750 Z"
        fill={highlightedCountries.includes('IN') ? '#dc2626' : '#e2e8f0'}
        stroke="#94a3b8"
        strokeWidth="2"
        onMouseEnter={e => onCountryHover && onCountryHover('IN', e)}
        onMouseLeave={onCountryLeave}
        className="cursor-pointer transition-colors duration-200 hover:opacity-80"
      />
      {/* China */}
      <path
        id="CN"
        d="M 1800 500 L 1900 500 L 1900 600 L 1800 600 Z"
        fill={highlightedCountries.includes('CN') ? '#dc2626' : '#e2e8f0'}
        stroke="#94a3b8"
        strokeWidth="2"
        onMouseEnter={e => onCountryHover && onCountryHover('CN', e)}
        onMouseLeave={onCountryLeave}
        className="cursor-pointer transition-colors duration-200 hover:opacity-80"
      />
      {/* Australia */}
      <path
        id="AU"
        d="M 1700 900 L 1800 900 L 1800 1000 L 1700 1000 Z"
        fill={highlightedCountries.includes('AU') ? '#dc2626' : '#e2e8f0'}
        stroke="#94a3b8"
        strokeWidth="2"
        onMouseEnter={e => onCountryHover && onCountryHover('AU', e)}
        onMouseLeave={onCountryLeave}
        className="cursor-pointer transition-colors duration-200 hover:opacity-80"
      />
      {/* Japan */}
      <path
        id="JP"
        d="M 1950 400 L 1970 400 L 1970 420 L 1950 420 Z"
        fill={highlightedCountries.includes('JP') ? '#dc2626' : '#e2e8f0'}
        stroke="#94a3b8"
        strokeWidth="2"
        onMouseEnter={e => onCountryHover && onCountryHover('JP', e)}
        onMouseLeave={onCountryLeave}
        className="cursor-pointer transition-colors duration-200 hover:opacity-80"
      />
    </g>
  </svg>
);

export default SVGWorldMap; 