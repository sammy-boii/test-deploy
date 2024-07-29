import type { Metadata } from 'next'
import './globals.css'
import GlobalContextProvider from '@/context/GlobalContextProvider'
import Navbar from '../../Codynn-Components/navbars/Navbar'
import Footer from '../../Codynn-Components/footer/Footer'
import { Suspense } from 'react'
import { poppins } from '@/lib/fonts'

export const metadata: Metadata = {
  title: 'Codynn Blogs',
  description: 'A blog website for Codynn members.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body>
        <GlobalContextProvider>
          <main
            className={`min-h-screen pb-24 max-w-[1250px] mx-auto flex flex-col ${poppins.variable}`}
          >
            <Suspense
              fallback={<div className='text-center mt-4'>Loading...</div>}
            >
              <Navbar />
            </Suspense>

            <div className='px-7'>{children}</div>
          </main>
          <Footer />
        </GlobalContextProvider>
      </body>
    </html>
  )
}
