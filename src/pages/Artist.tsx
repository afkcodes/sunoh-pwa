import { motion, useScroll, useTransform } from 'framer-motion';
import { useCallback, useRef } from 'react';
import { LuHeart, LuMoreVertical, LuShuffle } from 'react-icons/lu';
import { RiPauseMiniFill, RiPlayMiniFill, RiShareForwardLine } from 'react-icons/ri';
import { Fragment } from 'react/jsx-runtime';
import { useLocation, useParams } from 'wouter';
import ActionHeader from '~components/ActionHeader';
import Button from '~components/Button/Button';
import Figure from '~components/Figure/Figure';
import Section from '~components/Section/Section';
import TextLink from '~components/TextLink/TextLink';
import { componentConfig } from '~configs/component.config';
import { dataConfigs } from '~configs/data.config';
import AudioStateContainer from '~containers/AudioStateContainer';
import { createMediaTrack, formatNumber } from '~helper/common';
import { mediaActions } from '~helper/mediaActions';
import useFetch from '~hooks/useFetch';
import useScrollToTop from '~hooks/useScrollToTop';
import { endpoints } from '~network/endpoints';
import http from '~network/http';
import { audio } from '~states/audioStore';

const ArtistScreen = () => {
  useScrollToTop();
  const [, navigate] = useLocation();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -150]);
  const { artistId } = useParams();
  const titleRef = useRef<HTMLHeadingElement>(null);

  const { data, isSuccess } = useFetch({
    queryKey: [`artist_${artistId}`],
    queryFn: async () => await http(`${endpoints.saavn.artist}/${artistId}`),
  });

  const play = (item: any) => {
    const mediaTrack = createMediaTrack(item, '160kbps');
    audio.addMediaAndPlay(mediaTrack);
  };

  const onShuffle = (audioData: any) => {
    console.log(audioData);
    mediaActions.shuffle({ id: artistId, list: audioData }, '160kbps');
  };

  const onPlayAll = (audioData: any) => {
    mediaActions.playAll({ id: artistId, list: audioData }, '160kbps');
  };

  const onClick = useCallback(
    (category: string, token: string, item: any) => {
      const routes: Record<string, string> = {
        album: `/album/${token}`,
        playlist: `/playlist/${token}`,
        mix: `/playlist/${token}?category=mix`,
        artist: `/artist/${token}`,
      };
      if (category === 'song') {
        play(item);
      } else {
        navigate(routes[category] || '/');
      }
    },

    [navigate]
  );

  return (
    <Fragment>
      {isSuccess ? (
        <div className='min-h-screen text-white bg-black'>
          <motion.div
            className='fixed top-0 left-0 w-full overflow-hidden h-96'
            style={{ y }}>
            <Figure
              src={[data.images[2].link]}
              alt={data.name}
              size='full'
              position='top'
              fit='cover'
              radius='none'
            />
            <div className='absolute inset-0 bg-gradient-to-b from-transparent to-background' />
          </motion.div>
          <ActionHeader ref={titleRef} title={data.title} onMoreClick={() => {}} />
          <div className='relative z-10 min-h-screen pt-96'>
            <div className='container pt-2 mx-auto bg-background'>
              <div className='px-2 my-4' ref={titleRef}>
                <TextLink size='xxl' weight='bold'>
                  {data.title}
                </TextLink>
                <TextLink size='sm' color='light'>
                  {formatNumber(Number(data.followers))} Followers
                </TextLink>
              </div>
              {/* Controls */}
              <div className='flex items-center justify-between px-2'>
                <div className='flex items-start gap-4'>
                  <Button
                    variant='unstyled'
                    onClick={() => {}}
                    classNames='p-0 m-0 transition-all duration-300 active:scale-90'>
                    <RiShareForwardLine size={22} />
                  </Button>
                  <Button
                    variant='unstyled'
                    onClick={() => {}}
                    classNames='p-0 m-0 transition-all duration-300 active:scale-90'>
                    <LuMoreVertical size={22} />
                  </Button>
                </div>
                <div className='flex gap-4'>
                  <Button
                    variant='unstyled'
                    onClick={() => {}}
                    classNames='p-0 m-0 transition-all duration-300 active:scale-90'>
                    <LuHeart size={22} />
                  </Button>
                  <Button
                    variant='unstyled'
                    size='md'
                    radius='sm'
                    onClick={() => {
                      onShuffle(data?.sections?.[0]?.data);
                    }}
                    classNames='p-0 transition-all duration-300 active:scale-90'>
                    <LuShuffle size={22} />
                  </Button>
                  <AudioStateContainer
                    renderItem={(audioState) => (
                      <Button
                        variant='primary'
                        classNames='transition-all duration-300  p-2 active:scale-90'
                        radius='full'
                        size='md'
                        onClick={() => {
                          onPlayAll(data?.sections?.[0]?.data);
                        }}>
                        {audioState.playbackState === 'playing' &&
                        audioState.currentPlaybackSource === artistId ? (
                          <RiPauseMiniFill size={38} fill='white' stroke='2' />
                        ) : (
                          <RiPlayMiniFill fill='white' size={38} />
                        )}
                      </Button>
                    )}
                  />
                </div>
              </div>

              <div className='space-y-4'>
                {data.sections.map((section: any, idx: number) => {
                  return (
                    <Section
                      key={idx}
                      headerConfig={{
                        textLinkConfig: componentConfig.headerConfig,
                        actionButtonConfig: {
                          ...componentConfig.headerActionButtonConfig,
                          onClick: () => {},
                          children: 'More',
                        },
                      }}
                      data={section}
                      config={
                        section.data[0].type === 'song'
                          ? dataConfigs.audio
                          : dataConfigs.album
                      }
                      containerConfig={{
                        tileContainerConfig: {
                          layout: section.data[0].type === 'song' ? 'list' : 'scrollList',
                          onTileClick: onClick,
                          tileConfig:
                            section?.data?.[0]?.type === 'song'
                              ? {
                                  figureConfig: { fit: 'cover', size: 'xs' },
                                  titleConfig: { size: 'sm', weight: 'medium' },
                                  subTitleConfig: { size: 'xs' },
                                }
                              : {
                                  ...componentConfig.albumTileConfig,
                                  figureConfig: {
                                    size: 'xl',
                                    fit: 'cover',
                                    radius:
                                      section?.data?.[0]?.type === 'artist'
                                        ? 'full'
                                        : 'sm',
                                  },
                                },
                        },
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </Fragment>
  );
};

export default ArtistScreen;

// import { Play } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import { LuHeart, LuMoreVertical, LuShuffle } from 'react-icons/lu';
// import { RiPauseMiniFill, RiPlayMiniFill, RiShareForwardLine } from 'react-icons/ri';
// import Button from '~components/Button/Button';
// import Figure from '~components/Figure/Figure';
// import TextLink from '~components/TextLink/TextLink';
// import AudioStateContainer from '~containers/AudioStateContainer';

// export default function Component() {
//   const [scrollY, setScrollY] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrollY(window.scrollY);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   return (
//     <div className='flex flex-col min-h-screen text-white bg-background'>
//       <div className='relative overflow-hidden h-96'>
//         <div
//           style={{
//             transform: `translateY(${scrollY * 0.5}px)`,
//           }}>
//           <Figure
//             alt='Cyber Dreamers band performing live'
//             src={[
//               'https://images.news18.com/ibnlive/uploads/2024/03/untitled-design-29-2024-03-7fc38571c58e961820dc00db0c41505b.png?impolicy=website&width=640&height=480',
//             ]}
//             fit='cover'
//             size='full'
//             radius='none'
//           />
//         </div>

//         <div className='absolute inset-0 bg-black bg-opacity-30' />
//         <div className='absolute bottom-0 left-0 p-6'>
//           <h1 className='mb-2 text-4xl font-bold'>Cyber Dreamers</h1>
//           <p className='text-xl text-zinc-300'>Electronic • Synthwave • Cyberpunk</p>
//         </div>
//       </div>
//       {/* <div className='sticky top-0 z-10 bg-zinc-900 bg-opacity-90 backdrop-blur-md'>
//         <div className='flex items-center justify-between p-4'>
//           <Button variant='dark' classNames='text-white'>
//             <svg
//               xmlns='http://www.w3.org/2000/svg'
//               width='24'
//               height='24'
//               viewBox='0 0 24 24'
//               fill='none'
//               stroke='currentColor'
//               strokeWidth='2'
//               strokeLinecap='round'
//               strokeLinejoin='round'
//               className='w-6 h-6'>
//               <polyline points='15 18 9 12 15 6' />
//             </svg>
//             <span className='sr-only'>Back</span>
//           </Button>
//           <div className='flex space-x-2'>
//             <Button
//               variant='dark'
//               classNames='bg-emerald-500 hover:bg-emerald-600 text-white'>
//               Play
//               <Play className='w-4 h-4 ml-2' />
//             </Button>
//             <Button variant='outline' size='sm'>
//               <Heart className='w-4 h-4' />
//               <span className='sr-only'>Follow</span>
//             </Button>
//             <Button variant='dark' size='sm'>
//               <MoreHorizontal className='w-6 h-6' />
//               <span className='sr-only'>More options</span>
//             </Button>
//           </div>
//         </div>
//       </div> */}

//       <div className='flex items-center justify-between px-2 mt-4'>
//         <div className='flex items-start gap-4'>
//           <TextLink size='sm' color='tertiary'>
//             {/* {data?.listCount && Number(data?.listCount) > 1
//               ? `${data?.listCount} songs`
//               : `${data?.listCount} song`} */}
//             asd
//           </TextLink>
//           <Button
//             variant='unstyled'
//             onClick={() => {}}
//             classNames='p-0 m-0 transition-all duration-300 active:scale-90'>
//             <RiShareForwardLine size={22} />
//           </Button>
//           <Button
//             variant='unstyled'
//             onClick={() => {}}
//             classNames='p-0 m-0 transition-all duration-300 active:scale-90'>
//             <LuMoreVertical size={22} />
//           </Button>
//         </div>
//         <div className='flex gap-4'>
//           <Button
//             variant='unstyled'
//             onClick={() => {}}
//             classNames='p-0 m-0 transition-all duration-300 active:scale-90'>
//             <LuHeart size={22} />
//           </Button>
//           <Button
//             variant='unstyled'
//             size='md'
//             radius='sm'
//             onClick={() => {}}
//             classNames='p-0 transition-all duration-300 active:scale-90'>
//             <LuShuffle size={22} />
//           </Button>
//           <AudioStateContainer
//             renderItem={(audioState) => (
//               <Button
//                 variant='primary'
//                 classNames='transition-all duration-300  p-2 active:scale-90'
//                 radius='full'
//                 size='md'
//                 onClick={() => {}}>
//                 {audioState.playbackState === 'playing' &&
//                 audioState.currentPlaybackSource === 'data.id' ? (
//                   <RiPauseMiniFill size={38} fill='white' stroke='2' />
//                 ) : (
//                   <RiPlayMiniFill fill='white' size={38} />
//                 )}
//               </Button>
//             )}
//           />
//         </div>
//       </div>
//       <div>
//         <div className='py-6 space-y-8'>
//           <section>
//             <h2 className='mb-4 text-2xl font-semibold'>Popular Tracks</h2>
//             <ul className='space-y-2'>
//               {[
//                 'Neon Lights',
//                 'Digital Sunset',
//                 'Hologram Heart',
//                 'Quantum Love',
//                 'Cyber Dreams',
//               ].map((track, index) => (
//                 <li
//                   key={index}
//                   className='flex items-center justify-between p-2 transition-colors rounded-md hover:bg-zinc-800'>
//                   <div className='flex items-center'>
//                     <img
//                       alt={`${track} album cover`}
//                       className='w-12 h-12 mr-4 rounded-md'
//                       src={`/placeholder.svg?height=48&width=48&text=${track.replace(
//                         ' ',
//                         '+'
//                       )}`}
//                     />
//                     <div>
//                       <p className='font-medium'>{track}</p>
//                       <p className='text-sm text-zinc-400'>Cyber Dreamers</p>
//                     </div>
//                   </div>
//                   <Button variant='dark' size='sm'>
//                     <Play className='w-4 h-4' />
//                     <span className='sr-only'>Play {track}</span>
//                   </Button>
//                 </li>
//               ))}
//             </ul>
//           </section>
//           <section>
//             <h2 className='mb-4 text-2xl font-semibold'>Albums</h2>
//             <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4'>
//               {[
//                 'Cyberpunk Dreams',
//                 'Neon Nights',
//                 'Digital Horizons',
//                 'Synthetic Emotions',
//               ].map((album, index) => (
//                 <div key={index} className='space-y-2'>
//                   <img
//                     alt={`${album} album cover`}
//                     className='object-cover w-full rounded-md aspect-square'
//                     src={`/placeholder.svg?height=200&width=200&text=${album.replace(
//                       ' ',
//                       '+'
//                     )}`}
//                   />
//                   <p className='font-medium truncate'>{album}</p>
//                   <p className='text-sm text-zinc-400'>2023</p>
//                 </div>
//               ))}
//             </div>
//           </section>
//           <section>
//             <h2 className='mb-4 text-2xl font-semibold'>About</h2>
//             <p className='text-zinc-300'>
//               Cyber Dreamers is an electronic music duo known for their futuristic
//               soundscapes and pulsating rhythms. Blending elements of synthwave and
//               cyberpunk, their music transports listeners to neon-lit cityscapes of
//               tomorrow.
//             </p>
//           </section>
//           <section>
//             <h2 className='mb-4 text-2xl font-semibold'>Related Artists</h2>
//             <div className='flex pb-4 space-x-4 overflow-x-auto'>
//               {['Neon Pulse', 'Synth Riders', 'Digital Horizon', 'Pixel Waves'].map(
//                 (artist, index) => (
//                   <div key={index} className='flex-none w-32'>
//                     <img
//                       alt={`${artist} artist photo`}
//                       className='object-cover w-32 h-32 mb-2 rounded-full'
//                       src={`/placeholder.svg?height=128&width=128&text=${artist.replace(
//                         ' ',
//                         '+'
//                       )}`}
//                     />
//                     <p className='text-sm font-medium text-center truncate'>{artist}</p>
//                   </div>
//                 )
//               )}
//             </div>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// }
