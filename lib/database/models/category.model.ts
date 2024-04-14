import { Schema, Document, models, model } from "mongoose";

export interface ICategory extends Document {
	_id: string;
	title: string;
}

const CategorySchema = new Schema({
	title: { type: String, required: true, unique: true },
});

const Category = models.Category || model("Category", CategorySchema);

export default Category;
