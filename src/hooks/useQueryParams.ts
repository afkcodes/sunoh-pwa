import { useCallback, useEffect, useState } from 'react';

interface QueryParams {
  [key: string]: string;
}

interface UseQueryParamsReturn {
  queryParams: QueryParams;
  setQueryParam: (key: string, value: string | null, type?: 'push' | 'replace') => void;
  getQueryParam: (key: string) => string | null;
  getAllQueryParams: () => QueryParams;
  deleteQueryParam: (key?: string, type?: 'push' | 'replace') => void;
}

export const useQueryParams = (): UseQueryParamsReturn => {
  const [queryParams, setQueryParams] = useState<QueryParams>({});

  const updateQueryParams = useCallback(() => {
    const url = new URL(window.location.href);
    const params: QueryParams = {};
    url.searchParams.forEach((value, key) => {
      params[key] = value;
    });
    setQueryParams(params);
  }, []);

  // Parse the initial query parameters and set up popstate listener
  useEffect(() => {
    updateQueryParams();
    const handlePopState = () => {
      updateQueryParams();
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [updateQueryParams]);

  // Update query parameter
  const setQueryParam = useCallback(
    (key: string, value: string | null, type: 'push' | 'replace' = 'replace') => {
      const url = new URL(window.location.href);
      if (value === null) {
        url.searchParams.delete(key);
      } else {
        url.searchParams.set(key, value);
      }
      type === 'push'
        ? window.history.pushState({}, '', url.toString())
        : window.history.replaceState({}, '', url.toString());
      updateQueryParams();
    },
    [updateQueryParams]
  );

  // Get query parameter
  const getQueryParam = useCallback((key: string): string | null => {
    const url = new URL(window.location.href);
    return url.searchParams.get(key);
  }, []);

  // Get all query parameters
  const getAllQueryParams = useCallback((): QueryParams => {
    const url = new URL(window.location.href);
    const params: QueryParams = {};
    url.searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }, []);

  // Delete query parameter(s)
  const deleteQueryParam = useCallback(
    (key?: string, type: 'push' | 'replace' = 'replace') => {
      const url = new URL(window.location.href);
      if (key) {
        url.searchParams.delete(key);
      } else {
        // If no key is provided, delete all query parameters
        url.search = '';
      }
      type === 'push'
        ? window.history.pushState({}, '', url.toString())
        : window.history.replaceState({}, '', url.toString());
      updateQueryParams();
    },
    [updateQueryParams]
  );

  return {
    queryParams,
    setQueryParam,
    getQueryParam,
    getAllQueryParams,
    deleteQueryParam,
  };
};
