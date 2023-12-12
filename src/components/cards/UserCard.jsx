"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";


const UserCard = ({ id, name, username, imgUrl, personType }) => {
      const router = useRouter();
  return (
        <article className='flex flex-row justify-between gap-4 max-xs:rounded-xl max-xs:bg-dark-3 max-xs:p-4 xs:flex-row xs:items-center'>
          <div className='flex flex-1 items-start justify-start gap-3 xs:items-center'>
            <div className='flex items-center justify-center'>
              <img
                src={imgUrl}
                alt='user_logo'
                // width={500}
                // height={500}
                className='w-12 h-auto rounded-full object-cover'
              />
            </div>
    
            <div className='flex-1'>
              <h4 className='font-semibold'>{name}</h4>
              <p className='font-normal dark:text-gray-400 text-gray-900'>@{username}</p>
            </div>
          </div>
    
          <Button
            className='h-auto min-w-[74px] rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 text-[12px] text-light-1 dark:hover:bg-gray-700'
            onClick={() => {
                router.push(`/profile/${id}`);
            }}
          >
            View
          </Button>
        </article>
  )
}

export default UserCard