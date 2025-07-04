import { ForwardedRef, Ref, RefCallback } from 'react';

export function assignRef<T>(
  ref: Ref<T> | undefined | null,
  value: T | null,
): ReturnType<RefCallback<T>> {
  if (typeof ref === 'function') {
    return ref(value);
  } else if (ref) {
    ref.current = value;
  }
}

export const mergeRefs: <T>(
  refs: (ForwardedRef<T> | undefined)[],
) => (el: T | null) => void = (refs) => (el) => {
  if (el === null) {
    return;
  }

  const cleanups: (() => void)[] = [];

  for (const ref of refs) {
    const cleanup = assignRef(ref, el);

    cleanups.push(
      typeof cleanup === 'function' ? cleanup : () => assignRef(ref, null),
    );
  }

  return () => {
    for (const cleanup of cleanups) cleanup();
  };
};
