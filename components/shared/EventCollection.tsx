import Link from "next/link";
import Image from "next/image";
import { IEvent } from "@/lib/database/models/event.model";

type CollectionProps = {
	collectionData: IEvent[];
	emptyCollectionText: string;
	emptyStateText: string;
	collectionType?: "All_Events" | "Events_Hosted" | "My_Tickets";
	limit: number;
	pageNum: number | string;
	totalPages?: number;
};

const EventCollection = async ({
	collectionData,
	emptyCollectionText,
	emptyStateText,
	collectionType,
	limit,
	pageNum,
	totalPages = 0,
}: CollectionProps) => {
	return (
		<>
			<h2 className="h2-bold wrapper text-center">Events</h2>
			{collectionData.length > 0 ? (
				<div className="flex flex-cols-4 justify-center md:flex-cols-1 sm:flex-cols-1">
					{collectionData.map((event: any) => (
						<Link
							href={`http://www.localhost:3000/events/${event._id}`}
							className="bg-gray-200 rounded-lg p-3 m-3 shadow-xl"
							key={event._id}
						>
							<Image
								src={`${event.imageUrl}`}
								alt="eventImage"
								width={250}
								height={300}
								className="rounded-sm"
							/>
							<p className="p-semibold-18 underline text-center mt-1">{event.title}</p>
						</Link>
					))}
				</div>
			) : (
				<>
					<p className="p-bold-18 text-center sm:p-bold-16">{emptyCollectionText}</p>
					<p className="p-medium-14 text-center sm:p-medium-12">{emptyStateText}</p>
				</>
			)}
		</>
	);
};

export default EventCollection;
