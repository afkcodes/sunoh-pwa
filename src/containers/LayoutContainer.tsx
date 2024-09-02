import { m, Variants } from 'framer-motion';
import { Outlet, useLocation, useNavigationType } from 'react-router-dom';
import MiniPlayer from '~components/MiniPlayer/MiniPlayer';
import BottomNavContainer from './BottomNavContainer';

const MOTION_VARIANTS: Variants = {
  initial: ({ direction }: { direction: number }) => ({
    x: direction < 0 ? '-100%' : '100%',
    opacity: 0.2,
    boxShadow: direction < 0 ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' : 'none',
    transition: {
      type: 'tween',
      delay: 1.5,
      duration: 0.4,
      when: 'afterChildren',
    },
  }),
  in: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: 'tween',
      delay: -0.1,
      duration: 0.4,
    },
  },
  out: ({ direction }: { direction: number }) => ({
    x: direction > 0 ? '-100%' : '0%',
    opacity: 0.2,
    transition: {
      type: 'tween',
      delay: -0.45,
      duration: 0.4,
    },
  }),
};

const LayoutContainer = () => {
  const location = useLocation();
  const type = useNavigationType();
  const direction = type === 'POP' ? -1 : 1;
  return (
    <m.div className='bg-background text-text-primary'>
      <m.div
        key={location.pathname}
        variants={MOTION_VARIANTS}
        initial={direction > 0 && 'initial'}
        animate='in'
        exit='out'
        custom={{ direction }}
        className='w-full min-h-screen pb-36 view-transition-container '>
        <Outlet />
      </m.div>
      <MiniPlayer />
      <BottomNavContainer />
    </m.div>
  );
};

export default LayoutContainer;
