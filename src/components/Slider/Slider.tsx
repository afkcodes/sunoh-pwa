import * as RangeSlider from '@radix-ui/react-slider';
import { memo } from 'react';

interface SliderProps {
  max: number;
  min: number;
  onChange: (val: number) => void;
  value: number[];
  step?: number;
  label?: string;
  orientation?: 'horizontal' | 'vertical' | undefined;
}

const Slider: React.FC<SliderProps> = ({
  max = 0,
  min = 0,
  onChange = (_val: number) => {},
  value = [50],
  step = 1,
  label = 'slider',
  orientation = 'horizontal',
}) => {
  const onValueChange = (value: any) => {
    if (onChange) {
      onChange(Number(value));
    }
  };

  return (
    <RangeSlider.Root
      orientation={orientation}
      className='relative flex items-center flex-1 w-full h-5 select-none touch-none'
      defaultValue={[0]}
      onValueChange={onValueChange}
      value={value}
      max={max}
      min={min}
      step={step}>
      <RangeSlider.Track className='relative h-0.5 rounded-md bg-text-tertiary/60 backdrop-blur grow'>
        <RangeSlider.Range className='absolute h-full rounded-md bg-gradient-to-r from-tertiary-default to-primary-default' />
      </RangeSlider.Track>
      <RangeSlider.Thumb
        className='block w-5 h-5 bg-white rounded-full outline-none'
        aria-label={label}
      />
    </RangeSlider.Root>
  );
};

export default memo(Slider);
