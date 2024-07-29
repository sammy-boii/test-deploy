'use client'

import React, { useEffect, useReducer, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import dynamic from 'next/dynamic'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger
} from '@/components/ui/dialog'
import EDIT_BLOG from '@/graphql/queries/editBlog.gql'
import UserTags from '@/components/ui/UserTags'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Layers, LoaderCircle, Tags } from 'lucide-react'

import { DialogTitle } from '@radix-ui/react-dialog'
import toast from 'react-hot-toast'
import GET_CATEGORIES from '@/graphql/queries/getCategories.gql'
import GET_BLOG from '@/graphql/queries/getBlog.gql'
import GET_PROFILE from '@/graphql/queries/getProfile.gql'
import { BlogDataI, UserDataI } from '@/types/types'
import { OutputData } from '@editorjs/editorjs'
import { notFound, useRouter } from 'next/navigation'

const Editorjs = dynamic(() => import('@/components/Editorjs'), { ssr: false })

type TagAction =
  | { type: 'ADD_TAG'; tag: string }
  | { type: 'REMOVE_TAG'; tag: string }

function tagReducer(state: string[], action: TagAction): string[] {
  switch (action.type) {
    case 'ADD_TAG':
      return state.includes(action.tag) ? state : [...state, action.tag]
    case 'REMOVE_TAG':
      return state.filter((tag) => tag !== action.tag)
    default:
      return state
  }
}

