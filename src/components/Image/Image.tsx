import { useState } from 'react';
import { ImageProps } from '../../types/component.types';
import { fitStrategy } from './image.style';

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  height = '100%',
  width = '100%',
  loading = 'lazy',
  fit = 'cover',
  setLoadStatus,
}) => {
  const [altText, setAltText] = useState('');

  const onLoad = () => {
    if (setLoadStatus) {
      setLoadStatus('SUCCESS');
      setAltText(alt);
    }
  };

  const onError = () => {
    if (setLoadStatus) {
      setLoadStatus('ERROR');
      setAltText(alt);
    }
  };

  return (
    <img
      src={src}
      alt={altText}
      height={height}
      width={width}
      loading={loading}
      onLoad={onLoad}
      onError={onError}
      className={` h-full w-full z-0 ${fitStrategy[fit]}`}
    />
  );
};

Image.displayName = 'Image';

export default Image;
