import React from 'react';
import { RiLoader5Fill } from 'react-icons/ri';
import { merge } from '~helper/twMerge.config';
import { ButtonProps } from '../../types/component.types';
import { buttonStyles } from './button.styles';

const Button: React.FC<ButtonProps> = ({
  variant,
  size,
  disabled,
  onClick,
  children,
  radius,
  prefixIcon,
  suffixIcon,
  loading,
  classNames,
}) => {
  // Merge the classes using twMerge to handle any conflicts
  const className = merge(buttonStyles({ variant, size, disabled, radius }), classNames);

  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClick) {
      onClick();
    }
  };

  return (
    <button className={className} onClick={onButtonClick} disabled={disabled || false}>
      {loading ? (
        <RiLoader5Fill className='p-0 m-0 animate-spin' size={20} />
      ) : (
        <>
          {prefixIcon && <span className='mr-2'>{prefixIcon}</span>}
          {children}
          {suffixIcon && <span className='ml-2'>{suffixIcon}</span>}
        </>
      )}
    </button>
  );
};

Button.displayName = 'Button';

export default Button;
