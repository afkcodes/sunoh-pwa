import { useRef } from 'react';
import { useLocation } from 'wouter';
import ActionHeader from '~components/ActionHeader';
import { componentConfig } from '~configs/component.config';
import { dataConfigs } from '~configs/data.config';
import TileContainer from '~containers/TileContainer';
import { mediaActions } from '~helper/mediaActions';
import { useQueryParams } from '~hooks/useQueryParams';
import useScrollToTop from '~hooks/useScrollToTop';
import { queryClient } from '~main';

const ViewAll = () => {
  const key = useQueryParams().getQueryParam('key');
  const data = queryClient.getQueryData(['home']);
  const [, navigate] = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);

  const keyData = (data as any)?.data?.find((d: any) => d.heading === key) || [];

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

  useScrollToTop();
  return (
    <div className='bg-background'>
      <ActionHeader title={keyData.heading} ref={containerRef} sticky />
      <div ref={containerRef} />
      <TileContainer
        layout='grid'
        data={keyData.data}
        config={dataConfigs.album}
        onTileClick={onClick}
        tileConfig={{
          figureConfig: {
            fit: 'cover',
            size: 'full',
            radius: 'xs',
          },
          titleConfig: componentConfig.albumTileConfig.titleConfig,
          subTitleConfig: componentConfig.albumTileConfig.subTitleConfig,
        }}
      />
    </div>
  );
};

export default ViewAll;
