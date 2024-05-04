import { IEvent } from "@/lib/database/models/event.model";
import { Button } from "../ui/button";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

type CheckoutProps = {
	event: IEvent;
	userId: string;
};

const Checkout = ({ event, userId }: CheckoutProps) => {
	const onPurchase = async () => {
		console.log("Purchasing...");
	};

	useEffect(() => {
		// Check to see if this is a redirect back from Checkout
		const query = new URLSearchParams(window.location.search);
		if (query.get("success")) {
			console.log("Order placed! You will receive an email confirmation.");
		}

		if (query.get("canceled")) {
			console.log("Order canceled -- continue to shop around and checkout when you’re ready.");
		}
	}, []);

	return (
		<form action={onPurchase} method="post">
			{/* type="submit" b/c it the submit type submits form data  */}
			<Button
				type="submit"
				role="link"
				className="rounded-full p-5 bg-green-500 hover:bg-green-600 active:scale-95 text-lg w-2/4"
			>
				{event.isFree ? "Get Free" : "Purchase Ticket"}
			</Button>
		</form>
	);
};

export default Checkout;
