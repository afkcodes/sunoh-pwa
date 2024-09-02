import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useRef } from 'react';
import { Fragment } from 'react/jsx-runtime';
import { isValidArray } from '~helper/common';
import http from '~network/http';

interface PaginationContainerProps<T> {
  endpoint: string;
  renderItem: (item: T, index: number, pageIndex: number) => React.ReactNode;
  getItemKey: (item: T) => string | number;
  getNextPageParam?: (lastPage: any, allPages: any[]) => number | undefined;
  queryKey: string;
  containerClassName?: string;
  loadingMessage?: string;
}

function PaginationContainer<T>({
  endpoint,
  renderItem,
  getItemKey,
  getNextPageParam,
  queryKey,
  containerClassName = 'grid w-full grid-cols-2 px-2 pt-2 gap-y-4 gap-x-2',
  loadingMessage = 'Loading more...',
}: PaginationContainerProps<T>) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: async (param) => {
      return await http(endpoint, {
        params: { page: param.pageParam },
      });
    },
    initialPageParam: 0,
    getNextPageParam:
      getNextPageParam ||
      ((lastPage: any, allPages) => {
        const count = lastPage?.data?.count;
        if (isValidArray(allPages)) {
          let dataCount = 0;
          allPages.forEach((pageData: any) => {
            dataCount += pageData.data.list.length;
          });
          return dataCount < count ? lastPage.data.page + 1 : undefined;
        }
      }),
  });

  const intersectionObserver = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage) return;
      if (intersectionObserver.current) intersectionObserver.current.disconnect();
      intersectionObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          console.log('Fetching next page');
          fetchNextPage().catch((error: any) =>
            console.error('Error fetching next page:', error)
          );
        }
      });
      if (node) intersectionObserver.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  return (
    <div>
      <div className={containerClassName}>
        {data?.pages?.map((page: any, pageIndex: number) => (
          <Fragment key={pageIndex}>
            {page.data.list.map((item: T, itemIndex: number) => (
              <div
                className={`${
                  itemIndex % 2 !== 0 ? 'justify-self-end h-full w-full ' : ''
                }`}
                key={getItemKey(item)}
                ref={
                  pageIndex === data.pages.length - 1 &&
                  itemIndex === page.data.list.length - 1
                    ? lastItemRef
                    : null
                }>
                {renderItem(item, itemIndex, pageIndex)}
              </div>
            ))}
          </Fragment>
        ))}
      </div>
      {hasNextPage && isFetchingNextPage && (
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>{loadingMessage}</div>
      )}
    </div>
  );
}

export default PaginationContainer;
