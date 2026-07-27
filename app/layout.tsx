import type { Metadata } from "next";
import "./globals.css";
import {ReactNode} from "react";

export const metadata: Metadata = {
  title: "Messenger",
  description: "A lightweight messaging app",
};

export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">{props.children}</body>
    </html>
  );
}
