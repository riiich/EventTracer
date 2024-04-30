import { auth } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";
import { Separator } from "@/components/ui/separator";
import { getAllEventsByUser } from "@/lib/actions/event.action";
import CompactEventCollection from "@/components/shared/CompactEventCollection";

const Profile = async () => {
	const { sessionClaims } = auth();
	const userId = sessionClaims?.userId as string;
	const user = await currentUser();
	const userEvents = await getAllEventsByUser({
		userId,
		limit: 5,
		page: 1,
	});

	console.log("user: ", user);
	console.log("userEvents: ", userEvents);
	// columns-1 gap-2 sm:columns-2 m-4
	return (
		<div className="grid grid-cols-1 gap-2 m-4 border-2 border-dashed border-red-600 md:grid-cols-[35%_65%]">
			<div className="bg-slate-100 rounded-lg">
				<section className="bg-slate-200 rounded-t-lg">
					<h2 className="h2-bold p-2">My Profile</h2>
				</section>
				<Separator className="bg-slate-400" />

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
						<span className="p-medium-18"># of Tickets Purchased:</span> {-69} placeholder
					</p>
				</div>
				<div className="bg-slate-100 my-4 rounded-lg">
					<section className="bg-slate-200 p-3">
						<h4 className="h5-bold">Tickets</h4>
					</section>
					<Separator className="bg-slate-400" />
				</div>
			</div>
			<div>
				<div className="bg-slate-100 mx-2 rounded-lg">
					<section className="bg-slate-200 p-3 rounded-t-lg">
						<h4 className="h5-bold">Hosted Events ({userEvents?.data.length})</h4>
					</section>
					<Separator className="bg-slate-400" />
					<div className="p-2">
						<CompactEventCollection
							collectionData={userEvents?.data}
							emptyCollectionText="You have not hosted any events."
							emptyStateText=""
							limit={5}
							pageNum={1}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
