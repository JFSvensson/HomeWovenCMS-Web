import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from '@/context/AuthContext'
import { ArticlesProvider } from "@/context/ArticlesContext"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HomeWoven CMS Web App",
  description: "A front-end for HomeWoven CMS",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ArticlesProvider>
            {children}
          </ArticlesProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
