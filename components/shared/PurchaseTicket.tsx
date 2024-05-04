import { IEvent } from "@/lib/database/models/event.model";
import { auth } from "@clerk/nextjs";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

type PurchaseTicketProps = {
    event: IEvent
};

const PurchaseTicket = ({event}: PurchaseTicketProps) => {
    const { sessionClaims } = auth();
	const userId = sessionClaims?.userId as string;
    
	return (<div>
        {userId !== event.organizer._id && 
            <Link href={`/events/${event._id}/tickets`}>
                <Button className="rounded-full w-full">Purchase</Button>
            </Link>
        }
    </div>);
};

export default PurchaseTicket;
