import React, { useState } from 'react';
import { UserProfile } from '../../types/user';
import { Heart, Target, Book, Plus, X } from 'lucide-react';

interface PreferencesFormProps {
  preferences?: UserProfile['preferences'];
  onSave: (preferences: UserProfile['preferences']) => void;
}

export function PreferencesForm({ preferences, onSave }: PreferencesFormProps) {
  const [formData, setFormData] = useState(preferences || {
    spiritualBeliefs: [],
    lifeGoals: [],
    areasOfInterest: [],
    preferredReader: undefined,
    preferredSpread: undefined
  });

  const [newItem, setNewItem] = useState({
    belief: '',
    goal: '',
    interest: ''
  });

  const handleAddItem = (
    field: 'spiritualBeliefs' | 'lifeGoals' | 'areasOfInterest',
    value: string
  ) => {
    if (!value.trim()) return;
    setFormData({
      ...formData,
      [field]: [...(formData[field] || []), value.trim()]
    });
    setNewItem({ ...newItem, [field.replace('s', '')]: '' });
  };

  const handleRemoveItem = (
    field: 'spiritualBeliefs' | 'lifeGoals' | 'areasOfInterest',
    index: number
  ) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-6">
      {/* Spiritual Beliefs Section */}
      <div className="bg-purple-900/40 backdrop-blur-sm rounded-xl p-6">
        <h3 className="text-xl font-serif text-white mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5 text-amber-400" />
          Spiritual Beliefs
        </h3>

        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newItem.belief}
              onChange={(e) => setNewItem({ ...newItem, belief: e.target.value })}
              placeholder="Add a spiritual belief"
              className="flex-1 bg-purple-800/30 rounded-lg px-4 py-2 text-purple-100 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => handleAddItem('spiritualBeliefs', newItem.belief)}
              className="p-2 bg-amber-500 text-purple-900 rounded-lg hover:bg-amber-400 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {formData.spiritualBeliefs?.map((belief, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 bg-purple-800/50 rounded-full px-3 py-1 text-sm text-purple-200"
              >
                {belief}
                <button
                  type="button"
                  onClick={() => handleRemoveItem('spiritualBeliefs', index)}
                  className="text-purple-400 hover:text-purple-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Life Goals Section */}
      <div className="bg-purple-900/40 backdrop-blur-sm rounded-xl p-6">
        <h3 className="text-xl font-serif text-white mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-amber-400" />
          Life Goals
        </h3>

        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newItem.goal}
              onChange={(e) => setNewItem({ ...newItem, goal: e.target.value })}
              placeholder="Add a life goal"
              className="flex-1 bg-purple-800/30 rounded-lg px-4 py-2 text-purple-100 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => handleAddItem('lifeGoals', newItem.goal)}
              className="p-2 bg-amber-500 text-purple-900 rounded-lg hover:bg-amber-400 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {formData.lifeGoals?.map((goal, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 bg-purple-800/50 rounded-full px-3 py-1 text-sm text-purple-200"
              >
                {goal}
                <button
                  type="button"
                  onClick={() => handleRemoveItem('lifeGoals', index)}
                  className="text-purple-400 hover:text-purple-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Areas of Interest Section */}
      <div className="bg-purple-900/40 backdrop-blur-sm rounded-xl p-6">
        <h3 className="text-xl font-serif text-white mb-4 flex items-center gap-2">
          <Book className="w-5 h-5 text-amber-400" />
          Areas of Interest
        </h3>

        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newItem.interest}
              onChange={(e) => setNewItem({ ...newItem, interest: e.target.value })}
              placeholder="Add an area of interest"
              className="flex-1 bg-purple-800/30 rounded-lg px-4 py-2 text-purple-100 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => handleAddItem('areasOfInterest', newItem.interest)}
              className="p-2 bg-amber-500 text-purple-900 rounded-lg hover:bg-amber-400 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {formData.areasOfInterest?.map((interest, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 bg-purple-800/50 rounded-full px-3 py-1 text-sm text-purple-200"
              >
                {interest}
                <button
                  type="button"
                  onClick={() => handleRemoveItem('areasOfInterest', index)}
                  className="text-purple-400 hover:text-purple-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => onSave(formData)}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-amber-500 text-purple-900 rounded-full hover:bg-amber-400 transition-colors font-semibold"
      >
        Save Preferences
      </button>
    </div>
  );
}