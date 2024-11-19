import React, { useState } from 'react';
import { Book, Save } from 'lucide-react';

interface JournalEntry {
  date: string;
  notes: string;
  mood: string;
}

interface ReadingJournalProps {
  readingId: string;
}

export function ReadingJournal({ readingId }: ReadingJournalProps) {
  const [notes, setNotes] = useState('');
  const [mood, setMood] = useState('neutral');
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    const stored = localStorage.getItem(`journal-${readingId}`);
    return stored ? JSON.parse(stored) : [];
  });

  const saveEntry = () => {
    const newEntry = {
      date: new Date().toISOString(),
      notes,
      mood
    };
    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);
    localStorage.setItem(`journal-${readingId}`, JSON.stringify(updatedEntries));
    setNotes('');
  };

  return (
    <div className="bg-purple-900/40 backdrop-blur-sm rounded-xl p-6 mt-6">
      <div className="flex items-center gap-2 mb-4">
        <Book className="w-5 h-5 text-amber-400" />
        <h3 className="text-xl font-serif text-white">Reading Journal</h3>
      </div>

      <div className="space-y-4">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Write your thoughts about this reading..."
          className="w-full h-32 bg-purple-800/30 text-purple-100 rounded-lg p-3 focus:ring-2 focus:ring-amber-400 focus:outline-none"
        />

        <div className="flex items-center gap-4">
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="bg-purple-800/30 text-purple-100 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
          >
            <option value="positive">Positive</option>
            <option value="neutral">Neutral</option>
            <option value="reflective">Reflective</option>
            <option value="uncertain">Uncertain</option>
          </select>

          <button
            onClick={saveEntry}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-purple-900 rounded-full hover:bg-amber-400 transition-colors"
          >
            <Save className="w-4 h-4" />
            Save Entry
          </button>
        </div>

        {entries.length > 0 && (
          <div className="mt-6 space-y-4">
            {entries.map((entry, index) => (
              <div key={index} className="bg-purple-800/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-amber-400 text-sm">
                    {new Date(entry.date).toLocaleDateString()}
                  </span>
                  <span className="text-purple-200 text-sm">
                    Mood: {entry.mood}
                  </span>
                </div>
                <p className="text-purple-100">{entry.notes}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}