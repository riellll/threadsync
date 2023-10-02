import CreatePost from '@/components/forms/CreatePost'
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { fetchUser } from '@/lib/actions/user.action';

const page = async () => {
  const session = await getServerSession(authOptions);
  // console.log(session);
  if (!session) {
    redirect("/login");
  };
  const userInfo = await fetchUser(session?.user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");
  return (
    <>
    <h1 className='text-3xl font-bold text-black dark:text-gray-200 pb-10'>Create Post</h1>
    <CreatePost userId={userInfo?._id.toString()}/>
    </>
  )
}

export default page