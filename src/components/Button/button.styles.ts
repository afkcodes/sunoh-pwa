import { cva } from 'class-variance-authority';

export const buttonStyles = cva(
  'transition-all duration-300 flex justify-center items-center',
  {
    variants: {
      variant: {
        primary: `bg-button-primary-default hover:bg-button-primary-hover active:bg-button-primary-active`,
        secondary:
          'bg-button-secondary-default hover:bg-button-secondary-hover active:bg-button-secondary-active',
        tertiary:
          'bg-button-tertiary-default hover:bg-button-tertiary-hover active:bg-button-tertiary-active',
        dark: 'bg-button-dark-default hover:bg-button-dark-hover active:bg-button-dark-active',
        outline: 'bg-transparent border active:bg-button-dark-default text-current',
        unstyled: 'bg-transparent text-current',
      },
      radius: {
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
        none: 'rounded-none',
      },
      size: {
        xs: 'px-2 py-1 text-xs',
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-md',
        lg: 'px-5 py-2.5 text-lg',
        xl: 'px-6 py-3 text-xl',
        none: 'px-0 py-0',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'sm',
      radius: 'none',
    },
  }
);
