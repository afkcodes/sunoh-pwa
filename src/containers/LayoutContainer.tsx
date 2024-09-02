import { AnimatePresence, motion, Transition, Variants } from 'framer-motion';
import { Outlet, useLocation, useNavigationType } from 'react-router-dom';
import BottomNavContainer from './BottomNavContainer';

const MOTION_VARIANTS: Variants = {
  initial: ({ direction }: { direction: number }) => ({
    x: direction < 0 ? '-100%' : '100%',
    opacity: 0,
    transition: {
      type: 'tween',
      duration: 0.4,
    },
  }),
  in: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: 'tween',
      delay: -0.15,
      duration: 0.4,
    },
  },
  out: ({ direction }: { direction: number }) => ({
    x: direction > 0 ? '-100%' : '0%',
    opacity: 0,
    transition: {
      type: 'tween',
      delay: -0.4,
      duration: 0.5,
      ease: 'easeInOut',
    } as Transition,
  }),
};

const LayoutContainer = () => {
  const location = useLocation();
  const type = useNavigationType();
  const direction = type === 'POP' ? -1 : 1;
  return (
    <div className='w-full min-h-screen pb-20 bg-background text-text-primary '>
      <AnimatePresence mode={'wait'} initial={false}>
        <motion.div
          key={location.pathname}
          variants={MOTION_VARIANTS}
          initial='initial'
          animate='in'
          custom={{ direction }}
          exit='out'>
          <Outlet />
        </motion.div>
      </AnimatePresence>
      <BottomNavContainer />
    </div>
  );
};

export default LayoutContainer;
