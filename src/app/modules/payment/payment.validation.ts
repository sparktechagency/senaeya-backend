import { z } from 'zod';
import { PaymentMethod, PaymentStatus } from './payment.enum';

const createPaymentZodSchema = z.object({
     body: z
          .object({
               providerWorkShopId: z.string({ required_error: 'Provider WorkShop ID is required' }),
               invoice: z.string({ required_error: 'Invoice ID is required' }),
               isCashRecieved: z.boolean().optional(),
               cardApprovalCode: z.string().optional(),
               isRecievedTransfer: z.boolean().optional(),
               postPaymentDate: z.string().optional(),
          }),
});

const updatePaymentZodSchema = z.object({
     body: z.object({
          providerWorkShopId: z.string().optional(),
          invoice: z.string().optional(),
          paymentMethod: z.nativeEnum(PaymentMethod, { required_error: 'Payment Method is required' }).optional(),
          paymentStatus: z.nativeEnum(PaymentStatus, { required_error: 'Payment Status is required' }).optional(),
          amount: z.number().optional(),
          isCashRecieved: z.boolean().optional(),
          cardApprovalCode: z.string().optional(),
          isRecievedTransfer: z.boolean().optional(),
          postPaymentDate: z.string().optional(),
     }),
});

export const paymentValidation = {
     createPaymentZodSchema,
     updatePaymentZodSchema,
};
