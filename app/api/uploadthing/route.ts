import { createRouteHandler } from "uploadthing/next";
import { FileRouters } from "./core";

// Export routes for the Next App Router
export const { GET, POST } = createRouteHandler({
    router: FileRouters,

    // custom configs
});