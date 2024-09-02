import { Fragment } from 'react';
import { componentConfig } from '~configs/component.config';
import { dataConfigs } from '~configs/data.config';
import SectionContainer from '~containers/SectionContainer';
import useFetch from '~hooks/useFetch';
import useHistory from '~hooks/useHistory';
import useScrollToTop from '~hooks/useScrollToTop';
import { endpoints } from '~network/endpoints';
import http from '~network/http';

const Home = () => {
  useScrollToTop();
  const { data, isSuccess } = useFetch({
    queryKey: ['home'],
    queryFn: async () => await http(endpoints.saavn.home),
  });

  const { push } = useHistory();

  const onClick = (category: string, token: string) => {
    if (category === 'album') {
      push(`/album/${token}`);
    }
    if (category === 'playlist') {
      push(`/playlist/${token}`);
    }
    if (category === 'mix') {
      push(`/playlist/${token}?type=mix`);
    }
  };

  return (
    <Fragment>
      {isSuccess ? (
        <div className='flex flex-col gap-3 '>
          <SectionContainer
            onItemClick={onClick}
            data={data}
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
                onClick: () => {},
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

export default Home;
