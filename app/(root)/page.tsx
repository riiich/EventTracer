import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import EventCollection from "@/components/shared/EventCollection";
import { getAllEvents } from "@/lib/actions/event.action";

export default async function Home() {
	const allEvents = await getAllEvents({
		query: "",
		limit: 8,
		page: 1,
		category: "",
	});

	// console.log(allEvents);

	return (
		<>
			<section id="main" className="bg-primary-50 bg-cherry-blossom-bg bg-contain py-5 md:py-10">
				<div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
					<div className="flex flex-col justify-center gap-8 mt-20">
						<h1 className="h1-bold">Looking for Upcoming Events? Looking to Host Events?</h1>
						<h1 className="h1-bold text-green-400">Look no further.</h1>
						<p className="p-regular-20 md:p-regular-24">
							Check out some cool events that are happening right now! Or host your own event
							within your own community.
						</p>
						<Button className="button w-full sm:w-fit active:scale-95" asChild size="lg">
							<Link href="#events">Explore</Link>
						</Button>
					</div>

					<Image
						className="max-h-[70vh] w-screen object-contain object-center mt-10 mb-10 scale-125 2xl:max-h-[60-[vh]] md:mt-32"
						src="/assets/images/hero.png"
						alt="hero"
						width={1000}
						height={1000}
					/>
				</div>
			</section>

			<section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
				<h2 className="h2-bold">
					{/* Trusted by <br /> Individual Event Organizers (Placeholder) */}
					Check out some events!
				</h2>

				<div className="flex w-full flex-col gap-5 md:flex-row">
					<input placeholder="Search for event..." />
					<p>Categories</p>
				</div>

				<h2 className="h1-bold wrapper text-center underline">Events</h2>
				<EventCollection
					collectionData={allEvents?.data}
					emptyCollectionText="No Events Found..."
					emptyStateText="Check back at a later time."
					collectionType="All_Events"
					limit={5}
					pageNum={1}
					totalPages={allEvents?.totalPages}
				/>
				<Link href="#main" className="p-2 bg-slate-200 w-fit rounded-lg">
					<Image src="/assets/icons/up-arrow.svg" alt="hero" width={25} height={25} />
				</Link>
			</section>
		</>
	);
}
