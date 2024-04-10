import { Document, Schema, model, models } from "mongoose";
import User from "./user.model";

export interface IEvent extends Document {
    _id: string;
	title: string;
	description?: string;
	location?: string;
	price?: string;
	url?: string;
	isFree: Boolean;
	createdAt: Date;
	dateCreated: Date;
	startDateTime: Date;
	endDateTime: Date;
	imageUrl: string;
	attendanceCount: number;
	category: {_id: string, name: string};
	organizer: {_id: string, firstName: string, lastName: string};
}

const EventSchema = new Schema({
	title: { type: String, required: true },
	description: { type: String },
	location: { type: String },
	price: { type: String },
	url: { type: String },
	isFree: { type: Boolean, default: false },
	createdAt: { type: User, required: true },
	dateCreated: { type: Date, default: Date.now },
	startDateTime: { type: Date, required: true },
	endDateTime: { type: Date, required: true },
	imageUrl: { type: String, required: true },
	attendanceCount: { type: Number, default: 0 },
	category: { type: Schema.Types.ObjectId, ref: "Category" },
	organizer: { type: Schema.Types.ObjectId, ref: "User" },
});

const Event = models.Event || model("Event", EventSchema);

export default Event;
