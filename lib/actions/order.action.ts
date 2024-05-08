"use server";

import { CheckoutOrderParams, CreateOrderParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import Order from "../database/models/order.model";
import Stripe from "stripe";
import { redirect } from "next/navigation";

export const stripeCheckoutOrder = async (checkoutOrder: CheckoutOrderParams) => {
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

	const price = !checkoutOrder.isFree ? Number(checkoutOrder.price) * 100 : 0;

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
	} catch(err) {
		handleError(err);
	}
};