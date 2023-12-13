
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
 
 const getPaginateAndFilteringSearchFromDB = async()=>{
  
  const  result = await Course.find();
  return result;
 }

 //  Update a Course
const updateSingleCourseIntoDB = async (id: string, payload: Partial<TCourse>)=>{
  const { tags, details,  ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  

    if (tags && tags.length) {
      modifiedUpdatedData['tags'] = tags.map(tag => {
        // Ensure each tag object has a "name" property and an "isDeleted" property
        return {
          name: tag.name || '',
          isDeleted: tag.isDeleted || false,
        };
      });
    }

 
  if (details && Object.keys(details).length) {
    for (const [key, value] of Object.entries(details)) {
      modifiedUpdatedData[`details.${key}`] = value;
    }
  }

  const result = await Course.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });

 
  return result;
}

export const CourseServices = {
 createCourseIntoDB,
 getSingleCourseByIdWithReviewsFromDB,
 getTheBestCourseBasedOnAverageReviewFromDB,
 getPaginateAndFilteringSearchFromDB,
 updateSingleCourseIntoDB,
}