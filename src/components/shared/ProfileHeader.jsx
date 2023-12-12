import React from 'react'
import profile from "../../../public/assets/user.svg";
import Image from 'next/image';
import Link from 'next/link';

const ProfileHeader = ({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
  type,
}) => {
  // console.log(accountId)
  return (
    <div className="flex w-full flex-col justify-start">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-20 w-20 object-cover items-center">
            <img
              src={imgUrl}
              alt="logo"
              // width={500}
              // height={500}
              className="w-20 h-auto rounded-full object-cover shadow-2xl"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-left text-xl font-semibold dark:text-white text-gray-900">
              {name}
            </h2>
            <p className="text-base-medium dark:text-gray-400 text-gray-900">@{username}</p>
          </div>
        </div>
        {accountId === authUserId && type !== "Community" && (
        <Link href="/profile/edit">
          <div className="flex cursor-pointer gap-3 rounded-lg bg-[#24292F]/90 px-4 py-2">
            <Image src="/assets/edit.svg" alt="logout" width={16} height={16} />

            <p className="text-gray-200 max-sm:hidden">Edit</p>
          </div>
        </Link>
        )}
      </div>

      <p className="mt-6 max-w-lg text-base-regular dark:text-gray-400 text-gray-900">{bio}</p>

      <div className="mt-12 h-0.5 w-full bg-dark-3" />
    </div>
  )
}

export default ProfileHeader