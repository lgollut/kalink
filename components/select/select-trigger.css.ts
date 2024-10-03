import { style } from '@vanilla-extract/css';

import { inputAppearance } from '@/components/input/input-appearance.css';
import { vars } from '@/styles/contract.css';
import { transition } from '@/styles/transition';

export const selectTrigger = style([
  inputAppearance(),
  {
    display: 'flex',
    alignItems: 'center',
    gap: vars.ref.spacing.base,
    justifyContent: 'space-between',

    /**
     * Not great but since the component doesn't render any elements
     * if no selection has been made, we need to make sure the height
     * is at least the same as the input.
     */
    minHeight: 42,
  },
]);

export const openIndicator = style({
  transition: transition(['transform'], { duration: 'short', easing: 'inOut' }),
  selectors: {
    '[data-state="open"] &': {
      transform: 'rotate(180deg)',
    },
  },
});
