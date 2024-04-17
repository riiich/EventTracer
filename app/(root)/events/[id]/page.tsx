import { getEventById } from "@/lib/actions/event.action";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/utils";

const EventInformation = async ({ params: { id } }: SearchParamProps) => {
	const eventInfo = await getEventById(id);

	console.log(eventInfo);

	return (
		<section className="flex justify-center bg-primary-50 bg-contain">
			<div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
				<Image
					src={eventInfo.imageUrl}
					alt="event_logo"
					width={1000}
					height={1000}
					className="h-full min-h-[300px] object-cover object-center"
				/>

				<div className="flex flex-col w-full gap-8 p-5 md:p-10">
					<div className="flex flex-col gap-6">
						<h2 className="h2-bold text-center">{eventInfo.title}</h2>

						<p className="p-semibold-18 ml-2 mt-2 text-center sm:mt-0 ">
							Hosted by:{" "}
							<span>{`${eventInfo.organizer.firstName} ${eventInfo.organizer.lastName}`}</span>
						</p>

						<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
							<div className="flex gap-3">
								<p className="p-medium-16 py-2.5 px-2 border-2 border-solid border-none rounded-full bg-green-300 ">
									{eventInfo.isFree ? "Free" : `$${eventInfo.price}`}
								</p>
								<p className="p-semibold-14 text-primary-500 py-2.5">
									{eventInfo.category.title}
								</p>
							</div>
						</div>

						<div className="flex flex-row gap-2 w-fit my-1">
							<Image 
								src="/assets/icons/calendar.svg" 
								alt="calendar"
								width={25}
								height={25}	
							/>
							<div>{formatDateTime(eventInfo.startDateTime).dateTime} - {formatDateTime(eventInfo.endDateTime).dateTime}</div>
						</div>

						{/* BUY TICKET BUTTON */}
						<Button className="w-fit rounded-full">Purchase</Button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default EventInformation;
