import { clsx } from 'clsx';

import { fontClass } from '@/styles/font';
import { themeClass } from '@/styles/theme.css';

import { html, body } from './layout.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={clsx(html, fontClass)}>
      <body className={clsx(body, themeClass)}>{children}</body>
    </html>
  );
}
