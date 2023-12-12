/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { CourseServices } from './course.service';
import { ReviewModel } from './../review/review.model';
import { Course } from './course.model';


const createCourse = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.body;

    const startDateTime: any = new Date(startDate);
    const endDateTime: any = new Date(endDate);


    // duration calculate for weeks
    const durationInWeeks = Math.ceil(
      (endDateTime - startDateTime) / (1000 * 60 * 60 * 24 * 7),
    );
    
    req.body.durationInWeeks = durationInWeeks;
    const data = req.body;
    const result = await CourseServices.createCourseIntoDB(data);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Course created successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Course creation failed',
      data: error,
    });
  }
};

const getSingleCourseByIdWithReviews = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    // find specific review using courseId section 
    const review = await ReviewModel.find({courseId});
    const result = await CourseServices.getSingleCourseByIdWithReviewsFromDB(courseId);
    res.status(200).json({
      success: true,
      message: 'Course and Reviews retrieved successfully',
      data: result,
      review: review,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Course and Reviews retrieved Fail',
      data: error,
    });
  }
};

const getTheBestCourseBasedOnAverageReview = async (req: Request, res: Response) => {
  try {
    //  calculate the average rating and count of reviews for  course
    const coursesWithAverageRatingAndCount = await ReviewModel.aggregate([
      {
        $group: {
          _id: '$courseId',
          averageRating: { $avg: '$rating' },
          reviewCount: { $sum: 1 },
        },
      },
    ]);

    // Sort courses based on averageRating 
    const sortedCourses = coursesWithAverageRatingAndCount.sort((a, b) => b.averageRating - a.averageRating);

    // view the best course
    const bestCourseId = sortedCourses[0]._id;
    const course = await Course.findById(bestCourseId);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Best course retrieved successfully',
      data: {
        course,
        averageRating: sortedCourses[0].averageRating,
        reviewCount: sortedCourses[0].reviewCount,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Error retrieving best course',
      data: error,
    });
  }
};

const getPaginateAndFilteringSearch  = async (req: Request, res: Response) =>{
  try {
    // Parse query parameters
    const { page = '1', limit = '10', sortBy, sortOrder, minPrice, maxPrice, tags, startDate, endDate, language, provider, durationInWeeks, level } = req.query;

    // Build the filter object based on query parameters
    const filter: any = {};
    if (minPrice) filter.price = { $gte: parseFloat(minPrice as string) };
    if (maxPrice) filter.price = { ...filter.price, $lte: parseFloat(maxPrice as string) };
    if (tags) filter['tags.name'] = tags as string;
    if (startDate) filter.startDate = { $gte: new Date(startDate as string) };
    if (endDate) filter.endDate = { $lte: new Date(endDate as string) };
    if (language) filter.language = language as string;
    if (provider) filter.provider = provider as string;
    if (durationInWeeks) filter.durationInWeeks = parseInt(durationInWeeks as string, 10);
    if (level) filter['details.level'] = level as string;

    // Build the sort object based on sortBy and sortOrder
    const sort: any = {};
    if (sortBy) sort[sortBy as string] = sortOrder === 'desc' ? -1 : 1;

    // Perform the query with pagination and filtering
    const courses = await Course.find(filter)
      .sort(sort)
      .skip((parseInt(page as string, 10) - 1) * parseInt(limit as string, 10))
      .limit(parseInt(limit as string, 10));

    // Get the total count of courses
    const total: number = await Course.countDocuments(filter);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Courses retrieved successfully',
      meta: {
        page: parseInt(page as string, 10),
        limit: parseInt(limit as string, 10),
        total,
      },
      data: courses,
    });
  } catch (error) {
    
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Error retrieving courses',
      data: error,
    });
  }
};


export const CourseControllers = {
  createCourse,
  getSingleCourseByIdWithReviews,
  getTheBestCourseBasedOnAverageReview,
  getPaginateAndFilteringSearch,
};
