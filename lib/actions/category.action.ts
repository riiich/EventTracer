"use server";

import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import Category from "../database/models/category.model";
import { CreateCategoryParams } from "@/types";

export const getAllCategories = async () => {
	try {
		await connectToDatabase();

		const allCategories = await Category.find();

		return JSON.parse(JSON.stringify(allCategories));
	} catch (err) {
		handleError(err);
	}
};

export const createCategory = async ({ categoryName }: CreateCategoryParams) => {
	try {
		await connectToDatabase();

		const createdCategory = await Category.create({ title: categoryName });

		return JSON.parse(JSON.stringify(createdCategory));
	} catch (err) {
		handleError(err);
	}
};
