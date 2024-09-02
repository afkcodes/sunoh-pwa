import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import {
  RiHeartFill,
  RiHeartLine,
  RiPauseMiniFill,
  RiPlayMiniFill,
  RiRfidLine,
} from 'react-icons/ri';
import Button from '~components/Button/Button';
import Figure from '~components/Figure/Figure';
import TextLink from '~components/TextLink/TextLink';
import { getDominantColor } from '~helper/colorExtractor';
import { getColorWithOpacity, rgbToHex } from '~helper/common';
import { mediaActions } from '~helper/mediaActions';
import { useAudio } from '~states/audioStore';

const MiniPlayer: React.FC = () => {
  const [audioState] = useAudio();
  const [isLiked, setIsLiked] = useState(false);
  const [isJamming, setIsJamming] = useState(false);
  const isPlaying = audioState.playbackState === 'playing';
  const [color, setColor] = useState('');

  const onPlayOrPause = () => {
    mediaActions.playOrPause(isPlaying, audioState);
  };

  useEffect(() => {
    getDominantColor(
      audioState.currentTrack.artwork ? audioState.currentTrack.artwork[0].src : ''
    )
      .then((res) => {
        const arr = res?.split(',');
        setColor(rgbToHex(Number(arr[0]), Number(arr[1]), Number(arr[2])));
      })
      .catch(() => {});
  }, [audioState.currentTrack]);

  if (!audioState.currentTrack.source) {
    return null;
  }

  return (
    <motion.div
      style={{
        backgroundColor: getColorWithOpacity(color, 0.3),
        backdropFilter: 'blur(8px)',
      }}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className='fixed left-0 right-0 overflow-hidden bottom-16 bg-nav-background/90 backdrop-blur-md mini-player'>
      <div className='relative h-16 max-w-lg mx-auto'>
        <motion.div
          className='absolute inset-0 bg-gradient-to-r from-surface/20 to-white/15'
          initial={{ right: '100%' }}
          animate={{
            right: `${
              100 -
              ((audioState.progress as number) / (audioState.duration as number) || 0) *
                100
            }%`,
          }}
          transition={{ duration: 1, ease: 'linear' }}
        />

        <div className='relative z-10 flex items-center justify-between h-16 px-3'>
          <div>
            <Figure
              src={[
                audioState.currentTrack.artwork
                  ? audioState.currentTrack.artwork[1].src
                  : '',
              ]}
              alt='Album Cover'
              fit='cover'
              radius='sm'
              size='xs'
            />
          </div>
          <div className='flex flex-col items-start justify-start flex-grow ml-3 mr-1 '>
            <TextLink size='sm' weight='semibold' classNames='text-start'>
              {audioState.currentTrack.title}
            </TextLink>
            <TextLink size='xs' color='light' classNames='text-start'>
              {audioState.currentTrack.artist}
            </TextLink>
          </div>
          <div className='flex items-center space-x-3'>
            <Button
              variant='unstyled'
              onClick={() => {
                setIsLiked(!isLiked);
              }}
              classNames={`transition-all duration-300 p-0 m-0 ${
                isLiked
                  ? 'text-primary-default'
                  : 'text-text-secondary active:text-text-primary active:scale-[90%]'
              }`}>
              {isLiked ? <RiHeartFill size={26} /> : <RiHeartLine size={26} />}
            </Button>
            <Button
              onClick={() => {
                setIsJamming(!isJamming);
              }}
              variant='unstyled'
              classNames={`focus:outline-none transition-colors m-0 p-0 ${
                isJamming
                  ? 'text-primary-default'
                  : 'text-text-secondary active:text-text-primary active:scale-[90%]'
              }`}>
              <RiRfidLine size={26} />
            </Button>
            <Button
              variant='unstyled'
              classNames='p-0 m-0 active:scale-[90%] text-text-secondary active:text-text-primary'
              onClick={() => {
                onPlayOrPause();
              }}>
              {isPlaying ? <RiPauseMiniFill size={34} /> : <RiPlayMiniFill size={34} />}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MiniPlayer;
