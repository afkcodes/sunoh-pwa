import { Fragment } from 'react/jsx-runtime';
import Header from '~components/Header/Header';
import TileContainer from '~containers/TileContainer';
import { isEmptyObject, isValidArray } from '~helper/common';
import { SectionHeaderProps, TileContainerProps } from '~types/component.types';

interface SectionProps {
  data: any;
  config: any;
  headerConfig?: SectionHeaderProps;
  containerConfig: {
    tileContainerConfig?: Omit<TileContainerProps, 'data' | 'config'>;
    // audioItemContainerConfig?: Omit<AudioItemContainerProps, 'data' | 'config'>;
  };
}

const Section: React.FC<SectionProps> = ({
  data,
  headerConfig,
  config,
  containerConfig,
}) => {
  const contentData = isValidArray(data?.data)
    ? data.data
    : isValidArray(data?.list)
    ? data.list
    : [];

  return (
    <Fragment>
      {(data && isValidArray(contentData)) || isEmptyObject(contentData) ? (
        <div key={data?.heading}>
          {headerConfig ? (
            <Header
              textLinkConfig={{
                ...headerConfig.textLinkConfig,
                children: data?.heading,
              }}
              actionButtonConfig={
                headerConfig.actionButtonConfig && contentData.length > 25
                  ? {
                      ...headerConfig.actionButtonConfig,
                      onClick: () => {
                        headerConfig.actionButtonConfig?.onClick(data.heading);
                      },
                    }
                  : undefined
              }
            />
          ) : null}
          {containerConfig.tileContainerConfig ? (
            <TileContainer
              data={contentData}
              config={config}
              tileConfig={containerConfig.tileContainerConfig.tileConfig}
              onTileClick={containerConfig.tileContainerConfig.onTileClick}
              layout={containerConfig.tileContainerConfig.layout}
            />
          ) : null}
          {/* {containerConfig.audioItemContainerConfig && data.heading === 'Songs' ? (
        <AudioItemContainer
          data={isValidArray(data?.data) ? data.data : []}
          config={config}
          audioItemConfig={containerConfig.audioItemContainerConfig.audioItemConfig}
        />
      ) : null} */}
        </div>
      ) : null}
    </Fragment>
  );
};

export default Section;
