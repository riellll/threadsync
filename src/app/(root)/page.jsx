import PostCard from '@/components/cards/PostCard'
import Pagination from '@/components/shared/Pagination';
import { fetchPosts } from '@/lib/actions/thread.action';


export default async function Home({searchParams}) {
  const result = await fetchPosts(searchParams.page ? searchParams.page : 1, 10);
  return (
    <>
     <h1 className="text-4xl text-black dark:text-gray-200 font-bold text-left">Home</h1>
    <section className="my-9 flex flex-col gap-10">
    {result.posts.length === 0 ? (
          <p className='no-result'>No threads found</p>
        ) : (
          <>
            {result.posts.map((post) => (
              <PostCard
                key={post._id}
                id={post._id}
                currentUserId={'session?.user.id'}
                parentId={post.parentId}
                content={post.text}
                contentImage={post.img}
                author={post.author}
                createdAt={post.createdAt}
                comments={post.children}
              />
            ))}
          </>
        )}
    </section>

    <Pagination
        path='/'
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
        Pcount={result.pageCount}
      />
    </>
  )
}
