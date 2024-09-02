import Header from '~components/Header/Header';
import AudioItemContainer from '~containers/AudioItemContainer';
import TileContainer from '~containers/TileContainer';
import { isValidArray } from '~helper/common';
import {
  AudioItemConfig,
  SectionHeaderProps,
  TileContainerProps,
} from '~types/component.types';

interface SectionProps {
  data: any;
  config: any;
  headerConfig?: SectionHeaderProps;
  containerConfig: {
    tileContainerConfig?: Omit<TileContainerProps, 'data' | 'config'>;
    audioItemConfig?: Omit<AudioItemConfig, 'data' | 'config'>;
  };
}

const Section: React.FC<SectionProps> = ({
  data,
  headerConfig,
  config,
  containerConfig,
}) => {
  return (
    <div key={data?.heading}>
      {headerConfig ? (
        <Header
          textLinkConfig={{
            ...headerConfig.textLinkConfig,
            children: data?.heading,
          }}
          actionButtonConfig={{
            ...headerConfig.actionButtonConfig,
          }}
        />
      ) : null}
      {containerConfig.tileContainerConfig && data.heading !== 'Songs' ? (
        <TileContainer
          data={isValidArray(data?.data) ? data.data : []}
          config={config}
          tileConfig={containerConfig.tileContainerConfig.tileConfig}
          onTileClick={containerConfig.tileContainerConfig.onTileClick}
          layout={containerConfig.tileContainerConfig.layout}
        />
      ) : null}
      {containerConfig.audioItemConfig && data.heading === 'Songs' ? (
        <AudioItemContainer
          data={isValidArray(data?.data) ? data.data : []}
          config={config}
          audioItemConfig={containerConfig.audioItemConfig}
        />
      ) : null}
    </div>
  );
};

export default Section;
