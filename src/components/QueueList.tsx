import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { LuMoreVertical } from 'react-icons/lu';
import { RiCloseFill } from 'react-icons/ri';
import Button from './Button/Button';
import Figure from './Figure/Figure';
import TextLink from './TextLink/TextLink';

const QueueList = ({ onClose }: any) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSong, setCurrentSong] = useState({
    id: 0,
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    duration: '3:20',
    progress: 65,
    image: 'https://a10.gaanacdn.com/gn_img/albums/Rz4W8vKxD5/4W87PAOO3x/size_l.jpg',
  });
  const [queue, setQueue] = useState([
    {
      id: 1,
      title: 'Shape of You',
      artist: 'Ed Sheeran',
      duration: '3:53',
      image: 'https://a10.gaanacdn.com/gn_img/albums/Rz4W8vKxD5/4W87PAOO3x/size_l.jpg',
    },
    {
      id: 2,
      title: 'Dance Monkey',
      artist: 'Tones and I',
      duration: '3:29',
      image: 'https://a10.gaanacdn.com/gn_img/albums/Rz4W8vKxD5/4W87PAOO3x/size_l.jpg',
    },
    {
      id: 3,
      title: 'Watermelon Sugar',
      artist: 'Harry Styles',
      duration: '2:54',
      image: 'https://a10.gaanacdn.com/gn_img/albums/Rz4W8vKxD5/4W87PAOO3x/size_l.jpg',
    },
    {
      id: 4,
      title: 'Levitating',
      artist: 'Dua Lipa',
      duration: '3:23',
      image: 'https://a10.gaanacdn.com/gn_img/albums/Rz4W8vKxD5/4W87PAOO3x/size_l.jpg',
    },
  ]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  // Animation variants
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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const playButtonVariants = {
    playing: { scale: 1 },
    paused: { scale: 1.1 },
  };

  return (
    <div className='w-full h-screen p-4 overflow-hidden text-white bg-gradient-to-b from-gray-900 to-black'>
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
          <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.2 }}>
            <RiCloseFill size={24} />
          </motion.div>
        </Button>
      </motion.div>

      {/* Now Playing Section */}
      <motion.div
        className='relative mb-6 overflow-hidden rounded-md shadow-lg'
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 300, damping: 24 }}>
        {/* Blurred Background */}
        <div className='absolute inset-0 bg-black bg-opacity-50'></div>

        {/* Animated Progress Background */}
        <motion.div
          className='absolute inset-0 bg-gradient-to-r from-surface/20 to-white/15'
          initial={{ right: '100%' }}
          animate={{ right: `${100 - currentSong.progress}%` }}
          transition={{ duration: 1, ease: 'easeInOut' }}></motion.div>

        {/* Content */}
        <div className='relative p-3'>
          <div className='flex items-center space-x-4'>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <Figure
                src={[currentSong.image]}
                alt={currentSong.title}
                size='xs'
                fit='cover'
                radius='sm'
              />
            </motion.div>
            <div className='flex-grow'>
              <motion.h2
                className='text-lg font-semibold'
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}>
                {currentSong.title}
              </motion.h2>
              <motion.p
                className='text-sm text-gray-300'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}>
                {currentSong.artist}
              </motion.p>
            </div>
          </div>
          {/* <motion.div
            className='flex items-center justify-between mt-4'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}>
            <div className='flex space-x-4'>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className='text-white transition-colors hover:text-green-400'>
                <LuShuffle size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className='text-white transition-colors hover:text-green-400'>
                <LuSkipForward size={20} />
              </motion.button>
              <motion.button
                variants={playButtonVariants}
                animate={isPlaying ? 'playing' : 'paused'}
                onClick={togglePlay}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className='text-white transition-colors hover:text-green-400'>
                {isPlaying ? <LuPause size={24} /> : <LuPlay size={24} />}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className='text-white transition-colors hover:text-green-400'>
                <LuRepeat size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className='text-white transition-colors hover:text-green-400'>
                <LuVolume2 size={20} />
              </motion.button>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className='text-white transition-colors hover:text-red-400'>
              <LuHeart size={20} />
            </motion.button>
          </motion.div> */}
        </div>
      </motion.div>

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
          {queue.map((song, index) => (
            <motion.div
              key={song.id}
              variants={itemVariants}
              layout
              className='flex items-center justify-between p-2 mb-2 transition-colors rounded-lg hover:bg-gray-800'
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}>
              <div className='flex items-center space-x-4'>
                <motion.img
                  src={song.image}
                  alt={song.title}
                  className='w-12 h-12 rounded-md'
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                />
                <div>
                  <motion.p
                    className='font-medium'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}>
                    {song.title}
                  </motion.p>
                  <motion.p
                    className='text-sm text-gray-400'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.1 }}>
                    {song.artist}
                  </motion.p>
                </div>
              </div>
              <div className='flex items-center space-x-4'>
                <span className='text-sm text-gray-400'>{song.duration}</span>
                <motion.button
                  className='text-gray-400 transition-colors hover:text-white'
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}>
                  <LuMoreVertical size={20} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default QueueList;
