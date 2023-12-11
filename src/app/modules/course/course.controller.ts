/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { CourseServices } from "./course.service";

const createCourse = async (req: Request, res: Response) => {
 try {
   const { startDate, endDate } = req.body;

 
   const startDateTime:any = new Date(startDate);
   const endDateTime:any = new Date(endDate);
   // if (isNaN(startDateTime) || isNaN(endDateTime)) {
   //   throw new Error('Invalid date format');
   // }
   const durationInWeeks = Math.ceil((endDateTime - startDateTime) / (1000 * 60 * 60 * 24 * 7));
   req.body.durationInWeeks = durationInWeeks;
   const data = req.body;
   const result = await CourseServices.createCourseIntoDB(data);

   res.status(200).json({
     success: true,
     statusCode: 200,
     message: "Course created successfully",
     data: result,
   });

 } catch (error) {
   res.status(500).json({
     success: false,
     message: "Course creation failed",
     data: error,
   });
 }
};



export const CourseControllers = {
 createCourse,
}