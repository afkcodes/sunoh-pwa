import { Drawer } from 'vaul';

const BottomSheet = ({
  children,
  isOpen,
  onClose,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer.Root open={isOpen} onClose={onClose}>
      <Drawer.Portal>
        <Drawer.Overlay className='fixed inset-0 bg-black/40' />
        <Drawer.Content className='z-50 flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0'>
          <Drawer.Title className='sr-only'>sunoh modal</Drawer.Title>
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
