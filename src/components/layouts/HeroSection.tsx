import Image from 'next/image'
import hero from '../../../public/hero.png'

import GET_ALL_BLOGS from '@/graphql/queries/getAllBlogs.gql'

import Link from 'next/link'
import { apolloServer } from '@/services/apollo-server'
import EditorToHtml from '../../../Codynn-Components/editorToHtml/EditorToHtml'
import { BLOGS_DOMAIN_URL } from '@/constants/domain_url'

export default async function HeroSection() {
  const { data } = await apolloServer.query({
    query: GET_ALL_BLOGS,
    fetchPolicy: 'no-cache'
  })

  const latestBlog = data.getAllBlogs[data.getAllBlogs.length - 1]

  return (
    <div className='h-[499px] overflow-clip mt-[55px] md:mt-[40px] md'>
      <h1 className='font-bold text-3xl md:text-5xl'>Articles & Blogs</h1>

      <div
        className='w-full h-[392px] p-0 md:p-2 rounded-xl flex flex-col-reverse md:flex-row mt-52 md:mt-8 gap-[53px]'
        style={{ boxShadow: '0px 14px 32px 0px #00000014' }}
      >
        <div className='max-w-[441px]  flex flex-col items-start gap-[13px]'>
          <h1
            className='font-bold text-justify'
            style={{ fontSize: '26px', lineHeight: '42px' }}
          >
            {latestBlog?.title}
          </h1>
          <div className='font-normal relative max-w-[550px] h-[200px] text-lg text-justify'>
            <EditorToHtml content={latestBlog?.content} />
            <div className='absolute left-0 bottom-0 w-full h-4' />
          </div>

          <a
            href={`${BLOGS_DOMAIN_URL}/read/${latestBlog?._id}`}
            className=' font-semibold text-xl hover:text-black cursor-pointer hover:underline text-[#72727299]'
          >
            Read more
          </a>
        </div>

        <div
          className='rounded-xl '
          style={{ boxShadow: '0px 14px 32px 0px #00000014' }}
        >
          <Image src={hero} alt='heroSectionImg' width={600} height={352} />
        </div>
      </div>
    </div>
  )
}
