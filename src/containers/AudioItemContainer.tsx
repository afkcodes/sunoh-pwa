import AudioItem from '~components/AudioItem/AudioItem';
import { isValidArray } from '~helper/common';
import { AudioItemContainerProps } from '~types/component.types';

const AudioItemContainer: React.FC<AudioItemContainerProps> = ({
  data,
  config,
  audioItemConfig,
}) => {
  return (
    <div>
      {isValidArray(data)
        ? data.map((song: any, index: number) => (
            <div className='mb-2' key={song.id}>
              <AudioItem
                data={song}
                config={config}
                onClick={audioItemConfig.onClick}
                onOptionsClick={audioItemConfig.onOptionsClick}
                type={audioItemConfig.type}
                isPlaying={false}
                currentProgress={50}
                index={index + 1}
              />
            </div>
          ))
        : null}
    </div>
  );
};

export default AudioItemContainer;
