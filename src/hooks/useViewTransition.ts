import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useBottomSheet } from '~contexts/BottomSheetContext';
import useHistory from './useHistory';

const useViewTransition = () => {
  const location = useLocation();
  const lastPathRef = useRef(location.pathname);
  const { push, back } = useHistory();
  const { isOpen } = useBottomSheet();
  let wasModalOpened = useRef(false);

  useLayoutEffect(() => {
    lastPathRef.current = location.pathname;
    wasModalOpened.current = isOpen;
  }, [location, isOpen]);

  const startViewTransition = (to: string, isBack = false) => {
    document.documentElement.classList.toggle('back-transition', isBack);
    if (!document.startViewTransition) {
      if (!(lastPathRef.current === to)) {
        push(to);
      }
      return;
    }

    console.log({ isOpen });

    if (isBack) {
      if (wasModalOpened.current) {
        back();
        return;
      }
      document.startViewTransition(() => {
        back();
      });
    } else {
      if (!(lastPathRef.current === to)) {
        document.startViewTransition(() => {
          push(to);
        });
      }
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      startViewTransition(window.location.pathname, true);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return startViewTransition;
};
export default useViewTransition;
