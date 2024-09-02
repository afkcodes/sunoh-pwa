import { AUDIO_STATE, AudioState, AudioX, MediaTrack } from 'audio_x';
import { mediaActions } from '~helper/mediaActions';
import { create, notify } from '~helper/store/createStore';

export interface Track extends MediaTrack {
  palette?: any;
}
export interface AudioStoreState extends AudioState {
  currentPlaybackSource: string;
  currentTrack: Track;
}

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

const {
  useStore: useAudio,
  getStoreSnapshot: getAudioSnapshot,
  set: setAudioStore,
  subscribe: subscribeToAudio,
  setTransient: setAudioStoreTransient,
} = create<AudioStoreState>('AUDIO_STORE', { ...AUDIO_STATE, currentPlaybackSource: '' });

audio.subscribe('AUDIO_X_STATE', (audioState: AudioState) => {
  notify('AUDIO_STORE', audioState);
});

mediaActions.init();
mediaActions.restoreMediaState();

export {
  audio,
  getAudioSnapshot,
  setAudioStore,
  setAudioStoreTransient,
  subscribeToAudio,
  useAudio,
};
