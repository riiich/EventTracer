"use client";

import { IEvent } from "@/lib/database/models/event.model";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Checkout from "./Checkout";

type PurchaseButtonProps = {
	event: IEvent;
};

const PurchaseButton = ({ event }: PurchaseButtonProps) => {
	const { user } = useUser();
	const userId = user?.publicMetadata.userId as string;
	const eventEndDate = new Date(event.endDateTime).getTime();
	const canBuyTicket = eventEndDate > Date.now();

	return (
		<div>
			{canBuyTicket ? (
				<>
					<SignedIn>
						<Checkout event={event} userId={userId} />
					</SignedIn>

					<SignedOut>
						<Button asChild className="rounded-full w-fit">
							<Link href="/sign-in">Sign In to Purchase</Link>
						</Button>
					</SignedOut>
				</>
			) : (
				<>
					{canBuyTicket ? (
						<Button className="rounded-full w-full" disabled>
							Tickets are unavailable
						</Button>
					) : (
						<Button className="w-full bg-slate-400 text-black cursor-default hover:bg-slate-400">Event has ended</Button>
					)}
				</>
			)}
		</div>
	);
};

export default PurchaseButton;
