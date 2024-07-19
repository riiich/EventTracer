"use server";

import {
	CheckoutOrderParams,
	CreateOrderParams,
	GetOrdersByEventParams,
	GetOrdersByUserParams,
} from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import Order from "../database/models/order.model";
import Stripe from "stripe";
import { redirect } from "next/navigation";
import { ObjectId } from "mongodb";
import Event from "../database/models/event.model";
import User from "../database/models/user.model";

export const stripeCheckoutOrder = async (checkoutOrder: CheckoutOrderParams) => {
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

	const price = checkoutOrder.isFree ? 0 : Number(checkoutOrder.price) * 100;

	try {
		// Create Checkout Sessions from body params (stripe recommends to create new session every time a customer attempts to pay)
		const session = await stripe.checkout.sessions.create({
			line_items: [
				{
					price_data: {
						currency: "usd",
						product_data: {
							name: checkoutOrder.eventTitle,
						},
						unit_amount_decimal: price.toFixed(2),
					},
					quantity: 1,
				},
			],
			metadata: {
				eventId: checkoutOrder.eventId,
				buyerId: checkoutOrder.buyerId,
			},
			mode: "payment",
			success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
			cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
		});

		redirect(session.url!);
	} catch (err) {
		throw err;
	}
};

export const createOrder = async (order: CreateOrderParams) => {
	try {
		await connectToDatabase();

		const createdOrder = await Order.create({
			...order,
			event: order.eventId,
			buyer: order.buyerId,
		});

		return JSON.parse(JSON.stringify(createdOrder));
	} catch (err) {
		handleError(err);
	}
};

export const getAllTickets = async () => {
	try {
		await connectToDatabase();

		const allTickets = await Order.find();

		return JSON.parse(JSON.stringify(allTickets));
	} catch (err) {
		handleError(err);
	}
};

export const getAllTicketsFromUser = async ({ userId, limit, page }: GetOrdersByUserParams) => {
	try {
		await connectToDatabase();

		// skip a certain amount to retrieve new tickets instead of old ones
		const amountToSkip = (Number(page) - 1) * limit;
		const conditions = { buyer: userId }; // the current buyer has to be the current user

		const userTickets = await Order.distinct("event._id")
			.find(conditions)
			.sort({ createdAt: "descending" })
			.skip(amountToSkip)
			.limit(limit)
			.populate({
				path: "event",
				model: Event,
				populate: {
					path: "organizer",
					model: User,
					select: "_id firstName lastName",
				},
			});

		const userTicketCount = await Order.distinct("event._id").countDocuments(conditions);

		return {
			data: JSON.parse(JSON.stringify(userTickets)),
			totalPages: Math.ceil(userTicketCount / limit),
		};
	} catch (err) {
		handleError(err);
	}
};

// get amount of tickets that have been purchased for a specific event
export const getTicketsByEvents = async ({ eventId, searchedEvent }: GetOrdersByEventParams) => {
	try {
		await connectToDatabase();

		if (!eventId) {
			throw new Error("There is no event ID!");
		}

		const eventObjectId = new ObjectId(eventId);

		// getting all the orders
		// const orders = await Order.aggregate([
		// 	{
		// 		$lookup: {
		// 			from: "users",
		// 			localField: "buyer",
		// 			foreignField: "_id",
		// 			as: "buyer",
		// 		},
		// 	},
		// 	{
		// 		$unwind: {},
		// 	},
		// ]);
	} catch (err) {
		handleError(err);
	}
};

/*

try {

} catch(err) {
	handleError(err);
}

*/
