import { extendTailwindMerge } from 'tailwind-merge';

const merge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        { text: ['xxxs', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'] },
      ],
      rounded: [
        {
          rounded: [
            'none',
            'xxxs',
            'xxs',
            'xs',
            'sm',
            'md',
            'lg',
            'xl',
            'xxl',
            'xxxl',
            'full',
          ],
        },
      ],
    },
  },
});

export { merge };
