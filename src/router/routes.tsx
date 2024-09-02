import AlbumScreen from '~pages/Album';
import Home from '~pages/Home';
import Library from '~pages/Library';
import Search from '~pages/Search';

const routes = [
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/search',
    element: <Search />,
  },
  {
    path: '/library',
    element: <Library />,
  },
  {
    path: '/album/:albumId',
    element: <AlbumScreen />,
  },
];

export default routes;
