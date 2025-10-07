import { z } from 'zod';

const createWorkZodSchema = z.object({
     body: z.object({
          worksCategories: z.string().optional(),
          title: z.string().optional(),
          code: z.string().optional(),
          cost: z.number().optional(),
     }),
});

const updateWorkZodSchema = z.object({
     body: z.object({
          worksCategories: z.string().optional(),
          title: z.string().optional(),
          code: z.string().optional(),
          cost: z.number().optional(),
     }),
});

export const workValidation = {
     createWorkZodSchema,
     updateWorkZodSchema,
};
