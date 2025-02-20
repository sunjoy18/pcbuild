"use client"

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { CartProvider } from "@/contexts/CartContext"
import { Toaster } from "@/components/ui/toaster"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] })

// Define protected routes
const protectedRoutes = ["/cart", "/profile", "/order"]
const footerRoutes = ["/", "about"]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("token") // Fetch token from localStorage
    setIsAuthenticated(!!token) // Convert to boolean

    if (!token && protectedRoutes.includes(pathname)) {
      router.push("/login") // Redirect unauthenticated users to login
    }
  }, [pathname])

  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider>
            <CartProvider>
              <Header />
              <main>{children}</main>
              {footerRoutes.includes(pathname) ? <Footer /> : null}
              <Toaster />
            </CartProvider>
          </ThemeProvider>
        </body>
      </html>
    </AuthProvider>
  )
}
