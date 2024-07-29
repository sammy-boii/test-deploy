import React from 'react'

import SEARCH_BLOG from '@/graphql/queries/searchBlog.gql'
import { BlogCard } from './Card'
import { BlogDataI } from '@/types/types'
import { apolloServer } from '@/services/apollo-server'

const Results = async ({ query: q }: { query: string }) => {
  const tag = q.split(' ')
  const { data, loading } = await apolloServer.query({
    query: SEARCH_BLOG,
    variables: {
      title: q,
      authorName: q,
      tag
    }
  })

  if (loading) return <div className='text-4xl pt-12 font-bold'>Loading...</div>

  if (data.searchBlog.length === 0)
    return <div className='text-4xl font-bold pt-12'>No results</div>

  return (
    <div className='grid pt-12 grid-cols-4 gap-3'>
      {data.searchBlog.map((blog: BlogDataI, index: number) => (
        <BlogCard key={blog._id} index={index} data={blog} />
      ))}
    </div>
  )
}

export default Results
