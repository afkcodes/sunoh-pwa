/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RiSearch2Line } from 'react-icons/ri';
import { useLocation } from 'wouter';
import Button from '~components/Button/Button';
import Input from '~components/Input/Input';
import RecentlySearchedKeywords from '~components/RecentlySearched';
import Section from '~components/Section/Section';
import { componentConfig } from '~configs/component.config';
import { dataConfigs } from '~configs/data.config';
import {
  categoryCreator,
  createMediaTrack,
  debounce,
  isValidArray,
} from '~helper/common';
import useFetch from '~hooks/useFetch';
import { useQueryParams } from '~hooks/useQueryParams';
import useScrollToTop from '~hooks/useScrollToTop';
import { endpoints } from '~network/endpoints';
import http from '~network/http';
import { audio } from '~states/audioStore';
import { useSearchStore } from '~states/search.store';
import { useUserStore } from '~states/userStore';

interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
}

const SearchScreen: React.FC = () => {
  const [, navigate] = useLocation();
  const [searchState, setSearchState] = useSearchStore();
  const [userState] = useUserStore();
  const { getQueryParam, setQueryParam, deleteQueryParam } = useQueryParams();
  const [categories, setCategories] = useState<Category[] | null>(
    searchState.categories || null
  );
  const pillsRef = useRef<HTMLDivElement>(null);

  const { data, refetch, isSuccess } = useFetch({
    queryKey: [`search_${searchState.query}_${searchState.key}`],
    queryFn: () =>
      http(`${endpoints.saavn.search}?q=${searchState.query}&type=${searchState.key}`),
  });

  const handleCategoryChange = useCallback(
    (category: string) => {
      const pillElement = document.getElementById(`pill-${category}`);
      if (pillElement) {
        pillElement.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest',
        });
      }
      setQueryParam('cat', category, 'push');
      setSearchState({ key: category });
    },
    [setQueryParam, setSearchState]
  );

  const debouncedRefetch = useCallback(
    debounce(() => {
      if (searchState.query.trim()) {
        refetch();
      }
    }, 500),
    [refetch, searchState.query]
  );

  const onChange = useCallback(
    (val: string) => {
      setQueryParam('q', val);
      setSearchState({ query: val });
      if (!val.length) {
        deleteQueryParam('q');
        deleteQueryParam('cat');
      }
      debouncedRefetch();
    },
    [setQueryParam, setSearchState, deleteQueryParam, debouncedRefetch]
  );

  const onActionHeaderClick = useCallback(
    (key: string) => {
      setQueryParam('cat', key, 'push');
      setSearchState({ key: key.toLowerCase() });
    },
    [setQueryParam, setSearchState]
  );

  const play = (item: any) => {
    console.log(item);
    const mediaTrack = createMediaTrack(item, '160kbps');
    audio.addMediaAndPlay(mediaTrack);
  };

  const onClick = useCallback(
    (category: string, token: string, item: any) => {
      const routes: Record<string, string> = {
        album: `/album/${token}`,
        playlist: `/playlist/${token}`,
        mix: `/playlist/${token}?category=mix`,
        artist: `/artist/${token}`,
      };
      if (category === 'song') {
        play(item);
      } else {
        navigate(routes[category] || '/');
      }
    },

    [navigate]
  );

  useEffect(() => {
    if (searchState.query.trim()) {
      debouncedRefetch();
    }
  }, [debouncedRefetch, searchState.query]);

  useEffect(() => {
    if (!searchState.query.length) {
      setCategories(null);
      setSearchState({ categories: [] });
    } else if (isSuccess && isValidArray(data)) {
      const newCategories = categoryCreator(
        data.map((d: any) => (isValidArray(d.data) ? d.heading.toLowerCase() : null))
      );
      setCategories(newCategories);
      setSearchState({ categories: newCategories });
    }
    // if (data) {
    //   const searchedKeys = [
    //     ...userState.user.recentlySearchedKeyWords,
    //     searchState.query,
    //   ];
    //   setUserState({
    //     user: {
    //       ...userState.user,
    //       recentlySearchedKeyWords: searchedKeys,
    //     },
    //   });
    //   console.log(userState);
    // }
  }, [data, isSuccess, searchState.query]);

  useEffect(() => {
    const cat = getQueryParam('cat');
    const query = getQueryParam('q') || '';
    setSearchState({ query, key: cat ? cat.toLowerCase() : 'all' });
  }, [getQueryParam, setSearchState]);

  const filteredData = isValidArray(data)
    ? data.filter((d: any) => d.heading !== 'Topquery')
    : data;
  const topQuery = isValidArray(data)
    ? data.find((d: any) => d.heading === 'Topquery')
    : null;

  useScrollToTop();

  return (
    <div className='min-h-screen text-gray-100 bg-background'>
      <div className='w-full'>
        <div className='sticky top-0 z-20 flex flex-col pt-3 space-y-3 bg-background'>
          <div className='h-12 px-2'>
            <Input
              placeholder='Search...'
              suffixIcon={<RiSearch2Line size={26} className='text-text-secondary' />}
              onChange={onChange}
              value={searchState.query}
            />
          </div>
          <div className='sticky top-0 mb-6 overflow-x-auto no-scrollbar' ref={pillsRef}>
            <ul className='flex pb-2 pr-8 space-x-2 first:ml-2'>
              {categories?.map((category, index) => (
                <li
                  key={category.id}
                  className={index === categories.length - 1 ? 'pr-2' : ''}>
                  <Button
                    size='sm'
                    radius='full'
                    variant={searchState.key === category.id ? 'primary' : 'dark'}
                    id={`pill-${category.id}`}
                    classNames='flex items-center'
                    onClick={() => handleCategoryChange(category.id)}
                    prefixIcon={<category.icon size={16} />}>
                    <span>{category.name}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {isValidArray(userState.user.recentlySearchedKeyWords) ? (
          <RecentlySearchedKeywords
            initialKeywords={userState.user.recentlySearchedKeyWords}
          />
        ) : null}
        {isSuccess && (
          <div className='flex flex-col mt-4'>
            {searchState.key === 'all' ? (
              <>
                <Section
                  data={topQuery}
                  config={dataConfigs.album}
                  containerConfig={{
                    tileContainerConfig: {
                      layout: 'list',
                      tileConfig: {
                        figureConfig: { fit: 'cover', size: 'xs' },
                        titleConfig: { size: 'sm', weight: 'medium' },
                        subTitleConfig: { size: 'xs' },
                      },
                      onTileClick: onClick,
                    },
                  }}
                />
                {filteredData.map((item: any, index: number) => (
                  <Section
                    key={index}
                    headerConfig={{
                      textLinkConfig: { size: 'md', weight: 'medium' },
                      actionButtonConfig: {
                        ...componentConfig.headerActionButtonConfig,
                        onClick: onActionHeaderClick,
                        children: 'More',
                      },
                    }}
                    data={item}
                    config={dataConfigs.album}
                    containerConfig={{
                      tileContainerConfig: {
                        layout: 'list',
                        tileConfig: {
                          figureConfig: { fit: 'cover', size: 'xs' },
                          titleConfig: { size: 'sm', weight: 'medium' },
                          subTitleConfig: { size: 'xs' },
                        },
                        onTileClick: onClick,
                      },
                    }}
                  />
                ))}
              </>
            ) : (
              <Section
                data={data}
                config={dataConfigs.album}
                containerConfig={{
                  tileContainerConfig: {
                    layout: 'list',
                    tileConfig: {
                      figureConfig: { fit: 'cover', size: 'xs' },
                      titleConfig: { size: 'sm', weight: 'medium' },
                      subTitleConfig: { size: 'xs' },
                    },
                    onTileClick: onClick,
                  },
                }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchScreen;
