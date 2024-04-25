import Link from "next/link";
import Image from "next/image";
import { formatDateTime } from "@/lib/utils";
import { IEvent } from "@/lib/database/models/event.model";
import DeleteConfirmation from "./DeleteConfirmation";
import { auth } from "@clerk/nextjs";

type CardProps = {
	event: IEvent;
	hasTickets?: boolean;
	hasOrderLink?: boolean;
};

const Card = ({ event, hasTickets, hasOrderLink }: CardProps) => {
	const { sessionClaims } = auth();
	const userId = sessionClaims?.userId;
	const isEventOrganizer = userId === event.organizer._id.toString(); // convert to string b/c sometimes it takes the mongoDB id object and not a string

	return (
		<div
			className="group relative flex flex-col min-h-[380px] w-full overflow-hidden bg-gray-200 rounded-lg p-3 m-3 shadow-xl
			 		   hover:duration-700 focus:bg-green-300 md:min-h-[438px]"
		>
			<Link
				href={`/events/${event._id}`}
				// style={{backgroundImage: `url(${event.imageUrl})`}}
				className="bg-gray-200 rounded-lg p-1.5 shadow-xl hover:bg-green-100 hover:duration-700 focus:bg-green-300"
				key={event._id}
			>
				<Image
					src={`${event.imageUrl}`}
					alt="eventImage"
					width={250}
					height={250}
					className="flex flex-col rounded-md w-full min-h-[240px]"
				/>
			</Link>

			<div className="flex flex-col items-center">
				<Link href={`/events/${event._id}`} className=" focus:text-primary-500" key={event._id}>
					<p className="p-semibold-18 underline text-center mt-1">{event.title}</p>
				</Link>
				<div className="flex flex-row p-regular-14 md:p-regular-14 lg:p-regular-16">
					<Image
						src="/assets/icons/calendar.svg"
						alt="calendar"
						width={30}
						height={30}
						className="mr-3"
					/>
					<p className="mt-2">
						{formatDateTime(event.startDateTime).dateTime} -{" "}
						{formatDateTime(event.endDateTime).dateTime}
					</p>
				</div>
			</div>
			{!hasTickets && (
				<div className="flex flex-row items-center">
					<p className="p-semibold-14 rounded-full bg-green-300 w-fit px-2 py-1 mt-5">
						{event.isFree ? "Free" : `$${event.price}`}
					</p>

					<p className="p-semibold-14 w-fit ml-2 mt-5 text-primary-500 infinite-color">
						{event.category.title}
					</p>
				</div>
			)}

			<div className="">
				<div className="flex flex-between w-full pt-8">
					<p>
						<span className="p-semibold-14">Host: </span> {event.organizer.firstName}{" "}
						{event.organizer.lastName}
					</p>
				</div>
				{!hasOrderLink && (
					<Link href={`/orders?eventId=${event._id}`} className="flex gap-2">
						<p className="hover:text-primary-500 active:text-purple-400">Order Details</p>
						<Image src="/assets/icons/arrow.svg" alt="orderDetails" width={12} height={12} />
					</Link>
				)}
			</div>

			{isEventOrganizer && (
				<div className="flex flex-row gap-2 w-fit mt-5">
					<Link
						href={`/events/${event._id}/update`}
						className="bg-slate-300 hover:bg-slate-400 hover:duration-500 w-fit p-1 rounded-lg"
					>
						<Image
							src="/assets/icons/edit.svg"
							alt="delete"
							width={30}
							height={30}
							// className="border-solid border-2 border-black"
						/>
						{/* <p className="text-center p-regular-14">Edit</p> */}
					</Link>
					<DeleteConfirmation eventId={event._id} />

					
				</div>
			)}
		</div>
	);
};

export default Card;
