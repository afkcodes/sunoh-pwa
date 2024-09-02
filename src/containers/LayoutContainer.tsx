import { m, Variants } from 'framer-motion';

const MOTION_VARIANTS: Variants = {
  initial: {
    opacity: 0,
    transition: {
      type: 'tween',
      duration: 0.5,
    },
  },
  in: {
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 0.5,
    },
  },
  out: {
    opacity: 0,
    transition: {
      type: 'tween',
      duration: 0.5,
    },
  },
};

import { usePathname } from 'wouter/use-browser-location';

export const LayoutContainer = ({ children }: any) => {
  const location = usePathname();
  console.log('re-rendering Layout');

  return (
    <div className='min-h-screen bg-background pb-36 text-text-primary'>
      <m.div
        key={location}
        variants={MOTION_VARIANTS}
        initial='initial'
        animate='in'
        exit='out'
        className='w-full min-h-screen view-transition-container '>
        {children}
      </m.div>
    </div>
  );
};
