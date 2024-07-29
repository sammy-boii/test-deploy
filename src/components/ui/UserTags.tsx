import { cn } from '@/lib/utils'
import React, { HTMLAttributes } from 'react'
import { CiCircleRemove } from 'react-icons/ci'

interface TagsProps extends HTMLAttributes<HTMLButtonElement> {
  text: string
  className?: string
  removeTag: (tag: string) => void
}

const UserTags = ({ text, className, removeTag }: TagsProps) => {
  return (
    <button
      onClick={() => removeTag(text)}
      className={cn(
        className,
        'rounded-full flex gap-2 items-center px-3 py-1 border border-black/50'
      )}
    >
      <CiCircleRemove size={20} />
      <div className='text-sm'>{text}</div>
    </button>
  )
}

export default UserTags
