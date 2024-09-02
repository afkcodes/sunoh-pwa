interface EqualizerPreset {
  id: string;
  name: string;
  gains: number[];
}

export const presets: EqualizerPreset[] = [
  {
    id: 'flat',
    name: 'Flat',
    gains: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },

  {
    id: 'bass_boost',
    name: 'Bass Boost',
    gains: [5, 4, 3, 1, 0, 0, 0, 0, 1, 1],
  },
  {
    id: 'treble_boost',
    name: 'Treble Boost',
    gains: [0, 0, 0, 0, 0, 1, 2, 3, 4, 5],
  },
  {
    id: 'electronic',
    name: 'Electronic',
    gains: [3, 4, 2, 0, -1, 1, 3, 4, 4, 3],
  },
  {
    id: 'rock',
    name: 'Rock',
    gains: [4, 3, 2, 0, -1, 0, 1, 2, 3, 4],
  },
  {
    id: 'jazz',
    name: 'Jazz',
    gains: [2, 1, 0, -1, -2, 0, 1, 2, 3, 3],
  },
  {
    id: 'classical',
    name: 'Classical',
    gains: [3, 2, 1, 0, -1, -1, 0, 2, 3, 4],
  },
  {
    id: 'podcast',
    name: 'Podcast',
    gains: [-1, 0, 1, 2, 3, 4, 2, 0, -1, -2],
  },
  {
    id: 'rich_balanced',
    name: 'Rich Balanced',
    gains: [2, 1, 0, -1, -2, 0, 1, 2, 3, 2],
  },
  {
    id: 'warm_detailed',
    name: 'Warm & Detailed',
    gains: [3, 2, 1, 0, -1, -1, 1, 2, 3, 2],
  },
  {
    id: 'cinema_experience',
    name: 'Cinema Experience',
    gains: [4, 3, 2, 1, 0, 0, 1, 2, 3, 3],
  },
  {
    id: 'vocal_clarity',
    name: 'Vocal Clarity',
    gains: [-2, -1, 0, 2, 3, 4, 3, 1, 0, -1],
  },
];
