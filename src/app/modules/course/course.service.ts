
import { Course } from "./course.model";
import { TCourse } from "./course.interface";

const createCourseIntoDB = async(payload: TCourse)=>{
  const result = await Course.create(payload);
  return result;
}

const getSingleCourseByIdWithReviewsFromDB = async (courseId: string) => {
  const result = await Course.findById(courseId)
    // .populate('courseId')
  return result;
 };


 const getTheBestCourseBasedOnAverageReviewFromDB = async()=>{
  const result = await Course.find();
  return result; 
 }
 
export const CourseServices = {
 createCourseIntoDB,
 getSingleCourseByIdWithReviewsFromDB,
 getTheBestCourseBasedOnAverageReviewFromDB
}