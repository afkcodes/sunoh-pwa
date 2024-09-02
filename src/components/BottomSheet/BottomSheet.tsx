import { useNavigate } from 'react-router';
import { Drawer } from 'vaul';
import { BottomSheetProps } from '~types/component.types';
const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  children,
  name,
  dismissible = true,
}) => {
  const navigate = useNavigate();

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    navigate(-1);
  };

  return (
    <Drawer.Root open={isOpen} onClose={handleClose} dismissible={dismissible}>
      <Drawer.Portal>
        <Drawer.Overlay className='fixed inset-0 bg-black/40' />
        <Drawer.Content
          className='fixed bottom-0 left-0 right-0 z-10 overflow-hidden border-none outline-none'
          aria-describedby='modal content'>
          <Drawer.Title className='sr-only'>{name}</Drawer.Title>
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
