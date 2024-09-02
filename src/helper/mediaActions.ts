import { AudioX, MediaTrack } from 'audio_x';
import { dataConfigs } from '~configs/data.config';
import { endpoints } from '~network/endpoints';
import http from '~network/http';
import {
  audio,
  AudioStoreState,
  getAudioSnapshot,
  setAudioStore,
  subscribeToAudio,
} from '~states/audioStore';
import { Response } from '~types/common.types';
import { createMediaTrack, isEmptyObject, isValidArray, MediaQuality } from './common';
import { dataExtractor } from './dataExtractor';
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
    mediaActions.init();
  },
  shuffle: (data: any, quality: MediaQuality = '160kbps') => {
    const tracks = data?.list?.map((item: any) => createMediaTrack(item, quality));
    audio.addQueue(tracks, 'SHUFFLE');
    audio.addMediaAndPlay();
    setAudioStore({ currentPlaybackSource: `${data.id}#shuffle` });
    mediaActions.init();
  },

  saveMediaState: () => {
    let mediaState: MediaState = {} as MediaState;

    let lastSaved = 0;
    const saveState = () => {
      const now = Date.now();
      if (now - lastSaved >= 3000 && isEmptyObject(mediaState.audioState.currentTrack)) {
        storage.setItem('media_state', JSON.stringify(mediaState));
        lastSaved = now;
      }
    };

    subscribeToAudio((audioState) => {
      const currentQueue = audio.getQueue();
      mediaState.audioState = { ...audioState, playbackState: 'idle', state: 'saved' };
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

  restoreMediaState: async () => {
    const mediaState: MediaState = mediaActions.getMediaState();
    if (mediaState?.queue) {
      audio.addQueue(mediaState?.queue, 'DEFAULT');
    }
    if (mediaState?.audioState && isEmptyObject(mediaState.audioState.currentTrack)) {
      setAudioStore(mediaState?.audioState);
    }
  },

  createSaavnRadioAndPlay: async (data: any, quality: MediaQuality) => {
    try {
      const name = dataExtractor(data, dataConfigs.radio.id);
      const language = dataExtractor(data, dataConfigs.radio.language);
      let currentStation = storage.getItem('current_station')
        ? JSON.parse(storage.getItem('current_station') as string)
        : null;
      if (!currentStation || currentStation.name !== name) {
        const res: Response = (await http(`${endpoints.saavn.createStation}`, {
          params: {
            name,
            language,
          },
        })) as Response;

        currentStation = {
          id: res.data.stationid,
          name,
        };
        storage.setItem('current_station', JSON.stringify(currentStation));
      }
      const res = (await http(`${endpoints.saavn.getStationSongs}`, {
        params: {
          stationId: currentStation.id,
          count: 20,
        },
      })) as Response;

      if (res && isValidArray(res.data.list)) {
        const tracks = res.data.list?.map((item: any) => createMediaTrack(item, quality));
        audio.addQueue(tracks, 'DEFAULT');
        audio.addMediaAndPlay();
        setAudioStore({ currentPlaybackSource: name as string });
      } else {
        console.error('failed to fetch radios');
      }
    } catch (error) {
      console.error('failed to fetch radios', error);
    }
  },

  createGaanaRadioAndPlay: async (data: any) => {
    try {
      const id = dataExtractor(data, dataConfigs.radio.id);
      const name = dataExtractor(data, dataConfigs.radio.name);

      let currentStation = storage.getItem('current_station')
        ? JSON.parse(storage.getItem('current_station') as string)
        : null;

      storage.setItem('current_station', JSON.stringify(currentStation));
      const res = (await http(`${endpoints.gaana.radio.detail}/${id}`)) as Response;

      if (res && isValidArray(res.data)) {
        const tracks = res.data?.map((item: any) => createMediaTrack(item, '12kbps'));
        audio.addQueue(tracks, 'DEFAULT');
        audio.addMediaAndPlay(null, async (currentTrack: MediaTrack) => {
          const res: any = await http(`${endpoints.gaana.track}/${currentTrack.id}`);
          const hdUrl = res.data.replace(/128\.mp4/g, '320.mp4');
          currentTrack.source = hdUrl;
        });
        setAudioStore({ currentPlaybackSource: name as string });
      } else {
        console.error('failed to fetch radios invalid songs list ');
      }
    } catch (error) {
      console.error('failed to fetch radios', error);
    }
  },

  init: () => {
    mediaActions.saveMediaState();
  },

  playOrPause: (isPlaying: boolean, audioState: AudioStoreState) => {
    const lastKnownProgress = audioState.progress;
    if (audioState.state === 'saved') {
      audio.addMedia(audioState.currentTrack);
      audio.seek(lastKnownProgress || 0);
    }
    isPlaying ? audio.pause() : audio.play();
    // mediaActions.init();
  },
};

export { mediaActions };
