import { useEffect, useState } from 'react';
import { MdLyrics } from 'react-icons/md';
import {
  RiHeartFill,
  RiHeartLine,
  RiListUnordered,
  RiMusic2Line,
  RiPauseCircleFill,
  RiPlayCircleFill,
  RiRepeatLine,
  RiRepeatOneLine,
  RiShareLine,
  RiShuffleLine,
  RiSkipBackFill,
  RiSkipForwardFill,
  RiVolumeMuteLine,
  RiVolumeUpLine,
} from 'react-icons/ri';
import Button from '~components/Button/Button';
import Figure from '~components/Figure/Figure';
import TextLink from '~components/TextLink/TextLink';

const PlayerScreen = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0); // 0: off, 1: all, 2: one
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [audioQuality, setAudioQuality] = useState('HIGH'); // LOW, HIGH, MASTER
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(120);
  const [duration, setDuration] = useState(225); // Example duration: 3:45

  const [trackData, setTrackData] = useState<any>(null);

  useEffect(() => {
    // Simulating fetching track data from a backend
    const fetchTrackData = async () => {
      // In a real app, you'd make an API call here
      const mockData = {
        title: 'Blinding Lights',
        artist: 'The Weeknd asd asdada asdsad asdasda asdasdas',
        album: 'After Hours',
        albumArt:
          'https://dx35vtwkllhj9.cloudfront.net/universalstudios/despicable-me-4/images/gallery/image6.jpg',
        lyrics: `
        Bhigi Bhigi Raaton Men, Mithi Mithi Baaton Men
        Aisi Barasaato Men, Kaisaa Lagataa Hai?
        Lataa: [Aisaa Lagataa Hai Tum Banake Baadal,
        Mere Badan Ko Bhigoke Mujhe, Chhed Rahe Ho O
        Chhed Rahe Ho ] - 2


        [Ambar Khele Holi Ui Maan
        Bhigi Mori Choli, Hamajoli, Hamajoli ] - 2
        O, Paani Ke Is Rele Men Saavan Ke Is Mele Men
        Chhat Pe Akele Men
        Kaisaa Lagataa Hai
        Aisaa Lagataa Hai
        Tu Banake Ghataa Apane Sajan Ko Bhigoke Khel Khel Rahi Ho O
        Khel Rahi Ho


        Aisaa Lagataa Hai

        Tum Banake Baadal Mere Badan Ko Bhigoke Mujhe Chhed Rahe Ho Ho
        Chhed Rahe Ho
        [Barakhaa Se Bachaa Luun Tujhe
        Sine Se Lagaa Luun
        Aa Chhupaa Luun Aa Chhuupaa Luun ] - 2

        Dil Ne Pukaaraa Dekho Rut Kaa Ishaaraa Dekho
        Uf Ye Nazaaraa Dekho
        Kaisaa Lagataa Hai, Bolo?

        Aisaa Lagataa Hai Kuchh Ho Jaayegaa
        Mast Pavan Ke Ye Jhoken Sainyaa Dekh Rahe Ho O
        Dekh Rahe Ho
        Aisaa Lagataa Hai
        Tum Banake Baadal Mere Badan Ko Bhigoke Mujhe Chhed Rahe Ho Ho
        Chhed Rahe Ho
                `,
      };
      setTrackData(mockData as any);
    };

    fetchTrackData();
  }, []);

  const togglePlayPause = () => setIsPlaying(!isPlaying);
  const toggleFavorite = () => setIsFavorite(!isFavorite);
  const toggleRepeat = () => setRepeatMode((prevMode) => (prevMode + 1) % 3);
  const toggleShuffle = () => setIsShuffleOn(!isShuffleOn);
  const toggleLyrics = () => setShowLyrics(!showLyrics);

  // const changeAudioQuality = () => {
  //   const qualities = ['LOW', 'HIGH', 'MASTER'];
  //   setAudioQuality(qualities[(qualities.indexOf(audioQuality) + 1) % qualities.length]);
  // };

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
        <button className='transition-colors text-text-primary active:text-text-primary active:scale-95'>
          <RiListUnordered size={24} />
        </button>
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
              isPlaying ? 'scale-1' : 'scale-95'
            }`}>
            <Figure
              src='https://dx35vtwkllhj9.cloudfront.net/universalstudios/despicable-me-4/images/gallery/image6.jpg'
              size='full'
              radius='md'
              alt=''
              fit='cover'
              position='top'
            />
          </div>
          <div className='mb-8 text-center'>
            <TextLink classNames='mb-2' size='xl' weight='bold'>
              {trackData?.title || 'Song Title'}
            </TextLink>
            <TextLink size='md' color='light' lineCount={2}>
              {trackData?.artist || 'Artist Name'}
            </TextLink>
          </div>
        </div>

        {/* Lyrics */}
        {showLyrics && (
          <div className='w-full pl-4 overflow-y-scroll h-96'>
            <h3 className='mb-4 text-xl font-semibold'>Lyrics</h3>
            <p className='whitespace-pre-line'>
              {trackData?.lyrics || 'Lyrics not available'}
            </p>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className='w-full mb-6'>
        <div className='relative'>
          <input
            type='range'
            min='0'
            max='100'
            value={volume}
            onChange={(e) => {
              setVolume(Number(e.target.value));
              setIsMuted(Number(e.target.value) === 0);
            }}
            className='w-full h-1 bg-gray-600 rounded appearance-none focus:outline-none'
            style={{
              background: `linear-gradient(to right, #FFAB00 0%, #B2222D ${volume}%, #282828 ${volume}%, #282828 100%)`,
            }}
          />
          <div className='flex justify-between mt-2 text-xs text-text-primary'>
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      {/* Main Controls */}
      <div className='flex items-center justify-center mb-8 space-x-6'>
        <button
          className={`text-text-primary active:text-text-primary active:scale-95 transition-colors ${
            isShuffleOn ? 'text-link-hover' : ''
          }`}
          onClick={toggleShuffle}>
          <RiShuffleLine size={24} />
        </button>
        <Button
          classNames='transition-transform text-text-primary active:scale-110'
          variant='unstyled'
          onClick={() => {}}>
          <RiSkipBackFill size={36} />
        </Button>
        <Button
          variant='unstyled'
          onClick={togglePlayPause}
          classNames='p-0 m-0 text-text-primary transition-transform rounded-full active:scale-110'>
          {isPlaying ? <RiPauseCircleFill size={72} /> : <RiPlayCircleFill size={72} />}
        </Button>
        <Button
          classNames='transition-transform text-text-primary active:scale-110'
          variant='unstyled'
          onClick={() => {}}>
          <RiSkipForwardFill size={36} />
        </Button>
        <button
          className={`text-text-primary active:text-text-primary active:scale-95 transition-colors relative 
            ${repeatMode > 0 ? 'text-link-hover' : ''}`}
          onClick={toggleRepeat}>
          {repeatMode === 2 ? <RiRepeatOneLine size={24} /> : <RiRepeatLine size={24} />}
        </button>
      </div>

      {/* Bottom Controls - Redesigned */}
      <div className='flex items-center justify-between px-4 py-3 rounded-md bg-surface/70 backdrop-blur-md'>
        <div className='flex items-center space-x-4'>
          <button
            className={`text-text-primary transition-colors ${
              isFavorite ? 'text-link-hover' : ''
            }`}
            onClick={toggleFavorite}>
            {isFavorite ? <RiHeartFill size={26} /> : <RiHeartLine size={26} />}
          </button>
          <button
            className='transition-colors text-text-primary active:text-text-primary active:scale-95'
            onClick={toggleLyrics}>
            <MdLyrics size={24} />
          </button>
          <button className='transition-colors text-text-primary active:text-text-primary active:scale-95'>
            <RiShareLine size={24} />
          </button>
        </div>
        <div className='flex items-center space-x-3'>
          <button
            onClick={toggleMute}
            className='text-text-primary active:text-text-primary active:scale-95'>
            {isMuted ? <RiVolumeMuteLine size={24} /> : <RiVolumeUpLine size={24} />}
          </button>
          <div className='flex items-center justify-center w-full'>
            <input
              type='range'
              min='0'
              max='100'
              value={volume}
              onChange={(e) => {
                setVolume(Number(e.target.value));
                setIsMuted(Number(e.target.value) === 0);
              }}
              className='w-full h-1 rounded appearance-none bg-overlay focus:outline-none'
              style={{
                background: `linear-gradient(to right, #FFAB00 0%, #B2222D ${volume}%, #282828 ${volume}%, #282828 100%)`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerScreen;
