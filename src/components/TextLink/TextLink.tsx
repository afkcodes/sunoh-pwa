import React from 'react';
import { Link } from 'react-router-dom';
import { merge } from '~helper/twMerge.config';
import { TextLinkProps } from '../../types/component.types';
import { textStyles } from './textLink.styles';

const TextLink: React.FC<TextLinkProps> = ({
  href,
  size,
  weight,
  lineCount,
  color,
  children,
  classNames,
}) => {
  const className = merge(textStyles({ size, weight, lineCount, color }), classNames);
  return (
    <>
      {href ? (
        <Link
          to={href}
          className={merge(className, 'hover:text-primary-light hover:underline')}>
          {children}
        </Link>
      ) : (
        <p className={className}>{children}</p>
      )}
    </>
  );
};

export default TextLink;
