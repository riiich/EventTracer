import Link from "next/link";
import Image from "next/image";
import { IEvent } from "@/lib/database/models/event.model";
import { formatDateTime } from "@/lib/utils";
import RowCard from "./RowCard";

type CollectionProps = {
	collectionData: IEvent[];
	emptyCollectionText: string;
	emptyStateText: string;
	collectionType?: "All_Events" | "Events_Hosted" | "My_Tickets";
	limit: number;
	pageNum: number | string;
	totalPages?: number;
};

const CompactEventCollection = async ({
	collectionData,
	emptyCollectionText,
	emptyStateText,
	collectionType,
	limit,
	pageNum,
	totalPages = 0,
}: CollectionProps) => {
	return (
		<>
			{/* <h2 className="h2-bold wrapper text-center underline">Events</h2> */}
			{collectionData.length > 0 ? (
				<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-10 2xl:grid-cols-4">
					{collectionData.map((event) => {
						const hasTickets = collectionType === "My_Tickets";  
						const hasOrderLink = collectionType === "Events_Hosted";

						return <RowCard event={event} hasTickets={hasTickets} hasOrderLink={hasOrderLink} />
					})}
				</div>
			) : (
				<div className="flex flex-col items-center">
					<p className="p-bold-18 text-center sm:p-bold-16">{emptyCollectionText}</p>
					<p className="p-medium-14 text-center sm:p-medium-12">{emptyStateText}</p>
				</div>
			)}
		</>
	);
};

export default CompactEventCollection;
