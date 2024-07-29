'use client'

import leftWave from './left-wave.svg'
import rightWave from './right-wave.svg'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { bold_poppins, normal_poppins, syne, thin_poppins } from '@/lib/fonts'

export const ErrorPage = ({
  reset,
  error
}: {
  reset: () => void
  error: Error
}) => {
  if (typeof window === 'undefined') return null
  return (
    <main
      className={`${normal_poppins.className} flex flex-col w-screen relative items-center justify-center min-h-screen`}
    >
      <Image
        src={leftWave}
        alt='left wave'
        className='absolute left-0 bottom-0'
      />
      <Image
        src={rightWave}
        alt='right wave'
        className='absolute right-0 bottom-0'
      />

      <div className='flex flex-col mt-[-130px] items-center justify-center z-[10]'>
        <div className={`${syne.className} font-bold text-[30px]`}>ERROR!</div>
        <div
          className={`text-[160px] my-[-40px] tracking-tighter ${bold_poppins.className}`}
        >
          500
        </div>

        <div className='flex gap-2 items-center'>
          <span className={`${syne.className} font-bold text-[28px]`}>
            Oops,{' '}
          </span>
          <span className='text-[24px]'>Site failed to load.</span>
        </div>

        <div
          className={`text-[#838383] mt-1 mb-4 ${thin_poppins.className} text-[14px] max-w-[325px] text-center mx-auto`}
        >
          {error.message}
        </div>
        <Button
          className='bg-black px-9 rounded-full hover:bg-[#2b2b2b]'
          onClick={() => reset()}
        >
          Reload
        </Button>
      </div>
    </main>
  )
}

export default ErrorPage
