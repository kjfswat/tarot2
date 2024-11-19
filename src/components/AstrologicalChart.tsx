import React, { useState } from 'react';
import { AstrologicalData } from '../types/user';
import { Moon, Sun, Star, Info } from 'lucide-react';

interface AstrologicalChartProps {
  data: AstrologicalData;
}

export function AstrologicalChart({ data }: AstrologicalChartProps) {
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);

  const calculatePosition = (degrees: number, radius: number) => {
    const angle = (degrees - 90) * (Math.PI / 180);
    return {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle)
    };
  };

  const getPlanetDescription = (planet: string, sign: string, house: number) => {
    return `${planet} in ${sign} (House ${house}) suggests ${getPlanetaryInfluence(planet, sign)}`;
  };

  const getPlanetaryInfluence = (planet: string, sign: string) => {
    // Add detailed interpretations based on planet-sign combinations
    return `a focus on ${planet.toLowerCase()} energy through the lens of ${sign}`;
  };

  return (
    <div className="relative aspect-square max-w-xl mx-auto">
      {/* Background layers */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-900/40 to-purple-800/40 backdrop-blur-sm" />
      <div className="absolute inset-2 rounded-full border border-amber-400/20 animate-pulse" />
      <div className="absolute inset-4 rounded-full border border-amber-400/10" />
      
      {/* Houses */}
      {Object.entries(data.houses).map(([house, sign], index) => {
        const pos = calculatePosition((index * 30), 140);
        return (
          <div
            key={house}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
            style={{ left: `${pos.x + 50}%`, top: `${pos.y + 50}%` }}
            onMouseEnter={() => setHoveredElement(`house-${house}`)}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <div className={`
              relative bg-purple-800/50 rounded-full p-2
              transition-all duration-300
              ${hoveredElement === `house-${house}` ? 'scale-110 bg-purple-700/60 ring-2 ring-amber-400/50' : ''}
            `}>
              <span className="text-sm text-purple-200">{house}°</span>
              {hoveredElement === `house-${house}` && (
                <div className="absolute left-1/2 top-full mt-2 transform -translate-x-1/2 w-48 bg-purple-900/90 rounded-lg p-2 text-xs text-purple-200 z-10">
                  <p className="font-semibold text-amber-400 mb-1">House {house} in {sign}</p>
                  <p>Represents aspects of {getHouseDescription(Number(house))}</p>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Planetary Positions */}
      {data.planetaryPositions.map((planet) => {
        const pos = calculatePosition(planet.degrees, 100);
        const Icon = getPlanetIcon(planet.planet);
        return (
          <div
            key={planet.planet}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
            style={{ left: `${pos.x + 50}%`, top: `${pos.y + 50}%` }}
            onMouseEnter={() => setHoveredElement(planet.planet)}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <div className={`
              relative bg-purple-800/80 rounded-full p-2
              transition-all duration-300
              ${hoveredElement === planet.planet ? 'scale-110 bg-purple-700/90 ring-2 ring-amber-400' : ''}
            `}>
              <Icon className={`
                w-4 h-4 transition-colors duration-300
                ${hoveredElement === planet.planet ? 'text-amber-300' : 'text-amber-400'}
              `} />
              {hoveredElement === planet.planet && (
                <div className="absolute left-1/2 top-full mt-2 transform -translate-x-1/2 w-48 bg-purple-900/90 rounded-lg p-2 text-xs text-purple-200 z-10">
                  <p className="font-semibold text-amber-400 mb-1">{planet.planet}</p>
                  <p>{getPlanetDescription(planet.planet, planet.sign, planet.house)}</p>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Center Info */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center transform transition-all duration-300 hover:scale-105">
          <p className="text-xl font-serif text-amber-400 mb-1">{data.zodiacSign}</p>
          <p className="text-sm text-purple-200">Ascendant: {data.ascendant}</p>
          <p className="text-sm text-purple-200">Moon: {data.moonSign}</p>
        </div>
      </div>

      {/* Help Button */}
      <button
        className="absolute top-2 right-2 p-2 rounded-full bg-purple-800/50 text-amber-400 hover:bg-purple-700/60 transition-colors"
        onClick={() => setHoveredElement('help')}
      >
        <Info className="w-4 h-4" />
      </button>

      {hoveredElement === 'help' && (
        <div className="absolute top-12 right-2 w-64 bg-purple-900/90 rounded-lg p-3 text-sm text-purple-200 z-10">
          <h4 className="font-semibold text-amber-400 mb-2">Reading Your Chart</h4>
          <ul className="space-y-2">
            <li>• Hover over planets to see their influences</li>
            <li>• Houses show different life areas</li>
            <li>• The center shows your sun sign</li>
          </ul>
        </div>
      )}
    </div>
  );
}

function getPlanetIcon(planet: string) {
  switch (planet.toLowerCase()) {
    case 'sun': return Sun;
    case 'moon': return Moon;
    default: return Star;
  }
}

function getHouseDescription(house: number): string {
  const descriptions: Record<number, string> = {
    1: 'self and personality',
    2: 'values and possessions',
    3: 'communication and learning',
    4: 'home and family',
    5: 'creativity and pleasure',
    6: 'work and health',
    7: 'relationships',
    8: 'transformation',
    9: 'philosophy and travel',
    10: 'career and status',
    11: 'community and hopes',
    12: 'spirituality and unconscious'
  };
  return descriptions[house] || 'various life aspects';
}