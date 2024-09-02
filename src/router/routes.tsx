/* eslint-disable react-refresh/only-export-components */
import AlbumScreen from '~pages/Album';
import ArtistScreen from '~pages/Artist';
import Home from '~pages/Home';
import Library from '~pages/Library';
import LiveRadio from '~pages/LiveRadio';
import PlaylistScreen from '~pages/Playlist';
import Radio from '~pages/Radio';
import SearchScreen from '~pages/Search';
import ViewAll from '~pages/ViewAll';

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
    path: '/radio',
    element: LiveRadio,
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
    path: '/artist/:artistId',
    element: ArtistScreen,
  },
  {
    path: '/radio',
    element: Radio,
  },
  {
    path: '/view-all',
    element: ViewAll,
  },
];

export { routes };
