"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { eventFormSchema } from "@/lib/validator";
import { eventDefaultValues } from "@/constants";
import DropdownMenu from "./DropdownMenu";
import FileUploader from "./FileUploader";
import { useState } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type EventFormProps = {
	userId: string;
	type: "Create" | "Update";
};

const EventForm = ({ userId, type }: EventFormProps) => {
	const [files, setFiles] = useState<File[]>([]);
	const initialValues = eventDefaultValues;

	// define the form
	const form = useForm<z.infer<typeof eventFormSchema>>({
		resolver: zodResolver(eventFormSchema),
		defaultValues: initialValues,
	});

	// submit handler
	const onSubmit = (values: z.infer<typeof eventFormSchema>) => {
		console.log(values);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
				<div className="flex flex-col gap-5 md:flex-row">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel className="mx-2">Event Title</FormLabel>
								<FormControl className="px-3">
									<Input
										className="rounded-full bg-primary-50"
										placeholder="Enter event title..."
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

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
										/>
										<Input
											className="rounded-full bg-primary-50"
											placeholder={"Enter location..."}
											{...field}
										/>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="flex flex-col gap-5 md:flex-row">
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
											alt="location"
											width={25}
											height={25}
										/>
										<DatePicker
											className="text-blue-600 mt-2  cursor-pointer"
											selected={field.value}
											onChange={(date: Date) => field.onChange(date)}
											showTimeSelect
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

				<div className="flex flex-col gap-5 md:flex-row">
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
											alt="location"
											width={25}
											height={25}
										/>
										<DatePicker
											className="text-blue-600 mt-2 cursor-pointer"
											selected={field.value}
											onChange={(date: Date) => field.onChange(date)}
											showTimeSelect
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

				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
};

export default EventForm;
