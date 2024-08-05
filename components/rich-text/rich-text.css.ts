import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/contract.css';
import { typography } from '@/styles/typography.css';

export const richText = style({});

export const blockquote = style([
  typography.bodyMedium,
  {
    paddingInline: vars.ref.spacing['2xl'],
    fontStyle: 'italic',
  },
]);

export const alignEnd = style({
  textAlign: 'end',
});
