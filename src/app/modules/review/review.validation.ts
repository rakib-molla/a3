import { z } from "zod";

const createReviewValidationSchema = z.object({
 courseId: z.string(),
 rating: z.number({
  invalid_type_error:'rating is less than 5',
 }).min(1).max(5),
 review: z.string({invalid_type_error:'review must be string'}),
})

export const reviewValidationSchema = {
 createReviewValidationSchema,
}