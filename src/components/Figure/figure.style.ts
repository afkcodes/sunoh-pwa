import { cva } from 'class-variance-authority';

export const figureStyles = cva('group pointer-events-none relative overflow-hidden', {
  variants: {
    radius: {
      xxxs: 'rounded-xxxs',
      xxs: 'rounded-xxs',
      xs: 'rounded-xs',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      xxl: 'rounded-xxl',
      xxxl: 'rounded-xxxl',
      full: 'rounded-full',
      none: 'rounded-none',
    },
    size: {
      xxxs: 'w-8 h-8',
      xxs: 'w-10 h-10',
      xs: 'w-12 h-12',
      sm: 'h-16 w-16',
      md: 'h-20 w-20',
      lg: 'h-24 w-24',
      xl: 'h-32 w-32',
      xxl: 'h-40 w-40',
      xxxl: 'h-48 w-48',
      full: 'h-full w-full',
    },
  },
  defaultVariants: {
    radius: 'sm',
    size: 'lg',
  },
});

export const imageFit = {
  default: 'object-none',
  fill: 'object-fill',
  contain: 'object-contain',
  cover: 'object-cover',
  scale_down: 'object-scale-down',
};
