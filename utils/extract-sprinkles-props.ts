import { UnknownRecord } from 'type-fest';

import { SprinklesProps, sprinkles } from '@/styles/sprinkles.css';

/**
 * Extracts the sprinkles properties from the given component props,
 * returning an array containing the extracted sprinkle props and
 * the remaining component props.
 */
export const extractSprinklesProps = <ComponentProps extends UnknownRecord>(
  props: ComponentProps,
): [
  Pick<ComponentProps, Extract<keyof ComponentProps, SprinklesProps>>,
  Omit<ComponentProps, SprinklesProps>,
] => {
  const sprinkleProps: any = {};
  const componentProps: any = {};

  for (const prop of Object.keys(props)) {
    if (sprinkles.properties.has(prop as SprinklesProps)) {
      sprinkleProps[prop] = props[prop];
      continue;
    }

    componentProps[prop] = props[prop];
  }

  return [sprinkleProps, componentProps];
};
