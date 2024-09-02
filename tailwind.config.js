/** @type {import('tailwindcss').Config} */

const withOpacity = (variableName) => {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
};

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 15s linear infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.1)', opacity: '0.7' },
        },
      },
      spacing: {
        18: '4.5rem',
      },
      fontSize: {
        xxs: '0.625rem', // 8px
        xs: '0.75rem', // 10px
        sm: '0.875rem', // 12px
        base: '1rem', // 16px (default base font size)
        md: '1.125rem', // 18px
        lg: '1.25rem', // 20px
        xl: '1.5rem', // 24px
        xxl: '2rem', // 32px
        xxxl: '2.5rem', // 40px
      },
      borderRadius: {
        none: '0',
        xxxs: '0.125rem', // 2px
        xxs: '0.25rem', // 4px
        xs: '0.375rem', // 6px
        sm: '0.5rem', // 8px
        md: '0.75rem', // 12px
        lg: '1rem', // 16px
        xl: '1.5rem', // 24px
        xxl: '2rem', // 32px
        xxxl: '2.5rem', // 40px
        full: '99999rem',
      },
      colors: {
        primary: {
          default: withOpacity('--color-primary'),
          light: withOpacity('--color-primary-light'),
          dark: withOpacity('--color-primary-dark'),
        },
        secondary: {
          default: withOpacity('--color-secondary'),
          light: withOpacity('--color-secondary-light'),
          dark: withOpacity('--color-secondary-dark'),
        },
        tertiary: {
          default: withOpacity('--color-tertiary'),
          light: withOpacity('--color-tertiary-light'),
          dark: withOpacity('--color-tertiary-dark'),
        },
        background: withOpacity('--color-background'),
        surface: withOpacity('--color-surface'),
        overlay: withOpacity('--color-overlay'),
        text: {
          primary: withOpacity('--color-text-primary'),
          secondary: withOpacity('--color-text-secondary'),
          tertiary: withOpacity('--color-text-tertiary'),
          disabled: withOpacity('--color-text-disabled'),
        },
        accent: {
          1: withOpacity('--color-accent-1'),
          2: withOpacity('--color-accent-2'),
          3: withOpacity('--color-accent-3'),
        },
        success: withOpacity('--color-success'),
        warning: withOpacity('--color-warning'),
        error: withOpacity('--color-error'),
        info: withOpacity('--color-info'),
        button: {
          primary: {
            default: withOpacity('--color-button-primary'),
            hover: withOpacity('--color-button-primary-hover'),
            active: withOpacity('--color-button-primary-active'),
          },
          secondary: {
            default: withOpacity('--color-button-secondary'),
            hover: withOpacity('--color-button-secondary-hover'),
            active: withOpacity('--color-button-secondary-active'),
          },
          tertiary: {
            default: withOpacity('--color-button-tertiary'),
            hover: withOpacity('--color-button-tertiary-hover'),
            active: withOpacity('--color-button-tertiary-active'),
          },
          dark: {
            default: withOpacity('--color-button-dark'),
            hover: withOpacity('--color-button-dark-hover'),
            active: withOpacity('--color-button-dark-active'),
          },
        },
        border: withOpacity('--color-border'),
        divider: withOpacity('--color-divider'),
        input: {
          background: withOpacity('--color-input-background'),
          border: withOpacity('--color-input-border'),
          focusBorder: withOpacity('--color-input-focus-border'),
        },
        nav: {
          background: withOpacity('--color-nav-background'),
          item: withOpacity('--color-nav-item'),
          itemHover: withOpacity('--color-nav-item-hover'),
          itemActive: withOpacity('--color-nav-item-active'),
        },
        card: {
          background: withOpacity('--color-card-background'),
          border: withOpacity('--color-card-border'),
          hover: withOpacity('--color-card-hover'),
        },
        link: {
          default: withOpacity('--color-link'),
          hover: withOpacity('--color-link-hover'),
          active: withOpacity('--color-link-active'),
        },
        icon: {
          primary: withOpacity('--color-icon-primary'),
          secondary: withOpacity('--color-icon-secondary'),
        },
      },
    },
  },
  plugins: [],
};
