import CreatePost from '@/components/forms/CreatePost'
import React from 'react'

const page = () => {
  return (
    <>
    <h1 className='text-3xl font-bold text-black dark:text-gray-200 pb-10'>Create Post</h1>
    <CreatePost/>
    </>
  )
}

export default page