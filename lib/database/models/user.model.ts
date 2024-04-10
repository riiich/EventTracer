import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
	clerkId: { type: String, required: true, unique: true },
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	image: { type: String, required: true },
	dateRegistered: { type: Date, default: Date.now },
});

// set it to either an existing User model or create a new User model in the database
const User = models.User || model("User", UserSchema);

export default User;