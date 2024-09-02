import { motion, useScroll, useTransform } from 'framer-motion';
import { Fragment, useEffect, useRef, useState } from 'react';
import {
  LuChevronLeft,
  LuHeart,
  LuMoreVertical,
  LuPause,
  LuPlay,
  LuShuffle,
} from 'react-icons/lu';
import { RiShareForwardLine } from 'react-icons/ri';
import { useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import Button from '~components/Button/Button';
import Figure from '~components/Figure/Figure';
import TextLink from '~components/TextLink/TextLink';
import { dataConfigs } from '~configs/data.config';
import AudioItemContainer from '~containers/AudioItemContainer';
import AudioStateContainer from '~containers/AudioStateContainer';
import { mediaActions } from '~helper/mediaActions';
import useFetch from '~hooks/useFetch';
import useScrollToTop from '~hooks/useScrollToTop';
import { endpoints } from '~network/endpoints';
import http from '~network/http';

const PlaylistScreen = () => {
  const containerRef = useRef(null);
  const { playlistId } = useParams();

  const { scrollY } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const imageScale = useTransform(scrollY, [0, 700], [1, 0.5]);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (titleRef.current) {
        const titlePosition = titleRef.current.getBoundingClientRect().top;
        setIsHeaderVisible(titlePosition < 0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  let [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const url =
    type === 'mix'
      ? `${endpoints.saavn.mix}/${playlistId}`
      : `${endpoints.saavn.playlist}/${playlistId}`;

  const { data, isLoading } = useFetch({
    queryKey: [`album_${playlistId}`],
    queryFn: async () => await http(url),
  });

  const onShuffle = () => {
    mediaActions.shuffle(data);
  };

  const onPlayAll = () => {
    mediaActions.playAll(data);
  };

  useScrollToTop();

  return (
    <Fragment>
      {isLoading ? (
        <div>LOADING</div>
      ) : (
        <div
          ref={containerRef}
          className='relative min-h-screen overflow-y-auto text-white bg-background'>
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: isHeaderVisible ? 1 : 0,
              y: isHeaderVisible ? 0 : -20,
            }}
            transition={{ duration: 0.3 }}
            className='fixed top-0 left-0 right-0 z-20 flex justify-between py-3 bg-surface bg-opacity-70 backdrop-blur-md'>
            <Button
              variant='unstyled'
              classNames='p-0 m-0 transition-all duration-300 active:scale-90 pl-4'
              size='md'
              radius='full'
              onClick={() => {}}>
              <LuChevronLeft size={24} />
            </Button>
            <div className='text-center'>
              <TextLink weight='medium' size='md'>
                {data?.title}
              </TextLink>
            </div>
            <Button
              variant='unstyled'
              classNames='p-0 m-0 transition-all duration-300 active:scale-90 pr-3.5'
              size='md'
              radius='full'
              onClick={() => {}}>
              <LuMoreVertical size={24} />
            </Button>
          </motion.div>
          {/* Content */}
          <div className='relative z-10 min-h-screen pt-3'>
            <div className='flex flex-col items-center p-4 mb-2'>
              <div className='absolute top-0 left-0 right-0 opacity-30 blur-md'>
                <Figure
                  src={[data?.images]}
                  alt='Playlist Cover'
                  fit='cover'
                  size='full'
                />
              </div>
              <div className='aspect-square h-80 w-80'>
                <motion.div
                  style={{ scale: imageScale }}
                  className='mb-4 overflow-hidden rounded-lg shadow-2xl'>
                  <Figure
                    src={[data?.images]}
                    alt='Playlist Cover'
                    fit='cover'
                    size='full'
                    position='right-top'
                  />
                </motion.div>
              </div>
            </div>

            <div className='relative px-2 py-2' ref={titleRef}>
              <div className='text-center'>
                <TextLink size='xl' weight='bold'>
                  {data?.title}
                </TextLink>
                <TextLink size='md' weight='semibold' color='light'>
                  {data?.subtitle}
                </TextLink>
                <TextLink size='sm' color='tertiary'>
                  {data?.artist && data?.artist.map((artist: any) => `${artist.name}, `)}
                </TextLink>
              </div>
              <div className='flex items-center justify-between px-2 mt-4 mb-6'>
                <div className='flex items-start gap-4'>
                  <TextLink size='sm' color='tertiary'>
                    {data?.listCount && Number(data?.listCount) > 1
                      ? `${data?.listCount} songs`
                      : `${data?.listCount} song`}
                  </TextLink>
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
                    onClick={onShuffle}
                    classNames='p-0 transition-all duration-300 active:scale-90'>
                    <LuShuffle size={22} />
                  </Button>
                  <AudioStateContainer
                    renderItem={(audioState) => (
                      <Button
                        variant='primary'
                        classNames='transition-all duration-300 active:scale-90'
                        radius='full'
                        size='md'
                        onClick={onPlayAll}
                        prefixIcon={
                          audioState.playbackState === 'playing' &&
                          audioState.currentPlaybackSource === data.id ? (
                            <LuPause size={22} fill='white' />
                          ) : (
                            <LuPlay fill='white' size={22} />
                          )
                        }>
                        {audioState.playbackState === 'playing' &&
                        audioState.currentPlaybackSource === data.id
                          ? 'PAUSE'
                          : 'PLAY'}
                      </Button>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className='px-2 space-y-2'>
              <AudioItemContainer
                data={data.list}
                config={dataConfigs.audio}
                audioItemConfig={{
                  type: 'thumbnail',
                }}
              />
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default PlaylistScreen;
