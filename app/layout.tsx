import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ErrorBoundary } from '@/components/ErrorBoundary'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Orbit Technology - Deploy Your Apps Instantly',
  description: 'Build, deploy, and scale your applications with ease. From idea to production in minutes.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || 'pk_test_ZmFjdHVhbC1oZXJvbi03MC5jbGVyay5hY2NvdW50cy5kZXYk'}
      appearance={{
        variables: {
          colorPrimary: '#2563eb',
        },
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </body>
      </html>
    </ClerkProvider>
  )
}