import { createContext, useContext, useEffect, useState } from 'react';
import BottomSheet from '~components/BottomSheet/BottomSheet';
import Button from '~components/Button/Button';
import { BottomSheetProps } from '~types/component.types';

interface BottomSheetProviderProps {
  children: React.ReactNode;
}

const BaseModal = ({ close }: any) => {
  return (
    <div className='relative flex items-center justify-center bg-tarana-background'>
      <p className='text-tarana-text-primary'>Modal</p>
      <Button size='sm' variant='secondary' onClick={close}>
        Close Modal
      </Button>
    </div>
  );
};

const BottomSheetContext = createContext({
  isOpen: false,
  openSheet: (_bottomSheetConfig: BottomSheetProps) => {},
  closeSheet: () => {},
});

const BottomSheetProvider: React.FC<BottomSheetProviderProps> = ({ children }) => {
  const openSheet = (config: BottomSheetProps) => {
    setBottomSheetConfig((prevState: any) => ({ ...prevState, ...config }));
  };

  const closeSheet = () => {
    setBottomSheetConfig((prevState: any) => ({ ...prevState, isOpen: false }));
  };

  const [bottomSheetConfig, setBottomSheetConfig] = useState<BottomSheetProps>({
    children: <BaseModal close={closeSheet} />,
    isOpen: false,
    onClose: closeSheet,
    name: 'base_sheet',
  });

  // For making sure when the drawer is open we do not navigate instead close the drawer
  useEffect(() => {
    if (bottomSheetConfig.isOpen) {
      const handlePopState = (event: any) => {
        event.preventDefault();
        closeSheet();
      };
      window.history.pushState(null, '', window.location.href);
      window.addEventListener('popstate', handlePopState);
      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, [bottomSheetConfig.isOpen, closeSheet]);

  return (
    <BottomSheetContext.Provider
      value={{ isOpen: bottomSheetConfig.isOpen, closeSheet, openSheet }}>
      {children}
      <BottomSheet {...bottomSheetConfig} />
    </BottomSheetContext.Provider>
  );
};

export default BottomSheetProvider;

export const useBottomSheet = () => useContext(BottomSheetContext);
