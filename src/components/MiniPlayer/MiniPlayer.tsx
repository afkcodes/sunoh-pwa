// import { AnimatePresence, motion } from 'framer-motion';
// import { useState } from 'react';
// import { LuChevronUp, LuSkipBack, LuSkipForward } from 'react-icons/lu';
// import {
//   RiHeartFill,
//   RiHeartLine,
//   RiPauseMiniFill,
//   RiPlayMiniFill,
//   RiRfidLine,
// } from 'react-icons/ri';
// import BottomSheet from '~components/BottomSheet/BottomSheet';
// import Button from '~components/Button/Button';
// import Figure from '~components/Figure/Figure';
// import PlayerScreen from '~components/Player/Player';
// import Slider from '~components/Slider/Slider';
// import TextLink from '~components/TextLink/TextLink';

// const MiniPlayer = () => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [isLiked, setIsLiked] = useState(false);
//   const [isJamming, setIsJamming] = useState(false);

//   const [isPlayerExpanded, setPlayerExpanded] = useState(false);

//   const backgroundVariants = {
//     collapsed: { height: '64px' },
//     expanded: { height: '120px' },
//   };

//   const contentVariants = {
//     collapsed: { opacity: 1, transition: { duration: 0.2 } },
//     expanded: { opacity: 1, transition: { duration: 0.2, delay: 0.1 } },
//   };

//   return (
//     <motion.div
//       initial={{ y: 100, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ type: 'spring', stiffness: 100 }}
//       className='fixed left-0 right-0 overflow-hidden bottom-16 bg-nav-background/90 backdrop-blur-md mini-player'>
//       <motion.div
//         className='relative max-w-lg mx-auto'
//         variants={backgroundVariants}
//         initial='collapsed'
//         animate={isExpanded ? 'expanded' : 'collapsed'}>
//         <motion.div
//           className='flex items-center justify-between h-16 px-4'
//           variants={contentVariants}
//           initial='collapsed'
//           onClick={() => {
//             setPlayerExpanded(true);
//           }}
//           animate={isExpanded ? 'expanded' : 'collapsed'}>
//           <div>
//             <Figure
//               src={[
//                 'https://m.media-amazon.com/images/I/81OxUOV+7qL._AC_UF1000,1000_QL80_.jpg',
//               ]}
//               alt='Album Cover'
//               fit='cover'
//               radius='sm'
//               size='xs'
//             />
//           </div>
//           <div className='flex flex-col items-start justify-start flex-grow ml-3 mr-1 '>
//             <TextLink size='sm' weight='semibold' classNames='text-start'>
//               Ethereal Echoes
//             </TextLink>
//             <TextLink size='xs' color='light' classNames='text-start'>
//               Cosmic Sound waves
//             </TextLink>
//           </div>
//           <div className='flex items-center space-x-3'>
//             <Button
//               variant='unstyled'
//               onClick={() => {
//                 setIsLiked(!isLiked);
//               }}
//               classNames={`transition-all duration-300 p-0 m-0 ${
//                 isLiked
//                   ? 'text-primary-default'
//                   : 'text-text-secondary active:text-text-primary active:scale-[90%]'
//               }`}>
//               {isLiked ? <RiHeartFill size={26} /> : <RiHeartLine size={26} />}
//             </Button>
//             <Button
//               onClick={() => {
//                 setIsJamming(!isJamming);
//               }}
//               variant='unstyled'
//               classNames={`focus:outline-none transition-colors m-0 p-0 ${
//                 isJamming
//                   ? 'text-primary-default'
//                   : 'text-text-secondary active:text-text-primary active:scale-[90%]'
//               }`}>
//               <RiRfidLine size={26} />
//             </Button>
//             <Button
//               variant='unstyled'
//               classNames='p-0 m-0 active:scale-[90%]'
//               onClick={() => {
//                 setIsPlaying(!isPlaying);
//               }}>
//               {isPlaying ? <RiPauseMiniFill size={34} /> : <RiPlayMiniFill size={34} />}
//             </Button>
//           </div>
//           <Button
//             variant='unstyled'
//             onClick={() => {
//               setIsExpanded(!isExpanded);
//             }}
//             classNames='ml-3 text-text-secondary transition-colors focus:outline-none p-0 m-0 active:scale-[90%]'>
//             <LuChevronUp
//               size={24}
//               className={`transform transition-transform ${
//                 isExpanded ? 'rotate-180' : ''
//               }`}
//             />
//           </Button>
//         </motion.div>

