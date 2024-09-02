// import { motion, useScroll, useTransform } from 'framer-motion';
// import { useEffect, useRef, useState } from 'react';
// import { LuChevronLeft, LuMoreVertical, LuPlay } from 'react-icons/lu';
// import AudioItem from '~components/AudioItem/AudioItem';
// import Button from '~components/Button/Button';
// import Figure from '~components/Figure/Figure';
// import TextLink from '~components/TextLink/TextLink';
// import { dataConfigs } from '~configs/data.config';

// const artist = {
//   name: 'Cosmic Drift',
//   image:
//     'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
//   bio: 'Cosmic Drift is an electronic music producer known for their ethereal soundscapes and futuristic beats.',
// };

// const albums = [
//   {
//     id: 1,
//     title: 'Stellar Whispers',
//     year: '2023',
//     tracks: 12,
//     image:
//       'https://images.unsplash.com/photo-1614149162883-504ce4d13909?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
//   },
//   {
//     id: 2,
//     title: 'Nebula Dreams',
//     year: '2021',
//     tracks: 10,
//     image:
//       'https://images.unsplash.com/photo-1535727118629-331b2982b88b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80',
//   },
// ];

// const popularTracks = [
//   { id: 1, title: 'Quantum Leap', subtitle: 'Stellar Whispers', duration: '324' },
//   { id: 2, title: 'Astral Projection', subtitle: 'Nebula Dreams', duration: '287' },
//   { id: 3, title: 'Galactic Lullaby', subtitle: 'Stellar Whispers', duration: '356' },
//   { id: 4, title: 'Cosmic Dust', subtitle: 'Nebula Dreams', duration: '301' },
// ];

// const relatedArtists = [
//   {
//     id: 1,
//     name: 'Electro Nova',
//     image:
//       'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
//   },
//   {
//     id: 2,
//     name: 'Nebula Noise',
//     image:
//       'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
//   },
// ];

// const ArtistScreen = () => {
//   const containerRef = useRef(null);
//   const { scrollY } = useScroll({
//     target: containerRef,
//     offset: ['start start', 'end start'],
//   });
//   const imageScale = useTransform(scrollY, [0, 200], [1, 0.8]);
//   const titleRef = useRef(null);
//   const [isHeaderVisible, setIsHeaderVisible] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (titleRef.current) {
//         const titlePosition = titleRef.current.getBoundingClientRect().top;
//         setIsHeaderVisible(titlePosition < 0);
//       }
//     };

//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <div
//       ref={containerRef}
//       className='relative min-h-screen overflow-y-auto text-white bg-background'>
//       <motion.div
//         initial={{ opacity: 0, y: 0 }}
//         animate={{
//           opacity: isHeaderVisible ? 1 : 0,
//           y: isHeaderVisible ? 0 : -20,
//         }}
//         transition={{ duration: 0.3 }}
//         className='fixed top-0 left-0 right-0 z-20 flex justify-between px-2 py-3 bg-surface bg-opacity-70 backdrop-blur-md'>
//         <Button
//           variant='unstyled'
//           classNames='p-0 m-0 transition-all duration-300 active:scale-90'
//           size='md'
//           radius='full'
//           onClick={() => {}}>
//           <LuChevronLeft size={24} />
//         </Button>
//         <div className='text-center'>
//           <TextLink weight='medium' size='md'>
//             {artist.name}
//           </TextLink>
//         </div>
//         <Button
//           variant='unstyled'
//           classNames='p-0 m-0 transition-all duration-300 active:scale-90'
//           size='md'
//           radius='full'
//           onClick={() => {}}>
//           <LuMoreVertical size={24} />
//         </Button>
//       </motion.div>

//       <div className='relative z-10 min-h-screen pt-3'>
//         <div className='flex flex-col items-center p-4 mb-8'>
//           <div className='absolute top-0 left-0 right-0 opacity-30 blur-md'>
//             <Figure src={[artist.image]} alt={artist.name} fit='cover' size='full' />
//           </div>
//           <div>
//             <motion.div
//               style={{ scale: imageScale }}
//               className='w-64 h-64 mb-4 overflow-hidden rounded-full shadow-2xl'>
//               <Figure src={[artist.image]} alt={artist.name} fit='cover' size='full' />
//             </motion.div>
//           </div>
//           <h1 ref={titleRef} className='mb-2 text-4xl font-bold text-center'>
//             {artist.name}
//           </h1>
//           <p className='mb-4 text-center text-gray-300'>{artist.bio}</p>
//           <Button
//             variant='dark'
//             classNames='px-8 py-2 bg-primary text-white rounded-full'
//             size='lg'
//             onClick={() => {}}>
//             <LuPlay className='mr-2' /> Play
//           </Button>
//         </div>

//         <div className='px-4 mb-8'>
//           <h2 className='mb-4 text-2xl font-semibold'>Albums</h2>
//           <div className='flex pb-4 space-x-4 overflow-x-auto'>
//             {albums.map((album) => (
//               <div key={album.id} className='flex-shrink-0 w-40'>
//                 <Figure src={[album.image]} alt={album.title} fit='cover' size='full' />
//                 <h3 className='font-medium'>{album.title}</h3>
//                 <p className='text-sm text-gray-400'>
//                   {album.year} • {album.tracks} tracks
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className='px-4 mb-8'>
//           <h2 className='mb-4 text-2xl font-semibold'>Popular</h2>
//           <div className='space-y-2'>
//             {popularTracks.map((track, index) => (
//               <AudioItem
//                 key={track.id}
//                 data={track}
//                 config={dataConfigs.audio}
//                 isPlaying={false}
//                 index={index + 1}
//                 currentProgress={0}
//                 type='indexed'
//                 onClick={() => {}}
//                 onOptionsClick={() => {}}
//               />
//             ))}
//           </div>
//         </div>

//         <div className='px-4 mb-8'>
//           <h2 className='mb-4 text-2xl font-semibold'>Related Artists</h2>
//           <div className='flex pb-4 space-x-4 overflow-x-auto'>
//             {relatedArtists.map((relatedArtist) => (
//               <div key={relatedArtist.id} className='flex-shrink-0 w-32 text-center'>
//                 <Figure
//                   src={[relatedArtist.image]}
//                   alt={relatedArtist.name}
//                   fit='cover'
//                   size='full'
//                 />
//                 <h3 className='text-sm font-medium'>{relatedArtist.name}</h3>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ArtistScreen;
