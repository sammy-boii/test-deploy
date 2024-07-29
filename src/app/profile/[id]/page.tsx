'use client'

import GET_PROFILE_BY_ID from '@/graphql/queries/getProfileByID.gql'
import GET_PROFILE from '@/graphql/queries/getProfile.gql'
import Image from 'next/image'
import { LoaderCircle, Pencil, Plus } from 'lucide-react'

import Link from 'next/link'
import UsersFollowingList from '@/components/profile/UsersFollowingList'
import { Suspense } from 'react'
import { BlogDataI } from '@/types/types'

import img1 from '../../../../public/trenOne.png'
import img2 from '../../../../public/trendTwo.png'
import { formatDate } from '@/lib/utils'
import { BLOGS_DOMAIN_URL } from '@/constants/domain_url'
import { type UserDataI } from '@/types/types'
import { DomainUrl } from '../../../../Codynn-Components/constants/DomainUrl'
import EditorToHtml from '../../../../Codynn-Components/editorToHtml/EditorToHtml'
import { useQuery } from '@apollo/client'

const imgs = [img1, img2]

const ViewProfilePage = ({ params: { id } }: { params: { id: string } }) => {
  const { data: userData, loading: userLoading } = useQuery(GET_PROFILE_BY_ID, {
    variables: { id: id }
  })

  const { data: currentUser, loading: currentUserLoading } =
    useQuery<UserDataI>(GET_PROFILE)

  if (userLoading || currentUserLoading)
    return <LoaderCircle className='animate-spin mt-32 mx-auto' size={70} />

  if (!userData?.getUserProfileById)
    return (
      <div className='text-5xl text-center pt-32 font-bold'>
        Error occured while fetching profile
      </div>
    )

  return (
    <main className='font-poppins w-[93%] mx-auto'>
      <div className='font-bold text-5xl pt-12 pb-8 tracking-tight'>
        Profile
      </div>

      <div className='flex text-opacity-50 gap-12 py-6'>
        <section>
          <div className='flex flex-col gap-4'>
            <Image
              className='rounded-full'
              src={userData.getUserProfileById.profile.profile_picture}
              alt='user'
              width={75}
              height={75}
            />
            <div className='font-bold text-opacity-100 text-2xl'>
              {userData.getUserProfileById.profile.first_name}{' '}
              {userData.getUserProfileById.profile.last_name}
            </div>
            <div className='text-[16px] text-[#8a8a8a] mt-[-10px]'>
              @{userData.getUserProfileById.profile.username}
            </div>
            <div className='text-[16px]'>
              {userData.getUserProfileById.profile.follower.length} followers
            </div>

            {currentUser?.getProfile._id ===
              userData?.getUserProfileById.profile._id && (
              <Link
                href={`${DomainUrl}/profile/edit`}
                className='flex font-bold items-center w-max gap-2 text-[14px] bg-[#d8d8d8] px-6 py-2 rounded-full'
              >
                <Pencil size={16} />
                <div>Edit Profile</div>
              </Link>
            )}

            <div>
              <div className='text-[18px] mt-8 font-bold'>Following</div>
              {userData?.getUserProfileById.profile.following.length === 0 ? (
                <div className='text-opacity-50 mt-2 text-[15px]'>
                  Not following anyone
                </div>
              ) : (
                <Suspense
                  fallback={<LoaderCircle className='animate-spin' size={24} />}
                >
                  <UsersFollowingList
                    userID={userData.getUserProfileById.profile._id}
                  />
                </Suspense>
              )}
            </div>
          </div>
        </section>

        <section className='ml-auto w-[650px]'>
          <div className='flex justify-between pb-12'>
            <div className='font-bold text-[22px] underline'>Posts</div>

            {currentUser?.getProfile._id ===
              userData?.getUserProfileById.profile._id && (
              <Link
                className='rounded-full font-bold flex items-center gap-2 px-6 py-2 text-white bg-black'
                href={`${BLOGS_DOMAIN_URL}/write`}
              >
                <Plus size={24} />
                <div>Add Blog</div>
              </Link>
            )}
          </div>

          {userData.getUserProfileById.blogs.length === 0 ? (
            <div className='mt-2 text-xl'>No blogs found</div>
          ) : (
            <div className='flex gap-4 flex-col'>
              {userData.getUserProfileById.blogs.map(
                (blog: BlogDataI, i: number) => (
                  <RightFeed index={i} key={blog._id} {...blog} />
                )
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

function RightFeed({
  _id,
  title,
  category,
  content,
  index,
  createdAt
}: BlogDataI & { index: number }) {
  return (
    <a
      href={`${BLOGS_DOMAIN_URL}/read/${_id}`}
      className='flex text-[11px] gap-x-3'
    >
      <Image
        width={192}
        height={172}
        className='rounded-lg'
        src={imgs[index % 2]}
        alt='img'
      />
      <div className='flex flex-col gap-3'>
        <div className='flex gap-2 items-center'>
          <div className='font-bold text-[13px] w-max bg-[#eee] px-3 py-1 text-[#9E2A2B] rounded-full'>
            {category?.name || 'No Category'}
          </div>
          <div className='text-[11px] opacity-70'>{formatDate(createdAt)}</div>
        </div>

        <div className='h-[51px] text-[#535353] line-clamp-2 text-xl font-bold'>
          {title}
        </div>

        <div className='h-16'>
          <EditorToHtml content={content} />
        </div>

        <div className='text-[14px] mt-[-4px] font-bold underline opacity-30'>
          Read More
        </div>
      </div>
    </a>
  )
}

export default ViewProfilePage
