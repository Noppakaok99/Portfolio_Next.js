import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider"
import { LenisProvider } from './components/context/LenisContext';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { Kanit } from "next/font/google"; 

const kanit = Kanit({
    weight: ['300', '400', '600', '700'],
    subsets: ['thai', 'latin'],
    variable: '--font-kanit',
    display: 'swap',
});

export const metadata: Metadata = {
  title: "Portfolio - Noppakao Kharanon",
  description: "",
};

interface RootLayoutProps {
    children: React.ReactNode; 
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning className={`${kanit.variable}`}>
        <head />
        <body className={kanit.className}>
          <LenisProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          <ScrollToTopButton />
          </ThemeProvider>
          </LenisProvider>
        </body>
      </html>
    </>
  )
}
