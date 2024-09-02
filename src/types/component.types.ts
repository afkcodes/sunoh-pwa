import { VariantProps } from 'class-variance-authority';
import { Dispatch, SetStateAction } from 'react';
import { type buttonStyles } from '../components/Button/button.styles';
import { type figureStyles } from '../components/Figure/figure.style';
import { type textStyles } from '../components/TextLink/textLink.styles';

export type FitStrategy = 'default' | 'fill' | 'contain' | 'cover' | 'scale_down';
export type ArrangeMode = 'single' | 'multi';
export type ImageLoading = 'eager' | 'lazy' | undefined;
export type ImageStatus = 'LOADING' | 'SUCCESS' | 'ERROR';

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
  setLoadStatus?: Dispatch<SetStateAction<ImageStatus>>;
}

// Figure types
export interface FigureProps extends VariantProps<typeof figureStyles> {
  src: string;
  alt: string;
  fit: FitStrategy;
  loading?: ImageLoading;
  dominantColor?: string;
}

// TextLink Types
export interface TextLinkProps extends VariantProps<typeof textStyles> {
  children: React.ReactNode;
  href?: string;
  classNames?: string;
}
