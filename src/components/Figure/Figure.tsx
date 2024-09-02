import { SetStateAction, useState } from 'react';
import Observer from '~components/Observer/Observer';
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
  const sourceImages: string | string[] = mode === 'multi' ? src : src[0];

  return (
    <figure className={className} tabIndex={0} style={{ backgroundColor: dominantColor }}>
      {mode === 'single' ? (
        <Observer observerOption={{ threshold: 0 }}>
          <Image
            src={sourceImages as string}
            alt={alt}
            loading={loading}
            fit={fit}
            setLoadStatus={setLoadStatus}
            position={position}
          />
        </Observer>
      ) : (
        <div
          className='grid w-full h-full grid-cols-6 grid-rows-6 gap-1 p-2 overflow-hidden bg-surface'
          style={{
            gridTemplateAreas: `
            "img1 img1 img2 img2 img2 img2" 
            "img1 img1 img2 img2 img2 img2"
            "img1 img1 img2 img2 img2 img2"
            "img3 img3 img3 img3 img4 img4"
            "img3 img3 img3 img3 img4 img4"
            "img3 img3 img3 img3 img4 img4"
            "img3 img3 img3 img3 img4 img4"
        `,
          }}>
          {Array.isArray(sourceImages) &&
            sourceImages.map((item, index) => {
              return (
                <div
                  key={item}
                  className='overflow-hidden rounded-xxxs'
                  style={{
                    gridArea: `img${index + 1}`,
                  }}>
                  <Observer observerOption={{ threshold: 0 }}>
                    <Image
                      src={item}
                      alt={alt}
                      loading={loading}
                      fit={fit}
                      setLoadStatus={setLoadStatus}
                      position={position}
                    />
                  </Observer>
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
