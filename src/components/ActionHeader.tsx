// import { motion } from 'framer-motion';
// import { forwardRef, RefObject } from 'react';
// import { LuChevronLeft, LuMoreVertical } from 'react-icons/lu';
// import Button from '~components/Button/Button';
// import TextLink from '~components/TextLink/TextLink';
// import { isValidWindow } from '~helper/common';
// import useHeaderVisibility from '~hooks/useHeaderVisiblity';

// interface ActionHeaderProps {
//   title: string;
//   onBackClick?: () => void;
//   onMoreClick?: () => void;
// }

// const ActionHeader = forwardRef<HTMLDivElement, ActionHeaderProps>(
//   ({ title, onBackClick, onMoreClick }, ref) => {
//     const isVisible = useHeaderVisibility(ref as RefObject<HTMLElement>);

//     const onHeaderBack = () => {
//       if (isValidWindow) {
//         window.history.back();
//       }
//     };

//     return (
//       <motion.div
//         initial={{ opacity: 0, y: 0 }}
//         animate={{
//           opacity: isVisible ? 1 : 0,
//           y: isVisible ? 0 : -20,
//         }}
//         transition={{ duration: 0.3 }}
//         className='fixed top-0 left-0 right-0 z-20 flex justify-between py-3 bg-surface bg-opacity-70 backdrop-blur-md'>
//         <Button
//           variant='unstyled'
//           classNames='p-0 m-0 transition-all duration-300 active:scale-90 pl-4'
//           size='md'
//           radius='full'
//           onClick={onBackClick ? onBackClick : onHeaderBack}>
//           <LuChevronLeft size={24} />
//         </Button>
//         <div className='text-center'>
//           <TextLink weight='medium' size='md'>
//             {title}
//           </TextLink>
//         </div>
//         {onMoreClick ? (
//           <Button
//             variant='unstyled'
//             classNames='p-0 m-0 transition-all duration-300 active:scale-90 pr-3.5'
//             size='md'
//             radius='full'
//             onClick={onMoreClick}>
//             <LuMoreVertical size={24} />
//           </Button>
//         ) : (
//           <div className='pr-3.5 h-6 w-6' />
//         )}
//       </motion.div>
//     );
//   }
// );

// export default ActionHeader;

import { motion } from 'framer-motion';
import { forwardRef, RefObject, useEffect, useState } from 'react';
import { LuChevronLeft, LuMoreVertical } from 'react-icons/lu';
import Button from '~components/Button/Button';
import TextLink from '~components/TextLink/TextLink';
import { isValidWindow } from '~helper/common';
import useHeaderVisibility from '~hooks/useHeaderVisiblity';

interface ActionHeaderProps {
  title: string;
  onBackClick?: () => void;
  onMoreClick?: () => void;
  sticky?: boolean;
}

const ActionHeader = forwardRef<HTMLDivElement, ActionHeaderProps>(
  ({ title, onBackClick, onMoreClick, sticky = false }, ref) => {
    const isVisible = useHeaderVisibility(ref as RefObject<HTMLElement>);
    const [isSticky, setIsSticky] = useState(sticky);

    useEffect(() => {
      if (!sticky) {
        const handleScroll = () => {
          const scrollPosition = window.scrollY;
          setIsSticky(scrollPosition > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }
    }, [sticky]);

    const onHeaderBack = () => {
      if (isValidWindow) {
        window.history.back();
      }
    };

    return (
      <motion.div
        initial={{ opacity: sticky ? 1 : 0, y: sticky ? 0 : -20 }}
        animate={{
          opacity: sticky || isVisible ? 1 : 0,
          y: sticky || isVisible ? 0 : -20,
        }}
        transition={{ duration: 0.3 }}
        className={`
          z-20 flex justify-between py-3 
          bg-surface bg-opacity-70 backdrop-blur-md
          ${isSticky || sticky ? 'shadow-md' : ''}
          ${sticky ? 'sticky top-0' : 'fixed top-0 left-0 right-0'}
        `}>
        <Button
          variant='unstyled'
          classNames='p-0 m-0 transition-all duration-300 active:scale-90 pl-4'
          size='md'
          radius='full'
          onClick={onBackClick ? onBackClick : onHeaderBack}>
          <LuChevronLeft size={24} />
        </Button>
        <div className='text-center'>
          <TextLink weight='medium' size='md'>
            {title}
          </TextLink>
        </div>
        {onMoreClick ? (
          <Button
            variant='unstyled'
            classNames='p-0 m-0 transition-all duration-300 active:scale-90 pr-3.5'
            size='md'
            radius='full'
            onClick={onMoreClick}>
            <LuMoreVertical size={24} />
          </Button>
        ) : (
          <div className='pr-3.5 h-6 w-6' />
        )}
      </motion.div>
    );
  }
);

export default ActionHeader;
