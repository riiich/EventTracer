import { startTransition, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
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
import { Separator } from "../ui/separator";
import { ICategory } from "@/lib/database/models/category.model";
import { Input } from "../ui/input";

type DropdownMenuProps = {
	value?: string;
	onChangeHandler?: () => void;
};

const DropdownMenu = ({ value, onChangeHandler }: DropdownMenuProps) => {
	const [categories, setCategories] = useState<ICategory[]>([]);
    const [newCategory, setNewCategory] = useState("");

	const addCategory = (newCategory: string) => {
        setNewCategory(newCategory);
        // setCategories((c) => [...c, newCategory]);
    };

    // add category to database
    const handleAddCategory = () => {
        
    };

	return (
		<div>
			<Select onValueChange={onChangeHandler} defaultValue={value}>
				<SelectTrigger className="select-field">
					<SelectValue placeholder="Select a category..." />
				</SelectTrigger>
				<SelectContent>
					{categories.length > 0 &&
						categories.map((c) => (
							<>
								<SelectItem value={c.title} key={c._id}>
									{c.title}
								</SelectItem>
								<Separator />
							</>
						))}
					<AlertDialog>
						<AlertDialogTrigger className="p-1 pl-2 text-green-500 w-full hover:bg-primary-50 focus:bg-green-200">
							+ Add a category
						</AlertDialogTrigger>
						<AlertDialogContent className="bg-gray-100">
							<AlertDialogHeader>
								<AlertDialogTitle>Add a category</AlertDialogTitle>
								<Input placeholder="Enter a category..." onChange={(e) => addCategory(e.target.value)} />
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction onChange={() => startTransition(handleAddCategory)}>Add</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</SelectContent>
			</Select>
		</div>
	);
};

export default DropdownMenu;
