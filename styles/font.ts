import { clsx } from 'clsx';
import localFont from 'next/font/local';

const fontFamilyTitle = localFont({
  src: [
    {
      path: './fonts/OctoberCompressedL-Thin.woff2',
      weight: '300',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-brand',
});

const fontFamilyBody = localFont({
  src: [
    {
      path: './fonts/oswald-light-webfont.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/oswald-regular-webfont.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-plain',
});

export const fontClass = clsx(
  fontFamilyTitle.variable,
  fontFamilyBody.variable,
);
