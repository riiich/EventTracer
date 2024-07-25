"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useEffect, useState } from "react";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { ICategory } from "@/lib/database/models/category.model";
import { getAllCategories } from "@/lib/actions/category.action";
import { Separator } from "@radix-ui/react-separator";

const CategoryFilter = () => {
	const [categories, setCategories] = useState<ICategory[]>([]);
	const searchParams = useSearchParams();
	const router = useRouter();

	useEffect(() => {
		const retrieveCategories = async () => {
			const categoryData = await getAllCategories();

			if (categoryData) {
				setCategories(categoryData as ICategory[]);
			}
		};

		retrieveCategories();
	}, []);

	const onSelectCategory = (category: string) => {
		let newUrl = "";

		if (category && category !== "Select a Category") {
			newUrl = formUrlQuery({
				params: searchParams.toString(),
				key: "category",
				value: category,
			});
		} else {
			newUrl = removeKeysFromQuery({
				params: searchParams.toString(),
				keysToRemove: ["category"],
			});
		}

		router.push(newUrl, { scroll: false });
	};

	return (
		<Select onValueChange={(value: string) => onSelectCategory(value)}>
			<SelectTrigger className="select-field">
				<SelectValue placeholder="Category" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="Select a Category">Select a Category...</SelectItem>

				{categories.map((c) => (
					<div key={c._id}>
						<SelectItem value={c.title} key={c._id}>{c.title}</SelectItem>
						<Separator />
					</div>
				))}
			</SelectContent>
		</Select>
	);
};

export default CategoryFilter;