export default function EditPage({
  params: { id }
}: {
  params: { id: string }
}) {
  const { data: content, loading: contentLoading } = useQuery(GET_BLOG, {
    variables: {
      id
    }
  })

  const [editedContent, setEditedContent] = useState<OutputData>({
    version: '0',
    time: Date.now(),
    blocks: []
  })

  const { data: userData, loading: userLoading } =
    useQuery<UserDataI>(GET_PROFILE)
  const categoryQ = useQuery(GET_CATEGORIES)

  const [title, setTitle] = useState('')
  const [newTag, setNewTag] = useState('')
  const [tags, dispatch] = useReducer(tagReducer, [])
  const [category, setCategory] = useState({ id: '', name: '' })

  const [editBlog, { loading, error }] = useMutation(EDIT_BLOG, {
    onCompleted: () => {
      toast.dismiss()

      toast.success('Blog updated successfully')
    }
  })

  useEffect(() => {
    try {
      if (content?.getBlog)
        setEditedContent(JSON.parse(content?.getBlog?.content))
    } catch (e) {
      setEditedContent({
        version: '0',
        time: Date.now(),
        blocks: [
          {
            type: 'paragraph',
            data: {
              text: content?.getBlog?.content
            }
          }
        ]
      })
    }

    setTitle(content?.getBlog?.title)
    setCategory({
      id: content?.getBlog?.category._id,
      name: content?.getBlog?.category.name
    })

    content?.getBlog?.tags?.map((tag: string) =>
      dispatch({
        type: 'ADD_TAG',
        tag
      })
    )
  }, [content])

  if (contentLoading || userLoading)
    return <LoaderCircle className='animate-spin mt-32 mx-auto' size={100} />

  const addTag = () => {
    if (newTag) {
      dispatch({ type: 'ADD_TAG', tag: newTag })
      setNewTag('')
    }
  }

  if (loading) {
    toast.loading('Creating blog...')
  }

  if (error) {
    toast.dismiss()
    toast.error(error.message)
  }

  const removeTag = (tag: string) => {
    dispatch({ type: 'REMOVE_TAG', tag })
  }

  if (content?.getBlog.author?._id !== userData?.getProfile?._id) {
    notFound()
  }

  return (
    <div className='pb-24'>
      <Dialog>
        <div className='max-w-[1133px] pt-12 mx-auto '>
          <h1 className='font-bold text-5xl'>Create</h1>

          <div className='w-full flex gap-5 items-center mt-7'>
            <h1 className='font-semibold md:block hidden text-3xl'>Title</h1>

            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name='inputBox'
              placeholder='Your title goes here'
              className=' h-[54px] w-[75%] grow bg-[#F6F6F6] rounded-xl font-light text-sm pl-5'
            />

            <button
              disabled={loading}
              onClick={() => {
                if (!title) {
                  toast.error('Enter a title')
                } else if (!tags.length) {
                  toast.error('Enter a tag')
                } else if (!editedContent.blocks.length) {
                  toast.error('You cannot create an empty blog')
                } else if (!category.id || !category.name) {
                  toast.error('Select a category')
                } else {
                  editBlog({
                    variables: {
                      id: content?.getBlog?._id,
                      title,
                      content: JSON.stringify(editedContent),
                      tags,
                      category: category.id
                    }
                  })
                }
              }}
              className='w-[173px] ml-auto h-[50px] bg-[#C4C4C480] font-medium text-xl'
              style={{ borderRadius: '10px' }}
            >
              Post
            </button>
          </div>

          <div className='flex md:flex-row flex-col-reverse gap-5 mt-5'>
            <div className='grow flex flex-col'>
              <div className='flex justify-between'>
                <div
                  className='bg-[#f6f6f6] p-4 md:p-0 w-full overflow-y-scroll h-[550px]'
                  id='editorjs'
                >
                  {editedContent ? (
                    <Editorjs
                      content={editedContent}
                      setContent={setEditedContent}
                    ></Editorjs>
                  ) : (
                    <div className='text-center'>
                      <LoaderCircle className='animate-spin' size={100} />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className='flex flex-wrap md:flex-col gap-3'>
              <Dialog>
                {/* hidden for now */}
                <DialogTrigger className='w-[48%] hidden ml-auto md:w-[173px]  items-center gap-2 h-[50px] rounded-xl bg-[#F6F6F6] hover:bg-[#e4e4e4] transition-all duration-100 font-normal text-base text-[#00000099]'>
                  <button className='p-3 flex gap-2 items-center'>
                    <Layers color='#00000099' width={18} height={27} />
                    Set Category
                  </button>
                </DialogTrigger>

                <DialogContent className='p-8'>
                  <DialogHeader>
                    <DialogTitle className='font-bold text-xl pb-2'>
                      Select a category
                    </DialogTitle>
                  </DialogHeader>
                  <DialogDescription className='flex flex-wrap gap-2'>
                    {categoryQ.data &&
                      categoryQ.data.getCategories.map((_category: any) => (
                        <div
                          onClick={() =>
                            setCategory({
                              id: _category._id,
                              name: _category.name
                            })
                          }
                          key={_category._id}
                          className={`${
                            category.id === _category._id
                              ? 'bg-black text-white'
                              : ''
                          } border cursor-pointer rounded-full px-2 py-1 border-black `}
                        >
                          <p>{_category.name}</p>
                        </div>
                      ))}
                  </DialogDescription>
                </DialogContent>
              </Dialog>
              <DialogTrigger className='w-[48%] hover:bg-[#e4e4e4] transition-all duration-100 ml-auto md:w-[173px] h-[50px] rounded-xl bg-[#F6F6F6] font-normal text-base text-[#00000099]'>
                <div className='p-3 flex gap-1 items-center'>
                  <Tags color='#00000099' width={18} height={27} />
                  Edit Tags
                </div>
              </DialogTrigger>

              <div>
                <DialogContent className='p-8'>
                  <DialogHeader>
                    <DialogTitle>Enter a tag</DialogTitle>
                  </DialogHeader>
                  <DialogDescription>
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                    />
                  </DialogDescription>
                  <DialogClose className='w-max' asChild>
                    <Button
                      onClick={addTag}
                      className='bg-black/80'
                      type='button'
                    >
                      Done
                    </Button>
                  </DialogClose>
                </DialogContent>

                <div className='flex ml-0 md:ml-2 mt-4 md:mt-0 flex-wrap gap-x-2 gap-y-1 w-full md:w-[170px]'>
                  {tags.map((tag) => (
                    <UserTags removeTag={removeTag} key={tag} text={tag} />
                  ))}
                </div>
                {category.name && (
                  <div className='border text-[14px] w-max border-black opacity-70 rounded-full py-1 px-3 my-3'>
                    <span className='font-bold'>Category: </span>{' '}
                    {category.name}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
