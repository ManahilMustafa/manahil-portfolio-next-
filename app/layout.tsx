import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Open_Sans } from "next/font/google"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "900"],
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Portfolio - Frontend & Wordpress Developer",
  description: "2+ Years of Experience in React.js & WordPress | Turning Ideas into Powerful Web Experiences",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // yahan html tag par suppressHydrationWarning add kiya hai
    <html lang="en" className={`${montserrat.variable} ${openSans.variable} antialiased`} suppressHydrationWarning>
      <body className="font-body" suppressHydrationWarning>{children}</body>
    </html>
  );
}