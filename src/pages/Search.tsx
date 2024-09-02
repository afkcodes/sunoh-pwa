import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RiSearch2Line } from 'react-icons/ri';
import Button from '~components/Button/Button';
import Input from '~components/Input/Input';
import Section from '~components/Section/Section';
import { componentConfig } from '~configs/component.config';
import { dataConfigs } from '~configs/data.config';
import SectionContainer from '~containers/SectionContainer';
import { categoryCreator, debounce, isValidArray } from '~helper/common';
import useFetch from '~hooks/useFetch';
import useScrollToTop from '~hooks/useScrollToTop';
import { endpoints } from '~network/endpoints';
import http from '~network/http';

interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
}

const SearchScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const pillsRef = useRef<HTMLDivElement>(null);

  const { data, refetch, isSuccess, isError } = useFetch({
    queryKey: [`search_${searchTerm}_${activeCategory}`],
    queryFn: async () =>
      await http(`${endpoints.saavn.search}?q=${searchTerm}&type=${activeCategory}`),
    shouldFetchOnLoad: false,
  });

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleCategoryChange = (category: string) => {
    const pillElement = document.getElementById(`pill-${category}`);
    if (pillElement) {
      pillElement.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
    setActiveCategory(category);
  };

  const debouncedRefetch = useCallback(
    debounce(() => {
      if (searchTerm.trim()) {
        refetch();
      }
    }, 300),
    [searchTerm, activeCategory, refetch]
  );

  const onChange = (val: string) => {
    setSearchTerm(val);
    debouncedRefetch();
  };

  useEffect(() => {
    if (searchTerm.trim()) {
      debouncedRefetch();
    }
  }, [activeCategory, debouncedRefetch]);

  useEffect(() => {
    if (isSuccess && isValidArray(data)) {
      setCategories(categoryCreator(data.map((d: any) => d.heading.toLowerCase())));
      // console.log();
    }
  }, [data, isSuccess]);

  useScrollToTop();

  return (
    <div className='min-h-screen text-gray-100 bg-background'>
      <div className='w-full'>
        <div className='sticky top-0 z-20 flex flex-col pt-3 space-y-3 bg-background'>
          <div className='h-12 px-2 '>
            <Input
              placeholder='Search...'
              suffixIcon={<RiSearch2Line size={26} className='text-text-secondary' />}
              onChange={onChange}
              value={searchTerm}
            />
          </div>
          <div className='sticky top-0 mb-6 overflow-x-auto no-scrollbar' ref={pillsRef}>
            <ul className='flex pb-2 pr-8 space-x-2 first:ml-2'>
              {categories
                ? categories.map((category, index) => (
                    <li
                      key={category.id}
                      className={index === categories.length - 1 ? 'pr-2' : ''}>
                      <Button
                        size='sm'
                        radius='full'
                        variant={activeCategory === category.id ? 'primary' : 'dark'}
                        id={`pill-${category.id}`}
                        classNames={`flex items-center`}
                        onClick={() => handleCategoryChange(category.id)}
                        prefixIcon={<category.icon size={16} />}>
                        <span>{category.name}</span>
                      </Button>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
        <div>
          {!isSuccess && searchTerm && <p>Loading...</p>}
          {isSuccess && data && (
            <div className='flex flex-col mt-8'>
              {activeCategory === 'all' ? (
                <SectionContainer
                  data={data}
                  config={
                    data.heading === 'Songs' ? dataConfigs.audio : dataConfigs.album
                  }
                  headerConfig={{
                    textLinkConfig: componentConfig.headerConfig,
                    actionButtonConfig: {
                      ...componentConfig.headerActionButtonConfig,
                      onClick: () => {},
                      children: 'More',
                    },
                  }}
                  containerConfig={{
                    tileContainerConfig: {
                      tileConfig: {
                        variant: 'list',
                        figureConfig: {
                          fit: 'cover',
                          radius: 'xs',
                          size: 'xs',
                        },
                        subTitleConfig: {
                          size: 'xs',
                          weight: 'normal',
                        },
                        titleConfig: {
                          size: 'sm',
                          weight: 'medium',
                        },
                      },
                      onTileClick: () => {},
                      layout: 'list',
                    },
                  }}
                  onItemClick={function (
                    _param?: any,
                    _param2?: any,
                    _param3?: any
                  ): void {
                    throw new Error('Function not implemented.');
                  }}
                />
              ) : (
                <Section
                  data={data}
                  config={
                    data.heading === 'Songs' ? dataConfigs.audio : dataConfigs.album
                  }
                  containerConfig={{
                    tileContainerConfig: {
                      tileConfig: {
                        variant: 'list',
                        figureConfig: {
                          fit: 'cover',
                          radius: 'xs',
                          size: 'xs',
                        },
                        subTitleConfig: {
                          size: 'xs',
                          weight: 'normal',
                        },
                        titleConfig: {
                          size: 'sm',
                          weight: 'medium',
                        },
                      },
                      onTileClick: () => {},
                      layout: 'list',
                    },
                    audioItemConfig: {
                      type: 'thumbnail',
                    },
                  }}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchScreen;
