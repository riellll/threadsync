import AccountProfile from '@/components/forms/AccountProfile'
import React from 'react'

const page = () => {
  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="font-bold text-3xl text-white">Onboarding</h1>
      <p className="mt-3 text-base-regular text-slate-300">
        Complete your profile now, to use Postchain.
      </p>

      <section className="mt-9 bg-zinc-950 p-10">
        <AccountProfile />
      </section>
    </main>
  )
}

export default page

{/* <AccountProfile user={userData} btnTitle='Continue'/> */}