"use client";

import { useSearchParams } from "next/navigation";
import { getEventById } from "@/lib/actions/event.action";

const OrderDetails = async () => {
	const searchParams = useSearchParams();
	const orderId = searchParams.get("eventId");

	// console.log(event);

	return (
		<div>
			<h1>Order Details</h1>
			<p>{orderId}</p>
		</div>
	);
};

export default OrderDetails;
