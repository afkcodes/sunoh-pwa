import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useHistory = (rootPath = '/') => {
  const [stack, setStack] = useState([rootPath]);
  const [isPush, setIsPush] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const isInternalNavigation = useRef(false);

  useEffect(() => {
    if (location.pathname !== rootPath && stack.length === 1) {
      setStack([rootPath, location.pathname]);
      setCurrentIndex(1);
    }
  }, [location, rootPath, stack.length]);

  const push = useCallback(
    (path: string) => {
      console.log('Pushing new path:', path);
      isInternalNavigation.current = true;
      setStack((prevStack) => {
        const newStack = [...prevStack.slice(0, currentIndex + 1), path];
        return newStack;
      });
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setIsPush(true);
      navigate(path);
    },
    [navigate, currentIndex]
  );

  const back = useCallback(() => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      console.log('Going back. New index:', newIndex);
      isInternalNavigation.current = true;
      setCurrentIndex(newIndex);
      setIsPush(false);
      navigate(stack[newIndex]);
    } else {
      console.log('Cannot go back: already at the beginning of the stack');
    }
  }, [currentIndex, navigate, stack]);

  const forward = useCallback(() => {
    if (currentIndex < stack.length - 1) {
      const newIndex = currentIndex + 1;
      console.log('Going forward. New index:', newIndex);
      isInternalNavigation.current = true;
      setIsPush(true);
      setCurrentIndex(newIndex);
      navigate(stack[newIndex]);
    } else {
      console.log('Cannot go forward: already at the end of the stack');
    }
  }, [currentIndex, navigate, stack]);

  useEffect(() => {
    if (!isInternalNavigation.current) {
      const currentPath = location.pathname;
      const stackIndex = stack.indexOf(currentPath);

      if (stackIndex === -1) {
        console.log('New external path detected:', currentPath);
        setStack((prevStack) => {
          const newStack = [...prevStack.slice(0, currentIndex + 1), currentPath];
          return newStack;
        });
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        console.log('Existing path in stack detected:', currentPath);
        setCurrentIndex(stackIndex);
      }
    }
    isInternalNavigation.current = false;
  }, [location.pathname, stack, currentIndex]);

  // Clear browser stack and replace everything
  useEffect(() => {
    if (currentIndex === 0 && stack.length > 1) {
      console.log('Reached the last left route. Clearing browser stack.');
      isInternalNavigation.current = true;
      setStack([stack[0]]);
      navigate(stack[0], { replace: true });
    }
  }, [currentIndex, navigate, stack]);

  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < stack.length - 1;
  const isLastRoute = stack.length === 1 && currentIndex === 0;

  console.log('Current stack:', stack);
  console.log('Current index:', currentIndex);
  console.log('Is last route:', isLastRoute);

  return {
    push,
    back,
    forward,
    canGoBack,
    canGoForward,
    isLastRoute,
    stack,
    currentIndex,
    isPush,
  };
};

export default useHistory;
