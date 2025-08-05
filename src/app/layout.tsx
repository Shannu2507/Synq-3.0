// src/app/layout.tsx

import './styles/globals.css'
import TopNav from './components/TopNav'

export const metadata = {
  title: 'Synq',
  description: 'Built by Silent Alpha',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <TopNav />
        <main className="p-4">{children}</main>
      </body>
    </html>
  )
}
