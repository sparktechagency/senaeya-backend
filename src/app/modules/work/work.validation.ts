import { z } from 'zod';
import { WorkType } from './work.enum';

const createWorkZodSchema = z.object({
     body: z.object({
          worksCategories: z.string().optional(),
          type: z.nativeEnum(WorkType).optional(),
          title: z.string().optional(),
          code: z.string().optional(),
          cost: z.number().optional(),
     }),
});

const updateWorkZodSchema = z.object({
     body: z.object({
          worksCategories: z.string().optional(),
          type: z.nativeEnum(WorkType).optional(),
          title: z.string().optional(),
          code: z.string().optional(),
          cost: z.number().optional(),
     }),
});

export const workValidation = {
     createWorkZodSchema,
     updateWorkZodSchema,
};
