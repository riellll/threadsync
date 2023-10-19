import Image from "next/image";
import Link from "next/link";


import DeleteThread from "../forms/DeleteThread";
import PostCardIcons from "../shared/PostCardIcons";

const PostCard = ({
  id,
  currentUserId,
  parentId,
  content,
  contentImage,
  author,
  createdAt,
  comments,
  isComment,
}) => {
  // console.log(author)
  return (
    <article
      className={`flex w-full flex-col rounded-xl ${
        isComment ? "p-2" : "bg-gray-200 p-7 dark:bg-gray-950"
      } `}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4 text-white">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="user_community_image"
                fill
                className="cursor-pointer rounded-full"
              />
            </Link>

            <div className="relative mt-2 w-0.5 grow rounded-full bg-neutral-800 dark:bg-gray-400" /></div>

          <div className="flex w-full flex-col">
            <Link href={`/profile/${author.id}`} className="w-fit">
              <h4 className="cursor-pointer text-xl font-semibold text-black dark:text-gray-200">
                {author.name}
              </h4>
            </Link>

            <p className="mt-2 text-small-regular pb-3 text-black dark:text-gray-200">
              {content}
            </p>
            {contentImage && (
              <Image
                src={contentImage}
                alt="heart"
                width={500}
                height={500}
                className="w-96 h-auto"
              />
            )}

            <div className={`flex flex-col gap-3`}>
              <div className={`mt-5 flex flex-col gap-3`}>
                <PostCardIcons threadId={id}/>

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

           { <DeleteThread
      threadId={id.toString()}
      currentUserId={currentUserId}
      authorId={author.id}
      parentId={parentId}
      isComment={isComment}
    />}
      </div>

      {!isComment && comments.length > 0 && (
      <div className="ml-1 mt-3 flex items-center gap-2">
        {comments.slice(0, 2).map((comment, index) => (
          <Image
            key={index}
            src={comment.author.image}
            alt={`user_${index}`}
            width={24}
            height={24}
            className={`${index !== 0 && "-ml-5"} rounded-full object-cover`}
          />
        ))}

        {<Link href={`/thread/${id}`}>
          <p className="mt-1 text-sm text-gray-500">
            {comments.length} repl{comments.length > 1 ? "ies" : "y"}
          </p>
        </Link>}
       {/*  <Link href={`/thread/${id}`}>
          <p className="mt-1 text-sm text-gray-500">
            {comments.length} Like{comments.length > 1 && "s"}
          </p>
        </Link> */}
      </div>
    )}

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
