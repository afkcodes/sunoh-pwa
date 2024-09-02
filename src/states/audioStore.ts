import { AUDIO_STATE, AudioState, AudioX } from 'audio_x';
import { create, notify } from '~helper/store/createStore';

const audio = new AudioX();
audio.init({
  mode: 'REACT',
  crossOrigin: 'anonymous',
  preloadStrategy: 'auto',
  playbackRate: 1,
  autoPlay: false,
  useDefaultEventListeners: true,
  showNotificationActions: true,
  enablePlayLog: true,
  enableEQ: true,
});

export interface AudioStoreState extends AudioState {
  currentPlaybackSource: string;
}

const {
  useStore: useAudio,
  getStoreSnapshot: getAudioSnapshot,
  set: setAudioStore,
} = create<AudioStoreState>('AUDIO_STORE', { ...AUDIO_STATE, currentPlaybackSource: '' });

audio.subscribe('AUDIO_X_STATE', (audioState: AudioState) => {
  notify('AUDIO_STORE', audioState);
});

export { audio, getAudioSnapshot, setAudioStore, useAudio };
