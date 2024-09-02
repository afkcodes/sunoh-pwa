import { Route, Routes, useLocation } from 'react-router';
import BottomSheet from '~components/BottomSheet/BottomSheet';
import Equalizer from '~components/Equalizer';
import PlayerScreen from '~components/Player/Player';
import { LayoutContainer } from '~containers/LayoutContainer';
import routes from './routes';

const Router = () => {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <div className='min-h-dvh'>
      <Routes location={background || location}>
        <Route path='/' element={<LayoutContainer />}>
          {routes.map((route) => (
            <Route path={route.path} element={route.element} />
          ))}
          <Route
            path='/player'
            element={
              <BottomSheet isOpen name='Player sheet'>
                <PlayerScreen />
              </BottomSheet>
            }
          />
          <Route
            path='/eq'
            element={
              <BottomSheet isOpen name='Equalizer Sheet'>
                <Equalizer />
              </BottomSheet>
            }
          />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route
            path='player'
            element={
              <BottomSheet isOpen name=''>
                <PlayerScreen />
              </BottomSheet>
            }
          />
          <Route
            path='/eq'
            element={
              <BottomSheet isOpen name=''>
                <Equalizer />
              </BottomSheet>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default Router;
