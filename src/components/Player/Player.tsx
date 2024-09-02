import { useState } from 'react';
import { MdLyrics, MdOutlineLyrics } from 'react-icons/md';
import {
  RiEqualizer3Line,
  RiHeartFill,
  RiHeartLine,
  RiListUnordered,
  RiMusic2Line,
  RiPauseMiniFill,
  RiPlayList2Fill,
  RiPlayMiniFill,
  RiRepeatLine,
  RiRepeatOneLine,
  RiRfidLine,
  RiShareForwardLine,
  RiShuffleLine,
  RiSkipBackFill,
  RiSkipForwardFill,
} from 'react-icons/ri';
import BottomSheet from '~components/BottomSheet/BottomSheet';
import Button from '~components/Button/Button';
import Equalizer from '~components/Equalizer';
import Figure from '~components/Figure/Figure';
import QueueList from '~components/QueueList';
import Slider from '~components/Slider/Slider';
import TextLink from '~components/TextLink/TextLink';
import { timeToReadable } from '~helper/common';
import { audio, useAudio } from '~states/audioStore';

const PlayerScreen = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0); // 0: off, 1: all, 2: one
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);

  const [isJamming, setIsJamming] = useState(false);
  const [isQueueVisible, setIsQueueVisible] = useState(false);
  const [isEqVisible, setEqVisible] = useState(false);

  const [audioState] = useAudio();

  const togglePlayPause = () => {
    if (audioState.playbackState === 'playing') {
      audio.pause();
    } else {
      audio.play();
    }
  };
  const toggleFavorite = () => setIsFavorite(!isFavorite);
  const toggleRepeat = () => setRepeatMode((prevMode) => (prevMode + 1) % 3);
  const toggleShuffle = () => setIsShuffleOn(!isShuffleOn);
  const toggleLyrics = () => setShowLyrics(!showLyrics);

  const onNext = () => {
    audio.playNext();
  };
  const onPrevious = () => {
    audio.playPrevious();
  };

  return (
    <div className='relative flex flex-col min-h-screen transition-all duration-200 ease-in text-text-primary p-7 bg-gradient-to-b from-gray-900 to-black'>
      {/* Top Bar */}
      <div className='flex items-center justify-between mb-4'>
        <Button
          onClick={() => {}}
          variant='unstyled'
          classNames='transition-colors text-text-primary active:text-text-primary active:scale-90 p-0 m-0'>
          <RiListUnordered size={24} />
        </Button>
        <span className='text-sm font-medium'>NOW PLAYING</span>
        <Button
          onClick={() => {}}
          variant='unstyled'
          classNames='p-0 m-0 transition-colors text-text-primary active:text-text-primary active:scale-90'>
          <RiMusic2Line size={24} />
        </Button>
      </div>

      {/* Main Content */}
      <div
        className={`flex-grow flex ${showLyrics ? 'flex-row' : 'flex-col items-center'}`}>
        {/* Album Art and Song Info */}
        <div
          className={`${
            showLyrics ? 'w-1/2' : 'w-full'
          } transition-all duration-400 ease-in-out flex flex-col items-center`}>
          <div
            className={`my-4 transition-transform duration-300 ease-in-out transform shadow-2xl ${
              audioState.playbackState === 'playing' ? 'scale-1' : ' scale-[80%]'
            }`}>
            <Figure
              src={[
                audioState.currentTrack.artwork
                  ? audioState.currentTrack.artwork[0].src
                  : '',
              ]}
              size='full'
              radius='md'
              alt=''
              fit='cover'
              position='top'
            />
          </div>
          <div className='flex items-start justify-between w-full text-start'>
            <div className='w-[85%]'>
              <TextLink size={showLyrics ? 'sm' : 'xl'} weight='bold'>
                {audioState.currentTrack.title}
              </TextLink>
              <TextLink size={showLyrics ? 'xs' : 'md'} color='light' lineCount={1}>
                {audioState.currentTrack.album}
              </TextLink>
              <TextLink size={showLyrics ? 'xs' : 'sm'} color='tertiary' lineCount={1}>
                {audioState.currentTrack.artist}
              </TextLink>
            </div>
            <div className={showLyrics ? 'hidden' : 'flex flex-col'}>
              <Button
                variant='unstyled'
                size='md'
                classNames={`transition-all active:scale-90 ${
                  isFavorite ? 'text-primary-light' : 'text-text-secondary'
                }`}
                onClick={toggleFavorite}>
                {isFavorite ? <RiHeartFill size={30} /> : <RiHeartLine size={30} />}
              </Button>
              <Button
                onClick={() => {}}
                variant='unstyled'
                size='md'
                classNames='transition-all duration-300 text-text-secondary active:text-text-primary active:scale-90'>
                <RiShareForwardLine size={28} />
              </Button>
            </div>
          </div>
        </div>

        {/* Lyrics */}
        {showLyrics && (
          <div className='w-full pl-4 overflow-y-scroll h-96'>
            <TextLink weight='semibold' size='xl' classNames='mt-2'>
              Lyrics
            </TextLink>
            <TextLink size='sm' classNames='whitespace-pre-line' lineCount='none'>
              Lyrics not available
            </TextLink>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div data-vaul-no-drag className='w-full mb-6'>
        <div className='relative'>
          <div className='flex items-center justify-between mb-2'>
            <Slider
              max={Number(audioState.currentTrack.duration)}
              min={0}
              value={[Number(audioState.progress)]}
              step={0.1}
              onChange={(val) => {
                audio.seek(val);
              }}
              label='volume'
            />
          </div>
          <div className='flex justify-between mt-2 text-xs text-text-primary'>
            <span>{timeToReadable(Number(audioState.progress))}</span>
            <span>{timeToReadable(Number(audioState.currentTrack.duration))}</span>
          </div>
        </div>
      </div>

      {/* Main Controls */}
      <div className='flex items-center justify-center mb-8 space-x-6'>
        <button
          className={` active:text-text-primary active:scale-90 transition-colors ${
            isShuffleOn ? 'text-primary-light' : 'text-text-secondary'
          }`}
          onClick={toggleShuffle}>
          <RiShuffleLine size={24} />
        </button>
        <Button
          classNames='transition-transform text-text-primary active:scale-90'
          variant='unstyled'
          onClick={onPrevious}>
          <RiSkipBackFill size={36} />
        </Button>
        <Button
          variant='unstyled'
          onClick={togglePlayPause}
          classNames={`p-3 m-0  bg-surface text-text-primary transition-all duration-100 active:scale-90 
          ${audioState.playbackState === 'playing' ? 'rounded-xl' : 'rounded-full'}`}>
          {audioState.playbackState === 'playing' ? (
            <RiPauseMiniFill size={56} />
          ) : (
            <RiPlayMiniFill size={56} />
          )}
        </Button>
        <Button
          classNames='transition-transform text-text-primary active:scale-90'
          variant='unstyled'
          onClick={onNext}>
          <RiSkipForwardFill size={36} />
        </Button>
        <button
          className={` active:text-text-primary active:scale-90 transition-colors relative
            ${repeatMode > 0 ? 'text-primary-light' : 'text-text-secondary'}`}
          onClick={toggleRepeat}>
          {repeatMode === 2 ? <RiRepeatOneLine size={24} /> : <RiRepeatLine size={24} />}
        </button>
      </div>

      {/* Bottom Controls - Redesigned */}
      <div
        data-vaul-no-drag
        className='flex items-center justify-between py-4 rounded-lg'>
        <div className='flex'>
          <Button
            variant='unstyled'
            classNames='p-0 m-0 transition-all text-text-secondary active:text-text-primary active:scale-90'
            onClick={toggleLyrics}>
            {showLyrics ? <MdLyrics size={24} /> : <MdOutlineLyrics size={24} />}
          </Button>

          <Button
            onClick={() => {
              setEqVisible(true);
            }}
            variant='unstyled'
            classNames='p-0 ml-6 transition-all text-text-secondary active:text-text-primary active:scale-90'>
            <RiEqualizer3Line size={24} />
          </Button>
        </div>

        <div className='flex'>
          <Button
            onClick={() => {
              setIsJamming(!isJamming);
            }}
            variant='unstyled'
            classNames={`p-0 mr-6 transition-all text-text-secondary active:text-text-primary active:scale-90 ${
              isJamming ? 'text-primary-default' : ''
            }`}>
            <RiRfidLine size={24} />
          </Button>
          <Button
            onClick={() => {
              setIsQueueVisible(true);
            }}
            variant='unstyled'
            classNames='transition-all text-text-secondary active:text-text-primary active:scale-90 p-0 m-0'>
            <RiPlayList2Fill size={22} />
          </Button>
        </div>
      </div>
      <BottomSheet
        isOpen={isQueueVisible}
        dismissible={false}
        name='queue_sheet'
        onClose={() => {
          setIsQueueVisible(false);
        }}>
        <QueueList
          onClose={() => {
            setIsQueueVisible(false);
          }}
        />
      </BottomSheet>

      <BottomSheet
        isOpen={isEqVisible}
        dismissible={false}
        name='eq_sheet'
        onClose={() => {
          setEqVisible(false);
        }}>
        <Equalizer />
      </BottomSheet>
    </div>
  );
};

export default PlayerScreen;

{
  /* <div className='w-1/2'>
          <Slider
            max={100}
            min={0}
            value={[50]}
            step={1}
            onChange={(val: number) => {
              setVolume(val);
            }}
            label='volume'
          />
        </div> */
}
