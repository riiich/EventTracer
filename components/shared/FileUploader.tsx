"use client";

import { Dispatch, SetStateAction, useCallback } from "react";
import { useDropzone } from "@uploadthing/react/hooks";
// import type { FileWithPath } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { convertFileToUrl } from "@/lib/utils";
import { Button } from "../ui/button";

type FileUploaderProps = {
	onFieldChange: (url: string) => void;
	imageUrl: string;
	setFiles: Dispatch<SetStateAction<File[]>>;
};

const FileUploader = ({ onFieldChange, imageUrl, setFiles }: FileUploaderProps) => {
	const onDrop = useCallback((acceptedFiles: File[]) => {
		setFiles(acceptedFiles);
		onFieldChange(convertFileToUrl(acceptedFiles[0]));
	}, []);

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: "image/*"
			? generateClientDropzoneAccept(["image/png", "image/jpg", "image/jpeg", "image/svg"])
			: undefined,
	});

	return (
		<div
			className="flex-center bg-dark-3 flex h-72 w-full cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50 md:ml-5"
			{...getRootProps()}
		>
			<input {...getInputProps()} />
			{imageUrl ? (
				// user has selected an image
				<div className="flex h-full w-full flex-1 justify-center cursor-pointer">
					<img
						src={imageUrl}
						alt="image"
						width={800}
						height={800}
						className="w-full object-cover object-center"
					/>
				</div>
			) : (
				// user has not selected an image yet
				<div className="flex-center flex-col py-5 text-grey-500 cursor-pointer">
					<img src="/assets/icons/upload.svg" alt="image file upload" width={100} height={100} />
					<h3 className="mb-2 mt-2">Drag an image here!</h3>
					<p className="p-medium-12 mb-4">PNG, JPG, JPEG, SVG</p>
					<Button
						type="button"
						className="rounded-lg bg-green-400 hover:bg-green-500 active:bg-green-700"
					>
						Upload from computer
					</Button>
				</div>
			)}
		</div>
	);
};

export default FileUploader;
