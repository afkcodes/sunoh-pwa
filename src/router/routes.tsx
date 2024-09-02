import { RouteObject } from 'react-router-dom';
import LayoutContainer from '~containers/LayoutContainer';
import Home from '~pages/Home';
import Library from '~pages/Library';
import Search from '~pages/Search';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <LayoutContainer />,
    children: [
      {
        path: 'home',
        element: <Home />,
        index: true,
      },
      {
        path: '/search',
        element: <Search />,
      },
      {
        path: '/library',
        element: <Library />,
      },
    ],
  },
];

export default routes;
