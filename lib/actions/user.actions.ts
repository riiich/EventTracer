"use server";

import { CreateUserParams, UpdateUserParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import Event from "../database/models/event.model";
import Order from "../database/models/order.model";
import { revalidatePath } from "next/cache";

export const createUser = async (user: CreateUserParams) => {
	try {
        // a server is not running at all times, each incoming request to a serverless function is a new invocation of a function
        // when running database server actions, need to connect to the database every time, but we have the connection cached
        await connectToDatabase();    // since there is a cached connection, we don't need to connect to the database every time

        const newUser = await User.create(user);

        return JSON.parse(JSON.stringify((newUser)));   // passed to client
    } catch (err) {
        handleError(err);
	}
};

export const getUserById = async (userId: string) => {
    try {
      await connectToDatabase()
  
      const user = await User.findById(userId)
  
      if (!user) throw new Error('User not found')
      return JSON.parse(JSON.stringify(user))
    } catch (error) {
      handleError(error)
    }
  }

export const updateUser = async (clerkId: string, user: UpdateUserParams) => {
    try {
        await connectToDatabase();

        const updatedUser = await User.findOneAndUpdate({ clerkId }, user, { new: true });

        if(!updatedUser) {
            throw new Error("User update failed...");
        }

        return JSON.parse(JSON.stringify(updatedUser));
    } catch(err) {
        handleError(err);
    }
}

export const deleteUser = async (clerkId: string) => {
    try {
        await connectToDatabase();

        // find user to delete
        const userToDelete = await User.findOne({clerkId});

        if(!userToDelete) {
            throw new Error("User is not found...");
        }

        // unlink the relationships that it has to other data (essentially delete all 
        //   the events and orders that is associated with this user)
        await Promise.all([
            // update 'event's collection to remove any references to the user
            Event.updateMany(
                { _id: { $in: userToDelete.events } },
                { $pull: { organizer: userToDelete._id } }
            ),
            // update 'orders' collection to remove any references to the user
            Order.updateMany(
                { _id: { $in: userToDelete.orders } },
                { $unset: { buyer: 1 } }
            )
        ]);

        // delete user
        const deletedUser = await User.findByIdAndDelete(userToDelete._id);
        revalidatePath("/");

        return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
    } catch(err) {
        handleError(err);
    }
} 