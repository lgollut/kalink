export type DistributiveOmit<T, TOmitted extends PropertyKey> = T extends any
  ? Omit<T, TOmitted>
  : never;

export type UnwrapArray<R> = R extends unknown[] ? UnwrapArray<R[number]> : R;

export type PolymorphicComponentProps<TUse> = {
  use?: TUse;
};
