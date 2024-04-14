"use server";

import { connectToDatabase } from "../database";
import { handleError } from "../utils";
import Event from "../database/models/event.model";
import { CreateEventParams } from "@/types";

export const createEvent = async (event: CreateEventParams) => {
	try {
		await connectToDatabase();

		const createdEvent = await Event.create(event);

		return JSON.parse(JSON.stringify(createdEvent));
	} catch (err) {
		handleError(err);
	}
};

export const getEventById = async (eventId: string) => {
	try {
		await connectToDatabase();

        const event = Event.findById(eventId);

        if(!event) {
            throw new Error("Event not found!");
        }

        return JSON.parse(JSON.stringify(event));
	} catch (err) {
		handleError(err);
	}
};

export const getAllEvents = async () => {
    try {
        await connectToDatabase();

        const allEvents = Event.find();

        return JSON.parse(JSON.stringify(allEvents));
    } catch(err) {
        handleError(err);
    }
}

export const updateEvent = async (eventId: string, event: CreateEventParams) => {
	try {
		await connectToDatabase();
	} catch (err) {
		handleError(err);
	}
};

export const deleteEvent = async () => {
	try {
		await connectToDatabase();
	} catch (err) {
		handleError(err);
	}
};
