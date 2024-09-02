import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import Modal from './Modal';

const ModalWrapper: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  // If accessed directly, redirect to home
  React.useEffect(() => {
    if (!state?.backgroundLocation) {
      navigate('/');
    }
  }, [state, navigate]);

  if (!state?.backgroundLocation) return null;

  return (
    <Modal isOpen onClose={() => navigate(state.backgroundLocation.pathname)}>
      Hello
    </Modal>
  );
};
