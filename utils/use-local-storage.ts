import { useCallback, useEffect, useSyncExternalStore } from 'react';

type Serializable =
  | string
  | number
  | boolean
  | null
  | Serializable[]
  | { [key: string]: Serializable };

type StateUpdater<T> = (oldValue: T) => T;

function dispatchStorageEvent(key: string, newValue: string | null) {
  window.dispatchEvent(new StorageEvent('storage', { key, newValue }));
}

function subscribeToStorageEvent(callback: () => void) {
  window.addEventListener('storage', callback);

  return () => window.removeEventListener('storage', callback);
}

function setLocalStorage<T>(key: string, value: T) {
  const stringifiedValue = JSON.stringify(value);

  window.localStorage.setItem(key, stringifiedValue);

  dispatchStorageEvent(key, stringifiedValue);
}

function removeLocalStorage(key: string) {
  window.localStorage.removeItem(key);

  dispatchStorageEvent(key, null);
}

function getLocalStorage(key: string) {
  return window.localStorage.getItem(key);
}

function getLocalStorageServerSnapshot<T>(initialValue: T) {
  const initialSnapshot = JSON.stringify(initialValue);

  return () => initialSnapshot;
}

const cachedStore: Map<string, Serializable> = new Map();

export function useLocalStorage<T extends Serializable>(
  key: string,
  initialValue: T,
): [T, (value: T | StateUpdater<T>) => void] {
  const getSnapshot = () => getLocalStorage(key);

  const store = useSyncExternalStore(
    subscribeToStorageEvent,
    getSnapshot,
    getLocalStorageServerSnapshot(initialValue),
  );

  const setValue = useCallback(
    (value: T | StateUpdater<T>) => {
      try {
        const newValue =
          typeof value === 'function'
            ? value(store ? JSON.parse(store) : null)
            : value;

        if (newValue === undefined || newValue === null) {
          removeLocalStorage(key);
        } else {
          setLocalStorage(key, newValue);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [key, store],
  );

  useEffect(() => {
    if (getLocalStorage(key) === null && typeof initialValue !== 'undefined') {
      setLocalStorage(key, initialValue);
    }
  }, [key, initialValue]);

  if (!store) {
    return [initialValue, setValue];
  }

  if (!cachedStore.has(store)) {
    cachedStore.clear();
    cachedStore.set(store, JSON.parse(store));
  }

  return [cachedStore.get(store) as T, setValue];
}
