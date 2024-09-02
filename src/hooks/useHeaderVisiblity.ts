import { RefObject, useEffect, useState } from 'react';

const useHeaderVisibility = (ref: RefObject<HTMLElement>) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const position = ref.current.getBoundingClientRect().top;
        setIsVisible(position < 0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref]);

  return isVisible;
};

export default useHeaderVisibility;
