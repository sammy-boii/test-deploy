import Image from 'next/image'

import trendingHero from '/public/trendingHero.png'
import trendTwo from '/public/trendTwo.png'
import trendOne from '/public/trenOne.png'
import GET_POPULAR_BLOGS from '@/graphql/queries/getPopularBlog.gql'
import { BlogDataI } from '@/types/types'
import { formatDate } from '@/lib/utils'
import { apolloServer } from '@/services/apollo-server'
import EditorToHtml from '../../../Codynn-Components/editorToHtml/EditorToHtml'
import { BLOGS_DOMAIN_URL } from '@/constants/domain_url'

const imgs = [trendOne, trendTwo]

export default async function TrendingSection() {
  const { data, loading } = await apolloServer.query({
    query: GET_POPULAR_BLOGS
  })

  if (loading) return <div>Loading...</div>

  if (data.popularBlogs.length === 0) return <div>No trending blogs</div>

  return (
    <div className='relative pb-4'>
      <h1 className='font-semibold text-3xl md:text-5xl my-3 mb-9'>Trending</h1>
      <div className='flex md:flex-row flex-col gap-2'>
        <div className='w-full md:w-[70%]'>
          <LeftSection {...data.popularBlogs[0]} />
          <a
            href={`${BLOGS_DOMAIN_URL}/read/${data.popularBlogs[0]._id}`}
            className='hover:opacity-100 absolute z-[10] md:bottom-4 left-0 font-bold opacity-70 underline'
          >
            Read More
          </a>
        </div>

        <div className='flex flex-col md:mt-0 mt-10 w-full md:w-[30%] gap-3'>
          {data.popularBlogs.slice(1, 4).map((blog: any, index: number) => (
            <RightSection index={index} key={index} {...blog} />
          ))}
        </div>
      </div>

      <div className='flex gap-4 mt-8'></div>
    </div>
  )
}

export function LeftSection({
  _id,
  title,
  content,
  category,
  createdAt
}: BlogDataI) {
  return (
    <div className='flex h-[390px] md:h-[510px] overflow-y-hidden flex-col gap-4'>
      <Image className='rounded-lg' src={trendingHero} alt='img' />
      <div className='flex gap-8 items-center'>
        <div className='font-bold w-max bg-[#eee] px-3 py-1 text-[#9E2A2B] rounded-full'>
          {category.name}
        </div>
        <div className='text-[12px] opacity-70'>{formatDate(createdAt)}</div>
      </div>

      <div className='text-3xl text-wrap font-bold'>{title}</div>

      <div className='mt-4'>
        <EditorToHtml content={content} />
      </div>
    </div>
  )
}

export function RightSection({
  _id,
  title,
  category,
  index,
  createdAt
}: BlogDataI & { index: number }) {
  return (
    <a
      href={`${BLOGS_DOMAIN_URL}/read/${_id}`}
      className='flex group text-[11px] gap-x-3'
    >
      <Image
        width={192}
        height={172}
        className='rounded-lg opacity-100'
        src={imgs[index % 2]}
        alt='img'
      />
      <div className='flex opacity-60 group-hover:opacity-100 transition-opacity duration-300 flex-col gap-4'>
        <div className='flex gap-2 items-center'>
          <div className='font-bold w-max bg-[#eee] px-3 py-1 text-[#9E2A2B] rounded-full'>
            {category.name}
          </div>
          <div className='text-[9px] opacity-70'>{formatDate(createdAt)}</div>
        </div>

        <div className='h-[65px] line-clamp-3 text-[15px] font-bold'>
          {title}
        </div>

        <div className='text-[12px] underline opacity-70'>Read More</div>
      </div>
    </a>
  )
}
