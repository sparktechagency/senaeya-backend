import { z } from 'zod';
import { ImageType } from './image.enum';

const createImageZodSchema = z.object({
     body: z.object({
          image: z.string({ required_error: 'Image is required' }),
          title: z.string().optional(),
          type: z.nativeEnum(ImageType, { required_error: 'type is required' }),
          description: z.string().optional(),
     }),
});

const updateImageZodSchema = z.object({
     body: z.object({
          image: z.string().optional(),
          title: z.string().optional(),
          type: z.nativeEnum(ImageType, { required_error: 'type is required' }).optional(),
          description: z.string().optional(),
     }),
});

export const imageValidation = {
     createImageZodSchema,
     updateImageZodSchema,
};
