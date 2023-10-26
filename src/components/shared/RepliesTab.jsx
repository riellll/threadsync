import { fetchReplyThreads } from "@/lib/actions/thread.action"
import PostCard from "../cards/PostCard"




const RepliesTab = async ({ currentUserId, accountId, userId, accountType }) => {
  const replies = await fetchReplyThreads(accountId)
  return (
    <section className="mt-9 grid grid-cols-1 divide-y divide-solid">
      {replies.map((thread) => (
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

export default RepliesTab