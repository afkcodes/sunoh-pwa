interface EqualizerPreset {
  id: string;
  name: string;
  gains: number[];
}

const presets: EqualizerPreset[] = [
  { id: 'flat', name: 'Flat', gains: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { id: 'acoustic', name: 'Acoustic', gains: [2, 3, 0, -2, -1, 0, 2, 4, 5, 3] },
  { id: 'bass_boost', name: 'Bass Boost', gains: [8, 7, 6, 3, 0, -1, -2, -1, 0, 1] },
  { id: 'classical', name: 'Classical', gains: [5, 4, 1, -2, -3, -2, 0, 3, 4, 5] },
  { id: 'electronic', name: 'Electronic', gains: [5, 4, 1, -2, -3, 1, 4, 5, 6, 5] },
  { id: 'jazz', name: 'Jazz', gains: [3, 2, -1, -3, -2, 0, 2, 4, 5, 3] },
  { id: 'pop', name: 'Pop', gains: [-2, -1, 0, 3, 5, 4, 2, 1, 2, 3] },
  { id: 'rock', name: 'Rock', gains: [5, 4, 3, 1, -2, -3, 2, 4, 5, 4] },
  { id: 'vocal_boost', name: 'Vocal Boost', gains: [-3, -2, -1, 2, 5, 4, 3, 1, -1, -2] },
  { id: 'spoken_word', name: 'Spoken Word', gains: [-5, -4, -2, 1, 5, 6, 4, 2, -1, -3] },
  { id: 'r_and_b', name: 'R&B', gains: [5, 7, 4, 0, -3, -2, 1, 3, 4, 2] },
  { id: 'hip_hop', name: 'Hip Hop', gains: [7, 6, 3, 1, -1, -2, 0, 2, 4, 3] },
  { id: 'movie', name: 'Movie', gains: [4, 3, 1, -1, -3, 0, 2, 4, 5, 6] },
  { id: 'podcast', name: 'Podcast', gains: [-4, -3, -1, 2, 5, 6, 3, 1, -1, -3] },
  { id: 'audiobook', name: 'Audiobook', gains: [-5, -4, -2, 1, 4, 6, 3, 1, -1, -3] },
];

export { presets };
