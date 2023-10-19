import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import heart from "../../../public/assets/heart-gray.svg";
import reply from "../../../public/assets/reply.svg";
import repost from "../../../public/assets/repost.svg";
import share from "../../../public/assets/share.svg";
// import donbel from "../../../public/don-bel.webp";

const PostCardIcons = ({threadId}) => {
  return (
    <div className="flex gap-3.5">
                  <button className="flex text-center text-gray-900 dark:text-gray-200 px-1.5 hover:bg-red-200  hover:text-red-500 dark:hover:text-red-500 rounded-full">
                  {/* <Image
                    src={heart}
                    alt="heart"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain text-red-500 rounded-full"
                    /> */}
                    {/* <span className="text-gray-500">023</span> */}
                    <svg className="w-5 h-5 mt-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 19">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M11 4C5.5-1.5-1.5 5.5 4 11l7 7 7-7c5.458-5.458-1.542-12.458-7-7Z"/>
  </svg>
                    </button>
                  <Link href={`/thread/${threadId}`} className='text-center text-gray-600 dark:text-gray-400 hover:bg-blue-200  hover:text-blue-500 dark:hover:text-blue-600 dark:hover:bg-blue-300 px-1.5 rounded-full'>
                  <svg className="w-5 h-5 mt-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 19">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M5.5 6.5h.01m4.49 0h.01m4.49 0h.01M18 1H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
  </svg>
                  </Link>
                   <div  className='text-center cursor-pointer text-gray-600 dark:text-gray-400 hover:bg-green-100  hover:text-green-500 dark:hover:text-green-500 p-1 rounded-full'>
                   <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 15">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m13.717 1 5.518 4.95a1.05 1.05 0 0 1 0 1.549l-5.612 5.088m-5.73-3.214v1.615a.95.95 0 0 0 1.525.845l5.108-4.251a1.1 1.1 0 0 0 0-1.646L9.418 1.685a.95.95 0 0 0-1.525.846v1.7c-3.312 0-6 2.979-6 6.654v1.329a.7.7 0 0 0 1.344.353 5.174 5.174 0 0 1 4.652-3.191l.004-.003Z"/>
  </svg>
                  </div>
                  <div  className='text-center cursor-pointer text-gray-600 dark:text-gray-400 hover:bg-blue-200  hover:text-blue-500 dark:hover:text-blue-600 dark:hover:bg-blue-300 p-1 rounded-full'>
                  <svg className="w-5 h-5 mx-1 transform rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 22">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"/>
  </svg>
                  </div>
                </div>
  )
}

export default PostCardIcons