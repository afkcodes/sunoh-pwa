import { useQuery, useQueryClient } from '@tanstack/react-query';

const useFetch = ({
  queryKey,
  queryFn,
  shouldFetchOnLoad = true,
  staleTime = Infinity, // Set to Infinity to prevent automatic staleness
  cacheTime = 1000 * 60 * 60, // Cache for 1 hour
}: {
  queryKey: string[];
  queryFn: (param?: any) => any;
  shouldFetchOnLoad?: boolean;
  staleTime?: number;
  cacheTime?: number;
}) => {
  const queryClient = useQueryClient();

  const { isError, isLoading, isFetched, data, isSuccess, isPending, status } = useQuery({
    queryKey,
    queryFn,
    enabled: shouldFetchOnLoad,
    staleTime,
    gcTime: cacheTime,
    refetchOnWindowFocus: false, // Disable refetch on window focus
  });

  // Custom refetch function that checks cache first
  const refetch = async () => {
    const cachedData = await queryClient.ensureQueryData({ queryKey, queryFn });
    return cachedData;
  };

  return {
    isError,
    isLoading,
    isFetched,
    refetch,
    data: data?.data,
    isSuccess,
    isPending,
    status,
  };
};
``;
export default useFetch;
