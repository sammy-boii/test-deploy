import Image from 'next/image'

import GET_USER_FOLLOWINGS from '@/graphql/queries/getUserFollowings.gql'
import { UserFollowingI } from '@/types/types'
import { useQuery } from '@apollo/client'

const UsersFollowingList = async ({ userID }: { userID: string }) => {
  const { data: followingData } = useQuery<UserFollowingI>(
    GET_USER_FOLLOWINGS,
    {
      variables: { id: userID }
    }
  )

  return (
    <div className='flex pt-3 flex-col gap-y-3'>
      {followingData?.userFollowings.map((following) => (
        <div key={following._id} className='flex items-center gap-3'>
          <Image
            width={40}
            className='rounded-full'
            height={40}
            src={following.profile_picture ?? ''}
            alt='img'
          />
          <div className='text-sm font-bold'>
            {following.first_name} {following.last_name}
          </div>
        </div>
      ))}
    </div>
  )
}

export default UsersFollowingList
