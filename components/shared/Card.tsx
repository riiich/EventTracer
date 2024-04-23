import Link from "next/link";
import Image from "next/image";
import { formatDateTime } from "@/lib/utils";
import { IEvent } from "@/lib/database/models/event.model";

type CardProps = {
	event: IEvent;
	hasTickets?: boolean;
	hasOrderLink?: boolean;
};

const Card = ({ event, hasTickets, hasOrderLink }: CardProps) => {
	return (
		<div
			className="group relative flex flex-col min-h-[380px] w-full overflow-hidden bg-gray-200 rounded-lg p-3 m-3 shadow-xl
			 		  hover:bg-green-100 hover:duration-700 focus:bg-green-300 md:min-h-[438px]"
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
					height={300}
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
						width={30}
						height={30}
						className="mr-3"
					/>
					<p>
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

			<div className="flex flex-between w-full pt-8">
				<p>
					<span className="p-semibold-14">Organized by: </span> {event.organizer.firstName}{" "}
					{event.organizer.lastName}
				</p>
				{hasOrderLink && (
					<Link href={`/orders?eventId=${event._id}`} className="flex gap-2">
						<p className="hover:text-primary-500 active:text-purple-400">Order Details</p>
						<Image src="/assets/icons/arrow.svg" alt="orderDetails" width={12} height={12} />
					</Link>
				)}
			</div>
		</div>
	);
};

export default Card;
