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
import Button from '~components/Button/Button';
import Figure from '~components/Figure/Figure';
import TextLink from '~components/TextLink/TextLink';
import { dataConfigs } from '~configs/data.config';
import AudioItemContainer from '~containers/AudioItemContainer';
import useFetch from '~hooks/useFetch';
import { endpoints } from '~network/endpoints';
import http from '~network/http';

const AlbumScreen: React.FC = () => {
  const { scrollY } = useScroll();
  const { albumId } = useParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const albumTitleRef = useRef<HTMLHeadingElement>(null);
  const imageScale = useTransform(scrollY, [0, 300], [1, 1.2]);
  const imageY = useTransform(scrollY, [0, 300], [0, -50]);
  const imageOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (albumTitleRef.current) {
        const titlePosition = albumTitleRef.current.getBoundingClientRect().top;
        setIsHeaderVisible(titlePosition < 0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const togglePlay = () => {};

  const { data, isLoading } = useFetch({
    queryKey: [`album_${albumId}`],
    queryFn: async () => await http(`${endpoints.saavn.album}/${albumId}`),
  });

  return (
    <Fragment>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div
          ref={containerRef}
          className='relative min-h-screen overflow-x-hidden bg-background'>
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: isHeaderVisible ? 1 : 0,
              y: isHeaderVisible ? 0 : -20,
            }}
            transition={{ duration: 0.3 }}
            className='fixed top-0 left-0 right-0 z-20 flex justify-between px-2 py-3 bg-surface bg-opacity-70 backdrop-blur-md'>
            <Button
              variant='unstyled'
              classNames='p-0 m-0 transition-all duration-300 active:scale-90'
              size='md'
              radius='full'
              onClick={togglePlay}>
              <LuChevronLeft size={24} />
            </Button>
            <div className='text-center'>
              <TextLink weight='medium' size='md'>
                {data?.title}
              </TextLink>
            </div>
            <Button
              variant='unstyled'
              classNames='p-0 m-0 transition-all duration-300 active:scale-90'
              size='md'
              radius='full'
              onClick={togglePlay}>
              <LuMoreVertical size={24} />
            </Button>
          </motion.div>
          <motion.div
            className='relative overflow-hidden h-96'
            style={{
              scale: imageScale,
              y: imageY,
            }}>
            <motion.div
              style={{
                opacity: imageOpacity,
              }}
              className='absolute top-0 left-0 w-full h-full bg-center bg-cover'>
              <Figure
                src={[data?.images[2]?.link]}
                alt={data?.title}
                fit='cover'
                size='full'
                radius='none'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60' />
            </motion.div>
          </motion.div>

          <div className='relative px-2 py-2'>
            <div ref={albumTitleRef} className='flex flex-col px-2 mb-4'>
              <TextLink size='xl' weight='semibold'>
                {data?.title}
              </TextLink>
              <div className='flex flex-col gap-0.5'>
                <TextLink size='base' color='light'>
                  {data?.subtitle}
                </TextLink>
                <TextLink size='sm' color='tertiary'>
                  {data?.description}
                </TextLink>
              </div>
            </div>

            <div className='flex items-center justify-between px-2'>
              <div className='flex items-start gap-4'>
                <TextLink size='sm' color='tertiary'>
                  {data?.listCount && Number(data?.listCount) > 1
                    ? `${data?.listCount} songs`
                    : `${data?.listCount} song`}
                </TextLink>
                <Button
                  variant='unstyled'
                  onClick={togglePlay}
                  classNames='p-0 m-0 transition-all duration-300 active:scale-90'>
                  <RiShareForwardLine size={22} />
                </Button>
                <Button
                  variant='unstyled'
                  onClick={togglePlay}
                  classNames='p-0 m-0 transition-all duration-300 active:scale-90'>
                  <LuMoreVertical size={22} />
                </Button>
              </div>
              <div className='flex gap-4'>
                <Button
                  variant='unstyled'
                  onClick={togglePlay}
                  classNames='p-0 m-0 transition-all duration-300 active:scale-90'>
                  <LuHeart size={22} />
                </Button>
                <Button
                  variant='unstyled'
                  size='md'
                  radius='sm'
                  onClick={togglePlay}
                  classNames='p-0 transition-all duration-300 active:scale-90'>
                  <LuShuffle size={22} />
                </Button>
                <Button
                  variant='primary'
                  classNames='transition-all duration-300 active:scale-90'
                  radius='full'
                  size='md'
                  onClick={togglePlay}
                  prefixIcon={
                    false ? (
                      <LuPause size={22} fill='white' />
                    ) : (
                      <LuPlay fill='white' size={22} />
                    )
                  }>
                  {/* Replace with actual Play State */}
                  {false ? 'PAUSE' : 'PLAY'}
                </Button>
              </div>
            </div>

            <div className='mt-4'>
              <AudioItemContainer
                data={data.list}
                config={dataConfigs.audio}
                audioItemConfig={{
                  onClick: () => {},
                  onOptionsClick: () => {},
                  type: 'indexed',
                }}
              />
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default AlbumScreen;
