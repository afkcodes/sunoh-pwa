/**
 * @fileOverview Provides a custom hook for managing state with ChangeNotifier.
 * @module createStore
 * @author Ashish Kumar
 */

import { useEffect, useState } from 'react';
import { isValidObject } from '~helper/common';
import ChangeNotifier, { ActionSet, ListenerCallback } from './notifier';

/**
 * Checks if a value is a valid object or null.
 * @param {*} value - The value to check.
 * @returns {boolean} - Returns true if the value is a valid object or null, otherwise false.
 */
export const checkValidObject = (value: any): value is object | null =>
  typeof value === 'object' &&
  value !== null &&
  !Array.isArray(value) &&
  value.constructor === Object;

/**
 * Compares two values for equality.
 * @param {*} d1 - The first value.
 * @param {*} d2 - The second value.
 * @returns {boolean} - Returns true if the values are equal, otherwise false.
 */
const diffChecker = (d1: any, d2: any): boolean => {
  if (d1 === null && d2 === null) {
    return true;
  }

  if (d1 === null || d2 === null) {
    return false;
  }

  if (typeof d1 !== typeof d2) {
    return false;
  }

  if (typeof d1 !== 'object') {
    return d1 === d2;
  }

  if (Array.isArray(d1) && Array.isArray(d2)) {
    if (d1.length !== d2.length) {
      return false;
    }

    return d1.every((item, index) => diffChecker(item, d2[index]));
  }

  const keys1 = Object.keys(d1);
  const keys2 = Object.keys(d2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  return keys1.every((key) => {
    if (!keys2.includes(key)) {
      return false;
    }

    return diffChecker(d1[key], d2[key]);
  });
};

/**
 * Creates a custom hook for managing state with ChangeNotifier.
 * @function
 * @param {string} eventName - The name of the event.
 * @param {*} initState - The initial state.
 * @param {string} [slice='default_slice'] - The slice identifier..
 * @returns {Object} - Returns an object containing the custom hook and helper functions.
 */

const create = <T>(eventName: string, initState: T, slice: string = 'default_slice') => {
  const notifier = ChangeNotifier.getInstance();
  const prevState = notifier.getState(eventName, slice);

  /**
   * Handles state change events.
   * @param {*} data - The new state data.
   * @param {Object} actionSet - Set of action functions.
   * @param {*} prevState - The previous state.
   */
  const listenerCallback = (
    data: any,
    actionSet: ActionSet,
    prevState: any,
    transient?: boolean
  ) => {
    const isDifferent = diffChecker(data, prevState);
    if (!transient) {
      if (!isDifferent) {
        if (actionSet[slice]?.size) {
          actionSet[slice].forEach((callback) => {
            if (callback) {
              isValidObject(data)
                ? callback((prev: T) => ({ ...prev, ...data } as T))
                : callback(data as T);
            }
          });
        }
      } else {
        console.warn('State update dismissed: previous and current state are same.');
      }
    } else {
      console.log('updated store transiently');
    }
  };

  // Listen for state changes
  notifier.listen(
    eventName,
    (data, actionSet, prevState, transient) =>
      listenerCallback(data, actionSet, prevState, transient),
    prevState ? prevState : initState,
    slice
  );

  /**
   * Returns the value of the state property.
   * @param {*} state - The current state object.
   * @returns {*} - Returns the state property value.
   */
  const getStateValue = (state: T) => {
    if (isValidObject(state)) {
      const proxyState = new Proxy(state as any, {
        get: (_target, prop) => {
          const state: T = notifier.getState(eventName, slice) as T;
          return state[prop as keyof T];
        },
      });
      return proxyState;
    }
    return notifier.getState(eventName, slice);
  };

  /**
   * Custom hook for managing state.
   * @returns {Array} - Returns an array containing the state and a function to update the state.
   */
  const useStore = (): [T, (data: Partial<T>) => void] => {
    const [state, setState] = useState<T>(initState);

    useEffect(() => {
      notifier.registerAction(setState, slice);
      return () => {
        notifier.unsubscribe(
          eventName,
          (data, actionSet) => {
            listenerCallback(data as T, actionSet, prevState as T);
          },
          slice
        );
      };
    }, []);

    return [
      getStateValue(state) as T,
      (data: Partial<T>) => {
        notifier.notify(eventName, data, slice, false, 'create');
      },
    ];
  };

  return {
    useStore,
    set: (data: Partial<T>) => {
      notifier.notify(eventName, data, slice, false, 'create_set');
    },
    setTransient: (data: Partial<T>) => {
      notifier.notify(eventName, data, slice, true, 'create_transient');
    },
    getStoreSnapshot: () => notifier.getState(eventName, slice) as T, // use this to retrieve state value

    subscribe: (cb: (data: T, actionSet: ActionSet, prevState: T) => void) => {
      notifier.listen(eventName, cb as ListenerCallback<unknown>, initState, slice);
    },
  };
};

const notify = (
  event: string,
  data: any,
  slice: string = 'default_slice',
  transient: boolean = false,
  caller = 'notifier_global'
) => {
  const notifier = ChangeNotifier.getInstance();
  notifier.notify(event, data, slice, transient, caller);
};

export { create, notify };
