'use client'

import { usePathname } from 'next/navigation'
import { SessionProvider, signOut, useSession } from 'next-auth/react'
import { Provider } from 'react-redux'
import store from '@/redux/store'
import './globals.css'
import FirebaseNotification from '@/components/firebaseNotification'
import AppInitializer from '@/components/appInitializer'
import SessionAppInitializer from '@/components/sessionAppInitializer'
import Header from '@/components/patientDashboard/header'
import { useEffect, useState } from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Excluir el Header en páginas específicas
  const excludeHeader = ['/login', '/register']

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' })
  }

  return (
    <html lang='en'>
      <body>
        <SessionProvider>
          <Provider store={store}>
            <FirebaseNotification />
            <AppInitializer>
              {/* 🔹 Mueve `useSession()` dentro de SessionProvider */}
              <SessionAppInitializer />

              {!excludeHeader.includes(pathname) && (
                <Header onLogout={handleLogout} />
              )}

              {children}
            </AppInitializer>
          </Provider>
        </SessionProvider>
      </body>
    </html>
  )
}
