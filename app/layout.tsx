import { fontSpaceGrotesk, fontSpaceMono } from '@dispatch/fonts';
import { clsx } from 'clsx';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import './layout.css';

export const metadata: Metadata = {
  title: 'Dispatch',
  description: 'A small message board',
};

export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html
      className={clsx(fontSpaceGrotesk.variable, fontSpaceMono.variable)}
      lang="en"
    >
      <body className="flex min-h-dvh flex-col font-sans">
        {props.children}
      </body>
    </html>
  );
}
