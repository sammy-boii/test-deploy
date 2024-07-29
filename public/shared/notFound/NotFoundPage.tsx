'use client'

import heroImage from './404.png'
import notFound from './404.png'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { normal_poppins } from '@/lib/fonts'

export const NotFoundPage = () => {
  if (typeof window === 'undefined') return null

  return (
    <main
      className={`flex flex-col max-w-[700px] mx-auto items-center justify-center min-h-screen`}
    >
      <Image
        className='self-start'
        src={notFound}
        alt='not found'
        width={120}
        height={120}
      />
      <Image src={heroImage} alt='hero image' />

      <div className='text-4xl mt-3 mb-2'>
        <span className='font-bold'>Oops, </span>
        <span className={normal_poppins.className}>
          Your page could not be found.
        </span>
      </div>

      <div className='text-[#8f8f8f] text-[16px]'> Try Reloading</div>
      <Button
        className='bg-black mt-3 px-10 py-2 text-[16px] rounded-full hover:bg-[#141414]'
        onClick={() => window.location.reload()}
      >
        Reload
      </Button>
    </main>
  )
}

export default NotFoundPage
