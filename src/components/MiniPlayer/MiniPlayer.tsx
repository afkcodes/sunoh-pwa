import { motion } from 'framer-motion';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  RiPauseMiniFill,
  RiPlayMiniFill,
  RiRfidLine,
  RiSkipForwardFill,
} from 'react-icons/ri';
import Button from '~components/Button/Button';
import Figure from '~components/Figure/Figure';
import TextLink from '~components/TextLink/TextLink';
import { getDominantColor } from '~helper/colorExtractor';
import { getColorWithOpacity, rgbToHex } from '~helper/common';
import { mediaActions } from '~helper/mediaActions';
import { audio, useAudio } from '~states/audioStore';

const MiniPlayer: React.FC = () => {
  const [audioState] = useAudio();
  const [isJamming, setIsJamming] = useState(false);
  const [color, setColor] = useState('');

  const { currentTrack, playbackState, progress, duration } = audioState;
  const isPlaying = playbackState === 'playing';

  const onPlayOrPause = useCallback(() => {
    mediaActions.playOrPause(isPlaying, audioState);
  }, [isPlaying, audioState]);

  const onSkipForward = useCallback(() => {
    audio.playNext();
  }, []);

  const toggleJamming = useCallback(() => {
    setIsJamming((prev) => !prev);
  }, []);

  useEffect(() => {
    const artworkSrc = currentTrack.artwork?.[0]?.src || '';
    getDominantColor(artworkSrc)
      .then((res) => {
        const [r, g, b] = res?.split(',').map(Number) || [];
        setColor(rgbToHex(r, g, b));
      })
      .catch(() => {});
  }, [currentTrack.artwork]);

  const progressPercentage = useMemo(() => {
    return ((progress as number) / (duration as number) || 0) * 100;
  }, [progress, duration]);

  if (!currentTrack.source) {
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
          animate={{ right: `${100 - progressPercentage}%` }}
          transition={{ duration: 1, ease: 'linear' }}
        />

        <div className='relative z-10 flex items-center justify-between h-16 px-3'>
          <Figure
            src={[currentTrack.artwork?.[1]?.src || '']}
            alt='Album Cover'
            fit='cover'
            radius='sm'
            size='xs'
          />
          <div className='flex flex-col items-start justify-start flex-grow ml-3 mr-1'>
            <TextLink size='sm' weight='semibold' classNames='text-start'>
              {currentTrack.title}
            </TextLink>
            <TextLink size='xs' color='light' classNames='text-start'>
              {currentTrack.artist}
            </TextLink>
          </div>
          <div className='flex items-center space-x-3'>
            <Button
              onClick={toggleJamming}
              variant='unstyled'
              classNames={`focus:outline-none transition-colors m-0 p-0 ${
                isJamming
                  ? 'text-primary-default'
                  : 'text-text-primary active:scale-[90%]'
              }`}>
              <RiRfidLine size={26} />
            </Button>
            <Button
              variant='unstyled'
              classNames='p-0 m-0 active:scale-[90%] text-text-primary'
              onClick={onPlayOrPause}>
              {isPlaying ? <RiPauseMiniFill size={34} /> : <RiPlayMiniFill size={34} />}
            </Button>
            <Button
              variant='unstyled'
              onClick={onSkipForward}
              classNames='transition-all duration-300 p-0 m-0 text-text-primary active:scale-[90%]'>
              <RiSkipForwardFill size={26} />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MiniPlayer;
