import { getEventById } from "@/lib/actions/event.action";
import { IEvent } from "@/lib/database/models/event.model";
import Link from "next/link";
import { formatDateTime } from "@/lib/utils";

type TicketProps = {
	event: IEvent;
	hasTickets?: boolean;
};

const Ticket = async ({ event, hasTickets }: TicketProps) => {
	const currEvent = await getEventById(event._id);
	const currCategory = currEvent.category.title;
	const eventEndDate = new Date(event.endDateTime).getTime();
	const canBuyTicket = eventEndDate > Date.now();

	// console.log(event);

	return (
		<Link href={`http://localhost:3000/events/${event._id}`}>
			<div
				className={
					canBuyTicket
						? "border-4 border-l-green-300 bg-slate-100 rounded-lg hover:duration-150" +
						  	"focus:bg-green-300 hover:shadow-[0_5px_5px_5px_rgba(56,209,69,0.3)] shadow-lg m-3 p-2 active:scale-95"
						: "border-4 border-l-red-300 bg-slate-100 rounded-lg hover:duration-150" +
							"focus:bg-red-300 hover:shadow-[0_5px_5px_5px_rgba(255,69,0,0.3)] shadow-lg m-3 p-2 active:scale-95"
				}
			>
				<p className="mb-1 p-semibold-18">{event.title} {canBuyTicket ? "" : "(Ended)"}</p>
				<div className="flex flex-row gap-3">
					<>
						<p className="rounded-full bg-green-300 w-fit pl-2 pr-2 pt-1 pb-1 p-semibold-14">
							{event.isFree ? "Free" : "$".concat(event.price)}
						</p>
						<p className="infinite-color">{currCategory}</p>
					</>
				</div>
				<p className="mt-2">
					{formatDateTime(event.startDateTime).dateTime} -{" "}
					{formatDateTime(event.endDateTime).dateTime}
				</p>
			</div>
		</Link>
	);
};

export default Ticket;
