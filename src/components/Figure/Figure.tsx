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
  mode = 'single',
  position = 'center',
}) => {
  const className = merge(figureStyles({ radius, size }), 'aspect-square');
  const [loadStatus, setLoadStatus] = useState<SetStateAction<ImageStatus>>('LOADING');

  return (
    <figure className={className} tabIndex={0} style={{ backgroundColor: dominantColor }}>
      {mode === 'single' ? (
        <Image
          src={src}
          alt={alt}
          loading={loading}
          fit={fit}
          setLoadStatus={setLoadStatus}
          position={position}
        />
      ) : (
        <div className='flex flex-wrap w-full h-full overflow-hidden '>
          {[1, 2, 3, 4].map((item) => {
            return (
              <div key={item} className='w-1/2 h-1/2'>
                <Image
                  src={src}
                  alt={alt}
                  loading={loading}
                  fit={fit}
                  setLoadStatus={setLoadStatus}
                  position={position}
                />
              </div>
            );
          })}
        </div>
      )}

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
