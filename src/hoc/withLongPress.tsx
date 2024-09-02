import { ComponentType, useEffect, useState } from 'react';

interface WithLongPressProps {
  onLongPress: () => void;
}

const withLongPress = <P extends object>(
  WrappedComponent: ComponentType<P>,
  longPressDuration = 500
) => {
  return (props: P & WithLongPressProps) => {
    const [timer, setTimer] = useState<number | null>(null);

    const handleTouchStart = () => {
      setTimer(
        window.setTimeout(() => {
          props.onLongPress();
        }, longPressDuration)
      );
    };

    const handleTouchEnd = () => {
      if (timer) {
        clearTimeout(timer);
        setTimer(null);
      }
    };

    useEffect(() => {
      return () => {
        handleTouchEnd();
      };
    });

    return (
      <div
        className='active:bg-transparent'
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}>
        <WrappedComponent {...props} />
      </div>
    );
  };
};

export default withLongPress;
