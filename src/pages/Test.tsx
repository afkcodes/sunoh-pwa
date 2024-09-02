import { AnimatePresence } from 'framer-motion';
import { Routes, useLocation } from 'react-router-dom';

const AnimatedRoutes = ({ children }: any) => {
  const location = useLocation();

  return (
    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        {children}
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
