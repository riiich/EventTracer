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

const RowCard = ({ event, hasTickets, hasOrderLink }: CardProps) => {
	const { sessionClaims } = auth();
	const userId = sessionClaims?.userId;
	const isEventOrganizer = userId === event.organizer?._id.toString(); // convert to string b/c sometimes it takes the mongoDB id object and not a string
	const eventEndDate = new Date(event.endDateTime).getTime();
	const canBuyTicket = eventEndDate > Date.now();

	console.log();

	return (
		<div
			className={
				canBuyTicket
					? "group relative flex flex-col w-full border-l-4 border-l-green-300 bg-slate-100 shadow-lg m-3 p-1 active:scale-95 " +
					  "rounded-lg hover:duration-200 focus:bg-green-300 hover:shadow-[0_10px_10px_10px_rgba(56,209,69,0.3)]"
					: "group relative flex flex-col w-full border-l-4 border-l-red-300 bg-slate-100  shadow-lg m-3 p-1 active:scale-95 " +
					  "rounded-lg hover:duration-200 focus:bg-red-300 hover:shadow-[0_10px_10px_10px_rgba(255,69,0,0.3)]"
			}
			// "group relative flex flex-col w-full mt-2 overflow-hidden bg-gray-200 border-4 rounded-lg p-1 shadow-xl
			//  		   hover:duration-500 focus:bg-green-300 hover:shadow-[0_15px_20px_10px_rgba(56,209,69,0.3)]"
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
					width={150}
					height={100}
					className="flex flex-col rounded-md w-full"
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
						width={20}
						height={20}
						className="mr-3"
					/>
					<p className="mt-2">
						{formatDateTime(event.startDateTime).dateTime} -{" "}
						{formatDateTime(event.endDateTime).dateTime}
					</p>
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
			</div>

			<div className="flex flex-col items-center mt-2">
				{hasOrderLink && (
					<Link href={`/orders?eventId=${event._id}`} className="flex gap-2">
						<p className="hover:text-primary-500 active:text-purple-400">Order Details</p>
						<Image src="/assets/icons/arrow.svg" alt="orderDetails" width={12} height={12} />
					</Link>
				)}
			</div>

			{isEventOrganizer && (
				<div className="flex flex-row gap-2 w-fit mt-auto mb-3 mx-3 items-center">
					<Link
						href={`/events/${event._id}/update`}
						className="bg-slate-300 hover:bg-slate-400 hover:duration-500 w-fit p-1 rounded-lg"
					>
						<Image src="/assets/icons/edit.svg" alt="delete" width={30} height={30} />
					</Link>
					<DeleteConfirmation eventId={event._id} />
				</div>
			)}
		</div>
	);
};

export default RowCard;
