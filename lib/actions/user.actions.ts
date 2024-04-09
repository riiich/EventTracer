"use server";

import { CreateUserParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";

export const createUser = async (user: CreateUserParams) => {
	try {
        // a server is not running at all times, each incoming request to a serverless function is a new invocation of a function
        // when running database server actions, need to connect to the database every time, but we have the connection cached
        await connectToDatabase();    // since there is a cached connection, we don't need to connect to the database every time

        const newUser = User.create(user);

        return JSON.parse(JSON.stringify((newUser)));
    } catch (err) {
        handleError(err);
	}
};
