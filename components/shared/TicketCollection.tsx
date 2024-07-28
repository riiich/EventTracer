import { IOrderItem } from "@/lib/database/models/order.model";
import Ticket from "./Ticket";

type CollectionProps = {
	collectionData: IOrderItem[];
	emptyCollectionText: string;
	emptyStateText: string;
	collectionType?: "All_Events" | "Events_Hosted" | "My_Tickets";
	urlParamName?: string;
	limit: number;
	pageNum: number | string;
	totalPages?: number;
};

const TicketCollection = ({
	collectionData,
	emptyCollectionText,
	emptyStateText,
	collectionType,
	limit,
	pageNum,
	totalPages = 0,
}: CollectionProps) => {
	return (
		<div>
			{collectionData.map((event) => {
				const hasTickets = collectionType === "My_Tickets"; 

				return <Ticket event={event} hasTickets={hasTickets} />;
			})}
		</div>
	);
};

export default TicketCollection;
