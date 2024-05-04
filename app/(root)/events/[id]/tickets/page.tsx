type TicketProps = {
	params: {
		id: string;
	};
};

const Ticket = ({ params: { id } }: TicketProps) => {
	return (
		<div>
			Ticket
			<p>{id}</p>
		</div>
	);
};

export default Ticket;
