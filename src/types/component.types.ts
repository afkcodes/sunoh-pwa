import { VariantProps } from 'class-variance-authority';
import { Dispatch, SetStateAction } from 'react';
import { type buttonStyles } from '../components/Button/button.styles';
import { type figureStyles } from '../components/Figure/figure.style';
import { type textStyles } from '../components/TextLink/textLink.styles';

export type FitStrategy = 'default' | 'fill' | 'contain' | 'cover' | 'scale_down';
export type ArrangeMode = 'single' | 'multi';
export type ImageLoading = 'eager' | 'lazy' | undefined;
export type ImageStatus = 'LOADING' | 'SUCCESS' | 'ERROR';
export type ImageMode = 'multi' | 'single';
export type ObjectPosition =
  | 'top'
  | 'left'
  | 'right'
  | 'bottom'
  | 'center'
  | 'right-top'
  | 'right-bottom'
  | 'left-top'
  | 'left-bottom';

// Button types
export interface ButtonProps extends VariantProps<typeof buttonStyles> {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  loading?: boolean;
  classNames?: string;
}

// Image types
export interface ImageProps {
  src: string;
  alt: string;
  height?: number | string | undefined;
  loading?: ImageLoading;
  width?: number | string | undefined;
  fit: FitStrategy;
  position: ObjectPosition;
  setLoadStatus?: Dispatch<SetStateAction<ImageStatus>>;
}

// Figure types
export interface FigureProps extends VariantProps<typeof figureStyles> {
  src: string[];
  alt: string;
  fit: FitStrategy;
  position?: ObjectPosition;
  loading?: ImageLoading;
  dominantColor?: string;
  mode?: ImageMode;
}

// TextLink Types
export interface TextLinkProps extends VariantProps<typeof textStyles> {
  children: React.ReactNode;
  href?: string;
  classNames?: string;
}

export interface TileProps {
  figureConfig: Omit<FigureProps, 'alt' | 'src'>;
  titleConfig: Omit<TextLinkProps, 'children'>;
  subTitleConfig: Omit<TextLinkProps, 'children'>;
  data: any;
  config: any;
  onClick: () => void;
}

export type Role = 'drawer' | 'modal';

export interface ModalProps {
  isOpen: boolean;
  children?: React.ReactElement | React.ReactNode;
  onClose?: () => void;
  role?: Role;
  closeOnOutsidePress?: boolean;
}
