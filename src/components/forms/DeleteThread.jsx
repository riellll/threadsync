"use client";


import { deleteThread } from "@/lib/actions/thread.action";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

const DeleteThread = ({
  threadId,
  currentUserId,
  authorId,
  parentId,
  isComment,
}) => {
// console.log(threadId);
    const pathname = usePathname();
    const router = useRouter();
  
    if (currentUserId !== authorId || pathname === "/") return null;

    
  return (
    <>
    <AlertDialog>
      <AlertDialogTrigger asChild>
      <Image
      src="/assets/delete.svg"
      alt="delte"
      width={18}
      height={18}
      className="cursor-pointer object-contain"
    />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this post?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            post.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className='bg-red-700 hover:bg-red-600' onClick={async () => {
        await deleteThread(threadId, pathname);
        /* if (!parentId || !isComment) {
          router.push("/");
        } */
        console.log(threadId,
          currentUserId,
          authorId,
          parentId,
          isComment,)
      }}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  );
};

export default DeleteThread;
