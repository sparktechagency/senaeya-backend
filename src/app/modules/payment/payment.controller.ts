import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { paymentService } from './payment.service';

const createPayment = catchAsync(async (req: Request, res: Response) => {
     const result = await paymentService.createPayment(req.body);

     sendResponse(res, {
          statusCode: 200,
          success: true,
          message: 'Payment created successfully',
          data: result,
     });
});

const getAllPayments = catchAsync(async (req: Request, res: Response) => {
     const result = await paymentService.getAllPayments(req.query);

     sendResponse(res, {
          statusCode: 200,
          success: true,
          message: 'Payments retrieved successfully',
          data: result,
     });
});

const getAllUnpaginatedPayments = catchAsync(async (req: Request, res: Response) => {
     const result = await paymentService.getAllUnpaginatedPayments();

     sendResponse(res, {
          statusCode: 200,
          success: true,
          message: 'Payments retrieved successfully',
          data: result,
     });
});

const updatePayment = catchAsync(async (req: Request, res: Response) => {
     const { id } = req.params;
     const result = await paymentService.updatePayment(id, req.body);

     sendResponse(res, {
          statusCode: 200,
          success: true,
          message: 'Payment updated successfully',
          data: result || undefined,
     });
});

const deletePayment = catchAsync(async (req: Request, res: Response) => {
     const { id } = req.params;
     const result = await paymentService.deletePayment(id);

     sendResponse(res, {
          statusCode: 200,
          success: true,
          message: 'Payment deleted successfully',
          data: result || undefined,
     });
});

const hardDeletePayment = catchAsync(async (req: Request, res: Response) => {
     const { id } = req.params;
     const result = await paymentService.hardDeletePayment(id);

     sendResponse(res, {
          statusCode: 200,
          success: true,
          message: 'Payment deleted successfully',
          data: result || undefined,
     });
});

const getPaymentById = catchAsync(async (req: Request, res: Response) => {
     const { id } = req.params;
     const result = await paymentService.getPaymentById(id);

     sendResponse(res, {
          statusCode: 200,
          success: true,
          message: 'Payment retrieved successfully',
          data: result || undefined,
     });
});  

export const paymentController = {
     createPayment,
     getAllPayments,
     getAllUnpaginatedPayments,
     updatePayment,
     deletePayment,
     hardDeletePayment,
     getPaymentById
};
