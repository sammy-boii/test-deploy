import GET_ALL_BLOGS from '@/graphql/queries/getAllBlogs.gql'
import { useQuery } from '@apollo/client'
import Image from 'next/image'

import cardImg1 from '../../../public/cardOne.png'
import cardImg2 from '../../../public/cardTwo.png'
import cardImg3 from '../../../public/CardThree.png'
import { formatDate, formatLength } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import { BlogDataI } from '@/types/types'
import { CATEGORY_COLORS } from '@/constants/categoryColors'
import { BLOGS_DOMAIN_URL } from '@/constants/domain_url'
import trendTwo from '/public/trendTwo.png'
import trendOne from '/public/trenOne.png'

const cardImgsMobile = [trendOne, trendTwo]
const cardImgs = [cardImg1, cardImg2, cardImg3]

export function CategoryCard({ category }: { category: string }) {
  const { data, loading } = useQuery(GET_ALL_BLOGS)

  if (loading) return <p>Loading...</p>

  let filteredBlogs = data.getAllBlogs

  if (category !== 'all') {
    filteredBlogs = filteredBlogs.filter((blog: any) => {
      return blog.category._id === category
    })
  }

  if (filteredBlogs.length === 0)
    return <div className='mt-8 text-4xl font-bold'>No blogs</div>

  return (
    <div className='grid py-6 grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-8'>
      {filteredBlogs.map((blog: BlogDataI, index: number) => (
        <div key={index}>
          <BlogCard index={index} data={blog} />
        </div>
      ))}
    </div>
  )
}

export function BlogCard({ data, index }: { data: any; index: number }) {
  return (
    <a
      href={`${BLOGS_DOMAIN_URL}/read/${data._id}`}
      className='group w-full md:w-[270px] flex flex-row md:flex-col cursor-pointer rounded-lg h-auto md:h-[255px]'
    >
      <Image
        className='z-[-4] md:block hidden w-auto h-auto rounded-t-lg'
        src={cardImgs[index % 3]}
        alt='img'
      />
      <Image
        className='z-[-4] md:hidden w-[180px] h-[170px] rounded-t-lg'
        src={cardImgsMobile[index % 2]}
        alt='img'
      />
      <div className='rounded-lg flex flex-col gap-2 h-auto md:h-[70%] grow shadow-md bg-[#fcfcfc] translate-y-[-4px] px-3 pt-3 relative'>
        <div className='flex items-center gap-5'>
          <div
            className='font-bold transition duration-300  group-hover:opacity-100 opacity-60 bg-[#eee] px-2 py-1 rounded-full'
            style={{
              color: `${CATEGORY_COLORS[index % 3]}`
            }}
          >
            {data.category.name}
          </div>
          <div className='transition duration-300 group-hover:opacity-100 opacity-60 text-[12px]'>
            {data.content?.length ? (
              <div>{`${formatLength(data.content?.length)} read`}</div>
            ) : (
              <div>N/A</div>
            )}
          </div>
        </div>

        <div className='text-[20px] transition duration-300  group-hover:opacity-100 opacity-60 h-[55px] line-clamp-2 leading-tight font-bold'>
          {data.title}
        </div>
        <div className='flex transition duration-300  group-hover:opacity-100 opacity-60 font-bold text-[13px] gap-1'>
          <div className=''>{formatDate(data.createdAt)}</div>
          <div>-</div>
          <div className='transition duration-300 group-hover:opacity-100 opacity-60'>
            {(data.author?.username || data.author?.first_name) ?? 'Anonymous'}
          </div>
        </div>
        <div className='flex justify-between transition duration-300 group-hover:opacity-100 opacity-60 underline font-bold'>
          <div>Read More</div>
          <ArrowRight className='opacity-0 transition duration-300 group-hover:opacity-100 translate-y-[2px]' />
        </div>
      </div>
    </a>
  )
}

export function MiniCard() {}
