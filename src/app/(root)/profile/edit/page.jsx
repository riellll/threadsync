import AccountProfile from '@/components/forms/AccountProfile'
import React from 'react'

const profile = () => {
  return (
    <>
   <h1 className="font-bold text-3xl text-black dark:text-gray-200">Edit Profile</h1>
      <p className="mt-3 text-base-regular  text-black dark:text-slate-300">Make any changes</p>

      <section className="mt-9 bg-gray-100 border-gray-200 dark:bg-gray-950 p-10">
        <AccountProfile user={'userData'} btnTitle="Continue" />
      </section>
    </>
  )
}

export default profile