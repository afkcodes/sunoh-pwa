import { ReactNode } from 'react';
import { Fragment } from 'react/jsx-runtime';
import { AudioStoreState, useAudio } from '~states/audioStore';

interface AudioStateContainerProps {
  renderItem: (audioState: AudioStoreState) => ReactNode;
}

const AudioStateContainer: React.FC<AudioStateContainerProps> = ({ renderItem }) => {
  const [audioState] = useAudio();

  return <Fragment>{renderItem(audioState)}</Fragment>;
};

export default AudioStateContainer;
