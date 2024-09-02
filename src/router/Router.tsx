/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useEffect, useState } from 'react';
import { Route, Switch } from 'wouter';
import BottomSheet from '~components/BottomSheet/BottomSheet';
import MiniPlayer from '~components/MiniPlayer/MiniPlayer';
import PlayerScreen from '~components/Player/Player';
import BottomNavContainer from '~containers/BottomNavContainer';
import { LayoutContainer } from '~containers/LayoutContainer';
import { routes } from './routes';

const Modal = ({
  children,
  isOpen,
  onClose,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;
  return (
    <div className='w-full h-full'>
      <BottomSheet isOpen={isOpen} onClose={onClose}>
        {children}
      </BottomSheet>
    </div>
  );
};

const Router = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    const currentUrl = new URL(window.location.href);
    if (isModalOpen) {
      currentUrl.searchParams.delete('modal');
    } else {
      currentUrl.searchParams.set('modal', 'open');
    }
    window.history.pushState({}, '', currentUrl.toString());
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.delete('modal');
    window.history.back();
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handlePopState = () => {
      const currentUrl = new URL(window.location.href);
      setIsModalOpen(currentUrl.searchParams.get('modal') === 'open');
    };

    window.addEventListener('popstate', handlePopState);

    // Initial check for modal query param
    const currentUrl = new URL(window.location.href);
    setIsModalOpen(currentUrl.searchParams.get('modal') === 'open');

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <Fragment>
      <LayoutContainer>
        <Switch>
          {routes.map((route) => (
            <Route path={route.path} component={route.element as any} key={route.path} />
          ))}
        </Switch>
      </LayoutContainer>
      <div onClick={toggleModal}>
        <MiniPlayer />
      </div>
      <BottomNavContainer />
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <PlayerScreen />
      </Modal>
    </Fragment>
  );
};

export default Router;
