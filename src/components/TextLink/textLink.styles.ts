import { cva } from 'class-variance-authority';

export const textStyles = cva(
  'inline-block focus:outline-none transition-all duration-150', // base styles
  {
    variants: {
      size: {
        xxs: 'text-xxs',
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
        xxl: 'text-xxl',
        xxxl: 'text-xxxl',
      },
      weight: {
        bold: 'font-bold',
        semibold: 'font-semibold',
        normal: 'font-normal',
        medium: 'font-medium',
      },
      lineCount: {
        1: 'line-clamp-1',
        2: 'line-clamp-2',
        3: 'line-clamp-3',
        4: 'line-clamp-4',
        none: '',
      },
      color: {
        primary: 'text-text-primary',
        light: 'text-text-secondary',
        tertiary: 'text-text-tertiary',
        disabled: 'text-text-disabled',
        accent: 'text-primary-light',
      },
    },
    defaultVariants: {
      size: 'md',
      weight: 'normal',
      lineCount: 1,
      color: 'primary',
    },
  }
);
