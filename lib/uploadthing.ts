import {
    generateUploadButton,
    generateUploadDropzone,
  } from "@uploadthing/react";
   
  import type { FileRouters } from "@/app/api/uploadthing/core";
   
  export const UploadButton = generateUploadButton<FileRouters>();
  export const UploadDropzone = generateUploadDropzone<FileRouters>();