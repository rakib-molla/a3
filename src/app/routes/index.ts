import { Router } from "express";
import { CourseRoutes } from "../modules/course/course.route";
import { CategoryRoutes } from "../modules/category/category.route";
import { ReviewRoutes } from "../modules/review/review.route";

const router = Router();

const moduleRoutes =[
 {
  path: '/api',
  route: CourseRoutes,
 },
 {
  path: '/api',
  route: CategoryRoutes,
 },
 {
  path: '/api',
  route: ReviewRoutes,
 },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;