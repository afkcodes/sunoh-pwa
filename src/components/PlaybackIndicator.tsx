import { Fragment } from 'react/jsx-runtime';
import { useAudio } from '~states/audioStore';

const PlaybackIndicator = ({ id }: { id?: string }) => {
  const [audioState] = useAudio();

  if (
    !(audioState.currentPlaybackSource === id && audioState.playbackState === 'playing')
  ) {
    return null;
  }

  return (
    <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-70'>
      <div className='p-4'>
        <div className='flex items-center space-x-2'>
          <Fragment>
            <div
              className='w-1 h-4 bg-white rounded-full animate-bounce'
              style={{ animationDelay: `${1 * 0.3}s` }}
            />
            <div
              className='w-1 h-6 bg-white rounded-full animate-bounce'
              style={{ animationDelay: `${1 * 0.15}s` }}
            />
            <div
              className='w-1 h-4 bg-white rounded-full animate-bounce'
              style={{ animationDelay: `${1 * 0.3}s` }}
            />
            <div
              className='w-1 h-6 bg-white rounded-full animate-bounce'
              style={{ animationDelay: `${1 * 0.15}s` }}
            />
            <div
              className='w-1 h-4 bg-white rounded-full animate-bounce'
              style={{ animationDelay: `${1 * 0.3}s` }}
            />
          </Fragment>
        </div>
      </div>
    </div>
  );
};

export default PlaybackIndicator;
