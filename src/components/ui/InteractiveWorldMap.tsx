import React, { useRef, useEffect } from 'react';

interface IgenCountry {
  id: string;
  name: string;
  memberCount: number;
  activities: string[];
}

interface InteractiveWorldMapProps {
  igenCountries: IgenCountry[];
  onCountryHover?: (country: IgenCountry, event: React.MouseEvent<SVGPathElement, MouseEvent>) => void;
  onCountryLeave?: () => void;
}

const InteractiveWorldMap: React.FC<InteractiveWorldMapProps> = ({ igenCountries, onCountryHover, onCountryLeave }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const igenCountryIds = igenCountries.map(c => c.id);
  const countryMap = Object.fromEntries(igenCountries.map(c => [c.id, c]));

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    // Highlight iGEN countries and add event listeners
    igenCountryIds.forEach(id => {
      const el = svg.getElementById(id);
      if (el) {
        el.setAttribute('style', 'cursor:pointer; transition:fill 0.2s;');
        el.setAttribute('fill', '#dc2626');
        (el as SVGPathElement).onmouseenter = (e: MouseEvent) => onCountryHover && onCountryHover(countryMap[id], e as unknown as React.MouseEvent<SVGPathElement, MouseEvent>);
        (el as SVGPathElement).onmouseleave = () => onCountryLeave && onCountryLeave();
      }
    });
    // Reset other countries
    Array.from(svg.querySelectorAll('path')).forEach((el: Element) => {
      if (!igenCountryIds.includes((el as SVGPathElement).id)) {
        el.setAttribute('fill', '#e2e8f0');
        el.setAttribute('style', 'transition:fill 0.2s;');
        (el as SVGPathElement).onmouseenter = null;
        (el as SVGPathElement).onmouseleave = null;
      }
    });
  }, [igenCountryIds, onCountryHover, onCountryLeave, countryMap]);

  return (
    <div className="w-full h-auto">
      {/* Inlined SVG for world map, ref is attached for interactivity */}
      <svg ref={svgRef} xmlns="http://www.w3.org/2000/svg" version="1.1" width="2754" height="1398" viewBox="0 0 2754 1398" className="w-full h-auto">
        <title>World Map</title>
        <style>{`/* SVG styles omitted for brevity, keep them if you want the original look */`}</style>
        {/* ...SVG paths and groups go here... */}
      </svg>
    </div>
  );
};

export default InteractiveWorldMap; 