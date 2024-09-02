import Header from '~components/Header/Header';
import TileContainer from '~containers/TileContainer';
import { isValidArray } from '~helper/common';
import { SectionHeaderProps, TileContainerProps } from '~types/component.types';

interface SectionProps {
  data: any;
  config: any;
  headerConfig: SectionHeaderProps;
  containerConfig: {
    tileContainerConfig: Omit<TileContainerProps, 'data' | 'config'>;
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
      <Header
        textLinkConfig={{
          ...headerConfig.textLinkConfig,
          children: data?.heading,
        }}
        actionButtonConfig={{
          ...headerConfig.actionButtonConfig,
        }}
      />
      {containerConfig.tileContainerConfig ? (
        <TileContainer
          data={isValidArray(data?.data) ? data.data : []}
          config={config}
          tileConfig={containerConfig.tileContainerConfig.tileConfig}
          onTileClick={containerConfig.tileContainerConfig.onTileClick}
          layout={containerConfig.tileContainerConfig.layout}
        />
      ) : null}
    </div>
  );
};

export default Section;
