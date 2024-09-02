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
  isPlaying,
  currentProgress,
  type = 'indexed',
  index,
  onClick,
  onOptionsClick,
}) => {
  const title = dataExtractor(data, config.title) as string;
  const subtitle = dataExtractor(data, config.subtitle) as string;
  const image = dataExtractor(data, config.image) as string;
  const duration = Number(dataExtractor(data, config.duration) || 0);
  return (
    <div
      role='button'
      className='relative flex w-full py-2 m-0 overflow-hidden items-between'
      onClick={onClick}>
      <div className='absolute inset-0 '></div>
      <motion.div
        className='absolute inset-0 bg-gradient-to-r from-surface/20 to-white/15'
        initial={{ right: '100%' }}
        animate={{ right: `${100 - (isPlaying ? currentProgress : 0)}%` }}
        transition={{ duration: 1, ease: 'linear' }}
      />
      <div className='relative w-full'>
        <div className='flex items-center h-full py-1 space-x-3'>
          {type === 'indexed' && index ? (
            <div className='flex items-center justify-center w-8 h-full '>
              <TextLink size='base' weight='normal' color='light'>
                {index}
              </TextLink>
            </div>
          ) : (
            <div className='ml-1 shrink-0'>
              <Figure src={[image]} alt={title} fit='cover' size='xs' radius='xxs' />
            </div>
          )}
          <div className='w-full'>
            <TextLink size='base' weight='medium'>
              {decodeHtmlEntities(title)}
            </TextLink>
            <TextLink size='xs' color='light'>
              {decodeHtmlEntities(subtitle)}
            </TextLink>
          </div>
          <div className='flex items-center justify-end h-full space-x-4'>
            <TextLink size='sm' color='tertiary'>
              {timeToReadable(Number(duration))}
            </TextLink>
            <Button
              classNames='text-gray-400 transition-colors active:text-white active:scale-90 p-0 m-0'
              variant='unstyled'
              onClick={onOptionsClick}>
              <LuMoreVertical size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioItem;
