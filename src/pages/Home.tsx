import { Fragment, memo } from 'react';
import { useLocation } from 'wouter';
import { componentConfig } from '~configs/component.config';
import { dataConfigs } from '~configs/data.config';
import RecentlyPlayedContainer from '~containers/RecentlyPlayedContainer';
import SectionContainer from '~containers/SectionContainer';
import { mediaActions } from '~helper/mediaActions';
import useFetch from '~hooks/useFetch';
import useScrollToTop from '~hooks/useScrollToTop';
import { endpoints } from '~network/endpoints';
import http from '~network/http';

const Home = () => {
  useScrollToTop();
  const { data, isSuccess } = useFetch({
    queryKey: ['home'],
    queryFn: async () => await http(endpoints.saavn.home),
  });

  const [, navigate] = useLocation();

  const onClick = (category: string, token: string, item: any) => {
    if (category === 'album') {
      navigate(`/album/${token}`);
    }
    if (category === 'playlist') {
      navigate(`/playlist/${token}`);
    }
    if (category === 'mix') {
      navigate(`/playlist/${token}?category=mix`);
    }
    if (category === 'radio_station') {
      mediaActions
        .createSaavnRadioAndPlay(item, '160kbps')
        .then(() => {})
        .catch(() => {});
    }
  };

  const onActionHeaderClick = (key: string) => {
    navigate(`/view-all?key=${key}`);
  };

  const filtered = data?.filter((d: any) => d?.heading) ?? [];
  console.log('re-rendering home');
  return (
    <Fragment>
      {isSuccess ? (
        <div className='flex flex-col gap-3 '>
          <RecentlyPlayedContainer />
          <SectionContainer
            onItemClick={onClick}
            data={filtered}
            containerConfig={{
              tileContainerConfig: {
                onTileClick: onClick,
                tileConfig: componentConfig.albumTileConfig,
                layout: 'scrollList',
              },
            }}
            headerConfig={{
              textLinkConfig: componentConfig.headerConfig,
              actionButtonConfig: {
                ...componentConfig.headerActionButtonConfig,
                onClick: onActionHeaderClick,
                children: 'More',
              },
            }}
            config={dataConfigs.album}
          />
        </div>
      ) : (
        <div className='flex items-center justify-center w-full h-dvh'>
          <p>LOADING</p>
        </div>
      )}
    </Fragment>
  );
};

export default memo(Home);
