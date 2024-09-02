import { AUDIO_STATE, AudioState, AudioX, MediaTrack } from 'audio_x';
import { addUniqueObject } from '~helper/common';
import { mediaActions } from '~helper/mediaActions';
import { storage } from '~helper/storage';
import { create, notify } from '~helper/store/createStore';
import { getUserStoreSnapShot, setUserStore } from './userStore';

export interface Track extends MediaTrack {
  palette?: any;
}
export interface AudioStoreState extends AudioState {
  currentPlaybackSource: string;
  currentTrack: Track;
  state: 'saved' | 'current';
}

const audio = new AudioX();
audio
  .init({
    mode: 'REACT',
    crossOrigin: 'anonymous',
    preloadStrategy: 'auto',
    playbackRate: 1,
    autoPlay: false,
    useDefaultEventListeners: true,
    showNotificationActions: true,
    enablePlayLog: true,
    enableHls: true,
    hlsConfig: {
      maxMaxBufferLength: 10,
      startLevel: -1,
      // autoStartLoad: false,
    },
  })
  .then(() => {
    AudioX.getAudioInstance().crossOrigin = null;
    mediaActions.init();
  })
  .catch(() => {});

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
  if (audioState.playbackState == 'error') {
    console.log('ERROR:: moving to next audio');
    if (audio.getQueue().length) {
      audio.playNext();
    }
  }
  if (audioState.playbackState === 'trackchanged') {
    const snap = getUserStoreSnapShot();
    setUserStore({
      user: {
        ...snap.user,
        recentlyPlayed: addUniqueObject(
          [...snap.user.recentlyPlayed],
          audioState.currentTrack,
          'id',
          12
        ),
      },
    });
    storage.setItem('user_state', JSON.stringify(getUserStoreSnapShot()));
  }
  notify('AUDIO_STORE', { ...audioState, state: 'current' });
});

export {
  audio,
  getAudioSnapshot,
  setAudioStore,
  setAudioStoreTransient,
  subscribeToAudio,
  useAudio,
};
