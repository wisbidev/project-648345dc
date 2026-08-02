import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Giới thiệu bản thân',
  description: 'Trang giới thiệu bản thân — Minh.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  )
}
