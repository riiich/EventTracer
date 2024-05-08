import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import EventCollection from "@/components/shared/EventCollection";
import { getAllEvents } from "@/lib/actions/event.action";

export default async function Home() {
	const allEvents = await getAllEvents({
		query: "",
		limit: 5,
		page: 1,
		category: "",
	});

	// console.log(allEvents);

	return (
		<>
			<section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
				<div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
					<div className="flex flex-col justify-center gap-8">
						<h1 className="h1-bold">Looking for Ongoing Events? Looking to Host Events?</h1>
						<h1 className="h1-bold text-green-400">Look no further.</h1>
						<p className="p-regular-20 md:p-regular-24">
							Check out some cool events that are happening right now! Or host your own event
							within your own community.
						</p>
						<Button className="button w-full sm:w-fit" asChild size="lg">
							<Link href="#events">Explore</Link>
						</Button>
					</div>

					<Image
						className="max-h-[70vh] object-contain object-center 2xl:max-h-[50-[vh]]"
						// src="/assets/images/image.jpg"
						src="/assets/images/hero.png"
						alt="hero"
						width={1000}
						height={1000}
					/>
				</div>
			</section>

			<section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
				<h2 className="h2-bold">
					Trusted by <br /> Individual Event Organizers (Placeholder)
				</h2>

				<div className="flex w-full flex-col gap-5 md:flex-row">
					<p>Search</p>
					<p>Categories</p>
				</div>

				<h2 className="h2-bold wrapper text-center underline">Events</h2>
				<EventCollection
					collectionData={allEvents?.data}
					emptyCollectionText="No Events Found..."
					emptyStateText="Check back at a later time."
					collectionType="All_Events"
					limit={5}
					pageNum={1}
					totalPages={allEvents?.totalPages}
				/>
			</section>
		</>
	);
}
