import { MediaTrack } from 'audio_x';
import { useEffect, useState } from 'react';
import { getDominantColor } from '~helper/colorExtractor';
import { getColorWithOpacity, rgbToHex } from '~helper/common';
import { audio } from '~states/audioStore';
import Figure from './Figure/Figure';
import TextLink from './TextLink/TextLink';

const onClick = (track: MediaTrack) => {
  audio.addMediaAndPlay(track);
};

const RecentlyPlayedItem = ({ track }: { track: MediaTrack }) => {
  const [color, setColor] = useState('#');

  useEffect(() => {
    getDominantColor(track.artwork ? track.artwork[0].src : '').then((res) => {
      const arr = res?.split(',');
      setColor(rgbToHex(Number(arr[0]), Number(arr[1]), Number(arr[2])));
    });
  }, [track.artwork]);
  return (
    <div
      style={{
        background: getColorWithOpacity(color, 0.5),
      }}
      onClick={() => {
        onClick(track);
      }}
      className='flex items-center justify-start w-40 p-0 m-0 overflow-hidden shadow-md text-start bg-surface rounded-xs'>
      <div className='flex-shrink-0 w-16 h-16'>
        <Figure
          src={[track.artwork ? track.artwork[0].src : '']}
          alt={track.title}
          fit='cover'
          size='sm'
          radius='none'
        />
      </div>
      <div className='flex-grow px-2 py-1 overflow-hidden'>
        <TextLink size='xs' weight='semibold' lineCount={1}>
          {track.title}
        </TextLink>
        <TextLink size='xxs' color='light'>
          {track.artist}
        </TextLink>
      </div>
    </div>
  );
};

export default RecentlyPlayedItem;
