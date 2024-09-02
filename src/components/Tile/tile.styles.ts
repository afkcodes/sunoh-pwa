import { cva } from 'class-variance-authority';

export const tileStyles = cva('group pointer-events-none relative overflow-hidden', {
  variants: {
    size: {
      xxxs: 'w-8',
      xxs: 'w-10',
      xs: 'w-12',
      sm: 'w-16',
      md: 'w-20',
      lg: 'w-24',
      xl: 'w-32',
      xxl: 'w-40',
      xxxl: 'w-48',
      full: 'w-full',
    },
  },
  defaultVariants: {
    size: 'lg',
  },
});
