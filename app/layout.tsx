import type { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Messenger',
  description: 'A lightweight messaging app',
};

export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-full flex-col">{props.children}</body>
    </html>
  );
}
