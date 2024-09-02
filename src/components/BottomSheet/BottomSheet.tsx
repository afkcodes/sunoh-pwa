import { useEffect } from 'react';
import { Drawer } from 'vaul';
import { sheetStackHandler } from '~helper/utils';

export interface BottomSheetProps {
  isOpen: boolean;
  name: string;
  children: React.ReactNode;
  onClose?: () => void;
  dismissible?: boolean;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  children,
  name,
  dismissible = true,
}) => {
  useEffect(() => {
    if (isOpen) {
      sheetStackHandler.add({ id: name, close: onClose as any });

      const handlePopState = (event: any) => {
        event.preventDefault();
        const topSheet = sheetStackHandler.getTopSheet();
        if (topSheet && topSheet.id === name && onClose) {
          onClose();
          sheetStackHandler.remove(topSheet);
        }
      };

      window.history.pushState(null, '', window.location.href);
      window.addEventListener('popstate', handlePopState);
      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, [isOpen]);

  return (
    <Drawer.Root
      open={isOpen}
      onClose={onClose}
      onOpenChange={(d) => {
        if (!d && onClose) {
          onClose();
        }
      }}
      dismissible={dismissible}>
      <Drawer.Portal>
        <Drawer.Overlay className='fixed inset-0 bg-black/40' />
        <Drawer.Content
          className='fixed bottom-0 left-0 right-0 z-10 overflow-hidden border-none rounded-t-sm outline-none'
          aria-describedby='modal content'>
          <Drawer.Title className='sr-only'>Bottom Sheet Content Main</Drawer.Title>
          <Drawer.Description className='sr-only'>
            Bottom Sheet Content Main
          </Drawer.Description>
          {children}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default BottomSheet;
