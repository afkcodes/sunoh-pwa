import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { isValidWindow } from '~helper/common';

const useScrollToTop = () => {
  const location = useLocation();
  useEffect(() => {
    if (isValidWindow) {
      setTimeout(() => {
        document.body.scrollTo({ top: 0, left: 0 });
      }, 1000);
    }
  }, [location.pathname]);
};

export default useScrollToTop;
