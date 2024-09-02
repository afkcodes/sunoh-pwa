import { motion, Variants } from 'framer-motion';
import { Outlet, useLocation, useNavigationType } from 'react-router-dom';
import BottomNavContainer from './BottomNavContainer';

const MOTION_VARIANTS: Variants = {
  initial: ({ direction }: { direction: number }) => ({
    x: direction < 0 ? '-100%' : '100%',
    opacity: 0.2,
    boxShadow: direction < 0 ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' : 'none',
    transition: {
      type: 'tween',
      delay: 1,
      duration: 500,
      when: 'afterChildren',
    },
  }),
  in: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: 'tween',
      delay: -0.15,
      duration: 0.45,
    },
  },
  out: ({ direction }: { direction: number }) => ({
    x: direction > 0 ? '-100%' : '0%',
    opacity: 0.2,
    transition: {
      type: 'tween',
      delay: 0.45,
      duration: 1,
    },
  }),
};

const LayoutContainer = () => {
  const location = useLocation();
  const type = useNavigationType();
  const direction = type === 'POP' ? -1 : 1;
  return (
    <motion.div className='bg-background text-text-primary'>
      <motion.div
        key={location.pathname}
        variants={MOTION_VARIANTS}
        initial={direction > 0 && 'initial'}
        animate='in'
        exit='out'
        custom={{ direction }}
        className='w-full min-h-screen pb-20 view-transition-container'>
        <Outlet />
      </motion.div>
      <BottomNavContainer />
    </motion.div>
  );
};

export default LayoutContainer;
