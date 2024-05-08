import { getEventById } from "@/lib/actions/event.action";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/utils";
import Link from "next/link";
import { getRelatedEvents } from "@/lib/actions/event.action";
import EventCollection from "@/components/shared/EventCollection";
import PurchaseTicket from "@/components/shared/PurchaseButton";

const EventInformation = async ({ params: { id }, searchParams }: SearchParamProps) => {
	const eventInfo = await getEventById(id);
	const relatedEvents = await getRelatedEvents({
		categoryId: eventInfo.category._id,
		eventId: id,
		page: searchParams.page as string, // for pagination
	});

	// console.log(relatedEvents);

	return (
		<>
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
								<span>{`${eventInfo.organizer?.firstName} ${eventInfo.organizer?.lastName}`}</span>
							</p>

							<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
								<div className="flex gap-3">
									<p className="p-medium-16 py-2.5 px-2 border-2 border-none rounded-full bg-green-300 ">
										{eventInfo.isFree ? "Free" : `$${eventInfo.price}`}
									</p>
									<p className="p-semibold-14 text-primary-500 my-2.5 infinite-color">
										{eventInfo.category.title}
									</p>
								</div>
							</div>

							<div className="flex flex-row gap-2 my-1">
								<Image
									src="/assets/icons/calendar.svg"
									alt="calendar"
									width={25}
									height={25}
								/>
								<div>
									{formatDateTime(eventInfo.startDateTime).dateTime} -{" "}
									{formatDateTime(eventInfo.endDateTime).dateTime}
								</div>
							</div>

							<div className="flex flex-row gap-2">
								<Image
									src="/assets/icons/location.svg"
									alt="location"
									width={25}
									height={25}
								/>
								<div>{eventInfo.location}</div>
							</div>

							<div className="p-1 rounded-md">
								<p className="p-semibold-18 underline lg:p-semibold-20">Event Details</p>
								<p className="flex flex-col rounded-lg bg-white p-3">
									{eventInfo.description}

									<Link
										href={`${eventInfo.url}`}
										target="_blank"
										className="p-regular-14 text-blue-400 mt-5 md:text-[12px]"
									>
										{eventInfo.url}
									</Link>
								</p>
							</div>

							{/* BUY TICKET BUTTON */}
							<PurchaseTicket event={eventInfo} />

						</div>
					</div>
				</div>
			</section>

			<section className="mt-20 mb-20">
				<h2 className="h2-bold text-center underline">Related Events</h2>
				<div className="mx-4 sm:flex-cols-1 md:flex-cols-2 lg:flex-cols-3 xxl:flex-cols-4">
					<EventCollection
						collectionData={relatedEvents?.data}
						emptyCollectionText="No related events..."
						emptyStateText="Check back later"
						limit={4}
						pageNum={1}
						totalPages={relatedEvents?.totalPages}
					/>
				</div>
			</section>
		</>
	);
};

export default EventInformation;
