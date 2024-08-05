import { style } from '@vanilla-extract/css';

import { inputAppearance } from '@/components/input/input-appearance.css';

export const textarea = style([
  inputAppearance(),
  {
    lineHeight: 'auto',
  },
]);
