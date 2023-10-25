import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { fetchUser } from "@/lib/actions/user.action";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import consImage from '../../../../public/inprogress2.webp'
import Image from "next/image";

export const metadata = {
  title: 'Activity',
  description: 'Generated by create next app',
}

const page = async () => {
      const session = await getServerSession(authOptions);
  // console.log(session);
  if (!session) {
    redirect("/login");
  };
  const userInfo = await fetchUser(session?.user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <div><h1 className="mb-4 pt-5 text-center text-2xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Activity</span> Page Is Under Construction 🛠⛑</h1>
    <Image
                src={consImage}
                alt="heart"
                width={500}
                height={500}
                className="w-full h-auto"
              />
    </div>
  )
}

export default page