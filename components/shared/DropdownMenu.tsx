import { startTransition, useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from "../ui/separator";
import { ICategory } from "@/lib/database/models/category.model";
import { Input } from "../ui/input";
import { createCategory, getAllCategories } from "@/lib/actions/category.action";

type DropdownMenuProps = {
	value?: string;
	onChangeHandler?: () => void;
};

const DropdownMenu = ({ value, onChangeHandler }: DropdownMenuProps) => {
	const [categories, setCategories] = useState<ICategory[]>([]);
	const [newCategory, setNewCategory] = useState("");

	// add category to database
	const handleAddCategory = () => {
		createCategory({
			categoryName: newCategory,
		})
			.then((data) => {
				console.log(data);
				setCategories((c) => [...c, data]);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// retrieve all categories from database once the page loads
	useEffect(() => {
		const retrieveCategories = async () => {
			const categoryData = await getAllCategories();

			// if there is data that is returned, set the category state to the data returned
			categoryData && setCategories(categoryData as ICategory[]);
		};

		retrieveCategories();
	}, []);

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
								<SelectItem value={c._id} key={c._id}>
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
								<Input
									type="text"
									placeholder="Enter a category..."
									onChange={(e) => setNewCategory(e.target.value)}
								/>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction onClick={() => startTransition(handleAddCategory)}>
									Add
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</SelectContent>
			</Select>
		</div>
	);
};

export default DropdownMenu;
