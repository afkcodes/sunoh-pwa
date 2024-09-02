import { useEffect, useState } from 'react';
import { MdLyrics, MdOutlineLyrics } from 'react-icons/md';
import {
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
  RiVolumeMuteLine,
  RiVolumeUpLine,
} from 'react-icons/ri';
import BottomSheet from '~components/BottomSheet/BottomSheet';
import Button from '~components/Button/Button';
import Figure from '~components/Figure/Figure';
import Marquee from '~components/Marquee/Marquee';
import QueueList from '~components/QueueList';
import Slider from '~components/Slider/Slider';
import TextLink from '~components/TextLink/TextLink';

const PlayerScreen = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0); // 0: off, 1: all, 2: one
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(120);
  const [duration, setDuration] = useState(225); // Example duration: 3:45
  const [trackData, setTrackData] = useState<any>(null);
  const [isJamming, setIsJamming] = useState(false);
  const [isQueueVisible, setIsQueueVisible] = useState(false);

  useEffect(() => {
    // Simulating fetching track data from a backend
    const fetchTrackData = async () => {
      // In a real app, you'd make an API call here
      const mockData = {
        title: 'Blinding Lights',
        artist: 'The Weeknd',
        album: 'After Hours',
        albumArt:
          'https://dx35vtwkllhj9.cloudfront.net/universalstudios/despicable-me-4/images/gallery/image6.jpg',
        lyrics: `
        Bhigi Bhigi Raaton Men, Mithi Mithi Baaton Men
        Aisi Barasaato Men, Kaisaa Lagataa Hai?
        Lataa: [Aisaa Lagataa Hai Tum Banake Baadal,
        Mere Badan Ko Bhigoke Mujhe, Chhed Rahe Ho O
        Chhed Rahe Ho ] - 2`,
      };
      setTrackData(mockData as any);
      setDuration(122);
      setCurrentTime(122);
    };

    fetchTrackData();
  }, []);

  const togglePlayPause = () => setIsPlaying(!isPlaying);
  const toggleFavorite = () => setIsFavorite(!isFavorite);
  const toggleRepeat = () => setRepeatMode((prevMode) => (prevMode + 1) % 3);
  const toggleShuffle = () => setIsShuffleOn(!isShuffleOn);
  const toggleLyrics = () => setShowLyrics(!showLyrics);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      setVolume(0);
    } else {
      setVolume(75); // or the last non-zero volume
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className='relative flex flex-col min-h-screen text-text-primary p-7 bg-gradient-to-b from-gray-900 to-black'>
      {/* Top Bar */}
      <div className='flex items-center justify-between mb-4'>
        <Button
          onClick={() => {}}
          variant='unstyled'
          classNames='transition-colors text-text-primary active:text-text-primary active:scale-95'>
          <RiListUnordered size={24} />
        </Button>
        <span className='text-sm font-medium'>NOW PLAYING</span>
        <button className='transition-colors text-text-primary active:text-text-primary active:scale-95'>
          <RiMusic2Line size={24} />
        </button>
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
              isPlaying ? 'scale-1' : ' scale-[80%]'
            }`}>
            <Figure
              src={[
                'https://m.media-amazon.com/images/M/MV5BNDA5OWE3YTUtNjU0Mi00MWI0LTg3ODgtYmUwNzdkNTdiOWQ2XkEyXkFqcGdeQXVyOTI3MzI4MzA@._V1_.jpg',
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
              <Marquee speed={0.4}>
                <TextLink size={showLyrics ? 'sm' : 'xl'} weight='bold'>
                  {trackData?.title || 'Song Title'}
                </TextLink>
              </Marquee>
              <TextLink size={showLyrics ? 'xs' : 'md'} color='light' lineCount={2}>
                {trackData?.artist || 'Artist Name'}
              </TextLink>
            </div>
            <div data-vaul-no-drag className={showLyrics ? 'hidden' : 'flex flex-col'}>
              <Button
                variant='unstyled'
                size='md'
                classNames={`transition-colors ${
                  isFavorite ? 'text-primary-light' : 'text-text-secondary'
                }`}
                onClick={toggleFavorite}>
                {isFavorite ? <RiHeartFill size={30} /> : <RiHeartLine size={30} />}
              </Button>
              <Button
                onClick={() => {}}
                variant='unstyled'
                size='md'
                classNames='transition-colors text-text-secondary active:text-text-primary active:scale-95 '>
                <RiShareForwardLine size={28} />
              </Button>
            </div>
          </div>
        </div>

        {/* Lyrics */}
        {showLyrics && (
          <div className='w-full pl-4 overflow-y-scroll h-96'>
            <h3 className='mb-4 text-xl font-semibold'>Lyrics</h3>
            <TextLink size='sm' classNames='whitespace-pre-line' lineCount='none'>
              {trackData?.lyrics || 'Lyrics not available'}
            </TextLink>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div data-vaul-no-drag className='w-full mb-6'>
        <div className='relative'>
          <div className='flex items-center justify-between mb-2'>
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
          </div>
          <div className='flex justify-between mt-2 text-xs text-text-primary'>
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      {/* Main Controls */}
      <div className='flex items-center justify-center mb-8 space-x-6'>
        <button
          className={` active:text-text-primary active:scale-95 transition-colors ${
            isShuffleOn ? 'text-primary-light' : 'text-text-secondary'
          }`}
          onClick={toggleShuffle}>
          <RiShuffleLine size={24} />
        </button>
        <Button
          classNames='transition-transform text-text-primary active:scale-90'
          variant='unstyled'
          onClick={() => {}}>
          <RiSkipBackFill size={36} />
        </Button>
        <Button
          variant='unstyled'
          onClick={togglePlayPause}
          classNames={`p-3 m-0  bg-surface text-text-primary transition-all duration-150  active:scale-90 
          ${isPlaying ? 'rounded-xl' : 'rounded-full'}`}>
          {isPlaying ? <RiPauseMiniFill size={56} /> : <RiPlayMiniFill size={56} />}
        </Button>
        <Button
          classNames='transition-transform text-text-primary active:scale-90'
          variant='unstyled'
          onClick={() => {}}>
          <RiSkipForwardFill size={36} />
        </Button>
        <button
          className={` active:text-text-primary active:scale-95 transition-colors relative
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
            classNames='p-0 m-0 transition-colors text-text-secondary active:text-text-primary active:scale-95'
            onClick={toggleLyrics}>
            {showLyrics ? <MdLyrics size={24} /> : <MdOutlineLyrics size={24} />}
          </Button>

          <Button
            onClick={toggleMute}
            variant='unstyled'
            classNames='p-0 ml-6 text-text-secondary active:text-text-primary active:scale-95'>
            {isMuted ? <RiVolumeMuteLine size={24} /> : <RiVolumeUpLine size={24} />}
          </Button>
        </div>
        <div className='flex items-center w-40'>
          <Slider
            max={100}
            min={0}
            value={[50]}
            step={1}
            onChange={(val: number) => {
              console.log(val);
              setVolume(val);
              if (val === 0) {
                setIsMuted(true);
              } else {
                setIsMuted(false);
              }
            }}
            label='volume'
          />
        </div>
        <div className='flex'>
          <Button
            onClick={() => {
              setIsJamming(!isJamming);
            }}
            variant='unstyled'
            classNames={`transition-colors p-0 mr-6 ${
              isJamming
                ? 'text-primary-default'
                : 'text-text-secondary active:text-text-primary active:scale-95'
            }`}>
            <RiRfidLine size={24} />
          </Button>
          <Button
            onClick={() => {
              setIsQueueVisible(true);
            }}
            variant='unstyled'
            classNames='transition-colors text-text-secondary active:text-text-primary active:scale-95 p-0 m-0'>
            <RiPlayList2Fill size={22} />
          </Button>
        </div>
      </div>
      <BottomSheet
        isOpen={isQueueVisible}
        dismissible={false}
        name='queue_screen'
        onClose={() => {
          setIsQueueVisible(false);
        }}>
        <QueueList
          onClose={() => {
            setIsQueueVisible(false);
          }}
        />
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
