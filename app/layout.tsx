import { fontSpaceMono } from '@dispatch/fonts';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import './layout.css';

export const metadata: Metadata = {
  title: 'Dispatch',
  description: 'A small message board',
};

export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html className={fontSpaceMono.variable} lang="en">
      <body className="flex min-h-full flex-col font-mono">
        {props.children}
      </body>
    </html>
  );
}
