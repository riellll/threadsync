import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserCard from "@/components/cards/UserCard";
import BackArrow from "@/components/shared/BackArrow";
import { fetchThreadById, fetchThreadByIdEdit } from "@/lib/actions/thread.action";
import { getServerSession } from "next-auth";
// import Link from "next/link";
import { redirect } from "next/navigation";

const page = async ({ params }) => {
  const session = await getServerSession(authOptions);
  // console.log(session);
  if (!session) {
    redirect("/login");
  }

  const thread = await fetchThreadById(params.id, 'like');
  if (!thread) throw new Error("Error to fetch Data");
  console.log(thread);
  return (
    <section>
      <div className="flex gap-10">
       <BackArrow/>
        <h1 className="text-2xl font-bold text-black dark:text-gray-200">
          {`${thread.likes.length} Like${thread.likes.length !== 1 ? 's' : ''}`}
        </h1>
      </div>

      <div className="mt-14 flex flex-col gap-9">
          {thread.likes.map((person) => (
            <UserCard
              key={person.id}
              id={person.id}
              name={person.name}
              username={person.username}
              imgUrl={person.image}
              personType='User'
            />
          ))}
      </div>
    </section>
  );
};

export default page;
