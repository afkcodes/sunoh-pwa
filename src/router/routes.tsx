import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import LayoutContainer from '~containers/LayoutContainer';

const Home = lazy(() => import('~pages/Home'));
const Search = lazy(() => import('~pages/Search'));
const Library = lazy(() => import('~pages/Library'));
const Album = lazy(() => import('~pages/Album'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <LayoutContainer />,
    children: [
      {
        path: 'home',
        element: (
          <Suspense fallback={<div className='w-full bg-white h-dvh'>loading</div>}>
            <Home />
          </Suspense>
        ),
        index: true,
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
            <Album />
          </Suspense>
        ),
      },
    ],
  },
];

export default routes;
