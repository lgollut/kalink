import { createVar } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/styles/contract.css';

const spaceVar = createVar();

export const menuSeparator = recipe({
  base: {
    paddingBlock: spaceVar,
    marginInline: vars.ref.spacing.sm,

    position: 'relative',

    '::after': {
      content: '""',

      height: '1px',
      width: '100%',

      position: 'absolute',
      top: '50%',

      backgroundColor: vars.system.color.surfaceContainerHighest,

      transform: 'translateY(-50%)',
    },
  },

  variants: {
    offset: {
      true: {
        marginInline: calc.negate(vars.ref.spacing.sm),
      },
    },

    space: {
      xl: {
        vars: {
          [spaceVar]: vars.ref.spacing.xl,
        },
      },
      lg: {
        vars: {
          [spaceVar]: vars.ref.spacing.lg,
        },
      },
      md: {
        vars: {
          [spaceVar]: vars.ref.spacing.md,
        },
      },
      base: {
        vars: {
          [spaceVar]: vars.ref.spacing.base,
        },
      },
      sm: {
        vars: {
          [spaceVar]: vars.ref.spacing.sm,
        },
      },
      xs: {
        vars: {
          [spaceVar]: vars.ref.spacing.xs,
        },
      },
    },
  },
});
