import { SearchParamProps } from "@/types";
import { getTicketsByEvents } from "@/lib/actions/order.action";
import { IOrderItem } from "@/lib/database/models/order.model";
import { formatDateTime, formatPrice } from "@/lib/utils";
import Search from "@/components/shared/Search";

const OrderDetails = async ({ searchParams }: SearchParamProps) => {
	const eventId = (searchParams?.eventId as string) || "";
	const searchedEvent = (searchParams?.query as string) || "";
	const orders = await getTicketsByEvents({ eventId, searchedEvent: searchedEvent });
	
	return (
		<div className="mt-20">
			<section className="bg-primary-50 py-5 md-py-10">
				<h3 className="wrapper h3-bold text-center sm:text-left">Orders/Tickets</h3>
			</section>

			<section className="wrapper mt-8">
				<Search placeholder="Search for a buyer's name..." />
			</section>

			<section className="wrapper overflow-x-auto">
				<table className="w-full border-collapse border-t">
					<thead>
						<tr className="p-medium-14 border-b text-black">
							<th className="min-w-[250px] py-3 text-left">Order ID</th>
							<th className="min-w-[250px] flex-1 py-3 pr-4 text-left">Event Title</th>
							<th className="min-w-[150px] py-3 text-left">Buyer</th>
							<th className="min-w-[100px] py-3 text-left">Created at</th>
							<th className="min-w-[100px] py-3 text-right">Price</th>
						</tr>
					</thead>

					<tbody>
						{orders && orders.length === 0 ? (
							<tr className="border-b">
								<td colSpan={5} className="py-4 text-center text-gray-500">
									No orders/tickets were found...
								</td>
							</tr>
						) : (
							<>
								{orders &&
									orders.map((row: IOrderItem) => (
										<tr
											className="p-regular-14 lg:p-regular-16 border-b"
											style={{ boxSizing: "border-box" }}
											key={row._id}
										>
											<td className="min-w-[250px] py-4 text-primary-500">{row._id}</td>
											<td className="min-w-[200px] py-4 flex-1 py-4 pr-4">
												{row.eventTitle}
											</td>
											<td className="min-w-[150px] py-4">{row.buyer}</td>
											<td className="min-w-[100px] py-4">
												{formatDateTime(row.createdAt).dateTime}
											</td>
											<td className="min-w-[100px] py-4 text-right">
												{formatPrice(row.totalAmount)}
											</td>
										</tr>
									))}
							</>
						)}
					</tbody>
				</table>
			</section>
		</div>
	);
};

export default OrderDetails;
