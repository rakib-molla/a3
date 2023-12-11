
import { Course } from "./course.model";
import { TCourse } from "./course.interface";

const createCourseIntoDB = async(payload: TCourse)=>{
  const result = await Course.create(payload);
  return result;
}


export const CourseServices = {
 createCourseIntoDB,
}