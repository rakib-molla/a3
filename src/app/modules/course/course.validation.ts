import { z } from "zod";

export const tagsValidationSchema = z.object({
  name: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  isDeleted: z.boolean(),
});

export const updateTagsValidationSchema = z.object({
  name: z.enum(['Beginner', 'Intermediate', 'Advanced']).optional(),
  isDeleted: z.boolean().optional(),
}).nullable();

export const detailsValidationSchema = z.object({
  level: z.string(),
  description: z.string(),
});

export const updateDetailsValidationSchema = z.object({
  level: z.string().optional(),
  description: z.string().optional(),
});

export const createCourseValidationSchema = z.object({
  title: z.string({
    required_error: 'Title is Required',
    invalid_type_error: 'Title Must Be String',
  }),
  instructor: z.string(),
  categoryId: z.string(),
  price: z.number(),
  tags: z.array(tagsValidationSchema),
  //  tags: z.array(
  //   z.object({
  //     name: z.string(),
  //     isDeleted: z.boolean(),
  //   })
  // ),

  startDate: z.string(),
  endDate: z.string(),
  language: z.string(),
  provider: z.string(),
  durationInWeeks: z.number().optional(),
  details: detailsValidationSchema,
});

export const updateCourseValidationSchema = z.object({
  title: z.string().optional(),
  instructor: z.string().optional(),
  categoryId: z.string().optional(),
  price: z.number().optional(),
  tags: z.array(updateTagsValidationSchema).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  language: z.string().optional(),
  provider: z.string().optional(),
  durationInWeeks: z.number().optional(),
  details: updateDetailsValidationSchema.optional(),
});

export const courseValidationSchema = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
};
