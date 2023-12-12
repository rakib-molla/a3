import  express  from "express";
import { CourseControllers } from "./course.controller";

const router = express.Router();

router.post('/courses',CourseControllers.createCourse);

router.get('/courses/:courseId/reviews',CourseControllers.getSingleCourseByIdWithReviews);

router.get('/course/best',CourseControllers.getTheBestCourseBasedOnAverageReview);

router.get('/courses',CourseControllers.getPaginateAndFilteringSearch);

export const CourseRoutes = router;