import { CategoriesI } from '@/types/types'
import React from 'react'
import { Button } from '../ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '../ui/carousel'

const Categories = ({
  categories,
  setCategory,
  category
}: {
  category: string
  categories: CategoriesI[]
  setCategory: React.Dispatch<React.SetStateAction<string>>
}) => {
  if (!categories.length)
    return (
      <div className='mb-6'>
        <Button>No Categories...</Button>
      </div>
    )

  return (
    <Carousel className='flex w-[90%] mx-auto gap-0.5 text-xl mb-4 pb-4 '>
      <CarouselContent>
        <CarouselItem>
          <Button
            className={`${
              category === 'all'
                ? 'bg-black text-white'
                : 'bg-transparent text-black'
            }`}
            onClick={() => setCategory('all')}
          >
            All Category
          </Button>
        </CarouselItem>
        {categories.map((_category, index) => (
          <CarouselItem key={index}>
            <Button
              className={`${
                category === _category._id
                  ? 'bg-black text-white'
                  : 'bg-transparent text-black'
              }`}
              onClick={() => setCategory(_category._id)}
            >
              {_category.name}
            </Button>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        style={{
          boxShadow: '1px 1px 25px 25px #fff'
        }}
        className='border-none'
      />
      <CarouselNext
        style={{
          boxShadow: '1px 1px 25px 25px #fff'
        }}
        className='border-none'
      />
    </Carousel>
  )
}

export default Categories
