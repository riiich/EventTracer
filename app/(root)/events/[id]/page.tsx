"use client";

import { useEffect, useState } from "react";
import { getEventById } from "@/lib/actions/event.action";
import Image from "next/image";

const page = ({ params }: { params: { id: string } }) => {
    const [event, setEvent] = useState({

    });

	useEffect(() => {
		const getEvent = async (eventId: string) => {
			try {
				const eventData = await getEventById(eventId);

				console.log(eventData);
                setEvent(eventData);
			} catch (err) {
				console.log(err);
			}
		};

		getEvent(params.id);
	}, []);

	return( <div>
        <img src={`${event.imageUrl}`} alt="eventImage" width={300} height={250} className="w-full h-20" />
    </div>);
};

export default page;
