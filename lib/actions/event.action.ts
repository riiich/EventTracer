"use server";

import { connectToDatabase } from "../database";
import { handleError } from "../utils";
import Event from "../database/models/event.model";
import {
	CreateEventParams,
	DeleteEventParams,
	GetAllEventsParams,
	GetEventsByUserParams,
	GetRelatedEventsByCategoryParams,
	UpdateEventParams,
} from "@/types";
import User from "../database/models/user.model";
import Category from "../database/models/category.model";
import { revalidatePath } from "next/cache";

// HELPER FUNCTIONS
const getCategoryByName = async (name: string) => {
	return Category.findOne({ name: { $regex: name, $options: "i" } });
};

// populate information about the organizer of the event and category instead of just
//	receiving the id's of the organizer and category
const populateEvent = async (query: any) => {
	return query
		.populate({ path: "organizer", model: User, select: "_id firstName lastName" })
		.populate({ path: "category", model: Category, select: "_id title" });
};

// CREATE AN EVENT
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
		
		if(createdEvent) {
			revalidatePath(path);
		}

		return JSON.parse(JSON.stringify(createdEvent));
	} catch (err) {
		handleError(err);
	}
};

// RETRIEVE AN EVENT BY AN EVENT ID
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

// RETRIEVE ALL EVENTS THAT ARE CREATED
export const getAllEvents = async ({ query, limit = 5, page, category }: GetAllEventsParams) => {
	try {
		await connectToDatabase();

		const titleConditions = query ? { title: { $regex: query, $options: "i" } } : {};
		const categoryCondition = category ? await getCategoryByName(category) : null;

		const eventConditions = {
			$and: [titleConditions, categoryCondition ? { category: categoryCondition._id } : {}],
		};

		const amountToSkip = (Number(page) - 1) * limit;

		const allEventsQuery = Event.find(eventConditions)
			.sort({ createdAt: "descending" })
			.skip(amountToSkip)
			.limit(limit);

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

// RETRIEVE ALL EVENTS THAT ARE CREATED BY A USER
export const getAllEventsByUser = async ({ userId, limit = 6, page }: GetEventsByUserParams) => {
	try {
		await connectToDatabase();

		const amountToSkip = (Number(page) - 1) * limit;
		const conditions = { organizer: userId };

		const userEventsQuery = Event.find(conditions)
			.sort({ createdAt: "descending" })
			.skip(amountToSkip)
			.limit(limit);

		const userEvents = await populateEvent(userEventsQuery);
		const userEventsCount = await Event.countDocuments(conditions);

		return {
			data: JSON.parse(JSON.stringify(userEvents)),
			totalPages: Math.ceil(userEventsCount / limit),
		};
	} catch (err) {
		handleError(err);
	}
};

// RETRIEVE ALL EVENTS THAT ARE RELATED TO A SPECIFIC EVENT via SAME CATEGORY
export const getRelatedEvents = async ({
	categoryId,
	eventId,
	limit = 3,
	page = 1,
}: GetRelatedEventsByCategoryParams) => {
	try {
		await connectToDatabase();

		const amountToSkip = (Number(page) - 1) * limit;
		// retrieve events where the event is the same category of the current event and the id
		//	of the current event is not equal ($ne) to any events that are in the same category
		const eventConditions = {
			$and: [{ category: categoryId }, { _id: { $ne: eventId } }],
		};

		const relatedEventsQuery = Event.find(eventConditions)
			.sort({ createdAt: "descending" })
			.skip(amountToSkip)
			.limit(limit);

		const relatedEvents = await populateEvent(relatedEventsQuery);
		const relatedEventsCount = await Event.countDocuments(eventConditions);

		return {
			data: JSON.parse(JSON.stringify(relatedEvents)),
			totalPages: Math.ceil(relatedEventsCount / limit),
		};
	} catch (err) {
		handleError(err);
	}
};

// UPDATE A SPECIFIC EVENT
export const updateEvent = async ({ userId, event, path }: UpdateEventParams) => {
	try {
		await connectToDatabase();

		const eventToUpdate = await Event.findById(event._id);

		if (!eventToUpdate || eventToUpdate.organizer.toHexString() !== userId) {
			throw new Error("Either this event does not exist or the user has not created this event!");
		}

		const updatedEvent = await Event.findByIdAndUpdate(
			event._id,
			{ ...event, category: event.categoryId },
			{ new: true }
		);

		if (updatedEvent) {
			revalidatePath(path);
		}

		return JSON.parse(JSON.stringify(updatedEvent));
	} catch (err) {
		handleError(err);
	}
};

// DELETE A SPECIFIC EVENT
export const deleteEvent = async ({ eventId, path }: DeleteEventParams) => {
	try {
		await connectToDatabase();

		const deletedEvent = await Event.findByIdAndDelete(eventId);

		if (deletedEvent) {
			// revalidates the path to clear the cache and refetch all the events
			//	because the events structure has been changed (deleted event)
			revalidatePath(path);
		}

		// unnecessary return
		return JSON.parse(JSON.stringify(deletedEvent));
	} catch (err) {
		handleError(err);
	}
};
