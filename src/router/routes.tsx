import { lazy, Suspense } from 'react';
import BottomSheet from '~components/BottomSheet/BottomSheet';
import PlayerScreen from '~components/Player/Player';
import PlaylistScreen from '~pages/Playlist';

const Home = lazy(() => import('~pages/Home'));
const Search = lazy(() => import('~pages/Search'));
const Library = lazy(() => import('~pages/Library'));
const AlbumScreen = lazy(() => import('~pages/Album'));

const routes = [
  {
    path: '/home',
    element: (
      <Suspense fallback={<div>loading</div>}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: '/search',
    element: (
      <Suspense fallback={<div>loading</div>}>
        <Search />
      </Suspense>
    ),
  },
  {
    path: '/library',
    element: (
      <Suspense fallback={<div>loading</div>}>
        <Library />
      </Suspense>
    ),
  },
  {
    path: '/album/:albumId',
    element: (
      <Suspense fallback={<div>loading</div>}>
        <AlbumScreen />
      </Suspense>
    ),
  },
  {
    path: '/playlist/:playlistId',
    element: (
      <Suspense fallback={<div>loading</div>}>
        <PlaylistScreen />
      </Suspense>
    ),
  },
];

const modalRoutes = [
  {
    path: '/player',
    element: (
      <BottomSheet isOpen name='Player sheet'>
        <PlayerScreen />
      </BottomSheet>
    ),
  },
  {
    path: '/eq',
    element: (
      <BottomSheet isOpen name='Player sheet'>
        <PlayerScreen />
      </BottomSheet>
    ),
  },
];

export { modalRoutes, routes };
