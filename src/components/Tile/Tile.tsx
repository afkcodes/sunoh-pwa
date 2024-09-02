import { LuMoreVertical } from 'react-icons/lu';
import Button from '~components/Button/Button';
import Figure from '~components/Figure/Figure';
import TextLink from '~components/TextLink/TextLink';
import { dataExtractor, getArtistNames, getNonEmptyStringData } from '~helper/common';
import { TileProps } from '~types/component.types';

const Tile: React.FC<TileProps> = ({
  data,
  config,
  figureConfig,
  titleConfig,
  subTitleConfig,
  variant = 'tile',
  onClick,
}) => {
  const id = dataExtractor(data, config.id) || '';
  const title = dataExtractor(data, config.title);
  const subtitle =
    getNonEmptyStringData(dataExtractor(data, config?.subtitle)) ||
    getArtistNames(dataExtractor(data, config?.artists)) ||
    getNonEmptyStringData(dataExtractor(data, config?.year)?.toString()) ||
    getNonEmptyStringData(dataExtractor(data, config?.editor)?.toString());
  const images =
    dataExtractor(data, config?.images) || dataExtractor(data, config?.image);
  const alt = `${title}_poster`;

  return (
    <Button
      variant='unstyled'
      classNames={`
        relative flex w-full text-start transition-all duration-300  p-0 m-0 flex
        ${variant === 'list' ? 'px-2 ' : 'flex-col active:scale-95'}
        `}
      onClick={onClick}>
      <Figure {...figureConfig} src={[images]} alt={alt} id={id} />
      <div className='py-0.5 flex flex-col w-full item-stretch ml-2'>
        {title?.length ? <TextLink {...titleConfig}>{title}</TextLink> : null}
        {subtitle?.length ? <TextLink {...subTitleConfig}>{subtitle}</TextLink> : null}
      </div>
      {variant === 'list' ? (
        <div>
          <Button
            classNames='text-gray-400 transition-colors active:text-white active:scale-90 p-0 m-0'
            variant='unstyled'
            onClick={() => {}}>
            <LuMoreVertical size={20} />
          </Button>
        </div>
      ) : null}
    </Button>
  );
};

export default Tile;
