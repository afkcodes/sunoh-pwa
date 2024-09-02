import React from 'react';

import Tile from '~components/Tile/Tile';
import PaginationContainer from '~containers/PaginationContainer';
import { mediaActions } from '~helper/mediaActions';
import { endpoints } from '~network/endpoints';

interface RadioStation {
  id: string;
  name: string;
  language: string;
  image: string;
}

const Radio: React.FC = () => {
  const renderRadioStation = (station: RadioStation) => (
    <Tile
      onClick={() => {
        mediaActions.createGaanaRadioAndPlay(station);
      }}
      figureConfig={{
        fit: 'cover',
        radius: 'sm',
        size: 'full',
        position: 'top',
      }}
      titleConfig={{
        color: 'primary',
        size: 'sm',
        weight: 'medium',
        classNames: 'text-start',
      }}
      subTitleConfig={{
        color: 'light',
        size: 'xs',
        classNames: 'text-start',
      }}
      data={station}
      config={{
        id: 'id',
        images: 'image',
        title: 'name',
        subtitle: 'language',
      }}
    />
  );

  return (
    <PaginationContainer<RadioStation>
      endpoint={endpoints.gaana.radio.popular}
      renderItem={renderRadioStation}
      getItemKey={(station) => station.id}
      queryKey='radio-stations'
    />
  );
};

export default Radio;
