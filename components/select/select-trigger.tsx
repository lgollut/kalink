'use client';

import { Trigger, Icon } from '@radix-ui/react-select';
import { clsx } from 'clsx';
import { ChevronDown } from 'lucide-react';
import {
  forwardRef,
  ElementRef,
  ComponentPropsWithoutRef,
  ForwardedRef,
} from 'react';

import { Box } from '@/components/box';
import { button } from '@/components/button/button.css';
import { useFormFieldContext } from '@/components/form-field/form-field-context';
import { useFormFieldItemContext } from '@/components/form-field/form-field-item-context';

import { openIndicator, selectTrigger } from './select-trigger.css';

const UnwrappedSelectTrigger = (
  { className, children, ...props }: ComponentPropsWithoutRef<typeof Trigger>,
  ref: ForwardedRef<ElementRef<typeof Trigger>>,
) => {
  const { errors, label } = useFormFieldContext();
  const { id } = useFormFieldItemContext();

  return (
    <Trigger
      ref={ref}
      id={id}
      className={clsx(selectTrigger, className)}
      aria-invalid={errors ? 'true' : undefined}
      aria-label={label}
      {...props}
    >
      {children}
      <Icon asChild>
        <Box
          // Mimic the Combobox style
          className={clsx(
            button({ size: 'sm', variant: 'bare', iconOnly: true }),
            openIndicator,
          )}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <ChevronDown size={18} />
        </Box>
      </Icon>
    </Trigger>
  );
};

export const SelectTrigger = forwardRef(UnwrappedSelectTrigger);
