import Button from '~components/Button/Button';
import Figure from '~components/Figure/Figure';
import TextLink from '~components/TextLink/TextLink';
import { dataExtractor } from '~helper/common';
import { FigureProps, TextLinkProps } from '~types/component.types';

interface TileProps {
  figureConfig: Omit<FigureProps, 'alt' | 'src'>;
  titleConfig: Omit<TextLinkProps, 'children'>;
  subTitleConfig: Omit<TextLinkProps, 'children'>;
  data: any;
  config: any;
  onClick: () => void;
}

const Tile: React.FC<TileProps> = ({
  data,
  config,
  figureConfig,
  titleConfig,
  subTitleConfig,
  onClick,
}) => {
  const title = dataExtractor(data, config.title);
  const subtitle = dataExtractor(data, config.subtitle);
  const src = dataExtractor(data, config.image);
  const alt = `${title}_poster`;

  return (
    <Button
      variant='unstyled'
      classNames='z-0 flex flex-col items-start transition-all duration-300 active:scale-95'
      onClick={onClick}>
      <Figure {...figureConfig} src={src} alt={alt} />
      <div className='py-0.5 flex flex-col items-start'>
        <TextLink {...titleConfig}>{title}</TextLink>
        <TextLink {...subTitleConfig}>{subtitle}</TextLink>
      </div>
    </Button>
  );
};

export default Tile;
