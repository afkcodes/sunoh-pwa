import { componentConfig } from '~configs/component.config';
import radioData from '~constants/getRadioChannels.json';
import TileContainer from '~containers/TileContainer';
import { createRadioMediaTrack } from '~helper/common';
import { audio } from '~states/audioStore';
const LiveRadio = () => {
  const onClick = (_x: any, _y: any, item: any) => {
    const radioTrack = createRadioMediaTrack(item);
    audio.addMediaAndPlay(radioTrack);
  };
  return (
    <div>
      <TileContainer
        data={radioData}
        config={{
          title: 'name',
          images: 'player_image',
          image: 'player_image',
          subtitle: 'city',
          id: 'station_uid',
        }}
        layout='grid'
        tileConfig={{
          ...componentConfig.albumTileConfig,
          figureConfig: {
            fit: 'cover',
            radius: 'sm',
            size: 'full',
            position: 'top',
            shouldUseObserver: false,
          },
        }}
        onTileClick={onClick}
      />
    </div>
  );
};

export default LiveRadio;
