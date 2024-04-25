"use server";

import { connectToDatabase } from "../database";
import { handleError } from "../utils";
import Event from "../database/models/event.model";
import { CreateEventParams, DeleteEventParams, GetAllEventsParams, UpdateEventParams } from "@/types";
import User from "../database/models/user.model";
import Category from "../database/models/category.model";
import { revalidatePath } from "next/cache";

export const createEvent = async ({ userId, event, path }: CreateEventParams) => {
	try {
		await connectToDatabase();

		const eventOrganizer = await User.findById(userId);

		if (!eventOrganizer) {
			throw new Error("Host is not found!");
		}

		const createdEvent = await Event.create({
			...event,
			category: event.categoryId,
			organizer: userId,
		});

		return JSON.parse(JSON.stringify(createdEvent));
	} catch (err) {
		handleError(err);
	}
};

// populate information about the organizer of the event and category instead of just
//	receiving the id's of the organizer and category
const populateEvent = async (query: any) => {
	return query
		.populate({ path: "organizer", model: User, select: "_id firstName lastName" })
		.populate({ path: "category", model: Category, select: "_id title" });
};

export const getEventById = async (eventId: string) => {
	try {
		await connectToDatabase();

		const event = await populateEvent(Event.findById(eventId));

		if (!event) {
			throw new Error("Event not found!");
		}

		return JSON.parse(JSON.stringify(event));
	} catch (err) {
		handleError(err);
	}
};

export const getAllEvents = async ({ query, limit = 5, page, category }: GetAllEventsParams) => {
	try {
		await connectToDatabase();

		const eventConditions = {};

		const allEventsQuery = Event.find(eventConditions).sort({ createdAt: "descending" }).skip(0).limit(5);

		const events = await populateEvent(allEventsQuery);
		const numOfEvents = await Event.countDocuments(eventConditions);

		return {
			data: JSON.parse(JSON.stringify(events)),
			totalPages: Math.ceil(numOfEvents / limit),
		};
	} catch (err) {
		handleError(err);
	}
};

export const updateEvent = async ({ userId, event, path }: UpdateEventParams) => {
	try {
		await connectToDatabase();
	} catch (err) {
		handleError(err);
	}
};

export const deleteEvent = async ({ eventId, path }: DeleteEventParams) => {
	try {
		await connectToDatabase();

		const deletedEvent = await Event.findByIdAndDelete(eventId);

		if (deletedEvent) {
			// revalidates the path to clear the cache and refetch all the events 
			//	because the events have been changed (deleted event)
			revalidatePath(path);	
		}

		return JSON.parse(JSON.stringify(deletedEvent));
	} catch (err) {
		handleError(err);
	}
};
