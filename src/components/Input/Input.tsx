import { ChangeEvent, FocusEvent, FocusEventHandler, KeyboardEvent, useRef } from 'react';
import Button from '~components/Button/Button';
import { isValidFunction } from '~helper/common';

interface InputProps {
  placeholder: string;
  onChange?: (value: string) => void;
  onFocus?: (e?: FocusEventHandler<HTMLInputElement>) => void;
  onBlur?: (e?: FocusEventHandler<HTMLInputElement>) => void;
  onKeyDown?: (e?: React.KeyboardEvent<HTMLInputElement>) => void;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  onIconClick?: () => void;
}

const Input: React.FC<InputProps> = ({
  placeholder = '',
  onBlur,
  onFocus,
  onKeyDown = () => {
    console.log('submited');
  },
  onChange,
  prefixIcon,
  suffixIcon,
  onIconClick,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubMitKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      inputRef.current?.blur();
      onKeyDown(e);
    }
  };

  const handleBlur: FocusEventHandler<HTMLInputElement> = (
    event: FocusEvent<HTMLInputElement>
  ) => {
    console.log(event.target.value);
    if (onBlur) {
      onBlur();
    }
  };

  const handleFocus: FocusEventHandler<HTMLInputElement> = (
    event: FocusEvent<HTMLInputElement>
  ) => {
    console.log(event.target.value);
    if (onFocus) {
      onFocus();
    }
  };

  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange && isValidFunction(onChange)) {
      onChange(e.target.value);
    }
  };

  const onIconButtonClick = () => {
    if (onIconClick) {
      onIconClick();
    }
  };

  return (
    <div className='flex items-center justify-center w-full py-3 pl-2 pr-3 overflow-hidden rounded-xs bg-surface'>
      {suffixIcon && <span className='ml-2'>{prefixIcon}</span>}
      <input
        className='w-full h-full outline-none text-text-secondary bg-surface'
        type='text'
        placeholder={placeholder}
        onChange={onValueChange}
        onBlur={handleBlur}
        onKeyDown={onSubMitKeyDown}
        onFocus={handleFocus}
      />
      {suffixIcon && (
        <Button classNames='ml-2 p-0' variant='unstyled' onClick={onIconButtonClick}>
          {suffixIcon}
        </Button>
      )}
    </div>
  );
};

export default Input;
