import { Document, Schema, model, models } from "mongoose";
import Event from "./event.model";

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

const OrderSchema = new Schema({
	stripeId: { type: String, required: true, unique: true },
	totalAmount: { type: String },
	createdAt: { type: Date, default: Date.now },
	event: { type: Schema.Types.ObjectId, ref: "Event" },
	buyer: { type: Schema.Types.ObjectId, ref: "User" },
});

const Order = models.Order || model("Order", OrderSchema);

export default Order;
