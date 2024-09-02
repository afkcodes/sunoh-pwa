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
import { useQueryParams } from '~hooks/useQueryParams';
import useScrollToTop from '~hooks/useScrollToTop';
import { endpoints } from '~network/endpoints';
import http from '~network/http';
import { audio } from '~states/audioStore';

const AlbumScreen: React.FC = () => {
  const { albumId } = useParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const type = useQueryParams().getQueryParam('type');
  console.log('Rendering', type);

  const { data: albumData, isLoading } = useFetch({
    queryKey: [`album_${albumId}`],
    queryFn: async () => await http(`${endpoints.saavn.album}/${albumId}`),
  });
  const { scrollY } = useScroll();
  const [, navigate] = useLocation();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageScale = useTransform(scrollY, [0, 300], [1, 1.2]);
  const imageY = useTransform(scrollY, [0, 300], [0, -50]);
  const imageOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  const togglePlay = () => {};
  const data = albumData?.album;

  const onShuffle = () => {
    mediaActions.shuffle(data, '160kbps');
  };

  const onPlayAll = () => {
    console.log(data);
    mediaActions.playAll(data, '160kbps');
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
        <div>Loading</div>
      ) : (
        <div
          ref={containerRef}
          className='relative min-h-screen overflow-x-hidden bg-background'>
          {data && (
            <ActionHeader ref={titleRef} title={data.title} onMoreClick={() => {}} />
          )}
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
                src={[data.images[2]?.link]}
                alt={data.title}
                fit='cover'
                size='full'
                radius='none'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60' />
            </motion.div>
          </motion.div>

          <div className='relative px-2 py-2'>
            <div ref={titleRef} className='flex flex-col px-2 mb-4'>
              <TextLink size='xl' weight='semibold'>
                {data.title}
              </TextLink>
              <div className='flex flex-col gap-0.5'>
                <TextLink size='base' color='light'>
                  {data.subtitle}
                </TextLink>
                <TextLink size='sm' color='tertiary'>
                  {data.description}
                </TextLink>
              </div>
            </div>

            <div className='flex items-center justify-between px-2'>
              <div className='flex items-start gap-4'>
                <TextLink size='sm' color='tertiary'>
                  {data.listCount && Number(data?.listCount) > 1
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

            <div className='mt-4'>
              <AudioItemContainer
                data={data.list}
                config={dataConfigs.audio}
                audioItemConfig={{
                  type: 'indexed',
                }}
              />
            </div>

            <div className='space-y-4'>
              {albumData.sections.map((section: any, idx: number) => {
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

export default AlbumScreen;
