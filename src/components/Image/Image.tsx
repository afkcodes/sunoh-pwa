import { useState } from 'react';
import { proxyImageURL } from '~network/endpoints';
import { ImageProps } from '../../types/component.types';
import { fitStrategy, imgPosition } from './image.style';

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  height = '100%',
  width = '100%',
  loading = 'lazy',
  fit = 'cover',
  position = 'center',
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
      src={`${proxyImageURL}${src}`}
      alt={altText}
      height={height}
      width={width}
      loading={loading}
      onLoad={onLoad}
      onError={onError}
      className={` h-full w-full shrink-0 ${fitStrategy[fit]} ${imgPosition[position]}`}
    />
  );
};

Image.displayName = 'Image';

export default Image;
