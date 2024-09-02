import { AUDIO_STATE, AudioState, AudioX, MediaTrack } from 'audio_x';
import { detectOS, OperatingSystem } from '~helper/deviceDetector';
import { mediaActions } from '~helper/mediaActions';
import { create, notify } from '~helper/store/createStore';

export interface Track extends MediaTrack {
  palette?: any;
}
export interface AudioStoreState extends AudioState {
  currentPlaybackSource: string;
  currentTrack: Track;
  state: 'saved' | 'current';
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
  enableEQ: detectOS() === OperatingSystem.Android ? true : false,
  enableHls: true,
  hlsConfig: {
    maxMaxBufferLength: 10,
    startLevel: -1,
    // autoStartLoad: false,
  },
});

const {
  useStore: useAudio,
  getStoreSnapshot: getAudioSnapshot,
  set: setAudioStore,
  subscribe: subscribeToAudio,
  setTransient: setAudioStoreTransient,
} = create<AudioStoreState>('AUDIO_STORE', {
  ...AUDIO_STATE,
  currentPlaybackSource: '',
  state: 'current',
});

audio.subscribe('AUDIO_X_STATE', (audioState: AudioState) => {
  notify('AUDIO_STORE', { ...audioState, state: 'current' });
  if (audioState.playbackState == 'error') {
    console.log('ERROR:: moving to next audio');
    audio.playNext();
  }
});

mediaActions.restoreMediaState();

export {
  audio,
  getAudioSnapshot,
  setAudioStore,
  setAudioStoreTransient,
  subscribeToAudio,
  useAudio,
};
