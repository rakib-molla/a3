import { Request, Response } from "express";
import { CategoryService } from "./category.service";

const createCategory = async(req:Request, res: Response)=>{
 try {
  const data = req.body;
  const result = await CategoryService.createCategoryIntoDB(data);
  res.status(201).json({
    success: true,
    statusCode: 201,
    message: "Category created successfully",
    data: result,
  })
 } catch (error) {
  res.status(500).json({
   success: false,
   statusCode: 500,
   message: "Category created Fail",
   data: error,
 })
 }
}

const getAllCategory =async (req:Request, res: Response) => {

  try {
   const result = await CategoryService.getAllCategoryFromDB();
   res.status(200).json({
     success: true,
     statusCode: 200,
     message: "Categories retrieved successfully",
     data: result,
   })
  } catch (error) {
   res.status(500).json({
    success: false,
    statusCode: 500,
    message: "Category Not Retrieved",
    data: error,
  })
  }
}

export const CategoryControllers ={
 createCategory,
 getAllCategory,
}