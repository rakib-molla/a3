import  express  from "express";
import { CourseControllers } from "./course.controller";
import validateRequest from "../../middlewares/validateRequest";
import { courseValidationSchema } from "./course.validation";

const router = express.Router();

router.post('/courses',CourseControllers.createCourse);

router.get('/courses/:courseId/reviews',CourseControllers.getSingleCourseByIdWithReviews);

router.get('/course/best',CourseControllers.getTheBestCourseBasedOnAverageReview);

router.get('/courses',CourseControllers.getPaginateAndFilteringSearch);

router.patch('/courses/:id',validateRequest(courseValidationSchema.updateCourseValidationSchema),CourseControllers.updateSingleCourse);

export const CourseRoutes = router;