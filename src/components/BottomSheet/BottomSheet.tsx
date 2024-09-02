import { useCallback, useEffect } from 'react';
import { Drawer } from 'vaul';
import { sheetStackHandler } from '~helper/utils';
import { BottomSheetProps } from '~types/component.types';

/**
 * @typedef {Object} BottomSheetProps
 * @property {boolean} isOpen - Determines whether the bottom sheet is open or closed.
 * @property {string} name - A unique identifier for this bottom sheet instance.
 * @property {React.ReactNode} children - The content to be rendered inside the bottom sheet.
 * @property {() => void} [onClose] - Optional callback function to be called when the bottom sheet is closed.
 * @property {boolean} [dismissible=true] - Determines if the bottom sheet can be dismissed by user interactions like clicking outside or swiping down.
 */

/**
 * BottomSheet component
 *
 * This component creates a bottom sheet (also known as a drawer) that slides up from the bottom of the screen.
 * It uses the `vaul` library for the drawer functionality and integrates with a custom sheet stack handler for managing multiple sheets.
 *
 * @component
 * @param {BottomSheetProps} props - The props for the BottomSheet component
 *
 * @example
 * ```jsx
 * <BottomSheet
 *   isOpen={isVisible}
 *   name="example-sheet"
 *   onClose={() => setIsVisible(false)}
 *   dismissible={true}
 * >
 *   <div>Bottom sheet content goes here</div>
 * </BottomSheet>
 * ```
 *
 * @description
 * The BottomSheet component handles its own state management for opening and closing.
 * It also integrates with the browser's history API to handle back button presses and route changes.
 *
 * When the sheet is opened:
 * - It adds itself to the sheet stack using `sheetStackHandler.add()`.
 * - It pushes a new history state using `window.history.pushState()`.
 *
 * When the sheet is closed (either programmatically or by user interaction):
 * - It removes itself from the sheet stack using `sheetStackHandler.remove()`.
 * - It calls the `onClose` prop if provided.
 *
 * The component also listens for `popstate` events to handle browser back button presses and route changes.
 * When such an event occurs, it will close the sheet if it's open.
 *
 * @note
 * This component assumes the existence of a `sheetStackHandler` utility for managing multiple sheets.
 * Ensure that this utility is properly implemented and imported.
 *
 * @note
 * The component uses the `vaul` library for the drawer functionality. Make sure this library is installed and properly set up in your project.
 */
const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  children,
  name,
  dismissible = true,
}) => {
  const handleClose = useCallback(() => {
    const topSheet = sheetStackHandler.getTopSheet();
    if (topSheet && topSheet.id === name) {
      sheetStackHandler.remove(topSheet);
      if (onClose) {
        onClose();
      }
    }
  }, [name, onClose]);

  useEffect(() => {
    if (isOpen) {
      sheetStackHandler.add({ id: name, close: handleClose });
      window.history.pushState({ modalName: name }, '', window.location.href);
    }

    const handleRouteChange = () => {
      if (isOpen) {
        handleClose();
      }
    };

    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      if (isOpen) {
        handleClose();
      }
    };
  }, [isOpen, name, handleClose]);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault();
      handleClose();
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [handleClose]);

  return (
    <Drawer.Root
      open={isOpen}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          handleClose();
        }
      }}
      dismissible={dismissible}>
      <Drawer.Portal>
        <Drawer.Overlay className='fixed inset-0 bg-black/40' />
        <Drawer.Content
          className='fixed bottom-0 left-0 right-0 z-10 overflow-hidden border-none outline-none'
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
