import { Schema, model } from "mongoose";
import { TCategory } from "./category.interface";

const categorySchema = new Schema<TCategory>({
 name: {type: String, unique: true}
})

export const CategoryModel = model('Category', categorySchema);