//         <AnimatePresence>
//           {isExpanded && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1, transition: { duration: 0.4, delay: 0.1 } }}
//               exit={{ opacity: 0, transition: { duration: 0 } }}
//               transition={{ duration: 0.4 }}
//               className='absolute w-full px-4 pb-3 mt-2 bg-transparent'>
//               <div className='flex items-center justify-between mb-2'>
//                 <Button
//                   variant='unstyled'
//                   onClick={() => {
//                     console.log('skip back');
//                   }}
//                   classNames='text-text-secondary transition-colors focus:outline-none active:text-white p-0 m-0 active:scale-[90%]'>
//                   <LuSkipBack size={18} />
//                 </Button>
//                 <div className='w-full px-2'>
//                   <Slider max={100} min={0} onChange={() => {}} value={[50]} />
//                 </div>
//                 <Button
//                   onClick={() => {
//                     console.log('skip back');
//                   }}
//                   variant='unstyled'
//                   classNames='text-text-secondary transition-colors focus:outline-none active:text-white p-0 m-0 active:scale-[90%]'>
//                   <LuSkipForward size={18} />
//                 </Button>
//               </div>
//               <div className='flex justify-between mt-1 text-xs text-gray-400'>
//                 <span>1:23</span>
//                 <span>3:45</span>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>
//       <BottomSheet
//         isOpen={isPlayerExpanded}
//         name='player_sheet'
//         onClose={() => {
//           setPlayerExpanded(false);
//         }}>
//         <PlayerScreen />
//       </BottomSheet>
//     </motion.div>
//   );
// };

// export default MiniPlayer;

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  RiHeartFill,
  RiHeartLine,
  RiPauseMiniFill,
  RiPlayMiniFill,
  RiRfidLine,
} from 'react-icons/ri';
import BottomSheet from '~components/BottomSheet/BottomSheet';
import Button from '~components/Button/Button';
import Figure from '~components/Figure/Figure';
import PlayerScreen from '~components/Player/Player';
import TextLink from '~components/TextLink/TextLink';

const MiniPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isJamming, setIsJamming] = useState(false);
  const [isPlayerExpanded, setPlayerExpanded] = useState(false);
  const [progress, setProgress] = useState(50); // Current progress (0-100)

  useEffect(() => {
    setProgress(75);
  }, []);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className='fixed left-0 right-0 overflow-hidden bottom-16 bg-nav-background/90 backdrop-blur-md mini-player'>
      <div className='relative h-16 max-w-lg mx-auto'>
        {/* Progress Animation */}
        <motion.div
          className='absolute inset-0 bg-gradient-to-r from-surface/20 to-white/15'
          initial={{ right: '100%' }}
          animate={{ right: `${100 - progress}%` }}
          transition={{ duration: 1, ease: 'linear' }}
        />

        <div
          className='relative z-10 flex items-center justify-between h-16 px-4'
          onClick={() => setPlayerExpanded(true)}>
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
          <div className='flex flex-col items-start justify-start flex-grow ml-3 mr-1 '>
            <TextLink size='sm' weight='semibold' classNames='text-start'>
              Ethereal Echoes
            </TextLink>
            <TextLink size='xs' color='light' classNames='text-start'>
              Cosmic Sound waves
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
              classNames='p-0 m-0 active:scale-[90%]'
              onClick={() => {
                setIsPlaying(!isPlaying);
              }}>
              {isPlaying ? <RiPauseMiniFill size={34} /> : <RiPlayMiniFill size={34} />}
            </Button>
          </div>
        </div>
      </div>
      <BottomSheet
        isOpen={isPlayerExpanded}
        name='player_sheet'
        onClose={() => {
          setPlayerExpanded(false);
        }}>
        <PlayerScreen />
      </BottomSheet>
    </motion.div>
  );
};

export default MiniPlayer;
