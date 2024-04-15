"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { eventFormSchema } from "@/lib/validator";
import { eventDefaultValues } from "@/constants";
import DropdownMenu from "./DropdownMenu";
import FileUploader from "./FileUploader";
import { useState } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "../ui/checkbox";
import { createEvent } from "@/lib/actions/event.action";
import { useUploadThing, uploadFiles } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";

type EventFormProps = {
	userId: string;
	type: "Create" | "Update";
};

const EventForm = ({ userId, type }: EventFormProps) => {
	const [files, setFiles] = useState<File[]>([]);
	const [isFree, setIsFree] = useState(false);
	const initialValues = eventDefaultValues;
	const { startUpload } = useUploadThing("imageUploader");

	const router = useRouter();

	// define the form
	const form = useForm<z.infer<typeof eventFormSchema>>({
		resolver: zodResolver(eventFormSchema),
		defaultValues: initialValues,
	});

	// submit all the information to the backend
	const onSubmit = async (values: z.infer<typeof eventFormSchema>) => {
		let uploadedImageUrl = values.imageUrl;

		if (uploadedImageUrl.length > 0) {
			const uploadedImage = await startUpload(files);

			if (!uploadedImage) return;

			uploadedImageUrl = uploadedImage[0].url;
		}

		if (type === "Create") {
			try {
				const newEvent = await createEvent({
					userId: userId,
					event: { ...values, imageUrl: uploadedImageUrl },
					path: "/profile",
				});

				// if new event exists, reset the form and go to the new event url
				if (newEvent) {
					form.reset();
					router.push(`/events/${newEvent._id}`);
				}
			} catch (err) {
				console.log(err);
			}
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
				{/* EVENT TITLE */}
				<div className="flex flex-col gap-5 md:flex-row">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel className="mx-2">Event Title</FormLabel>
								<FormControl className="px-3">
									<Input
										className="rounded-full bg-primary-50 focus-visible:ring-lime-300 focus-visible:outline-0"
										placeholder="Enter event title..."
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* EVENT DESCRIPTION */}
				<div className="flex flex-col gap-5 md:flex-row">
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel className="mx-2">Event Description</FormLabel>
								<FormControl className="h-52">
									<Textarea
										{...field}
										className="textarea"
										placeholder="Enter a description of your event..."
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* CATEGORY */}
				<div className="flex flex-col gap-5 md:flex-row">
					<FormField
						control={form.control}
						name="categoryId"
						render={({ field }) => (
							<FormItem className="w-6/12">
								<FormLabel className="mx-2">Category</FormLabel>
								<FormControl className="px-3">
									<DropdownMenu value={field.value} onChangeHandler={field.onChange} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* IMAGE FILE UPLOAD */}
				<div className="flex flex-col gap-5 md:flex-row">
					<FormField
						control={form.control}
						name="imageUrl"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="mx-2">Image</FormLabel>
								<FormControl className="px-3">
									<FileUploader
										onFieldChange={field.onChange}
										imageUrl={field.value}
										setFiles={setFiles}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* LOCATION */}
				<div className="flex flex-col gap-5 md:flex-row">
					<FormField
						control={form.control}
						name="location"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel className="mx-2">Location</FormLabel>
								<FormControl className="px-3">
									<div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-5 py-2">
										<Image
											src="/assets/icons/location.svg"
											alt="location"
											width={25}
											height={25}
											className="mr-1"
										/>
										<Input
											className="rounded-full bg-primary-50 focus-visible:ring-lime-300 focus-visible:outline-0"
											placeholder={"Enter location OR online meeting..."}
											{...field}
										/>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* DATES */}
				<div className="flex flex-col gap-5 w-full md:flex-row md:w-fit">
					<FormField
						control={form.control}
						name="startDateTime"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel className="mx-2">Start Date</FormLabel>
								<FormControl className="px-3">
									<div className="flex h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
										<Image
											src="/assets/icons/calendar.svg"
											alt="calendar"
											width={25}
											height={25}
										/>
										<DatePicker
											className="text-blue-600 mt-2  cursor-pointer"
											selected={field.value}
											onChange={(date: Date) => field.onChange(date)}
											showTimeSelect
											timeIntervals={15}
											timeInputLabel="Time:"
											dateFormat="MM-dd-yyyy @ h:mmaa"
										/>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="endDateTime"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel className="mx-2">End Date</FormLabel>
								<FormControl className="px-3">
									<div className="flex h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-5 py-2">
										<Image
											src="/assets/icons/calendar.svg"
											alt="calendar"
											width={25}
											height={25}
										/>
										<DatePicker
											className="text-blue-600 mt-2 cursor-pointer"
											selected={field.value}
											onChange={(date: Date) => field.onChange(date)}
											showTimeSelect
											timeIntervals={15}
											timeInputLabel="Time:"
											dateFormat="MM-dd-yyyy @ h:mmaa"
										/>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* PRICE */}
				<div className="flex flex-col gap-5 md:flex-row md:w-6/12">
					<FormField
						control={form.control}
						name="price"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel className="mx-2">Price</FormLabel>
								<FormControl className="px-3">
									<div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-5 py-2">
										<Image
											src="/assets/icons/dollar.svg"
											alt="price"
											width={25}
											height={25}
										/>
										<Input
											type="number"
											className="rounded-full bg-primary-50 focus-visible:ring-lime-300 focus-visible:outline-0"
											placeholder={"Enter price..."}
											{...field}
											disabled={isFree}
										/>
										<FormField
											control={form.control}
											name="isFree"
											render={({ field }) => (
												<FormItem className="w-full">
													<FormControl className="px-3">
														<div className="flex h-[30px] w-full overflow-hidden rounded-full bg-grey-50 px-5 py-2 ">
															<Checkbox
																id="isFree"
																className="ml-3"
																onCheckedChange={field.onChange}
																checked={field.value}
																onClick={() => {
																	setIsFree((free) => !free);
																}}
															/>
															<Label htmlFor="isFree" className="ml-2">
																Free
															</Label>
														</div>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* URL */}
				<div className="flex flex-col gap-5 md:flex-row">
					<FormField
						control={form.control}
						name="url"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel className="mx-2">Event URL</FormLabel>
								<FormControl className="px-3">
									<div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-5 py-2">
										<Image
											src="/assets/icons/link.svg"
											alt="url"
											width={25}
											height={25}
										/>
										<Input
											className="rounded-full bg-primary-50 ml-1 focus-visible:ring-lime-300 focus-visible:outline-0"
											placeholder="Enter event url..."
											{...field}
										/>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Button
					type="submit"
					disabled={form.formState.isSubmitting}
					className="bg-green-400 hover:bg-green-500 active:bg-green-600"
				>
					{form.formState.isSubmitting ? "Uploading Event..." : `${type} Event`}
				</Button>
			</form>
		</Form>
	);
};

export default EventForm;
