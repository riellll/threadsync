"use server";

import { revalidatePath } from "next/cache";


import { connectToDB } from "../mongoose";
import User from "../models/user.model";
import Thread from "../models/thread.model";




export async function fetchUser(userId) {
  connectToDB();
  try {

    return await User.findOne({ id: userId }).exec();
    /*    .populate({
      path: "communities",
      model: Community,
    }); */

  } catch (error) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

export async function updateUser({ userId, bio, name, path, username, image }) {
  try {
    connectToDB();

    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      { upsert: true }
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

export async function fetchUsers({
  userId,
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}) {
  try {
    connectToDB();

    // Calculate the number of users to skip based on the page number and page size.
    const skipAmount = (pageNumber - 1) * pageSize;

    // Create a case-insensitive regular expression for the provided search string.
    const regex = new RegExp(searchString, "i");

    // Create an initial query object to filter users.
    // const query = await (await User.find()).filter(item => item._id !== userId)

    // If the search string is not empty, add the $or operator to match either username or name fields.
    const query = await User.find({
      $or: [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
      ]
    });

    // Define the sort options for the fetched users based on createdAt field and provided sort order.
    // const sortOptions = { createdAt: sortBy };

    // const usersQuery = User.find(query)
    //   .sort(sortOptions)
    //   .skip(skipAmount)
    //   .limit(pageSize);

    // Count the total number of users that match the search criteria (without pagination).
    // const totalUsersCount = await User.countDocuments(query);

    // const users = await usersQuery.exec();

    // Check if there are more users beyond the current page.
    // const isNext = totalUsersCount > skipAmount + users.length;
    //  console.log({ users, isNext })
    //  console.log({ query })
    //  console.log(users, isNext)
    return query;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}


export async function fetchUserPosts(userId) {
  try {
    connectToDB();

    // Find all threads authored by the user with the given userId
    const threads = await User.findOne({ id: userId }).populate({
      path: "threads",
      model: Thread,
      populate: [
        /*         {
          path: "community",
          model: Community,
          select: "name id image _id", // Select the "name" and "_id" fields from the "Community" model
        }, */
        {
          path: "children",
          model: Thread,
          populate: {
            path: "author",
            model: User,
            select: "name image id", // Select the "name" and "_id" fields from the "User" model
          },
        },
      ],
    }).exec();
    // const threadss = await User.findOne({ id: userId }).populate('threads');
    // console.log(threadss);
    return threads;
  } catch (error) {
    console.error("Error fetching user threads:", error);
    throw error;
  }
}
