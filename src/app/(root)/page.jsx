import PostCard from '@/components/cards/PostCard'
import Image from 'next/image'

export default function Home() {
  return (
    <>
     <h1 className="text-4xl text-black dark:text-gray-200 font-bold text-left">Home</h1>
    <section className="mt-9 flex flex-col gap-10">
      <PostCard/>
      <PostCard/>
      <PostCard/>
      <PostCard/>
      <PostCard/>
    </section>
    </>
  )
}
