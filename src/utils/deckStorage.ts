import { CustomDeck, CustomCard } from '../types/deck';

const DECKS_STORAGE_KEY = 'custom-tarot-decks';
const ACTIVE_DECK_KEY = 'active-tarot-deck';

export function saveCustomDeck(deck: CustomDeck): void {
  const decks = getAllDecks();
  const existingIndex = decks.findIndex(d => d.id === deck.id);
  
  if (existingIndex >= 0) {
    decks[existingIndex] = { ...deck, updatedAt: new Date().toISOString() };
  } else {
    decks.push({
      ...deck,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  }
  
  localStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
}

export function getAllDecks(): CustomDeck[] {
  const decksJson = localStorage.getItem(DECKS_STORAGE_KEY);
  return decksJson ? JSON.parse(decksJson) : [];
}

export function getDeckById(id: string): CustomDeck | null {
  const decks = getAllDecks();
  return decks.find(deck => deck.id === id) || null;
}

export function deleteDeck(id: string): void {
  const decks = getAllDecks().filter(deck => deck.id !== id);
  localStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
  
  // If active deck is deleted, clear it
  const activeDeck = getActiveDeck();
  if (activeDeck?.id === id) {
    setActiveDeck(null);
  }
}

export function setActiveDeck(deck: CustomDeck | null): void {
  if (deck) {
    localStorage.setItem(ACTIVE_DECK_KEY, deck.id);
  } else {
    localStorage.removeItem(ACTIVE_DECK_KEY);
  }
}

export function getActiveDeck(): CustomDeck | null {
  const activeId = localStorage.getItem(ACTIVE_DECK_KEY);
  if (!activeId) return null;
  return getDeckById(activeId);
}

export function validateImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (file.size > 5 * 1024 * 1024) {
      reject(new Error('Image must be less than 5MB'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        if (img.width > 2000 || img.height > 2000) {
          reject(new Error('Image dimensions must be 2000x2000 pixels or less'));
          return;
        }
        resolve(e.target?.result as string);
      };
      img.onerror = () => reject(new Error('Invalid image file'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Error reading file'));
    reader.readAsDataURL(file);
  });
}