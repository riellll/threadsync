"use server";

import { revalidatePath } from "next/cache";

import { connectToDB } from "../mongoose";
import Thread from "../models/thread.model";
import User from "../models/user.model";

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
  connectToDB();

  // Calculate the number of posts to skip based on the page number and page size.
  const skipAmount = (pageNumber - 1) * pageSize;

  // Create a query to fetch the posts that have no parent (top-level threads) (a thread that is not a comment/reply).
  const postsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
    .sort({ createdAt: "desc" })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({
      path: "author",
      model: User,
    })
    .populate({
      path: "children", // Populate the children field
      populate: {
        path: "author", // Populate the author field within children
        model: User,
        select: "_id name parentId image", // Select only _id and username fields of the author
      },
    });
  /*  .populate({
      path: "community",
      model: Community,
    }); */
  // Count the total number of top-level posts (threads) i.e., threads that are not comments.
  const totalPostsCount = await Thread.countDocuments({
    parentId: { $in: [null, undefined] },
  }); // Get the total count of posts

  const posts = await postsQuery.exec();

  const pageCount = Math.ceil(totalPostsCount / pageSize);

  const isNext = totalPostsCount > skipAmount + posts.length;

  const stringfy = JSON.stringify({ posts, isNext, pageCount });
  const parse = JSON.parse(stringfy);
  // console.log(parse)
  return parse;
}

export async function updateThread({ text, img, threadId, path }) {
  const body = {
    text,
    img,
  };
  try {
    connectToDB();

    await Thread.findByIdAndUpdate(threadId, body);

    // Update User model

    revalidatePath(path);
  } catch (error) {
    throw new Error(`Failed to create thread: ${error.message}`);
  }
}
export async function createThread({ text, img, author, path }) {
  try {
    connectToDB();

    /*   const communityIdObject = await Community.findOne(
          { id: communityId },
          { _id: 1 }
        ); */

    const createdThread = await Thread.create({
      text,
      img,
      author,
      //   community: communityIdObject, // Assign communityId if provided, or leave it null for personal account
    });

    // Update User model
    await User.findByIdAndUpdate(author, {
      $push: { threads: createdThread._id },
    });

    /*  if (communityIdObject) {
          // Update Community model
          await Community.findByIdAndUpdate(communityIdObject, {
            $push: { threads: createdThread._id },
          });
        } */

    revalidatePath(path);
  } catch (error) {
    throw new Error(`Failed to create thread: ${error.message}`);
  }
}



export async function fetchThreadById(threadId, from) {
  connectToDB();
  //    console.log(threadId)
  try {
    if (from === "thread") {
      const thread = await Thread.findById(threadId)
        .populate({
          path: "author",
          model: User,
          select: "_id id name image",
        }) // Populate the author field with _id and username
        .populate({
          path: "children", // Populate the children field
          populate: [
            {
              path: "author", // Populate the author field within children
              model: User,
              select: "_id id name parentId image", // Select only _id and username fields of the author
            },
            {
              path: "children", // Populate the children field within children
              model: Thread, // The model of the nested children (assuming it's the same "Thread" model)
              populate: {
                path: "author", // Populate the author field within nested children
                model: User,
                select: "_id id name parentId image", // Select only _id and username fields of the author
              },
            },
          ],
        })
        .exec();

      return thread;
    } else {
      const threads = await Thread.findById(threadId)
        .populate({
          path: "author",
          model: User,
          select: "_id id name image",
        }) // Populate the author field with _id and username
        .populate({
          path: "children", // Populate the children field
          populate: [
            {
              path: "author", // Populate the author field within children
              model: User,
              select: "_id id name parentId image", // Select only _id and username fields of the author
            },
            {
              path: "children", // Populate the children field within children
              model: Thread, // The model of the nested children (assuming it's the same "Thread" model)
              populate: {
                path: "author", // Populate the author field within nested children
                model: User,
                select: "_id id name parentId image", // Select only _id and username fields of the author
              },
            },
          ],
        })
        .populate("likes")
        .exec();

      return threads;
    }
  } catch (err) {
    console.error("Error while fetching thread:", err);
    throw new Error("Unable to fetch thread");
  }
}

export async function fetchThreadByIdEdit(threadId) {
  connectToDB();
  //    console.log(threadId)
  try {

    const thread = await Thread.findById(threadId);

      return thread;

  } catch (err) {
    console.error("Error while fetching thread:", err);
    throw new Error("Unable to fetch thread");
  }
}

export async function addCommentToThread(threadId, commentText, userId, path) {
  connectToDB();

  try {
    // Find the original thread by its ID
    const originalThread = await Thread.findById(threadId);

    if (!originalThread) {
      throw new Error("Thread not found");
    }

    // Create the new comment thread
    const commentThread = new Thread({
      text: commentText,
      author: userId,
      parentId: threadId, // Set the parentId to the original thread's ID
    });

    // Save the comment thread to the database
    const savedCommentThread = await commentThread.save();

    // Add the comment thread's ID to the original thread's children array
    originalThread.children.push(savedCommentThread._id);

    // Save the updated original thread to the database
    await originalThread.save();

    revalidatePath(path);
  } catch (err) {
    console.error("Error while adding comment:", err);
    throw new Error("Unable to add comment");
  }
}

