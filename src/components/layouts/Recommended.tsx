import GET_ALL_BLOGS from '@/graphql/queries/getAllBlogs.gql'
import { shuffleArray } from '@/lib/utils'
import { BlogCard } from './Card'
import { apolloServer } from '@/services/apollo-server'

export default async function Recommended() {
  const { data, loading } = await apolloServer.query({
    query: GET_ALL_BLOGS
  })

  if (loading) return <div>Loading...</div>

  const recommendedData = shuffleArray(data.getAllBlogs.slice(0, 9))

  return (
    <div className='pb-24'>
      <h1 className='font-semibold mt-[75px] mb-12 text-4xl'>Recommended</h1>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-y-8 gap-x-3'>
        {recommendedData.map((blog: any, index: number) => (
          <BlogCard index={index} data={blog} key={index} />
        ))}
      </div>
    </div>
  )
}
