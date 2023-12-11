import { CategoryModel } from "./category.model";
import { TCategory } from "./category.interface";

const createCategoryIntoDB = async(payload: TCategory) =>{

 const result = await CategoryModel.create(payload);
 return result;
}

const getAllCategoryFromDB = async()=>{
 const result = await CategoryModel.find();
 return result;
}

export const CategoryService = {
 createCategoryIntoDB,
 getAllCategoryFromDB
}