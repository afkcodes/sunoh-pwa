/* eslint-disable react-refresh/only-export-components */
import AlbumScreen from '~pages/Album';
import Home from '~pages/Home';
import Library from '~pages/Library';
import PlaylistScreen from '~pages/Playlist';
import Radio from '~pages/Radio';
import SearchScreen from '~pages/Search';

const routes = [
  {
    path: '/home',
    element: Home,
  },
  {
    path: '/search',
    element: SearchScreen,
  },
  {
    path: '/library',
    element: Library,
  },
  {
    path: '/album/:albumId',
    element: AlbumScreen,
  },
  {
    path: '/playlist/:playlistId',
    element: PlaylistScreen,
  },
  {
    path: '/radio',
    element: Radio,
  },
];

export { routes };
