import { clsx } from 'clsx';
import {
  ForwardedRef,
  MouseEventHandler,
  forwardRef,
  useCallback,
} from 'react';

import { Box } from '@/components/box';

import { inputAppearance } from './input-appearance.css';
import { inputWrapper } from './input-wrapper.css';
import { InputWrapperProps } from './input.types';

const InputWrapper = (
  {
    children,
    className,
    inputRef,
    disabled,
    variant = 'outlined',
    tintScheme = 'none',
    size = 'base',
  }: InputWrapperProps,
  forwardedRef: ForwardedRef<HTMLDivElement>,
) => {
  const handleInputFocus = useCallback<MouseEventHandler<HTMLElement>>(
    (e) => {
      if (disabled || !inputRef?.current || e.target === inputRef.current) {
        return;
      }

      inputRef.current.click();
      inputRef.current.focus();
    },
    [inputRef, disabled],
  );

  return (
    <Box
      ref={forwardedRef}
      display="flex"
      flexWrap="nowrap"
      alignItems="center"
      justifyContent="space-between"
      gap="base"
      className={clsx(
        inputAppearance({ variant, size }),
        inputWrapper,
        className,
      )}
      onClick={handleInputFocus}
      tintScheme={tintScheme}
    >
      {children}
    </Box>
  );
};

const WrappedInputWrapper = forwardRef(InputWrapper);

export { WrappedInputWrapper as InputWrapper };
