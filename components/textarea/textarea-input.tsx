import { clsx } from 'clsx';
import { ForwardedRef, TextareaHTMLAttributes, forwardRef } from 'react';

import { useFormFieldContext } from '@/components/form-field/form-field-context';
import { textarea } from '@/components/textarea/textarea.css';

const TextareaInput = (
  { className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>,
  ref: ForwardedRef<any>,
) => {
  const { errors } = useFormFieldContext();

  return (
    <textarea
      ref={ref}
      className={clsx(textarea, className)}
      aria-invalid={errors ? 'true' : undefined}
      {...props}
    />
  );
};

const WrappedTextareaInput = forwardRef(TextareaInput);

export { WrappedTextareaInput as TextareaInput };
