import { StatusCodes } from 'http-status-codes';
import AppError from '../../../errors/AppError';
import { Ipayment } from './payment.interface';
import { Payment } from './payment.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createPayment = async (payload: Ipayment): Promise<Ipayment> => {
     // /**
     //  * for payment module ⬇️⬇️⬇️⬇️⬇️
     //  * check the paymentMethod
     //  *        if paymentMethod is POSTPAID
     //  *               create the payment
     //  *               update the invoice
     //  *               for saved invoice (with paymentMethod POSTPAID, paymentStatus unpaid)
     //  *               send the invoice to the client whats app
     //  *        if paymentMethod is CASH
     //  *               if cash is recieved true
     //  *                       make a payment
     //  *                       create the invoice
     //  *                       update the invoice by including the payment
     //  *               if cash is recieved false
     //  *                       create the invoice
     //  * convert the postPaymentDate from string to Date for POSTPAID paymentMethod
     //  */
     const result = await Payment.create(payload);
     if (!result) {
          throw new AppError(StatusCodes.NOT_FOUND, 'Payment not found.');
     }
     return result;
};

const getAllPayments = async (query: Record<string, any>): Promise<{ meta: { total: number; page: number; limit: number }; result: Ipayment[] }> => {
     const queryBuilder = new QueryBuilder(Payment.find(), query);
     const result = await queryBuilder.filter().sort().paginate().fields().modelQuery;
     const meta = await queryBuilder.countTotal();
     return { meta, result };
};

const getAllUnpaginatedPayments = async (): Promise<Ipayment[]> => {
     const result = await Payment.find();
     return result;
};

const updatePayment = async (id: string, payload: Partial<Ipayment>): Promise<Ipayment | null> => {
     const isExist = await Payment.findById(id);
     if (!isExist) {
          throw new AppError(StatusCodes.NOT_FOUND, 'Payment not found.');
     }
     return await Payment.findByIdAndUpdate(id, payload, { new: true });
};

const deletePayment = async (id: string): Promise<Ipayment | null> => {
     const result = await Payment.findById(id);
     if (!result) {
          throw new AppError(StatusCodes.NOT_FOUND, 'Payment not found.');
     }
     result.isDeleted = true;
     result.deletedAt = new Date();
     await result.save();
     return result;
};

const hardDeletePayment = async (id: string): Promise<Ipayment | null> => {
     const result = await Payment.findByIdAndDelete(id);
     if (!result) {
          throw new AppError(StatusCodes.NOT_FOUND, 'Payment not found.');
     }
     return result;
};

const getPaymentById = async (id: string): Promise<Ipayment | null> => {
     const result = await Payment.findById(id);
     return result;
};

export const paymentService = {
     createPayment,
     getAllPayments,
     getAllUnpaginatedPayments,
     updatePayment,
     deletePayment,
     hardDeletePayment,
     getPaymentById,
};
