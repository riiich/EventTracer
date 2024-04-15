import { generateReactHelpers } from "@uploadthing/react/hooks";
import type { FileRouters } from "@/app/api/uploadthing/core";

export const { useUploadThing, uploadFiles } = generateReactHelpers<FileRouters>();
