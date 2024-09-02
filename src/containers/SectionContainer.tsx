import { lazy, Suspense } from 'react';
import { isValidArray } from '~helper/common';

import {
  AudioItemContainerProps,
  SectionHeaderProps,
  TileContainerProps,
} from '~types/component.types';

const Section = lazy(() => import('~components/Section/Section'));

interface SectionContainerProps {
  data: any;
  config: any;
  containerConfig: {
    tileContainerConfig?: Omit<TileContainerProps, 'data' | 'config'>;
    audioItemContainerConfig?: Omit<AudioItemContainerProps, 'data' | 'config'>;
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
      {isValidArray(data) &&
        data.map((item: any) => (
          <Suspense fallback={<div></div>} key={item.heading || Math.random() * 100}>
            <Section
              data={item}
              config={config}
              containerConfig={containerConfig}
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
