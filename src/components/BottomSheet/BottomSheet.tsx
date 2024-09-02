import { Drawer } from 'vaul';

export interface BottomSheetProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose?: () => void;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ isOpen, onClose, children }) => {
  return (
    <Drawer.Root
      open={isOpen}
      onClose={onClose}
      onOpenChange={(d) => {
        if (!d && onClose) {
          onClose();
        }
      }}>
      <Drawer.Portal>
        <Drawer.Overlay className='fixed inset-0 bg-black/40' />
        <Drawer.Content className='fixed bottom-0 left-0 right-0 z-50 overflow-hidden rounded-t-sm'>
          {children}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default BottomSheet;
