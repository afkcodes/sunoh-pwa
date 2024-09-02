// import React from 'react';
// import { Link } from 'react-router-dom';
// import { merge } from '~helper/twMerge.config';
// import { TextLinkProps } from '../../types/component.types';
// import { textStyles } from './textLink.styles';

// interface TextLinkPropsWithMarquee extends TextLinkProps {
//   isMarquee?: boolean;
// }

// const TextLink: React.FC<TextLinkPropsWithMarquee> = ({
//   href,
//   size,
//   weight,
//   lineCount,
//   color,
//   children,
//   classNames,
//   isMarquee = false,
// }) => {
//   const className = merge(
//     textStyles({ size, weight, lineCount, color }),
//     isMarquee ? 'whitespace-nowrap overflow-hidden' : '',
//     classNames
//   );

//   const content = (
//     <span className={isMarquee ? 'inline-block animate-marquee ' : ''}>{children}</span>
//   );

//   return (
//     <>
//       {href ? (
//         <Link
//           to={href}
//           className={merge(className, 'hover:text-primary-light hover:underline')}>
//           {content}
//         </Link>
//       ) : (
//         <p className={className}>{content}</p>
//       )}
//     </>
//   );
// };

// export default TextLink;

import React, { useEffect, useRef, useState } from 'react';

import { Link } from 'wouter';
import { decodeHtmlEntities } from '~helper/common';
import { merge } from '~helper/twMerge.config';
import { TextLinkProps } from '../../types/component.types';
import { textStyles } from './textLink.styles';

interface TextLinkPropsWithMarquee extends TextLinkProps {
  isMarquee?: boolean;
}

const TextLink: React.FC<TextLinkPropsWithMarquee> = ({
  href,
  size,
  weight,
  lineCount,
  color,
  children,
  classNames,
  isMarquee = false,
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLSpanElement>(null);
  const [shouldMarquee, setShouldMarquee] = useState(isMarquee);

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current && contentRef.current) {
        setShouldMarquee(
          contentRef.current.scrollWidth > containerRef.current.clientWidth
        );
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    return () => {
      window.removeEventListener('resize', checkOverflow);
    };
  }, [children]);

  const className = merge(
    textStyles({ size, weight, lineCount, color }),
    shouldMarquee ? 'whitespace-nowrap overflow-hidden' : '',
    classNames
  );

  return (
    <>
      {href ? (
        <Link
          to={href}
          className={merge(className, 'hover:text-primary-light hover:underline')}>
          {children}
        </Link>
      ) : (
        <p className={className}>{decodeHtmlEntities(children as string)}</p>
      )}
    </>
  );
};

export default TextLink;
