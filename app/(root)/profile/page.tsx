import { auth } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";
import { Separator } from "@/components/ui/separator";
import { getAllEventsByUser } from "@/lib/actions/event.action";

const Profile = async () => {
	const { sessionClaims } = auth();
	const userId = sessionClaims?.userId as string;
	const user = await currentUser();
	const userEvents = await getAllEventsByUser({
		userId,
		limit: 4,
		page: 1,
	});

	console.log("user: ", user);
	console.log("userEvents: ", userEvents);
	// columns-1 gap-2 sm:columns-2 m-4
	return (
		<div className="grid grid-cols-[35%_65%] gap-2 m-4">
			<div className="bg-red-300">
				<h2 className="h2-bold">My Profile</h2>
				<Separator className="bg-slate-400" />
				<p className="p-medium-24">Hi {user?.username}!</p>
				<div className="bg-green-300">
					<h4 className="h5-bold">Tickets</h4>
					<Separator className="bg-slate-400" />
				</div>
			</div>
			<div className="col-span-3/4">
				<div className="bg-blue-300">
					<h4 className="h5-bold">Hosted Events</h4>
					<Separator className="bg-slate-400" />
				</div>
			</div>
		</div>
	);
};

export default Profile;
