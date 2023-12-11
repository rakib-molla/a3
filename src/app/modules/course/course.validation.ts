
import { z } from "zod";

export const tagsValidationSchema = z.object({
 name: z.enum([
  'Beginner', 'Intermediate', 'Advanced'
 ]),
 isDeleted: z.boolean(),
})

export const detailsValidationSchema = z.object({
 level: z.string(),
 description: z.string(),
})

const courseValidationSchema = z.object({
 title: z.string({
  required_error: 'Title is Required',
  invalid_type_error: 'Title Must Be String'
 }),
 instructor: z.string(),
 categoryId: z.string(),
 price: z.number(),
 tags: z.array(tagsValidationSchema),
 startDate : z.string(),
 endDate: z.string(),
 language: z.string(),
 provider : z.string(),
 durationInWeeks: z.number(),
 details: z.string(detailsValidationSchema),
})

export default courseValidationSchema;