export async function likeAndUnlikeThread(threadId, userId, path) {
  connectToDB();
  try {
    const thread = await Thread.findById(threadId);

    if (!thread) {
      throw new Error("Thread not found");
    }

    const userLiked = await thread.likes.includes(userId);

    if (userLiked) {
      await Thread.updateOne({ _id: threadId }, { $pull: { likes: userId } });
    } else {
      thread.likes.push(userId);
      await thread.save();
    }

    revalidatePath(path);
  } catch (error) {
    console.error("Error while adding comment:", err);
    throw new Error("Unable to add comment");
  }
  // console.log(childThreads)
}

export async function fetchReplyThreads(threadId) {
  connectToDB();
  try {
    const childThreads = await Thread.find()
      .populate({
        path: "author",
        model: User,
        select: "_id id name image",
      }) // Populate the author field with _id and username
      .populate({
        path: "children", // Populate the children field
        populate: [
          {
            path: "author", // Populate the author field within children
            model: User,
            select: "_id id name parentId image", // Select only _id and username fields of the author
          },
          {
            path: "children", // Populate the children field within children
            model: Thread, // The model of the nested children (assuming it's the same "Thread" model)
            populate: {
              path: "author", // Populate the author field within nested children
              model: User,
              select: "_id id name parentId image", // Select only _id and username fields of the author
            },
          },
        ],
      })
      .exec();

    const replies = childThreads.reduce((acc, item) => {
      item.children.filter(
        (fil) => fil.author.id === threadId && acc.push(item)
      );
      return acc;
    }, []);

    const uniqueReplies = [...new Set(replies)];
    // console.log(childThreadss);

    return uniqueReplies;
  } catch (error) {
    console.error("Error while adding comment:", err);
    throw new Error("Unable to add comment");
  }
  // console.log(childThreads)
}

export async function fetchLikesThreads(userId) {
  connectToDB();
  try {
    const likesThreads = await Thread.find({ likes: userId })
      .populate({
        path: "author",
        model: User,
        select: "_id id name image",
      }) // Populate the author field with _id and username
      .populate({
        path: "children", // Populate the children field
        populate: [
          {
            path: "author", // Populate the author field within children
            model: User,
            select: "_id id name parentId image", // Select only _id and username fields of the author
          },
          {
            path: "children", // Populate the children field within children
            model: Thread, // The model of the nested children (assuming it's the same "Thread" model)
            populate: {
              path: "author", // Populate the author field within nested children
              model: User,
              select: "_id id name parentId image", // Select only _id and username fields of the author
            },
          },
        ],
      })
      .exec();
    console.log(likesThreads);

    return likesThreads;
  } catch (error) {
    console.error("Error while adding comment:", err);
    throw new Error("Unable to add comment");
  }
  // console.log(childThreads)
}

async function fetchAllChildThreads(threadId) {
  const childThreads = await Thread.find({ parentId: threadId });

  const descendantThreads = [];
  for (const childThread of childThreads) {
    const descendants = await fetchAllChildThreads(childThread._id);
    descendantThreads.push(childThread, ...descendants);
  }

  return descendantThreads;
}

export async function deleteThread(id, path) {
  try {
    connectToDB();
    console.log(id, path);
    // Find the thread to be deleted (the main thread)
    const mainThread = await fetchThreadById(id);
    // .populate("author community");

    if (!mainThread) {
      throw new Error("Thread not found");
    }

    // Fetch all child threads and their descendants recursively
    const descendantThreads = await fetchAllChildThreads(id);

    // Get all descendant thread IDs including the main thread ID and child thread IDs
    const descendantThreadIds = [
      id,
      ...descendantThreads.map((thread) => thread._id),
    ];

    // Extract the authorIds and communityIds to update User and Community models respectively
    const uniqueAuthorIds = new Set(
      [
        ...descendantThreads.map((thread) => thread.author?._id?.toString()), // Use optional chaining to handle possible undefined values
        mainThread.author?._id?.toString(),
      ].filter((id) => id !== undefined)
    );

    /*    const uniqueCommunityIds = new Set(
      [
        ...descendantThreads.map((thread) => thread.community?._id?.toString()), // Use optional chaining to handle possible undefined values
        mainThread.community?._id?.toString(),
      ].filter((id) => id !== undefined)
    ); */

    // Recursively delete child threads and their descendants
    await Thread.deleteMany({ _id: { $in: descendantThreadIds } });

    // Update User model
    await User.updateMany(
      { _id: { $in: Array.from(uniqueAuthorIds) } },
      { $pull: { threads: { $in: descendantThreadIds } } }
    );

    // Update Community model
    /*     await Community.updateMany(
      { _id: { $in: Array.from(uniqueCommunityIds) } },
      { $pull: { threads: { $in: descendantThreadIds } } }
    );
 */
    revalidatePath(path);
  } catch (error) {
    throw new Error(`Failed to delete thread: ${error.message}`);
  }
}
