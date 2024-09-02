import { ButtonProps, TextLinkProps, TileConfig } from '~types/component.types';

const componentConfig = {
  albumTileConfig: {
    figureConfig: {
      fit: 'cover',
      size: 'xxl',
    },
    titleConfig: {
      color: 'primary',
      size: 'sm',
      weight: 'medium',
      classNames: 'text-start',
    },
    subTitleConfig: {
      color: 'light',
      size: 'xs',
      classNames: 'text-start',
    },
  } as TileConfig,
  headerConfig: {
    weight: 'semibold',
    size: 'lg',
    color: 'primary',
  } as Omit<TextLinkProps, 'children'>,
  headerActionButtonConfig: {
    variant: 'dark',
    radius: 'full',
    size: 'sm',
    classNames: 'py-1',
  } as Omit<ButtonProps, 'children' | 'onClick'>,
};

export { componentConfig };
