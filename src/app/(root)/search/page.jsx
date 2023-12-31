import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { fetchUser, fetchUsers } from '@/lib/actions/user.action';
import Searchbar from "@/components/shared/Searchbar";
import UserCard from "@/components/cards/UserCard";

export const metadata = {
  title: 'Search User',
  description: 'Generated by create next app',
}

const page = async ({searchParams}) => {
  const session = await getServerSession(authOptions);
  // console.log(session);
  if (!session) {
    redirect("/login");
  };
  const userInfo = await fetchUser(session?.user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchUsers({
    userId: session?.user.id,
    searchString: searchParams.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 25,
  });
  
  return (
    <section>
      {/* <h1 className="text-3xl font-bold text-black dark:text-gray-200 pb-10">Search</h1> */}

    <Searchbar/>

    <div className='mt-14 flex flex-col gap-9'>
        {result.length === 0 ? (
          <p className='no-result'>No Result</p>
        ) : (
          <>
            {result.map((person) => (
              <UserCard
                key={person.id}
                id={person.id}
                name={person.name}
                username={person.username}
                imgUrl={person.image}
                personType='User'
              />
            ))}
          </>
        )}
      </div>
      </section>
  );
};

export default page;
