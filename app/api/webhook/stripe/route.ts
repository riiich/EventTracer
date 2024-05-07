import stripe from "stripe";
import { NextResponse } from "next/server";
import { error } from "console";
import { createOrder } from "@/lib/actions/order.action";

// when order is compelted, the webhook from Stripe will trigger this function to run
export async function POST(request: Request) {
	const body = await request.text();
	const stripeSignature = request.headers.get("stripe-signature") as string;
	const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

	if (!endpointSecret) {
		throw new Error("Please add WEBHOOK_SECRET from Stripe to .env or .env.local");
	}

	let event;

	try {
		event = stripe.webhooks.constructEvent(body, stripeSignature, endpointSecret);
	} catch (err) {
		return NextResponse.json({ msg: "Webhook error: ", error: err });
	}

	console.log(`Unhandled event type ${event.type}`);

	const eventType = event.type; // id and type

	console.log(event);

	if (eventType === "checkout.session.completed") {
		const { id, amount_total, metadata } = event.data.object;

		const order = {
			stripeId: id,
			eventId: metadata?.eventId || "",
			buyerId: metadata?.buyerId || "",
			totalAmount: amount_total ? (amount_total / 100).toString() : "0",
			createdAt: new Date(),
		};

        const newOrder = await createOrder(order);

        return NextResponse.json({msg: "Successful!", order: newOrder })
	}

	return new Response("", { status: 200 });
}
