import Image from "next/image";
import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import DeleteThread from "../forms/DeleteThread";
import PostCardIcons from "../shared/PostCardIcons";
import ImageModal from "../shared/ImageModal";
import { formatTimeDifference } from "@/constants";


const PostCard = ({
  id,
  currentUserId,
  userId,
  parentId,
  content,
  contentImage,
  author,
  createdAt,
  comments,
  isComment,
  likes,
  onboarded,
}) => {

   
  // console.log(formatter.format(now))
  // console.log(formatTimeDifference(createdAt))

  return (
    <article
      className={`flex w-full flex-col ${
        isComment
          ? "p-2"
          : "bg-white sm:p-7 dark:bg-black sm:border-none border-b border-gray-800 dark:border-gray-200 py-5"
      } `}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4 text-white">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
             {/*  <img
                src={author.image}
                alt="user_community_image"
                fill
                className="cursor-pointer rounded-full"
              /> */}
              <Avatar>
              <AvatarImage asChild  src={author.image} alt="user_community_image">
              <img src={author.image} alt='user photo' className="cursor-pointer"/>
              </AvatarImage>
               </Avatar>
            </Link>

            <div className="relative mt-2 w-0.5 grow rounded-full bg-neutral-800 dark:bg-gray-400" />
          </div>

          <div className="flex w-full flex-col">
            <Link href={`/profile/${author.id}`} className="w-fit">
              <h4 className="cursor-pointer text-xl font-semibold text-black dark:text-gray-200">
                {author.name}
              </h4>
            </Link>

            <p className="mt-2 text-small-regular pb-3 text-ellipsis text-black dark:text-gray-200 break-all ...">
              {content}
            </p>
            {contentImage && (
              <>
              {/* <Image
                src={contentImage}
                alt="heart"
                width={500}
                height={500}
                className="w-96 h-auto"
              /> */}
              <ImageModal image={contentImage}/>
                </>
            )}

            <div className={`flex flex-col gap-3`}>
              <div className={`mt-5 flex flex-col gap-3`}>
                <PostCardIcons
                  threadId={id}
                  userId={userId}
                  likes={likes}
                  onboarded={onboarded}
                />
                {/*      {isComment && comments.length > 0 && (
              <Link href={`/thread/${id}`}>
                <p className="text-sm text-gray-500">
                  {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                </p>
              </Link>
            )} */}
              </div>
            </div>
          </div>
        </div>

        {
          <>
          <div className="flex gap-3">
          <p className="text-sm text-muted-foreground">
                  {formatTimeDifference(createdAt)}
                </p>
            <DeleteThread
              threadId={id.toString()}
              currentUserId={currentUserId}
              authorId={author.id}
              parentId={parentId}
              isComment={isComment}
              />
              </div>
          </>
        }
      </div>

      <div className="ml-1 mt-3 flex items-center gap-2">
        {!isComment && comments.length > 0 && (
          <>
            {comments.slice(0, 2).map((comment, index) => (
              <img
                key={index}
                src={comment.author.image}
                alt={`user_${index}`}
                // width={24}
                // height={24}
                className={`${
                  index !== 0 && "-ml-5"
                } rounded-full object-cover w-6 h-6`}
              />
            ))}

            {
              <Link href={`/thread/${id}`}>
                <p className="mt-1 text-sm text-gray-500">
                  {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                </p>
              </Link>
            }
          </>
        )}
        {likes.length > 0 && (
          <Link href={`/likes/${id}`}>
            <p className="mt-1 pl-2 text-sm text-gray-500">
              {likes.length} Like{likes.length > 1 && "s"}
            </p>
          </Link>
        )}
      </div>

      {/*  {!isComment && community && (
    <Link
      href={`/communities/${community.id}`}
      className='mt-5 flex items-center'
    >
      <p className='text-subtle-medium text-gray-1'>
        {formatDateString(createdAt)}
        {community && ` - ${community.name} Community`}
      </p>

      <Image
        src={community.image}
        alt={community.name}
        width={14}
        height={14}
        className='ml-1 rounded-full object-cover'
      />
    </Link>
  )} */}
    </article>
  );
};

export default PostCard;
