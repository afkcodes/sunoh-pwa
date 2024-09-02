import { MediaTrack } from 'audio_x';
import { create } from '~helper/store/createStore';

const userState = {
  user: {
    info: {
      name: '',
      profilePic: '',
      login: '',
    },
    liked: {
      albums: [],
      songs: [],
      playlists: [],
      radio: [],
      podcasts: [],
    },
    recentlySearchedKeyWords: [] as string[],
    personalPlaylist: [],
    recentlyPlayed: [] as MediaTrack[],
  },
};

const {
  useStore: useUserStore,
  set: setUserStore,
  getStoreSnapshot: getUserStoreSnapShot,
} = create('USER_STORE', userState);

export { getUserStoreSnapShot, setUserStore, useUserStore };
