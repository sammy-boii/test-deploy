'use client'

import { useMutation, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import FOLLOW_USER from '@/graphql/queries/followUser.gql'
import UNFOLLOW_USER from '@/graphql/queries/unfollowUser.gql'
import GET_USER_FOLLOWINGS from '@/graphql/queries/getUserFollowings.gql'
import { LoaderCircle } from 'lucide-react'

const FollowButton = ({
  userId,
  authorId
}: {
  userId: string
  authorId: string
}) => {
  const [isFollwing, setIsFollowing] = useState(false)
  const { data: followingData, loading: followingLoading } = useQuery(
    GET_USER_FOLLOWINGS,
    {
      variables: { id: userId }
    }
  )

  const [followUser, { loading: followLoading }] = useMutation(FOLLOW_USER)

  const [unFollowUser, { loading: unFollowLoading }] =
    useMutation(UNFOLLOW_USER)

  useEffect(() => {
    setIsFollowing(followingData?.userFollowings.find((pr:any)=>pr._id === authorId))
  }, [authorId, followingData?.userFollowings])

  async function handleFollowing() {
    try {
      if (isFollwing) {
        await unFollowUser({ variables: { id: authorId } })
        setIsFollowing(false)
        toast.success('Unfollowed successfully')
      } else {
        await followUser({ variables: { id: authorId } })
        setIsFollowing(true)
        toast.success('Followed successfully')
      }
    } catch (error) {
      if (error instanceof Error) toast.error(error.message)
      else {
        toast.error('Something went wrong')
      }
    }
  }

  return (
    <button
      onClick={handleFollowing}
      className='bg-[#C0C0C0] w-24 h-9 text-center text-[14px] cursor-pointer rounded-full font-bold'
    >
      {followLoading || unFollowLoading || followingLoading ? (
        <div className='flex items-center justify-center'>
          <LoaderCircle className='animate-spin' />
        </div>
      ) : (
        <div>{isFollwing ? 'Following' : 'Follow'}</div>
      )}
    </button>
  )
}

export default FollowButton
