'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'

const BackButton = () => {
  const router = useRouter()
  if (typeof window === 'undefined') return null

  return (
    <div
      onClick={() => window.history.back()}
      className='cursor-pointer w-max underline opacity-65 group flex items-center gap-0.5'
    >
      <IoIosArrowRoundBack
        className='group-hover:translate-x-3 transition-all duration-300'
        size={36}
      />
      <span className='group-hover:translate-x-3 text-md font-bold transition-all duration-300'>
        Back
      </span>
    </div>
  )
}

export default BackButton
