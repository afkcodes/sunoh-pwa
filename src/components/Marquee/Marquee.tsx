import React, { useEffect, useRef, useState } from 'react';

interface MarqueeProps {
  speed: number;
  loop?: boolean;
  pendulum?: boolean;
  pauseOnHover?: boolean;
  delay?: number; // delay in milliseconds
  loops?: number; // number of loops
  children: React.ReactNode;
}

const Marquee: React.FC<MarqueeProps> = ({
  speed,
  loop = true,
  pendulum = false,
  pauseOnHover = true,
  delay = 1000,
  loops = Infinity,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [currentLoop, setCurrentLoop] = useState(0);
  const positionRef = useRef(0); // Use useRef for position to avoid re-renders

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current && contentRef.current) {
        const newContainerWidth = containerRef.current.offsetWidth;
        const newContentWidth = contentRef.current.offsetWidth;

        setContainerWidth(newContainerWidth);
        setContentWidth(newContentWidth);
        setShouldAnimate(newContentWidth > newContainerWidth);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, [children]);

  useEffect(() => {
    if (!shouldAnimate || currentLoop >= loops) return;

    let animationId: number;
    let startTime = Date.now();

    const animate = () => {
      if (containerRef.current && contentRef.current && !isPaused) {
        const elapsed = Date.now() - startTime;
        if (currentLoop === 0 && elapsed < delay) {
          animationId = requestAnimationFrame(animate);
          return;
        }

        positionRef.current -= speed * direction;

        if (pendulum) {
          if (
            positionRef.current > 0 ||
            positionRef.current < -(contentWidth - containerWidth)
          ) {
            setDirection((prev) => -prev);
          }
        } else if (loop) {
          if (positionRef.current < -contentWidth) {
            positionRef.current = containerWidth;
            setCurrentLoop((prev) => prev + 1);
          }
        } else {
          if (positionRef.current < -(contentWidth - containerWidth)) {
            positionRef.current = containerWidth;
            setCurrentLoop((prev) => prev + 1);
          } else if (positionRef.current > containerWidth) {
            positionRef.current = -(contentWidth - containerWidth);
          }
        }

        contentRef.current.style.transform = `translateX(${positionRef.current}px)`;
      }
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [
    speed,
    loop,
    pendulum,
    contentWidth,
    containerWidth,
    direction,
    isPaused,
    shouldAnimate,
    delay,
    loops,
    currentLoop,
  ]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden whitespace-nowrap ${shouldAnimate ? '' : 'block'}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}>
      <div
        ref={contentRef}
        className={`inline-block ${shouldAnimate ? '' : 'mx-auto'}`}
        style={{
          transition: shouldAnimate ? 'none' : 'transform 0.3s ease-out',
          transform: shouldAnimate ? undefined : 'translateX(0)',
        }}>
        {children}
      </div>
    </div>
  );
};

export default Marquee;
