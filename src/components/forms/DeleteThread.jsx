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
import ThreadInfo from "../shared/EditThread";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditThread from "../shared/EditThread";
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
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <BsThreeDots />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                {" "}
                <DialogTrigger>Edit</DialogTrigger>
              </DropdownMenuItem>
              <DropdownMenuItem>
                {" "}
                <AlertDialogTrigger asChild>
                  <div className="text-red-700 grow cursor-pointer">Delete</div>
                </AlertDialogTrigger>
              </DropdownMenuItem>
            </DropdownMenuContent>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Post</DialogTitle>
                <DialogDescription>
                  Make changes to your post here. Click edit when you're done.
                </DialogDescription>
              </DialogHeader>
              <div>
              <h1 className="mb-4 pt-5 text-center text-2xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Edit Post</span> Is Under Construction 🛠⛑</h1>
              <Image
                src={consImage}
                alt="heart"
                width={500}
                height={500}
                className="w-full h-auto"
              />
        </div>
            </DialogContent>
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
        </Dialog>
      </AlertDialog>
    </>
  );
};

export default DeleteThread;
