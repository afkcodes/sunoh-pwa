import { MediaTrack } from 'audio_x';
import { Fragment } from 'react';
import Header from '~components/Header/Header';
import RecentlyPlayedItem from '~components/RecentlyPlayed';
import ScrollSnap from '~components/ScrollSnap/ScrollSnap';
import { isValidArray } from '~helper/common';
import { useUserStore } from '~states/userStore';

const RecentlyPlayedContainer = () => {
  const [userState] = useUserStore();

  return (
    <Fragment>
      {isValidArray(userState.user.recentlyPlayed) &&
      userState.user.recentlyPlayed.length >= 6 ? (
        <div>
          <Header
            textLinkConfig={{
              children: 'Recent Beats',
              size: 'lg',
              weight: 'semibold',
            }}
          />
          <ScrollSnap>
            <div className='grid grid-flow-col grid-rows-3 gap-x-3 gap-y-2'>
              {userState.user.recentlyPlayed.map((track: MediaTrack) => (
                <RecentlyPlayedItem track={track} key={track.id} />
              ))}
            </div>
          </ScrollSnap>
        </div>
      ) : null}
    </Fragment>
  );
};

export default RecentlyPlayedContainer;
