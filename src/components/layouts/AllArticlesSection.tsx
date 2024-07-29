'use client'

import Categories from './Categories'

import GET_CATEGORIES from '@/graphql/queries/getCategories.gql'

import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { CategoryCard } from './Card'

export default function AllArticlesSection() {
  const [category, setCategory] = useState('all')

  const categoryQ = useQuery(GET_CATEGORIES)

  if (categoryQ.loading)
    return (
      <div className='h-[586px] mt-[70px]'>
        <div className='w-[1134px] h-[506px] mt-10'></div>
      </div>
    )

  if (categoryQ.error) return <div>Error: {categoryQ.error.message}</div>

  return (
    <div className='min-h-[406px] my-[70px]'>
      <div className='mt-10'>
        <Categories
          categories={categoryQ.data.getCategories}
          setCategory={setCategory}
          category={category}
        />
        <CategoryCard category={category} />
      </div>
    </div>
  )
}
