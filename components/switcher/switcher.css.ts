import { createVar, globalStyle } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { vars } from '@/styles/contract.css';
import { mapContractVars } from '@/utils/map-contract-vars';

export const thresholdVar = createVar();
export const limitVar = createVar();

export const switcher = recipe({
  base: {
    display: 'flex',
    flexWrap: 'wrap',

    vars: {
      [thresholdVar]: vars.system.layout.measure,
    },
  },

  variants: {
    /**
     * The space (margin) between the child elements
     */
    spacing: mapContractVars(vars.ref.spacing, (key) => ({
      gap: vars.ref.spacing[key],
    })),

    /**
     * The maximum number of elements allowed to appear in the horizontal configuration
     */
    limit: {
      2: {},
      3: {},
      4: {},
      5: {},
      6: {},
    },
  },
});

globalStyle(`${switcher.classNames.base} > *`, {
  flexBasis: `calc((${thresholdVar} - 100%) * 999)`,
  flexGrow: 1,
});

globalStyle(
  `${switcher.classNames.variants.limit[2]} > :nth-last-child(n+3), ${switcher.classNames.variants.limit[2]} > :nth-last-child(n+3) ~ *`,
  {
    flexBasis: '100%',
  },
);

globalStyle(
  `${switcher.classNames.variants.limit[3]} > :nth-last-child(n+4), ${switcher.classNames.variants.limit[3]} > :nth-last-child(n+4) ~ *`,
  {
    flexBasis: '100%',
  },
);

globalStyle(
  `${switcher.classNames.variants.limit[4]} > :nth-last-child(n+5), ${switcher.classNames.variants.limit[4]} > :nth-last-child(n+5) ~ *`,
  {
    flexBasis: '100%',
  },
);

globalStyle(
  `${switcher.classNames.variants.limit[5]} > :nth-last-child(n+6), ${switcher.classNames.variants.limit[5]} > :nth-last-child(n+6) ~ *`,
  {
    flexBasis: '100%',
  },
);

globalStyle(
  `${switcher.classNames.variants.limit[6]} > :nth-last-child(n+7), ${switcher.classNames.variants.limit[6]} > :nth-last-child(n+7) ~ *`,
  {
    flexBasis: '100%',
  },
);

export type SwitcherVariants = NonNullable<RecipeVariants<typeof switcher>>;
