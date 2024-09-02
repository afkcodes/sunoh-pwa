import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Custom hook for managing navigation history
 * @param rootPath - The root path of the application (default: '/')
 * @returns An object with navigation methods and state
 */
const useHistory = (rootPath = '/') => {
  // State to store the navigation stack
  const [stack, setStack] = useState<string[]>([rootPath]);
  // State to indicate if the last action was a push
  const [isPush, setIsPush] = useState(true);
  // State to keep track of the current index in the stack
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  // Ref to track if navigation is internal (managed by this hook)
  const isInternalNavigation = useRef(false);
  // Ref for rate limiting
  const lastActionTime = useRef(Date.now());

  // Effect to initialize the stack if starting from a non-root path
  useEffect(() => {
    if (location.pathname !== rootPath && stack.length === 1) {
      setStack([rootPath, location.pathname]);
      setCurrentIndex(1);
    }
  }, [location, rootPath, stack.length]);

  /**
   * Rate limiter function to prevent rapid successive actions
   * @returns {boolean} Whether the action should proceed
   */
  const shouldAllowAction = useCallback(() => {
    const now = Date.now();
    if (now - lastActionTime.current > 300) {
      // 300ms cooldown
      lastActionTime.current = now;
      return true;
    }
    return false;
  }, []);

  /**
   * Push a new path to the navigation stack
   * @param path - The path to push
   */
  const push = useCallback(
    (path: string) => {
      if (!shouldAllowAction()) return;

      try {
        // console.log('Pushing new path:', path);
        isInternalNavigation.current = true;
        setStack((prevStack) => [...prevStack.slice(0, currentIndex + 1), path]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
        setIsPush(true);
        navigate(path);
      } catch (error) {
        console.error('Error in push:', error);
      }
    },
    [navigate, currentIndex, shouldAllowAction]
  );

  /**
   * Navigate back in the history stack
   */
  const back = useCallback(() => {
    if (!shouldAllowAction()) return;

    try {
      if (currentIndex > 0) {
        const newIndex = currentIndex - 1;
        // console.log('Going back. New index:', newIndex);
        isInternalNavigation.current = true;
        setCurrentIndex(newIndex);
        setIsPush(false);
        navigate(stack[newIndex]);
      } else {
        // console.log('Cannot go back: already at the beginning of the stack');
      }
    } catch (error) {
      console.error('Error in back:', error);
    }
  }, [currentIndex, navigate, stack, shouldAllowAction]);

  /**
   * Navigate forward in the history stack
   */
  const forward = useCallback(() => {
    if (!shouldAllowAction()) return;

    try {
      if (currentIndex < stack.length - 1) {
        const newIndex = currentIndex + 1;
        // console.log('Going forward. New index:', newIndex);
        isInternalNavigation.current = true;
        setIsPush(true);
        setCurrentIndex(newIndex);
        navigate(stack[newIndex]);
      } else {
        // console.log('Cannot go forward: already at the end of the stack');
      }
    } catch (error) {
      // console.error('Error in forward:', error);
    }
  }, [currentIndex, navigate, stack, shouldAllowAction]);

  /**
   * Reset the history to the root path
   */
  const reset = useCallback(() => {
    if (!shouldAllowAction()) return;

    try {
      // console.log('Resetting history to root path');
      isInternalNavigation.current = true;
      setStack([rootPath]);
      setCurrentIndex(0);
      setIsPush(true);
      navigate(rootPath, { replace: true });
    } catch (error) {
      // console.error('Error in reset:', error);
    }
  }, [navigate, rootPath, shouldAllowAction]);

  // Effect to handle external navigation and update the stack accordingly
  useEffect(() => {
    if (!isInternalNavigation.current) {
      try {
        const currentPath = location.pathname;
        const stackIndex = stack.indexOf(currentPath);
        if (stackIndex === -1) {
          // console.log('New external path detected:', currentPath);
          setStack((prevStack) => [...prevStack.slice(0, currentIndex + 1), currentPath]);
          setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
          // console.log('Existing path in stack detected:', currentPath);
          setCurrentIndex(stackIndex);
        }
      } catch (error) {
        // console.error('Error handling external navigation:', error);
      }
    }
    isInternalNavigation.current = false;
  }, [location.pathname, stack, currentIndex]);

  // Effect to clear browser stack when reaching the root
  useEffect(() => {
    if (currentIndex === 0 && stack.length > 1) {
      try {
        // console.log('Reached the root route. Clearing browser stack.');
        isInternalNavigation.current = true;
        setStack([stack[0]]);
        navigate(stack[0], { replace: true });
      } catch (error) {
        // console.error('Error clearing browser stack:', error);
      }
    }
  }, [currentIndex, navigate, stack]);

  // Computed properties
  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < stack.length - 1;
  const isLastRoute = stack.length === 1 && currentIndex === 0;

  // Debug logging
  // console.log('Current stack:', stack);
  // console.log('Current index:', currentIndex);
  // console.log('Is last route:', isLastRoute);

  return {
    push,
    back,
    forward,
    reset,
    canGoBack,
    canGoForward,
    isLastRoute,
    stack,
    currentIndex,
    isPush,
  };
};

export default useHistory;
