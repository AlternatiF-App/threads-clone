import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import '@/app/globals.css'

export const metadata: Metadata = {
  title: 'Threads',
  description: 'A Next.js 13 Meta Threads Application',
  icons: {
    icon: '/assets/logo.svg',
  },
}

const inter = Inter({ subsets: ['latin'] })

const RootLayout = ({
  children
}: { 
  children: React.ReactNode
 }) => {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={`${inter.className} bg-dark-1`}>
          { children }
        </body>
      </html>
    </ClerkProvider>
  ) 
}

export default RootLayout
