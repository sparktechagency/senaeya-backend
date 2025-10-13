import { z } from 'zod';
import { PaymentMethod, PaymentStatus } from './payment.enum';

const createPaymentZodSchema = z.object({
     body: z
          .object({
               providerWorkShopId: z.string({ required_error: 'Provider WorkShop ID is required' }),
               invoiceId: z.string({ required_error: 'Invoice ID is required' }),
               paymentMethod: z.nativeEnum(PaymentMethod, { required_error: 'Payment Method is required' }),
               paymentStatus: z.nativeEnum(PaymentStatus, { required_error: 'Payment Status is required' }),
               amount: z.number({ required_error: 'Amount is required' }),
               isCashRecieved: z.boolean().optional(),
               cardApprovalCode: z.string().optional(),
               isRecievedTransfer: z.boolean().optional(),
               postPaymentDate: z.date().optional(),
          })
          .superRefine((body, ctx) => {
               if (!body.providerWorkShopId || !body.invoiceId || !body.paymentMethod || !body.paymentStatus || !body.amount) {
                    ctx.addIssue({
                         code: z.ZodIssueCode.custom,
                         message: 'All fields are required',
                    });
               }
               if (body.paymentMethod === PaymentMethod.POSTPAID && !body.postPaymentDate) {
                    ctx.addIssue({
                         code: z.ZodIssueCode.custom,
                         message: 'Post Payment Date is required for POSTPAID payment method',
                    });
               } else if (body.paymentMethod === PaymentMethod.CASH && !body.isCashRecieved) {
                    ctx.addIssue({
                         code: z.ZodIssueCode.custom,
                         message: 'Cash Recieved is required for CASH payment method',
                    });
               } else if (body.paymentMethod === PaymentMethod.TRANSFER && !body.isRecievedTransfer) {
                    ctx.addIssue({
                         code: z.ZodIssueCode.custom,
                         message: 'Recieved Transfer is required for TRANSFER payment method',
                    });
               } else if (body.paymentMethod === PaymentMethod.CARD && !body.cardApprovalCode) {
                    ctx.addIssue({
                         code: z.ZodIssueCode.custom,
                         message: 'Card Approval Code is required for CARD payment method',
                    });
               }
          }),
});

const updatePaymentZodSchema = z.object({
     body: z.object({
          providerWorkShopId: z.string().optional(),
          invoiceId: z.string().optional(),
          paymentMethod: z.nativeEnum(PaymentMethod, { required_error: 'Payment Method is required' }).optional(),
          paymentStatus: z.nativeEnum(PaymentStatus, { required_error: 'Payment Status is required' }).optional(),
          amount: z.number().optional(),
          isCashRecieved: z.boolean().optional(),
          cardApprovalCode: z.string().optional(),
          isRecievedTransfer: z.boolean().optional(),
          postPaymentDate: z.date().optional(),
     }),
});

export const paymentValidation = {
     createPaymentZodSchema,
     updatePaymentZodSchema,
};
