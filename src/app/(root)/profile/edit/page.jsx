import AccountProfile from '@/components/forms/AccountProfile'
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { fetchUser } from '@/lib/actions/user.action';


const profile = async () => {
    const session = await getServerSession(authOptions);
  // console.log(session);
  if (!session) {
    redirect("/login");
  };
  const userInfo = await fetchUser(session?.user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const userData = {
    id: session?.user?.id,
    objectId: JSON.stringify(userInfo?._id),
    username: userInfo ? userInfo?.username : session?.user?.username ?? "",
    name: userInfo ? userInfo?.name : session?.user?.name ?? "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : session?.user?.image,
  };

  return (
    <>
   <h1 className="font-bold text-3xl text-black dark:text-gray-200">Edit Profile</h1>
      <p className="mt-3 text-base-regular  text-black dark:text-slate-300">Make any changes</p>

      <section className="mt-9 bg-gray-100 border-gray-200 dark:bg-gray-950 p-10">
        <AccountProfile user={userData} btnTitle="Continue" />
      </section>
    </>
  )
}

export default profile