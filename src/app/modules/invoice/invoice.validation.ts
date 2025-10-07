import { z } from 'zod';

const createInvoiceZodSchema = z.object({
     body: z.object({
          client: z.string({ required_error: 'Client is required' }),
          providerWorkShopId: z.string({ required_error: 'Provider WorkShop is required' }),
          image: z.string({ required_error: 'Image is required' }),
          title: z.string({ required_error: 'title text is required' }),
          description: z.string({ required_error: 'description text is required' }),
     }),
});

const updateInvoiceZodSchema = z.object({
     body: z.object({
          client: z.string().optional(),
          providerWorkShopId: z.string().optional(),
          image: z.string().optional(),
          title: z.string().optional(),
          description: z.string().optional(),
     }),
});

export const invoiceValidation = {
     createInvoiceZodSchema,
     updateInvoiceZodSchema
};
