import Navbar from '@/components/shared/Navbar'
import './globals.css'

import Sidebar from '@/components/shared/Sidebar'
import Bottombar from '@/components/shared/Bottombar'
import Providers from '@/lib/ThemeProviders'
import AuthProvider from '@/lib/AuthProvider'


export const metadata = {
  title: 'TheardSync',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
        <Providers>
        <Sidebar/>
        <main className='flex'>
        <Navbar/>
        <section className='flex min-h-screen flex-1 flex-col items-center px-6 pb-10 pt-28 max-md:pb-32 sm:px-10 lg:pl-16 dark:bg-black'>
        <div className='w-full max-w-4xl md:pl-12 lg:pl-40 xl:pl-0'>{children}</div>
        </section>
        </main>
        <Bottombar/>
        </Providers>
        </AuthProvider>
        </body>
    </html>
  )
}
