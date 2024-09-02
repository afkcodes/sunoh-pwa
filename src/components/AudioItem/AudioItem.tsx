import { motion } from 'framer-motion';
import { LuMoreVertical } from 'react-icons/lu';
import Button from '~components/Button/Button';
import Figure from '~components/Figure/Figure';
import TextLink from '~components/TextLink/TextLink';
import { decodeHtmlEntities, timeToReadable } from '~helper/common';
import { dataExtractor } from '~helper/dataExtractor';
import { AudioItemProps } from '~types/component.types';

const AudioItem: React.FC<AudioItemProps> = ({
  data,
  config,
  currentProgress,
  type = 'indexed',
  index,
  onClick,
  onOptionsClick,
  currentTrackId,
}) => {
  const id = dataExtractor(data, config.id) as string;
  const title = dataExtractor(data, config.title) as string;
  const subtitle =
    (dataExtractor(data, config.subtitle) as string) ||
    dataExtractor(data, config.artist);
  const image = dataExtractor(data, config.images) as string;
  const duration = Number(dataExtractor(data, config.duration) || 0);
  // const palette = dataExtractor(data, dataConfigs.audio.palette);

  const onAudioItemClick = (data: any) => {
    // setAudioStoreTransient({
    //   currentTrack: {
    //     ...getAudioSnapshot().currentTrack,
    //     palette,
    //   },
    // });
    onClick(data);
  };

  return (
    <div
      role='button'
      className='relative flex w-full py-2 m-0 overflow-hidden rounded-sm bg-surface/50 items-between'
      onClick={() => {
        onAudioItemClick(data);
      }}>
      <div className='absolute inset-0 '></div>
      <motion.div
        className='absolute inset-0 bg-gradient-to-r from-surface/20 to-white/15'
        initial={{ right: '100%' }}
        animate={{
          right: `${
            100 - (id === currentTrackId ? (currentProgress / duration) * 100 : 0)
          }%`,
        }}
        transition={{ duration: 1, ease: 'linear' }}
      />
      <div className='relative w-full'>
        <div className='flex items-center h-full py-1 space-x-3'>
          {type === 'indexed' && index ? (
            <div className='flex items-center justify-center h-full w-9 shrink-0 '>
              <TextLink size='base' weight='normal' color='light'>
                {index}
              </TextLink>
            </div>
          ) : (
            <div className='ml-2 shrink-0'>
              <Figure src={[image]} alt={title} fit='cover' size='xxs' radius='xxs' />
            </div>
          )}
          <div className='w-2/3'>
            <TextLink size='base' weight='medium'>
              {decodeHtmlEntities(title)}
            </TextLink>
            <TextLink size='xs' color='light'>
              {decodeHtmlEntities(subtitle as string)}
            </TextLink>
          </div>
          <div className='flex items-center justify-end h-full pr-2 space-x-4'>
            <TextLink size='sm' color='tertiary'>
              {timeToReadable(Number(duration))}
            </TextLink>
            <Button
              classNames='text-gray-400 transition-colors active:text-white active:scale-90 p-0 m-0'
              variant='unstyled'
              onClick={() => {
                onOptionsClick(1);
              }}>
              <LuMoreVertical size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioItem;
