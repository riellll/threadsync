import PostCard from '@/components/cards/PostCard'
import Pagination from '@/components/shared/Pagination';
import { fetchPosts } from '@/lib/actions/thread.action';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { fetchUser } from '@/lib/actions/user.action';


export default async function Home({searchParams}) {
  const result = await fetchPosts(searchParams.page ? searchParams.page : 1, 10);
  const session = await getServerSession(authOptions);
  const userInfo = await fetchUser(session?.user.id);
 

  return (
    <>
     {/* <h1 className="text-4xl text-black dark:text-gray-200 font-bold text-left">Home</h1> */}
    <section className="grid grid-cols-1 divide-y divide-solid">
    {result.posts.length === 0 ? (
          <p className='no-result'>No threads found</p>
        ) : (
          <>
            {result.posts.map((post) => (
              <PostCard
                key={post._id}
                id={post._id}
                currentUserId={'none'}
                userId={userInfo?._id.toString()}
                parentId={post.parentId}
                content={post.text}
                contentImage={post.img}
                author={post.author}
                createdAt={post.createdAt}
                comments={post.children}
                likes={post.likes}
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
