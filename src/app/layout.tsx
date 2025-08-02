import "./globals.css"

export const metadata = {
  title: "Synq",
  description: "A social platform to connect realms.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">{children}</body>
    </html>
  )
}
