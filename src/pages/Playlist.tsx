import { motion, useScroll, useTransform } from 'framer-motion';
import { Fragment, useCallback, useRef } from 'react';
import { LuHeart, LuMoreVertical, LuShuffle } from 'react-icons/lu';
import { RiPauseMiniFill, RiPlayMiniFill, RiShareForwardLine } from 'react-icons/ri';
import { useLocation, useParams } from 'wouter';
import ActionHeader from '~components/ActionHeader';
import Button from '~components/Button/Button';
import Figure from '~components/Figure/Figure';
import Section from '~components/Section/Section';
import TextLink from '~components/TextLink/TextLink';
import { componentConfig } from '~configs/component.config';
import { dataConfigs } from '~configs/data.config';
import AudioItemContainer from '~containers/AudioItemContainer';
import AudioStateContainer from '~containers/AudioStateContainer';
import { createMediaTrack } from '~helper/common';
import { mediaActions } from '~helper/mediaActions';
import useFetch from '~hooks/useFetch';
import useScrollToTop from '~hooks/useScrollToTop';
import { endpoints } from '~network/endpoints';
import http from '~network/http';
import { audio } from '~states/audioStore';

const PlaylistScreen = () => {
  const containerRef = useRef(null);
  const { playlistId } = useParams();
  const [, navigate] = useLocation();

  const { scrollY } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const imageScale = useTransform(scrollY, [0, 700], [1, 0.5]);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const params = new URL(window.location.href).searchParams;
  const category = params.get('category');

  const url =
    category === 'mix'
      ? `${endpoints.saavn.mix}/${playlistId}`
      : `${endpoints.saavn.playlist}/${playlistId}`;

  const { data: playlistData, isLoading } = useFetch({
    queryKey: [`playlist_${playlistId}`],
    queryFn: async () => await http(url),
  });

  const data = category === 'mix' ? playlistData : playlistData?.album;
  const onShuffle = () => {
    mediaActions.shuffle(data);
  };

  const onPlayAll = () => {
    mediaActions.playAll(data);
  };

  const play = (item: any) => {
    const mediaTrack = createMediaTrack(item, '160kbps');
    audio.addMediaAndPlay(mediaTrack);
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

  useScrollToTop();

  return (
    <Fragment>
      {isLoading ? (
        <div>LOADING</div>
      ) : (
        <div
          ref={containerRef}
          className='relative min-h-screen overflow-y-auto text-white bg-background'>
          {/* Header */}
          {data && (
            <ActionHeader ref={titleRef} title={data.title} onMoreClick={() => {}} />
          )}
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
                        classNames='transition-all duration-300  p-2 active:scale-90'
                        radius='full'
                        size='md'
                        onClick={onPlayAll}>
                        {audioState.playbackState === 'playing' &&
                        audioState.currentPlaybackSource === data.id ? (
                          <RiPauseMiniFill size={38} fill='white' stroke='2' />
                        ) : (
                          <RiPlayMiniFill fill='white' size={38} />
                        )}
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

            <div className='space-y-4'>
              {playlistData?.sections?.map((section: any, idx: number) => {
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
                                    section?.data?.[0]?.type === 'artist' ? 'full' : 'sm',
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
      )}
    </Fragment>
  );
};

export default PlaylistScreen;
