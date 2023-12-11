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




export const CourseControllers = {
  createCourse,
  getSingleCourseByIdWithReviews,
  getTheBestCourseBasedOnAverageReview
};
