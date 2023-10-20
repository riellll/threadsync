
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PostCard from "@/components/cards/PostCard";
import Comment from "@/components/forms/Comment";
import BackArrow from "@/components/shared/BackArrow";
import { fetchThreadById } from "@/lib/actions/thread.action";
import { fetchUser } from "@/lib/actions/user.action";
import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";

const page = async ({ params }) => {
  const session = await getServerSession(authOptions);
  // if (!session) {
  //   redirect("/login");
  // }

  const userInfo = await fetchUser(session?.user.id);
  // if (!userInfo?.onboarded) redirect("/");

  const thread = await fetchThreadById(params.id, 'thread');
  if (!thread) throw new Error("Error to fetch Data");


  return (
    <section className="relative">
       <div className="flex gap-5 pb-10">
       <BackArrow/>
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">
          Back
        </h1>
      </div>
      <div>
        <PostCard
          id={thread._id}
          currentUserId={session?.user.id}
          userId={userInfo?._id.toString()}
          parentId={thread.parentId}
          content={thread.text}
          contentImage={thread.img}
          author={thread.author}
          createdAt={thread.createdAt}
          comments={thread.children}
          likes={thread.likes}
          onboarded={userInfo?.onboarded}
        />
      </div>

      <div className="mt-7">
        <Comment
          threadId={params.id}
          currentUserImg={userInfo?.image}
          currentUserId={userInfo?._id.toString()}
          onboarded={userInfo?.onboarded}
        />
      </div>

      <div className="flex flex-col gap-2 mt-10">
        {thread.children.map((childItem) => (
          <PostCard
            key={childItem._id}
            id={childItem._id}
            currentUserId={session?.user.id}
            userId={userInfo?._id.toString()}
            parentId={childItem.parentId}
            content={childItem.text}
            author={childItem.author}
            community={childItem.community}
            createdAt={childItem.createdAt}
            comments={childItem.children}
            likes={childItem.likes}
            isComment={true}
            onboarded={userInfo?.onboarded}
          />
        ))}
      </div>
    </section>
  );
};

export default page;
