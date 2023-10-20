import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import LoginForm from '@/components/forms/LoginForm'
import { fetchUser } from '@/lib/actions/user.action';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {
  const session = await getServerSession(authOptions);
  // if (!session) {
  //   redirect("/login");
  // }
  const userInfo = await fetchUser(session?.user.id);
  if (session && !userInfo) redirect("/onboarding");
  return (
    <>
    <section className="flex min-h-full overflow-hidden pt-16 sm:py-28">
    <div className="mx-auto flex w-full max-w-2xl flex-col px-4 sm:px-6 min-[320px]:px-10">
      <div className="relative mt-12 sm:mt-16">
        <h1 className="text-center text-2xl font-medium tracking-tight text-gray-200">
          Sign in to your account
        </h1>
      </div>
      <div className="sm:rounded-5xl rounded -mx-4 mt-10 flex-auto bg-slate-900 px-4 py-10 shadow-2xl shadow-gray-900/10 sm:mx-0 sm:flex-none sm:p-24">
      
        <LoginForm />
      </div>
    </div>
  </section>
</>
  )
}

export default page