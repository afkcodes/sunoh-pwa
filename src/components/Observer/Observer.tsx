import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';

interface ObserverProps {
  children: ReactNode;
  observerOption?: IntersectionObserverInit;
  unobserveAfterVisit?: boolean;
}

const Observer: React.FC<ObserverProps> = ({
  children,
  observerOption = { threshold: 0.1 },
  unobserveAfterVisit = true,
}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const observerCallback = useCallback(
    ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        if (unobserveAfterVisit) {
          observer.unobserve(entry.target);
        }
      }
    },
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, observerOption);
    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, observerCallback, observerOption]);

  return (
    <div ref={ref} className='w-full h-full shrink-0'>
      {isIntersecting ? (
        children
      ) : (
        <div className='w-full h-full animate-pulse bg-surface shrink-0 grow aspect-square ' />
      )}
    </div>
  );
};

export default Observer;
