import { z } from 'zod';

const createCarBrandZodSchema = z.object({
     body: z.object({
          image: z.string({ required_error: 'Image is required' }),
          title: z.string({ required_error: 'title text is required' }),
          country: z.string({ required_error: 'country text is required' }),
          description: z.string().optional(),
     }),
});

const updateCarBrandZodSchema = z.object({
     body: z.object({
          image: z.string().optional(),
          title: z.string().optional(),
          country: z.string().optional(),
          description: z.string().optional(),
     }),
});

export const carBrandValidation = {
     createCarBrandZodSchema,
     updateCarBrandZodSchema
};
