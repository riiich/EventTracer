import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const auth = (req: Request) => ({
	id: '',
});

// FileRouter for the app which may contain multiple FileRoutes
export const FileRouters = {
	// Define as many fileRoutes, each with a unique routeSlug
	imageUploader: f({ image: { maxFileSize: "4MB" } })
		// Set permissions and file types for this FileRoute
		.middleware(async ({ req }) => {
			const user = await auth(req);

			if (!user) {
				throw new UploadThingError("Unauthorized");
			}

			// The data returned from this is accessible in onUploadComplete as 'metadata'
			return { userId: user.id };
		})
		.onUploadComplete(async ({ metadata, file }) => {
            // This code runs on the server after the file has been uploaded
			console.log(`Upload Successful for userId: ${metadata.userId}`);
			console.log("File URL: ", file.url);

            // The data returned here is sent to the client-side 'onClientUploadComplete' callback
			return { uploadedBy: metadata.userId };
		}),
} satisfies FileRouter;

export type FileRouters = typeof FileRouters;
