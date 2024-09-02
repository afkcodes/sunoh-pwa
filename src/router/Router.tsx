import { Route, Routes, useLocation } from 'react-router';
import { LayoutContainer } from '~containers/LayoutContainer';
import { modalRoutes, routes } from './routes';

const Router = () => {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <div className='min-h-dvh'>
      <Routes location={background || location}>
        <Route path='/' element={<LayoutContainer />}>
          {routes.map((route) => (
            <Route path={route.path} element={route.element} key={route.path} />
          ))}
          {modalRoutes.map((route) => (
            <Route path={route.path} element={route.element} key={route.path} />
          ))}
        </Route>
      </Routes>
      {background && (
        <Routes>
          {modalRoutes.map((route) => (
            <Route path={route.path} element={route.element} key={route.path} />
          ))}
        </Routes>
      )}
    </div>
  );
};

export default Router;
