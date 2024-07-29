'use client'

import { Search } from 'lucide-react'
import SEARCH_BLOG from '@/graphql/queries/searchBlog.gql'
import { useLazyQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { useRouter } from 'next/navigation'

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')

  const router = useRouter()

  const [debouncedSearchTerm] = useDebounce(searchTerm, 300)

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchFn({
        variables: {
          title: searchTerm,
          tag: '',
          authorName: ''
        }
      })
      router.push(`/?q=${debouncedSearchTerm}`)
    } else {
      router.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm])

  const [searchFn] = useLazyQuery(SEARCH_BLOG)

  return (
    <div className='w-full my-6 h-[50px] bg-[#F6F6F6B2] flex items-center rounded-full '>
      <div className='h-[20px] w-[20px] ml-[20px]'>
        <Search className='cursor-pointer' color='#00000099' />
      </div>
      <input
        onChange={(e) => setSearchTerm(e.target.value)}
        type='text'
        placeholder='Search by blog name...'
        className='bg-[#F6F6F6B2] w-full h-[50px] rounded-r-full ml-[10px] border-none px-3'
      />
    </div>
  )
}
