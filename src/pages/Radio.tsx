import { useInfiniteQuery } from '@tanstack/react-query';
import React, { Fragment, useCallback, useRef } from 'react';
import Tile from '~components/Tile/Tile';
import { isValidArray } from '~helper/common';
import { mediaActions } from '~helper/mediaActions';
import { endpoints } from '~network/endpoints';
import http from '~network/http';

const InfiniteScrollGrid: React.FC = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['radios'],
    queryFn: async (param) => {
      return await http(`${endpoints.gaana.radio.popular}`, {
        params: { page: param.pageParam },
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: any, allPages) => {
      const count = lastPage?.data?.count;
      if (isValidArray(allPages)) {
        let dataCount = 0;
        allPages.forEach((pageData: any) => {
          dataCount += pageData.data.list.length;
        });
        return dataCount < count ? lastPage.data.page + 1 : undefined;
      }
    },
  });

  const intObserver = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage) return;
      if (intObserver.current) intObserver.current.disconnect();
      intObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          console.log(hasNextPage);
          fetchNextPage()
            .then(() => {})
            .catch(() => {});
        }
      });
      if (node) intObserver.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  return (
    <div>
      <div className='grid w-full grid-cols-2 px-2 pt-2 gap-y-4 gap-x-2'>
        {data?.pages?.map((page: any, pageIndex) => (
          <Fragment key={pageIndex}>
            {page.data.list.map((item: any, itemIndex: number) => (
              <div
                className={`${itemIndex % 2 !== 0 ? 'justify-self-end ' : ''}`}
                key={item.id || `${pageIndex}-${itemIndex}`}
                ref={
                  pageIndex === data.pages.length - 1 &&
                  itemIndex === page.data.list.length - 1
                    ? lastItemRef
                    : null
                }>
                <Tile
                  onClick={() => {
                    mediaActions.createGaanaRadioAndPlay(item);
                  }}
                  key={item}
                  figureConfig={{
                    fit: 'cover',
                    radius: 'sm',
                    size: 'full',
                    position: 'top',
                  }}
                  titleConfig={{
                    color: 'primary',
                    size: 'sm',
                    weight: 'medium',
                    classNames: 'text-start',
                  }}
                  subTitleConfig={{
                    color: 'light',
                    size: 'xs',
                    classNames: 'text-start',
                  }}
                  data={item}
                  config={{
                    id: 'id',
                    images: 'image',
                    title: 'name',
                    subtitle: 'language',
                  }}
                />
              </div>
            ))}

            {/* <TileContainer
              layout='grid'
              key={pageIndex}
              config={{
                id: 'id',
                images: 'image',
                title: 'name',
                subtitle: 'language',
              }}
              data={page.data.list}
              onTileClick={() => {}}
              tileConfig={{
                figureConfig: {
                  fit: 'cover',
                  radius: 'sm',
                  size: 'full',
                  position: 'top',
                },
                titleConfig: {
                  color: 'primary',
                  size: 'sm',
                  weight: 'medium',
                },
                subTitleConfig: {
                  color: 'light',
                  size: 'xs',
                },
              }}
            /> */}
          </Fragment>
        ))}
      </div>
      {hasNextPage && isFetchingNextPage && (
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>Loading more...</div>
      )}
    </div>
  );
};

export default InfiniteScrollGrid;
