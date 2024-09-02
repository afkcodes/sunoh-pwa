import { AnimatePresence, motion } from 'framer-motion';
import { RiCloseFill } from 'react-icons/ri';
import { dataConfigs } from '~configs/data.config';
import AudioItemContainer from '~containers/AudioItemContainer';
import AudioStateContainer from '~containers/AudioStateContainer';
import { audio } from '~states/audioStore';
import Button from './Button/Button';
import Figure from './Figure/Figure';
import TextLink from './TextLink/TextLink';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
};

const QueueList = ({ onClose }: any) => {
  const queue = audio.getQueue();

  return (
    <div className='w-full h-screen p-4 overflow-scroll text-white no-scrollbar bg-gradient-to-b from-gray-900 to-black'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='flex items-center justify-between mb-6'>
        <TextLink weight='bold' size='md'>
          NOW PLAYING
        </TextLink>
        <Button
          variant='unstyled'
          classNames='text-text-secondary transition-colors active:text-text-primary p-0 m-0'
          onClick={onClose}>
          <RiCloseFill size={24} />
        </Button>
      </motion.div>

      {/* Now Playing Section */}
      <AudioStateContainer
        renderItem={(audioState) => (
          <motion.div
            className='sticky top-0 z-10 mb-6 overflow-hidden rounded-md shadow-lg bg-surface/90 backdrop-blur-sm '
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 300, damping: 24 }}>
            {/* Blurred Background */}
            <div className='absolute inset-0 bg-black bg-opacity-50'></div>

            {/* Animated Progress Background */}
            <motion.div
              className='absolute inset-0 bg-gradient-to-r from-surface/20 to-white/15'
              initial={{ right: '100%' }}
              animate={{
                right: `${
                  100 -
                  (((audioState.progress || 0) /
                    (audioState.currentTrack.duration || 0)) *
                    100 || 0)
                }%`,
              }}
              transition={{ duration: 1, ease: 'easeInOut' }}></motion.div>

            {/* Content */}
            <div className='relative p-3'>
              <div className='flex items-center space-x-4'>
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                  <Figure
                    src={[
                      audioState.currentTrack.artwork
                        ? audioState.currentTrack.artwork[1].src
                        : '',
                    ]}
                    alt={audioState.currentTrack.title}
                    size='xs'
                    fit='cover'
                    radius='sm'
                  />
                </motion.div>
                <div className='flex-grow'>
                  <TextLink lineCount={1} weight='semibold' size='lg'>
                    {audioState.currentTrack.title}
                  </TextLink>
                  <TextLink lineCount={1} color='light' size='sm'>
                    {audioState.currentTrack.artist}
                  </TextLink>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      />

      {/* Queue Section */}
      <motion.h2
        className='mb-4 text-lg font-semibold'
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}>
        Next in queue
      </motion.h2>
      <motion.div variants={containerVariants} initial='hidden' animate='visible'>
        <AnimatePresence>
          <AudioItemContainer
            data={queue}
            config={dataConfigs.audio}
            audioItemConfig={{
              type: 'indexed',
            }}
          />
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default QueueList;
