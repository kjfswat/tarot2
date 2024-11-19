import React, { useState } from 'react';
import { UserProfile } from '../types/user';
import { Save, Plus, X } from 'lucide-react';

interface UserProfileFormProps {
  profile: Partial<UserProfile>;
  onSave: (profile: Partial<UserProfile>) => void;
}

export function UserProfileForm({ profile, onSave }: UserProfileFormProps) {
  const [formData, setFormData] = useState(profile);
  const [newBelief, setNewBelief] = useState('');
  const [newGoal, setNewGoal] = useState('');
  const [newInterest, setNewInterest] = useState('');

  const handleAddItem = (
    field: 'spiritualBeliefs' | 'lifeGoals' | 'areasOfInterest',
    value: string,
    setValue: (s: string) => void
  ) => {
    if (!value.trim()) return;
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: [...(prev.preferences?.[field] || []), value.trim()]
      }
    }));
    setValue('');
  };

  const handleRemoveItem = (
    field: 'spiritualBeliefs' | 'lifeGoals' | 'areasOfInterest',
    index: number
  ) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: prev.preferences?.[field].filter((_, i) => i !== index)
      }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Astrological Data */}
      <div className="bg-purple-900/40 rounded-xl p-6">
        <h3 className="text-xl font-serif text-white mb-4">Astrological Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-purple-200 text-sm mb-2">Birth Date</label>
            <input
              type="date"
              value={formData.astrological?.birthDate || ''}
              onChange={e => setFormData(prev => ({
                ...prev,
                astrological: { ...prev.astrological, birthDate: e.target.value }
              }))}
              className="w-full bg-purple-800/30 rounded-lg px-3 py-2 text-purple-100 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-purple-200 text-sm mb-2">Birth Time</label>
            <input
              type="time"
              value={formData.astrological?.birthTime || ''}
              onChange={e => setFormData(prev => ({
                ...prev,
                astrological: { ...prev.astrological, birthTime: e.target.value }
              }))}
              className="w-full bg-purple-800/30 rounded-lg px-3 py-2 text-purple-100 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-purple-200 text-sm mb-2">Birth Place</label>
            <input
              type="text"
              value={formData.astrological?.birthPlace || ''}
              onChange={e => setFormData(prev => ({
                ...prev,
                astrological: { ...prev.astrological, birthPlace: e.target.value }
              }))}
              placeholder="City, Country"
              className="w-full bg-purple-800/30 rounded-lg px-3 py-2 text-purple-100 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Spiritual Beliefs */}
      <div className="bg-purple-900/40 rounded-xl p-6">
        <h3 className="text-xl font-serif text-white mb-4">Spiritual Journey</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-purple-200 text-sm mb-2">Spiritual Beliefs</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newBelief}
                onChange={e => setNewBelief(e.target.value)}
                placeholder="Add a spiritual belief"
                className="flex-1 bg-purple-800/30 rounded-lg px-3 py-2 text-purple-100 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
              <button
                onClick={() => handleAddItem('spiritualBeliefs', newBelief, setNewBelief)}
                className="p-2 bg-amber-500 text-purple-900 rounded-lg hover:bg-amber-400 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.preferences?.spiritualBeliefs?.map((belief, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 bg-purple-800/50 rounded-full px-3 py-1 text-sm text-purple-200"
                >
                  {belief}
                  <button
                    onClick={() => handleRemoveItem('spiritualBeliefs', index)}
                    className="text-purple-400 hover:text-purple-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Similar sections for Life Goals and Areas of Interest */}
        </div>
      </div>

      <button
        onClick={() => onSave(formData)}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-amber-500 text-purple-900 rounded-full hover:bg-amber-400 transition-colors"
      >
        <Save className="w-5 h-5" />
        Save Profile
      </button>
    </div>
  );
}