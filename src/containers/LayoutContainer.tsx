import { m, Variants } from 'framer-motion';
// import { Outlet, useLocation } from 'react-router-dom';
// import MiniPlayer from '~components/MiniPlayer/MiniPlayer';
// import BottomNavContainer from './BottomNavContainer';

const MOTION_VARIANTS: Variants = {
  initial: {
    opacity: 0,
    transition: {
      type: 'tween',
      duration: 0.3,
    },
  },
  in: {
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 0.3,
    },
  },
  out: {
    opacity: 0,
    transition: {
      type: 'tween',
      duration: 0.3,
    },
  },
};

import { Outlet, useLocation } from 'react-router-dom';
import MiniPlayer from '~components/MiniPlayer/MiniPlayer';
import BottomNavContainer from './BottomNavContainer';

export const LayoutContainer = () => {
  const location = useLocation();
  return (
    <div className='min-h-screen bg-background pb-36 text-text-primary'>
      <m.div
        key={location.pathname}
        variants={MOTION_VARIANTS}
        initial='initial'
        animate='in'
        exit='out'
        className='w-full min-h-screen view-transition-container '>
        <Outlet />
      </m.div>
      <MiniPlayer />
      <BottomNavContainer />
    </div>
  );
};
