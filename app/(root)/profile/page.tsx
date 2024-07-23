import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";
import { Separator } from "@/components/ui/separator";
import { getAllEventsByUser } from "@/lib/actions/event.action";
import { getAllTicketsFromUser } from "@/lib/actions/order.action";
import { Button } from "@/components/ui/button";
import CompactEventCollection from "@/components/shared/CompactEventCollection";
import TicketCollection from "@/components/shared/TicketCollection";
import { SearchParamProps } from "@/types";

const Profile = async ({ searchParams }: SearchParamProps) => {
	const { sessionClaims } = auth();
	const userId = sessionClaims?.userId as string;
	const user = await currentUser();
	const eventsPage = Number(searchParams?.eventsPage) || 1;
	const userEvents = await getAllEventsByUser({
		userId,
		limit: 5,
		page: eventsPage,
	});
	const ticketsPage = Number(searchParams?.ticketsPage) || 1;
	const userTickets = await getAllTicketsFromUser({
		userId,
		limit: 5,
		page: ticketsPage,
	});

	// console.log(userTickets);

	return (
		<div className="grid grid-cols-1 gap-2 m-2 mt-24 mb-20 md:grid-cols-[35%_65%]">
			{/* USER INFORMATION */}
			<div className="bg-slate-100 rounded-lg border border-solid border-black">
				<section className="bg-slate-200 rounded-t-lg">
					<h2 className="h2-bold p-2">My Profile</h2>
				</section>

				<Separator className="bg-slate-400" />

				<section>
					<div className="mt-1 p-3">
						<p className="p-bold-24">Your information</p>
						<p className="p-semibold-24">
							<span className="p-medium-18">Username:</span> {user?.username}
						</p>
						<p className="p-semibold-24">
							<span className="p-medium-18">Name:</span> {user?.firstName} {user?.lastName}
						</p>
						<p className="p-semibold-24">
							<span className="p-medium-18">Email:</span> {user?.emailAddresses[0].emailAddress}
						</p>
						<p className="p-semibold-24">
							<span className="p-medium-18">ID:</span> {user?.publicMetadata.userId as string}
						</p>
						<p className="p-semibold-24">
							<span className="p-medium-18"># of Hosted Events:</span> {userEvents?.data.length}
						</p>
						<p className="p-semibold-24">
							<span className="p-medium-18"># of Tickets Purchased:</span>{" "}
							{userTickets?.data.length}
						</p>
					</div>
				</section>

				{/* USER TICKET INFORMATION */}
				<div className="bg-slate-100 my-4 rounded-lg">
					<section className="bg-slate-200 p-3">
						<h4 className="h5-bold">My Tickets ({userTickets?.data.length})</h4>
					</section>
					<Separator className="bg-slate-400" />
					<div>
						<TicketCollection
							collectionData={userTickets?.data}
							emptyCollectionText=""
							emptyStateText="You haven't purchased any tickets yet..."
							collectionType="My_Tickets"
							limit={userTickets?.data.length}
							pageNum={ticketsPage}
							totalPages={userTickets?.totalPages}
						/>
					</div>
				</div>
			</div>
			<div>
				{/* USER HOSTED EVENT INFORMATION */}
				<div className="bg-slate-100 rounded-lg border border-solid border-black">
					<section className="flex flex-row bg-slate-200 p-3 rounded-t-lg">
						<h4 className="h5-bold">My Hosted Events ({userEvents?.data.length})</h4>
					</section>
					<Separator className="bg-slate-400" />
					<div className="p-2">
						<CompactEventCollection
							collectionData={userEvents?.data}
							emptyCollectionText="You have not hosted any events."
							emptyStateText=""
							collectionType="Events_Hosted"
							urlParamName="eventsPage"
							limit={userEvents?.data.length}
							pageNum={eventsPage}
							totalPages={userEvents?.totalPages}
						/>
					</div>
					<div className="flex justify-center m-10">
						<Button asChild className="px-3 bg-green-500 hover:bg-green-600 active:bg-green-700">
							<Link href={"/events/create"}>Create an Event</Link>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
