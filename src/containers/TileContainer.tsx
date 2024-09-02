import { Fragment, lazy, Suspense } from 'react';
import ScrollSnap from '~components/ScrollSnap/ScrollSnap';
import { isValidArray } from '~helper/common';
import { TileContainerProps } from '~types/component.types';
const Tile = lazy(() => import('~components/Tile/Tile'));

const TileContainer: React.FC<TileContainerProps> = ({
  tileConfig,
  data,
  config,
  onTileClick,
  layout = 'scrollList',
}) => {
  return (
    <Fragment>
      {layout === 'scrollList' ? (
        <ScrollSnap>
          {isValidArray(data) &&
            data.slice(0, 10).map((item: any) => (
              <div className='snap-center' key={item.title}>
                <Suspense fallback={<div>TILE</div>}>
                  <Tile
                    {...tileConfig}
                    figureConfig={{
                      ...tileConfig.figureConfig,
                      radius:
                        item.type === 'radio_station'
                          ? 'full'
                          : tileConfig.figureConfig.radius,
                    }}
                    titleConfig={{
                      ...tileConfig.titleConfig,
                      classNames: `${
                        item.type === 'radio_station' ? 'text-center' : 'text-start'
                      }`,
                    }}
                    subTitleConfig={{
                      ...tileConfig.subTitleConfig,
                      classNames: `${
                        item.type === 'radio_station' ? 'text-center' : 'text-start'
                      }`,
                    }}
                    config={config}
                    data={item}
                    onClick={() => {
                      onTileClick(item.type, item.token);
                    }}
                  />
                </Suspense>
              </div>
            ))}
        </ScrollSnap>
      ) : (
        <div className='grid grid-cols-2'>
          {isValidArray(data) &&
            data.slice(0, 10).map((item: any) => (
              <div className='snap-center' key={item.title}>
                <Suspense fallback={<div>TILE</div>}>
                  <Tile
                    {...tileConfig}
                    config={config}
                    data={item}
                    onClick={() => {
                      onTileClick(item.type, item.token);
                    }}
                  />
                </Suspense>
              </div>
            ))}
        </div>
      )}
    </Fragment>
  );
};

export default TileContainer;
