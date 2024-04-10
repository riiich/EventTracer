"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
	username: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
});

type EventFormProps = {
	userId: string;
	type: "Create" | "Update";
};

const EventForm = ({ userId, type }: EventFormProps) => {
	// define the form
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
		},
	});

	// submit handler
	const onSubmit = (values: z.infer<typeof formSchema>) => {
		console.log(values);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField 
                    control={form.control} 
                    name="username" 
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel></FormLabel>
                        </FormItem>
                    )} />
			</form>
		</Form>
	);
};

export default EventForm;
