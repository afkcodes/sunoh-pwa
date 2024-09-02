import { AudioState } from 'audio_x';
import { motion } from 'framer-motion';
import { Fragment } from 'react/jsx-runtime';
import Button from '~components/Button/Button';
import Figure from '~components/Figure/Figure';
import TextLink from '~components/TextLink/TextLink';
import AudioStateContainer from '~containers/AudioStateContainer';
import { getArtistNames, getNonEmptyStringData } from '~helper/common';
import { dataExtractor } from '~helper/dataExtractor';
import { TileProps } from '~types/component.types';

const Tile: React.FC<TileProps> = ({
  data,
  config,
  figureConfig,
  titleConfig,
  subTitleConfig,
  variant = 'tile',
  onClick,
}) => {
  const id = dataExtractor<typeof data>(data, config.id) || '';
  const title = dataExtractor<typeof data>(data, config.title);
  const subtitle =
    getNonEmptyStringData(dataExtractor<typeof data>(data, config?.subtitle)) ||
    getArtistNames(dataExtractor<typeof data>(data, config?.artists)) ||
    getNonEmptyStringData(dataExtractor<typeof data>(data, config?.year)?.toString()) ||
    getNonEmptyStringData(dataExtractor<typeof data>(data, config?.editor)?.toString()) ||
    undefined;

  const images =
    dataExtractor(data, config?.images) || dataExtractor(data, config?.image) || '#';
  const alt = `${title}_poster`;
  const duration = dataExtractor(data, config?.duration || '') || 0;

  return (
    <Fragment>
      <div>
        <Button
          variant='unstyled'
          onClick={onClick}
          classNames={`
            relative flex w-full text-start transition-all duration-300  p-0 m-0
            ${
              variant === 'list'
                ? 'px-2 items-center py-2 rounded-md justify-start'
                : 'flex-col active:scale-95 items-start'
            }
          `}>
          <Figure {...figureConfig} src={[images as string]} alt={alt} id={id} />
          <AudioStateContainer
            renderItem={(audioState: AudioState) => {
              return (
                <motion.div
                  className='absolute inset-0 bg-gradient-to-r from-surface/20 to-white/15'
                  initial={{ right: '100%' }}
                  animate={{
                    right: `${
                      100 -
                      (id === audioState.currentTrack.id
                        ? ((audioState.progress as number) / Number(duration)) * 100
                        : 0)
                    }%`,
                  }}
                  transition={{ duration: 1, ease: 'linear' }}
                />
              );
            }}
          />
          <div
            className={`py-0.5 flex flex-col
              ${variant === 'list' ? 'ml-2 w-[80%]' : 'w-[98%]'}`}>
            {title?.length ? <TextLink {...titleConfig}>{title}</TextLink> : null}
            {subtitle?.length ? (
              <TextLink {...subTitleConfig}>{subtitle}</TextLink>
            ) : null}
          </div>
        </Button>
      </div>
    </Fragment>
  );
};

export default Tile;
