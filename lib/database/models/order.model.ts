import { Document, Schema, model, models } from "mongoose";

export interface IOrder extends Document {
	stripeId: string;
	totalAmount: string;
	createdAt: Date;
	event: {
		_id: string;
		title: string;
	};
	buyer: {
		_id: string;
		firstName: string;
		lastName: string;
	};
}

export type IOrderItem = {
	[x: string]: IEvent;
	_id: string;
	eventId: string;
	eventTitle: string;
	totalAmount: string;
	createdAt: Date;
	buyer: string;
};

const OrderSchema = new Schema({
	stripeId: { type: String, required: true, unique: true },
	totalAmount: { type: String },
	createdAt: { type: Date, default: Date.now },
	event: { type: Schema.Types.ObjectId, ref: "Event" },
	buyer: { type: Schema.Types.ObjectId, ref: "User" },
});

const Order = models.Order || model("Order", OrderSchema);

export default Order;
