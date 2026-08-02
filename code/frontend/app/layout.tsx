import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Giới thiệu bản thân',
  description: 'A personal introduction landing page',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
