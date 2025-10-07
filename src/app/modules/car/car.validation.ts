import { z } from 'zod';
import { CLIENT_CAR_TYPE } from '../client/client.enum';

const createCarZodSchema = z.object({
     body: z.object({
          brand: z.string({ required_error: 'Brand is required' }),
          model: z.string({ required_error: 'Model is required' }),
          year: z.string({ required_error: 'Year is required' }),
          vin: z.string({ required_error: 'VIN is required' }),
          client: z.string({ required_error: 'Client is required' }),
          image: z.string().optional(),
          description: z.string().optional(),
          carType: z.nativeEnum(CLIENT_CAR_TYPE),
          plateNumberForInternational: z.string().optional(),
          plateNumberForSaudi: z
               .object({
                    symbol: z.string().optional(),
                    numberEnglish: z.string().optional(),
                    numberArabic: z.string().optional(),
                    alphabetsCombinations: z.array(z.string()).optional(),
               })
               .optional(),
     }),
});

const updateCarZodSchema = z.object({
     body: z.object({
          image: z.string().optional(),
          description: z.string().optional(),
          carType: z.nativeEnum(CLIENT_CAR_TYPE).optional(),
          plateNumberForInternational: z.string().optional(),
          plateNumberForSaudi: z
               .object({
                    symbol: z.string().optional(),
                    numberEnglish: z.string().optional(),
                    numberArabic: z.string().optional(),
                    alphabetsCombinations: z.array(z.string()).optional(),
               })
               .optional(),
     }),
});

export const carValidation = {
     createCarZodSchema,
     updateCarZodSchema,
};
