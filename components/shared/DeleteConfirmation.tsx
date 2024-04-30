"use client";

import Image from "next/image";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteEvent } from "@/lib/actions/event.action";
import { startTransition, useTransition } from "react";
import { usePathname } from "next/navigation";

const DeleteConfirmation = ({ eventId }: { eventId: string }) => {
	const [isPending, startTransition] = useTransition();
	const pathname = usePathname();

	return (
		<div className="bg-red-300 hover:bg-red-400 hover:duration-700 w-fit h-fit px-1 rounded-lg items-center">
			<AlertDialog>
				<AlertDialogTrigger>
					<Image src="/assets/icons/delete.svg" alt="delete" width={30} height={30} />
				</AlertDialogTrigger>
				<AlertDialogContent className="bg-white rounded-lg">
					<AlertDialogDescription className="p-regular-14 text-center text-black sm:p-regular-18">
						Are you sure you want to delete this event?
					</AlertDialogDescription>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={() =>
								startTransition(async () => {
									try {
										const data = await deleteEvent({ eventId, path: pathname });
										console.log(data);
									} catch (err) {
										console.log(err);
									}
								})
							}
							className="bg-red-600 hover:bg-red-500 active:bg-red-400"
						>
							{isPending ? "Deleting ..." : "Delete"}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
};

export default DeleteConfirmation;
