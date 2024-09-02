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
            data.slice(0, 25).map((item: any, index: number) => (
              <div className='relative snap-center' key={`${item.id}_${index}`}>
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
                      onTileClick(item.type, item.token || item.id, item);
                    }}
                  />
                </Suspense>
              </div>
            ))}
        </ScrollSnap>
      ) : null}
      {layout === 'grid' ? (
        <div className='grid w-full grid-cols-2 px-2 pt-2 gap-y-4 gap-x-2'>
          {isValidArray(data) &&
            data.map((item: any, index: number) => (
              <div
                key={item.id ? item.id : index}
                className={`${index % 2 !== 0 ? 'justify-self-end h-full w-full ' : ''}`}>
                <Suspense fallback={<div>TILE</div>}>
                  <Tile
                    {...tileConfig}
                    config={config}
                    data={item}
                    onClick={() => {
                      onTileClick(item.type, item.token || item.id, item);
                    }}
                  />
                </Suspense>
              </div>
            ))}
        </div>
      ) : null}
      {layout === 'list' ? (
        <div className='flex flex-col space-y-3'>
          {isValidArray(data) &&
            data.map((item: any) => (
              <div key={item.id}>
                <Suspense fallback={<div>TILE</div>}>
                  <Tile
                    {...tileConfig}
                    config={config}
                    data={item}
                    onClick={() => {
                      onTileClick(item.type, item.token || item.id, item);
                    }}
                    variant='list'
                  />
                </Suspense>
              </div>
            ))}
        </div>
      ) : null}
    </Fragment>
  );
};

export default TileContainer;
