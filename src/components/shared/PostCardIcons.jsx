"use client";
// import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { RiMessage2Line } from "react-icons/ri";
import { BiRepost } from "react-icons/bi";
import { IoPaperPlaneOutline } from "react-icons/io5";
// import reply from "../../../public/assets/reply.svg";
// import repost from "../../../public/assets/repost.svg";
// import share from "../../../public/assets/share.svg";
import { likeAndUnlikeThread } from "@/lib/actions/thread.action";
import { usePathname, useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


const PostCardIcons = ({ threadId, userId, likes, onboarded}) => {
  const pathname = usePathname()
  const router = useRouter()
  
 /*  const likeUnlikeThread = async () => {
  await likeAndUnlikeThread(threadId, userId, pathname)
  } */

  return (
    <div className="flex gap-3.5">
      <TooltipProvider>
  <Tooltip>
    <TooltipTrigger onClick={async () => {
        if(!userId){
          router.push('/onboarding')
          return
        }
        await likeAndUnlikeThread(threadId, userId, pathname)}} className="text-center text-xl cursor-pointer text-gray-600 dark:text-gray-400 hover:bg-red-200 hover:text-red-500 dark:hover:text-red-600 dark:hover:bg-red-300 px-1.5 rounded-full">
       {likes.includes(userId) ? <AiFillHeart className="text-red-600"/> : <AiOutlineHeart/>}
      </TooltipTrigger>
    <TooltipContent>
      <p>Like</p>
    </TooltipContent>
  </Tooltip>
  <Tooltip>
    <TooltipTrigger onClick={() => router.push(`/thread/${threadId}`)} className="text-center text-xl cursor-pointer text-gray-600 dark:text-gray-400 hover:bg-blue-200 hover:text-blue-500 dark:hover:text-blue-600 dark:hover:bg-blue-300 px-1.5 rounded-full">
        <RiMessage2Line/>
      </TooltipTrigger>
    <TooltipContent>
      <p>Reply</p>
    </TooltipContent>
  </Tooltip>
  <Tooltip>
    <TooltipTrigger className="text-center text-[28px] cursor-pointer text-gray-600 dark:text-gray-500 hover:bg-blue-200 hover:text-blue-500 dark:hover:text-blue-600 dark:hover:bg-blue-300 px-1 rounded-full">
    <BiRepost/>
      </TooltipTrigger>
    <TooltipContent>
      <p>Repost</p>
    </TooltipContent>
  </Tooltip>
  <Tooltip>
    <TooltipTrigger className="text-center text-xl cursor-pointer text-gray-600 dark:text-gray-500 hover:bg-blue-200  hover:text-blue-500 dark:hover:text-blue-600 dark:hover:bg-blue-300 px-1.5 rounded-full">
    <IoPaperPlaneOutline/>
      </TooltipTrigger>
    <TooltipContent>
      <p>Share</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

    </div>
  );
};

export default PostCardIcons;
