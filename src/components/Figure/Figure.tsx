import { SetStateAction, useState } from 'react';
import { merge } from '~helper/twMerge.config';
import { FigureProps, ImageStatus } from '../../types/component.types';
import Image from '../Image/Image';
import { figureStyles } from './figure.style';

const Figure: React.FC<FigureProps> = ({
  src,
  alt,
  radius,
  size,
  loading = 'lazy',
  fit = 'cover',
  dominantColor = '',
}) => {
  const className = merge(figureStyles({ radius, size }));
  const [loadStatus, setLoadStatus] = useState<SetStateAction<ImageStatus>>('LOADING');

  return (
    <figure className={className} tabIndex={0} style={{ backgroundColor: dominantColor }}>
      {/* <Image
        src={src}
        alt={alt}
        loading={loading}
        fit={fit}
        setLoadStatus={setLoadStatus}
      /> */}
      <div className='grid grid-cols-2'>
        {[1, 2, 3, 4].map((item) => {
          return (
            <Image
              key={item}
              src={src}
              alt={alt}
              loading={loading}
              fit={fit}
              setLoadStatus={setLoadStatus}
            />
          );
        })}
      </div>
      <div
        className={
          loadStatus === 'LOADING'
            ? 'animate-pulse bg-surface absolute h-full w-full top-0'
            : 'hidden'
        }
      />
    </figure>
  );
};

export default Figure;
