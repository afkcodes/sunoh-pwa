import { AudioX, MediaTrack } from 'audio_x';
import {
  audio,
  AudioStoreState,
  getAudioSnapshot,
  setAudioStore,
  subscribeToAudio,
} from '~states/audioStore';
import { createMediaTrack, isValidArray, MediaQuality } from './common';
import { storage } from './storage';

type MediaState = { audioState: AudioStoreState; queue: MediaTrack[] };
let isEqEnabled = false;
const mediaActions = {
  playAll: (data: any, quality: MediaQuality = '160kbps') => {
    const audioInstance = AudioX.getAudioInstance();
    const queueLength = audio.getQueue().length;
    if (!queueLength || data.id !== getAudioSnapshot().currentPlaybackSource) {
      const tracks = data?.list?.map((item: any) => createMediaTrack(item, quality));
      audio.addQueue(tracks, 'DEFAULT');
      audio.addMediaAndPlay();
      setAudioStore({ currentPlaybackSource: data.id });
    }
    if (audioInstance.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  },
  shuffle: (data: any, quality: MediaQuality = '160kbps') => {
    const tracks = data?.list?.map((item: any) => createMediaTrack(item, quality));
    audio.addQueue(tracks, 'SHUFFLE');
    audio.addMediaAndPlay();
    setAudioStore({ currentPlaybackSource: `${data.id}#shuffle` });
  },

  saveMediaState: () => {
    let mediaState: MediaState = {} as MediaState;

    let lastSaved = 0;
    const saveState = () => {
      const now = Date.now();
      if (now - lastSaved >= 3000) {
        storage.setItem('media_state', JSON.stringify(mediaState));
        lastSaved = now;
      }
    };

    subscribeToAudio((audioState) => {
      const currentQueue = audio.getQueue();
      mediaState.audioState = { ...audioState, playbackState: 'idle' };
      if (isValidArray(currentQueue)) {
        mediaState.queue = currentQueue;
      }
      if (audioState.playbackState === 'playing' && !isEqEnabled) {
        const lastActivePreset = storage.getItem('current_preset');
        const currentPreset = JSON.parse(lastActivePreset || '{}');
        if (currentPreset.id) {
          setTimeout(() => {
            const audio = new AudioX();
            audio.setCustomEQ(currentPreset.gains);
          }, 500);
          isEqEnabled = true;
        }
      }
      if (isValidArray(currentQueue)) {
        if (audioState.playbackState === 'queueended') {
          mediaState.queue = [];
        }
      }

      saveState();
    });
  },

  getMediaState: () => {
    const mediaState = storage.getItem('media_state');
    if (mediaState) {
      return JSON.parse(mediaState);
    }
  },

  restoreMediaState: () => {
    const mediaState: MediaState = mediaActions.getMediaState();
    if (mediaState?.queue) {
      audio.addQueue(mediaState?.queue, 'DEFAULT');
    }
    if (mediaState?.audioState) {
      setTimeout(() => {
        audio.addMedia(mediaState.audioState.currentTrack);
        audio.seek(mediaState?.audioState?.progress || 0);
        setAudioStore(mediaState?.audioState);
      }, 300);
    }
  },

  init: () => {
    mediaActions.saveMediaState();
  },
};

export { mediaActions };
