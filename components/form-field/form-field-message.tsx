'use client';

import { ForwardedRef, forwardRef, useEffect } from 'react';

import { useFormFieldContext } from './form-field-context';
import { formFieldMessage } from './form-field-message.css';
import { FormFieldMessageProps } from './form-field.types';

const UnwrappedFormFieldMessage = (
  { className, children, id, error, disabled, ...props }: FormFieldMessageProps,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const { registerMessageId, unRegisterMessageId } = useFormFieldContext();

  useEffect(() => {
    registerMessageId(id);

    return () => unRegisterMessageId(id);
  }, [id, registerMessageId, unRegisterMessageId]);

  return (
    <div
      ref={ref}
      id={id}
      className={formFieldMessage({ error, disabled })}
      {...props}
    >
      {children}
    </div>
  );
};

export const FormFieldMessage = forwardRef(UnwrappedFormFieldMessage);
