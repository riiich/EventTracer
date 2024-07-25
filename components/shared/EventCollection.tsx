import Link from "next/link";
import Image from "next/image";
import { IEvent } from "@/lib/database/models/event.model";
import { formatDateTime } from "@/lib/utils";
import Card from "./Card";
import Pagination from "./Pagination";

type CollectionProps = {
	collectionData: IEvent[];
	emptyCollectionText: string;
	emptyStateText: string;
	collectionType?: "All_Events" | "Events_Hosted" | "My_Tickets";
	urlParamName?: string;
	limit: number;
	pageNum: number | string;
	totalPages?: number;
};

const EventCollection = async ({
	collectionData,
	emptyCollectionText,
	emptyStateText,
	collectionType,
	pageNum,
	totalPages = 0,
	limit,
	urlParamName,
}: CollectionProps) => {
	return (
		<>
			{/* <h2 className="h2-bold wrapper text-center underline">Events</h2> */}
			{collectionData.length > 0 ? (
				<div className="flex flex-col items-center">
					<ul className="grid grid-cols-1 gap-4 mb-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-10 2xl:grid-cols-4">
						{collectionData.map((event) => {
							const hasTickets = collectionType === "My_Tickets";
							const hasOrderLink = collectionType === "Events_Hosted";

							return (
								<li key={event?._id} className="flex justify-center">
									<Card event={event} hasTickets={hasTickets} hasOrderLink={hasOrderLink} />
								</li>
							);
						})}
					</ul>

					{/* Pagination */}
					{totalPages > 1 && (
						<Pagination urlParamName={urlParamName} page={pageNum} totalPages={totalPages} />
					)}
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

export default EventCollection;
