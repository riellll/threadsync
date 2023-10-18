import { fetchReplyThreads } from "@/lib/actions/thread.action"
import PostCard from "../cards/PostCard"



const RepliesTab = async ({ currentUserId, accountId, accountType }) => {
  const replies = await fetchReplyThreads(accountId)
  // console.log(replies);
  return (
    <section className="mt-9 flex flex-col gap-10">
      {replies.map((thread) => (
        <PostCard
          key={thread._id}
          id={thread._id}
          currentUserId={currentUserId}
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
        />
      ))}
    </section>
  )
}

export default RepliesTab