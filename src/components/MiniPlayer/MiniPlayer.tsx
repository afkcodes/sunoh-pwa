import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { LuChevronUp, LuSkipBack, LuSkipForward } from 'react-icons/lu';
import {
  RiHeartFill,
  RiHeartLine,
  RiPauseMiniFill,
  RiPlayMiniFill,
  RiRfidLine,
} from 'react-icons/ri';
import Figure from '~components/Figure/Figure';
import PlayerScreen from '~components/Player/Player';
import TextLink from '~components/TextLink/TextLink';
import { useBottomSheet } from '~contexts/BottomSheetContext';

const MiniPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isJamming, setIsJamming] = useState(false);
  const { openSheet } = useBottomSheet();

  const backgroundVariants = {
    collapsed: { height: '64px' },
    expanded: { height: '120px' },
  };

  const contentVariants = {
    collapsed: { opacity: 1, transition: { duration: 0.2 } },
    expanded: { opacity: 1, transition: { duration: 0.2, delay: 0.1 } },
  };

  return (
    <div>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
        onClick={() => {
          openSheet({
            isOpen: true,
            children: <PlayerScreen />,
          });
        }}
        className='fixed left-0 right-0 overflow-hidden bg-nav-background bottom-16 mini-player'>
        <motion.div
          className='relative max-w-lg mx-auto'
          variants={backgroundVariants}
          initial='collapsed'
          animate={isExpanded ? 'expanded' : 'collapsed'}>
          <motion.div
            className='flex items-center h-16 px-4'
            variants={contentVariants}
            initial='collapsed'
            animate={isExpanded ? 'expanded' : 'collapsed'}>
            <div>
              <Figure
                src={[
                  'https://m.media-amazon.com/images/I/81OxUOV+7qL._AC_UF1000,1000_QL80_.jpg',
                ]}
                alt='Album Cover'
                fit='cover'
                radius='sm'
                size='xs'
              />
            </div>
            <div className='flex flex-col items-start justify-start flex-grow ml-3'>
              <TextLink size='sm' weight='semibold' classNames='text-start'>
                Ethereal Echoes jkjnnjkn jkkjk hjhbn
              </TextLink>
              <TextLink size='xs' color='light' classNames='text-start'>
                Cosmic Sound waves hjhjhjjjh kjhjkh
              </TextLink>
            </div>
            <div className='flex items-center space-x-3'>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLiked(!isLiked);
                }}
                className={`focus:outline-none transition-colors ${
                  isLiked ? 'text-primary-default' : 'text-gray-400 active:text-white'
                }`}>
                {isLiked ? <RiHeartFill size={26} /> : <RiHeartLine size={26} />}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsJamming(!isJamming);
                }}
                className={`focus:outline-none transition-colors ${
                  isJamming ? 'text-primary-default' : 'text-gray-400 active:text-white'
                }`}>
                <RiRfidLine size={26} />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPlaying(!isPlaying);
                }}>
                {isPlaying ? <RiPauseMiniFill size={34} /> : <RiPlayMiniFill size={34} />}
              </motion.button>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className='ml-3 text-gray-400 transition-colors focus:outline-none hover:text-white'>
              <LuChevronUp
                size={18}
                className={`transform transition-transform ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              />
            </motion.button>
          </motion.div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.4, delay: 0.1 } }}
                exit={{ opacity: 0, transition: { duration: 0 } }}
                transition={{ duration: 0.4 }}
                className='absolute w-full px-4 pb-3 bg-nav-background '>
                <div className='flex items-center justify-between mb-2'>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className='text-gray-400 transition-colors focus:outline-none hover:text-white'>
                    <LuSkipBack size={18} />
                  </motion.button>
                  <input
                    type='range'
                    min='0'
                    max='100'
                    defaultValue='30'
                    className='w-3/4 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer'
                  />
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className='text-gray-400 transition-colors focus:outline-none hover:text-white'>
                    <LuSkipForward size={18} />
                  </motion.button>
                </div>
                <div className='flex justify-between mt-1 text-xs text-gray-400'>
                  <span>1:23</span>
                  <span>3:45</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MiniPlayer;
