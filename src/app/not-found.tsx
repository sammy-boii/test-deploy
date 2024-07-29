'use client'

import heroImage from '../../public/shared/notFound/HeroImage.png'
import notFound from '../../public/shared/notFound/404.png'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export const NotFoundPage = () => {
  return (
    <main
      className={`flex flex-col my-12 max-w-[700px] mx-auto items-center justify-center min-h-screen`}
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
        <span className='text-[25px]'>Your page could not be found.</span>
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
