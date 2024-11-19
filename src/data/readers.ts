import { Reader } from '../types/tarot';

export const readers: Reader[] = [
  {
    id: 'luna',
    name: 'Luna Blackwood',
    title: 'Intuitive Empath',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&q=80',
    description: 'Luna brings a gentle, empathetic approach to readings, focusing on emotional healing and personal growth.',
    style: 'nurturing',
    specialties: ['emotional healing', 'shadow work', 'spiritual growth'],
    experience: '15 years'
  },
  {
    id: 'sage',
    name: 'Sage Winters',
    title: 'Mystical Guide',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&q=80',
    description: 'Sage combines traditional tarot wisdom with modern psychological insights for profound, actionable guidance.',
    style: 'analytical',
    specialties: ['career guidance', 'life purpose', 'decision making'],
    experience: '20 years'
  },
  {
    id: 'raven',
    name: 'Raven Moonshadow',
    title: 'Ancestral Oracle',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&q=80',
    description: 'Raven channels ancient wisdom through tarot, connecting you with deeper spiritual truths and ancestral guidance.',
    style: 'mystical',
    specialties: ['ancestral healing', 'past life readings', 'spiritual connections'],
    experience: '25 years'
  },
  {
    id: 'phoenix',
    name: 'Phoenix Storm',
    title: 'Transformational Guide',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&q=80',
    description: 'Phoenix specializes in transformation and rebirth, helping you navigate major life changes with clarity and purpose.',
    style: 'direct',
    specialties: ['transformation', 'personal power', 'manifestation'],
    experience: '18 years'
  }
];