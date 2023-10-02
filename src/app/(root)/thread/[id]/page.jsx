
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PostCard from "@/components/cards/PostCard";
import Comment from "@/components/forms/Comment";
import { fetchThreadById } from "@/lib/actions/thread.action";
import { fetchUser } from "@/lib/actions/user.action";
import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";

const page = async ({ params }) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const userInfo = await fetchUser(session?.user.id);
  if (!userInfo?.onboarded) redirect("/");

  const thread = await fetchThreadById(params.id);
  if (!thread) throw new Error("Error to fetch Data");
    // console.log(thread.author);

  return (
    <section className="relative">
      <div>
        <PostCard
          id={thread._id}
          currentUserId={session?.user.id}
          parentId={thread.parentId}
          content={thread.text}
          contentImage={thread.img}
          author={thread.author}
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      </div>

      <div className="mt-7">
        <Comment
          threadId={params.id}
          currentUserImg={userInfo?.image}
          currentUserId={userInfo?._id.toString()}
        />
      </div>

      <div className="flex flex-col gap-2 mt-10">
        {thread.children.map((childItem) => (
          <PostCard
            key={childItem._id}
            id={childItem._id}
            currentUserId={session?.user.id}
            parentId={childItem.parentId}
            content={childItem.text}
            author={childItem.author}
            community={childItem.community}
            createdAt={childItem.createdAt}
            comments={childItem.children}
            isComment={true}
          />
        ))}
      </div>
    </section>
  );
};

export default page;
