import { fetchLikesThreads } from '@/lib/actions/thread.action'
import PostCard from '../cards/PostCard'


const LikedTab = async ({ currentUserId, accountId, userId, accountType }) => {
  const likes = await fetchLikesThreads(userId, profileTab)
  return (
    <section className="mt-9 flex flex-col gap-10">
    {likes.map((thread) => (
      <PostCard
        key={thread._id}
        id={thread._id}
        currentUserId={currentUserId}
        userId={userId}
        parentId={thread.parentId}
        content={thread.text}
        contentImage={thread.img}
        author={
{
                name: thread.author.name,
                image: thread.author.image,
                id: thread.author.id,
              }
        }
        createdAt={thread.createdAt}
        comments={thread.children}
        likes={thread.likes}
      />
    ))}
  </section>
  )
}

export default LikedTab