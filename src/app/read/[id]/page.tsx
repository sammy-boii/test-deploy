export const revalidate = 0

import GET_BLOG from '@/graphql/queries/getBlog.gql'
import BackButton from '@/components/utils/BackButton'
import { apolloServer } from '@/services/apollo-server'
import { CATEGORY_COLORS } from '@/constants/categoryColors'
import GET_PROFILE from '@/graphql/queries/getProfile.gql'
import FollowButton from '@/components/utils/FollowButton'
import { Bookmark, Ellipsis, PenLine, Upload } from 'lucide-react'
import Image from 'next/image'
import { BLOGS_DOMAIN_URL } from '@/constants/domain_url'
import { normal_poppins } from '@/lib/fonts'
import Link from 'next/link'

const ReadPage = async ({ params }: { params: { id: string } }) => {
  const { data: blogData, loading: blogLoading } = await apolloServer.query({
    query: GET_BLOG,
    variables: { id: params.id }
  })

  var userData = null

  try {
    var { data: userData } = await apolloServer.query({
      query: GET_PROFILE
    })
  } catch (error) {
    console.log(error)
  }

  if (blogLoading)
    return (
      <div className='text-5xl text-center pt-32 font-bold'>Loading...</div>
    )

  return (
    <div className='max-w-[1150px] w-full mt-12 mx-auto p-0 md:p-6'>
      <BackButton />

      <div className='flex items-baseline gap-8'>
        <div
          className='font-bold mt-4 w-max transition duration-300  group-hover:opacity-100 opacity-60 bg-[#eee] px-3 py-1 rounded-full'
          style={{
            color: `${CATEGORY_COLORS[Math.floor(Math.random() * 3)]}`
          }}
        >
          {blogData.getBlog?.category.name}
        </div>

        <div className='text-[#888] text-[12px] font-bold'>
          {new Date(parseInt(blogData.getBlog?.createdAt)).toDateString() ||
            'No Date'}
        </div>
        {userData?.getProfile?._id === blogData?.getBlog?.author?._id && (
          <a
            href={`${BLOGS_DOMAIN_URL}/edit/${params.id}`}
            className='ml-auto flex gap-2 items-center bg-[#ccc] rounded-full px-6 py-2'
          >
            <PenLine size={18} />
            <div className={normal_poppins.className}>Edit</div>
          </a>
        )}
      </div>

      <div className='flex w-full gap-4 justify-between items-center'>
        <h1 className='text-4xl max-w-[85%] pt-6 pb-6 font-bold'>
          {blogData.getBlog?.title || 'Untitled'}
        </h1>
      </div>

      <div className='flex items-center justify-between'>
        <div className='flex  gap-3 items-center'>
          {blogData.getBlog?.author?.profile_picture ? (
            <Link
              href={`${BLOGS_DOMAIN_URL}/profile/${blogData?.getBlog?.author?._id}`}
            >
              <Image
                width={40}
                height={40}
                src={blogData.getBlog?.author?.profile_picture}
                alt='profile'
                className='rounded-full'
              />
            </Link>
          ) : (
            <div className='size-14 rounded-full bg-slate-300' />
          )}
          <div>
            <Link
              href={`${BLOGS_DOMAIN_URL}/profile/${blogData.getBlog?.author?._id}`}
              className='font-bold'
            >
              {blogData.getBlog?.author?.username ||
                blogData.getBlog?.author?.first_name}
            </Link>
            <div className='text-sm opacity-75'>
              {blogData.getBlog?.author?.email}
            </div>
          </div>

          {userData?.getProfile &&
            userData?.getProfile?._id !== blogData?.getBlog?.author?._id && (
              <FollowButton
                userId={userData?.getProfile?._id}
                authorId={blogData.getBlog?.author?._id}
              />
            )}
        </div>

        <div className='flex gap-5 opacity-60 scale-[0.8] items-center'>
          <Bookmark />
          <Upload />
          <Ellipsis />
        </div>
      </div>
      <div className='pt-12'>{JSON.stringify(blogData.getBlog?.content)}</div>
    </div>
  )
}

export default ReadPage
