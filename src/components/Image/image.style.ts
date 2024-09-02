import { FitStrategy } from '../../types/component.types';

const fitStrategy: {
  [key in FitStrategy]: string;
} = {
  default: 'object-none',
  fill: 'object-fill',
  contain: 'object-contain',
  cover: 'object-cover',
  scale_down: 'object-scale-down',
};

export { fitStrategy };
