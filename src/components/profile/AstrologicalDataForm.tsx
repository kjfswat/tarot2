import React, { useState } from 'react';
import { AstrologicalData } from '../../types/user';
import { calculateAstrologicalChart } from '../../utils/astrology';
import { Moon, Calendar, MapPin } from 'lucide-react';

interface AstrologicalDataFormProps {
  data?: AstrologicalData;
  onSave: (data: AstrologicalData) => void;
}

export function AstrologicalDataForm({ data, onSave }: AstrologicalDataFormProps) {
  const [formData, setFormData] = useState(data || {
    birthDate: '',
    birthTime: '',
    birthPlace: '',
    zodiacSign: '',
    ascendant: '',
    moonSign: '',
    houses: {},
    planetaryPositions: []
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const chartData = await calculateAstrologicalChart(
        formData.birthDate,
        formData.birthTime,
        formData.birthPlace
      );
      onSave(chartData);
    } catch (error) {
      console.error('Error calculating chart:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-purple-900/40 backdrop-blur-sm rounded-xl p-6">
        <h3 className="text-xl font-serif text-white mb-6 flex items-center gap-2">
          <Moon className="w-5 h-5 text-amber-400" />
          Birth Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm text-purple-200">Birth Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400" />
              <input
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                className="w-full bg-purple-800/30 rounded-lg pl-10 pr-4 py-2 text-purple-100 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-purple-200">Birth Time</label>
            <div className="relative">
              <Moon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400" />
              <input
                type="time"
                value={formData.birthTime}
                onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
                className="w-full bg-purple-800/30 rounded-lg pl-10 pr-4 py-2 text-purple-100 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="block text-sm text-purple-200">Birth Place</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400" />
              <input
                type="text"
                value={formData.birthPlace}
                onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
                placeholder="City, Country"
                className="w-full bg-purple-800/30 rounded-lg pl-10 pr-4 py-2 text-purple-100 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                required
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 bg-amber-500 text-purple-900 rounded-full hover:bg-amber-400 transition-colors font-semibold"
        >
          Calculate Chart
        </button>
      </div>
    </form>
  );
}