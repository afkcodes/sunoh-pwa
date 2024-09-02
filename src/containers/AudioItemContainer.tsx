import AudioItem from '~components/AudioItem/AudioItem';
import { createMediaTrack, isValidArray } from '~helper/common';
import { audio, useAudio } from '~states/audioStore';
import { AudioItemContainerProps } from '~types/component.types';

const AudioItemContainer: React.FC<AudioItemContainerProps> = ({
  data,
  config,
  audioItemConfig,
}) => {
  const [audioState] = useAudio();

  const play = (item: any) => {
    const mediaTrack = createMediaTrack(item, '160kbps');
    audio.addMediaAndPlay(mediaTrack);
  };

  return (
    <div>
      {isValidArray(data)
        ? data.map((song: any, index: number) => (
            <div className='mb-2' key={song.id}>
              <AudioItem
                data={song}
                config={config}
                onClick={play}
                onOptionsClick={() => {}}
                type={audioItemConfig.type}
                playbackState={audioState.playbackState}
                currentProgress={audioState.progress as number}
                index={index + 1}
                currentTrackId={audioState.currentTrack.id as string}
              />
            </div>
          ))
        : null}
    </div>
  );
};

export default AudioItemContainer;
