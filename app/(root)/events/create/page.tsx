import EventForm from "@/components/shared/EventForm";
import { auth } from "@clerk/nextjs";

type CreateEventProps = {
	params: {
		id: string;
	};
};

const CreateEvent = ({ params: { id } }: CreateEventProps) => {
	const { sessionClaims } = auth();
	const userId = sessionClaims?.userId as string; // remember to edit the public metadata in clerk dashboard to have userId

	return (
		<>
			<section className="bg-primary-50 py-5 md:py-10">
				<h3 className="wrapper h3-bold text-center sm:text-left">Create Event</h3>
			</section>
		</>
	);
};

export default CreateEvent;
