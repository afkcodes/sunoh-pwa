import { lazy, Suspense } from 'react';

import { SectionHeaderProps, TileContainerProps } from '~types/component.types';

const Section = lazy(() => import('~components/Section/Section'));

interface SectionContainerProps {
  data: any;
  config: any;
  containerConfig: {
    tileContainerConfig: Omit<TileContainerProps, 'data' | 'config'>;
  };
  onItemClick: (_param?: any, _param2?: any, _param3?: any) => void;
  headerConfig: SectionHeaderProps;
}

const SectionContainer: React.FC<SectionContainerProps> = ({
  data,
  containerConfig,
  config,
  headerConfig,
}) => {
  return (
    <div>
      {data.map((item: any) => (
        <Suspense fallback={<div></div>} key={item.heading}>
          <Section
            data={item}
            config={config}
            containerConfig={{
              tileContainerConfig: containerConfig.tileContainerConfig,
            }}
            headerConfig={headerConfig}
          />
        </Suspense>
      ))}
    </div>
  );
};

// tileConfig: tileContainerConfig?.tileConfig as TileConfig,
//               onTileClick: tileContainerConfig?.onTileClick,

export default SectionContainer;
