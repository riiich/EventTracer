import { z } from "zod";

export const eventFormSchema = z.object({
	title: z.string().min(3, {
		message: "Title must be at least 3 characters.",
	}),
	description: z
		.string()
		.min(3, "Description must be at least 3 characters.")
		.max(500, "Description must be less than 500 characters."),
	categoryId: z.string(),
	location: z
		.string()
		.min(2, "Location must be at least 2 characters")
		.max(150, "Location must be less than 150 characters"),
	imageUrl: z
		.string(),
		// .min(3, "Image url must be at least 3 characters.")
		// .max(400, "Image url must be less than 400 characters"),
	startDateTime: z.date(),
	endDateTime: z.date(),
	url: z.string().url(),
	price: z.string(),
	isFree: z.boolean(),
});
