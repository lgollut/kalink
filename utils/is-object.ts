export const isObject = <T extends {}>(value: unknown): value is T => {
  return !!value && typeof value === 'object' && !Array.isArray(value);
};
