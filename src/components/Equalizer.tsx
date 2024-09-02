import * as RangeSlider from '@radix-ui/react-slider';

import { LucideAudioWaveform, Music } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  RiSpeakerFill,
  RiSubtractFill,
  RiVolumeMuteLine,
  RiVolumeUpLine,
} from 'react-icons/ri';
import Button from './Button/Button';
import Slider from './Slider/Slider';
import TextLink from './TextLink/TextLink';

const Equalizer = () => {
  const [activePreset, setActivePreset] = useState('Custom');
  const [levels, setLevels] = useState(Array(10).fill(0));
  const [virtualSurround, setVirtualSurround] = useState(false);
  const [customPresets, setCustomPresets] = useState([]);

  const defaultPresets = ['Vocal', 'Acoustic', 'Flat', 'Classic', 'Pop', 'Rock', 'Jazz'];
  const frequencies = ['32', '64', '125', '250', '500', '1k', '2k', '4k', '8k', '16k'];

  useEffect(() => {
    const savedPresets = localStorage.getItem('customPresets');
    if (savedPresets) {
      setCustomPresets(JSON.parse(savedPresets));
    }
  }, []);

  const handlePresetChange = (preset: any) => {
    setActivePreset(preset);
    if (preset !== 'Custom') {
      // In a real app, you'd fetch actual preset values
      setLevels(
        Array(10)
          .fill(0)
          .map(() => Math.floor(Math.random() * 25) - 12)
      );
    }
  };

  const handleSliderChange = (index: any, newValue: any) => {
    const newLevels = [...levels];
    newLevels[index] = newValue[0];
    setLevels(newLevels);
    setActivePreset('Custom');
  };

  // const saveCustomPreset = () => {
  //   const presetName = prompt('Enter a name for your custom preset:');
  //   if (presetName) {
  //     const newPreset = { name: presetName, levels: [...levels] };
  //     const updatedPresets = [...customPresets, newPreset];
  //     setCustomPresets(updatedPresets as any);
  //     localStorage.setItem('customPresets', JSON.stringify(updatedPresets));
  //   }
  // };

  // const resetEqualizer = () => {
  //   setLevels(Array(10).fill(0));
  //   setActivePreset('Flat');
  // };

  return (
    <div className='h-screen p-2 mx-auto text-white bg-gradient-to-b from-gray-900 to-black'>
      <h2 className='flex items-center mb-4 text-2xl font-bold'>
        <Music className='mr-2' /> Equalizer
      </h2>

      <p className='mb-2 text-gray-400'>Presets</p>
      <div className='mb-6 overflow-x-auto no-scrollbar'>
        <div className='flex pb-2 space-x-4'>
          {[...defaultPresets, ...customPresets.map((preset: any) => preset.name)].map(
            (preset) => (
              <Button
                key={preset}
                classNames={`px-3 py-1 rounded-full text-sm whitespace-nowrap duration-150 
                ${
                  activePreset === preset
                    ? 'bg-primary-default text-white'
                    : 'bg-gray-800 text-gray-400'
                }`}
                onClick={() => handlePresetChange(preset)}>
                {preset}
              </Button>
            )
          )}
        </div>
      </div>

      <div className='grid grid-cols-10 gap-2'>
        {frequencies.map((freq, index) => (
          <div key={freq} className='flex flex-col items-center'>
            <RangeSlider.Root
              orientation='vertical'
              className='relative flex items-center justify-center flex-1 w-0.5 select-none h-60 touch-none'
              min={-12}
              max={12}
              step={1}
              value={[levels[index]]}
              onValueChange={(newValue) => handleSliderChange(index, newValue)}>
              <RangeSlider.Track className='relative rounded-full bg-white/60 h-60 backdrop-blur grow'>
                <RangeSlider.Range className='absolute w-full rounded-md bg-gradient-to-t from-tertiary-default to-primary-default' />
              </RangeSlider.Track>
              <RangeSlider.Thumb
                className='block w-4 h-4 bg-white rounded-full outline-none '
                aria-label=''
              />
            </RangeSlider.Root>
            <span className='mt-3 text-xs text-gray-400'>{freq}</span>
            <span className='mt-1 text-xs font-bold'>{levels[index]}dB</span>
          </div>
        ))}
      </div>

      <div className='px-2 py-2 my-4'>
        <div className='flex w-full gap-2'>
          <Button
            onClick={() => {}}
            variant='unstyled'
            classNames='p-0 transition-all text-text-secondary active:text-text-primary active:scale-90'>
            {false ? <RiVolumeMuteLine size={24} /> : <RiVolumeUpLine size={24} />}
          </Button>
          <div className='flex items-center w-full'>
            <Slider
              max={100}
              min={0}
              value={[50]}
              step={1}
              onChange={(val: number) => {
                console.log(val);
              }}
              label='volume'
            />
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <div className='flex items-center justify-between px-2 py-4 rounded-sm'>
          <div className='flex items-center'>
            <div>
              <RiSpeakerFill size={22} />
            </div>
            <div className='ml-2'>
              <TextLink>Bass Enhancer</TextLink>
            </div>
          </div>
          <div
            className={`w-10 h-6 rounded-full p-1 cursor-pointer ${
              virtualSurround ? 'bg-primary-light' : 'bg-gray-600'
            }`}
            onClick={() => setVirtualSurround(!virtualSurround)}>
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                virtualSurround ? 'transform translate-x-4' : ''
              }`}
            />
          </div>
        </div>

        <div className='flex items-center justify-between px-2 py-4 rounded-sm'>
          <div className='flex items-center'>
            <div>
              <LucideAudioWaveform size={22} />
            </div>
            <div className='ml-2'>
              <TextLink>Surround Virtualizer</TextLink>
            </div>
          </div>
          <div
            className={`w-10 h-6 rounded-full p-1 cursor-pointer ${
              virtualSurround ? 'bg-primary-light' : 'bg-gray-600'
            }`}
            onClick={() => setVirtualSurround(!virtualSurround)}>
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                virtualSurround ? 'transform translate-x-4' : ''
              }`}
            />
          </div>
        </div>

        <div className='flex items-center justify-between px-2 py-4 rounded-sm'>
          <div className='flex items-center'>
            <div>
              <RiSubtractFill size={22} />
            </div>
            <div className='ml-2'>
              <TextLink>Volume Leveler</TextLink>
            </div>
          </div>
          <div
            className={`w-10 h-6 rounded-full p-1 cursor-pointer ${
              virtualSurround ? 'bg-primary-light' : 'bg-gray-600'
            }`}
            onClick={() => setVirtualSurround(!virtualSurround)}>
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                virtualSurround ? 'transform translate-x-4' : ''
              }`}
            />
          </div>
        </div>
      </div>

      {/* <div className='flex justify-between'>
        <Button
          variant='dark'
          onClick={resetEqualizer}
          radius='sm'
          size='md'
          prefixIcon={<RotateCcw size={16} />}>
          Reset
        </Button>
        <Button
          variant='primary'
          onClick={saveCustomPreset}
          radius='sm'
          size='md'
          prefixIcon={<Save size={16} />}>
          Save
        </Button>
      </div> */}
    </div>
  );
};

export default Equalizer;
