import { ForwardedRef } from 'react';

export const mergeRefs: <T>(
  refs: (ForwardedRef<T> | undefined)[],
) => (el: T | null) => void = (refs) => (el) => {
  if (el === null) {
    return;
  }

  for (const ref of refs) {
    if (typeof ref === 'function') {
      ref(el);
    } else if (ref) {
      ref.current = el;
    }
  }
};
