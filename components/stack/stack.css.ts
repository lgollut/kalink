import { globalStyle } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/styles/contract.css';
import { dividedSpace } from '@/styles/sprinkles-properties/responsive-properties.css';

export const stack = recipe({
  variants: {
    divided: {
      none: {},
      solid: {},
      dashed: {},
    },
  },
});

globalStyle(
  `:is(${stack.classNames.variants.divided.solid}, ${stack.classNames.variants.divided.dashed}) > * + *::before`,
  {
    content: '""',

    width: '100%',
    height: 1,

    position: 'absolute',
    top: dividedSpace,

    borderBlockStartWidth: 1,
    borderBlockStartColor: vars.system.color.outline,
  },
);

globalStyle(`${stack.classNames.variants.divided.solid} > * + *::before`, {
  borderBlockStartStyle: 'solid',
});

globalStyle(`${stack.classNames.variants.divided.dashed} > * + *::before`, {
  borderBlockStartStyle: 'dashed',
});
