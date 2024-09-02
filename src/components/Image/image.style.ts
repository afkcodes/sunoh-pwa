import { FitStrategy, ObjectPosition } from '../../types/component.types';

const fitStrategy: {
  [key in FitStrategy]: string;
} = {
  default: 'object-none',
  fill: 'object-fill',
  contain: 'object-contain',
  cover: 'object-cover',
  scale_down: 'object-scale-down',
};

const imgPosition: { [key in ObjectPosition]: string } = {
  top: 'object-top',
  left: 'object-left',
  right: 'object-right',
  bottom: 'object-bottom',
  center: 'object-center',
  'right-top': 'object-right-top',
  'right-bottom': 'object-right-bottom-',
  'left-top': 'object-left-top',
  'left-bottom': 'object-left-bottom',
};

export { fitStrategy, imgPosition };
