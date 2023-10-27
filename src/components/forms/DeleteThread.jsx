"use client";
import consImage from '../../../public/inprogress1.jpg'
import { deleteThread } from "@/lib/actions/thread.action";
import { BsThreeDots } from "react-icons/bs";
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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThreadInfo from "./EditThread";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

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
          <DropdownMenu>
            <DropdownMenuTrigger>
              <BsThreeDots />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                {" "}
               <div className="grow cursor-pointer"
               onClick={() => router.push(`/create-post/edit-post/${threadId}`)}
               >Edit</div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                {" "}
                <AlertDialogTrigger asChild>
                  <div className="text-red-700 grow cursor-pointer">Delete</div>
                </AlertDialogTrigger>
              </DropdownMenuItem>
            </DropdownMenuContent>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this post?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your post.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-700 hover:bg-red-600"
                  onClick={async () => {
                    await deleteThread(threadId, pathname);
                    /* if (!parentId || !isComment) {
          router.push("/");
        } */
                    console.log(
                      threadId,
                      currentUserId,
                      authorId,
                      parentId,
                      isComment
                    );
                  }}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </DropdownMenu>
      </AlertDialog>
    </>
  );
};

export default DeleteThread;
