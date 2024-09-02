import { useEffect } from 'react';
import { usePathname } from 'wouter/use-browser-location';

const useScrollToTop = () => {
  // Extracts pathname property(key) from an object
  const pathname = usePathname();

  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};

export default useScrollToTop;
