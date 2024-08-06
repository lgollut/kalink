'use client';

import { createContext, useContext } from 'react';

export const createRequiredContext = <T>() => {
  const context = createContext<T | null>(null);

  const useContextHook = (): T => {
    const contextValue = useContext(context);

    if (contextValue === null) {
      throw new Error('Context value is null');
    }

    return contextValue;
  };

  return [useContextHook, context.Provider] as const;
};
