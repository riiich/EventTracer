import { Document, Schema, model, models } from "mongoose";

export interface IEvent extends Document {
	_id: string;
	title: string;
	description?: string;
	location?: string;
	price?: string;
	url?: string;
	isFree: Boolean;
	createdAt: Date;
	startDateTime: Date;
	endDateTime: Date;
	imageUrl: string;
	category: { _id: string; name: string };
	organizer: { _id: string; firstName: string; lastName: string };
}

const EventSchema = new Schema({
	title: { type: String, required: true },
	description: { type: String },
	location: { type: String },
	price: { type: String },
	url: { type: String },
	isFree: { type: Boolean, default: false },
	createdAt: { type: Date, default: Date.now },
	startDateTime: { type: Date, default: Date.now },
	endDateTime: { type: Date, default: Date.now },
	imageUrl: { type: String, required: true },
	category: { type: Schema.Types.ObjectId, ref: "Category" },
	organizer: { type: Schema.Types.ObjectId, ref: "User" },
});

const Event = models.Event || model("Event", EventSchema);

export default Event;
