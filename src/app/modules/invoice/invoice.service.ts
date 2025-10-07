import { StatusCodes } from 'http-status-codes';
import AppError from '../../../errors/AppError';
import { Iinvoice } from './invoice.interface';
import { Invoice } from './invoice.model';
import QueryBuilder from '../../builder/QueryBuilder';
import unlinkFile from '../../../shared/unlinkFile';

const createInvoice = async (payload: Iinvoice): Promise<Iinvoice> => {
     const result = await Invoice.create(payload);
     if (!result) {
          if(payload.image){
               unlinkFile(payload.image);
          }
          throw new AppError(StatusCodes.NOT_FOUND, 'Invoice not found.');
     }
     return result;
};

const getAllInvoices = async (query: Record<string, any>): Promise<{ meta: { total: number; page: number; limit: number; }; result: Iinvoice[]; }> => {
     const queryBuilder = new QueryBuilder(Invoice.find(), query);
     const result = await queryBuilder.filter().sort().paginate().fields().modelQuery;
     const meta = await queryBuilder.countTotal();
     return { meta, result };
};

const getAllUnpaginatedInvoices = async (): Promise<Iinvoice[]> => {
     const result = await Invoice.find();
     return result;
};

const updateInvoice = async (id: string, payload: Partial<Iinvoice>): Promise<Iinvoice | null> => {
     const isExist = await Invoice.findById(id);
     if (!isExist) {
          if(payload.image){
               unlinkFile(payload.image);
          }
          throw new AppError(StatusCodes.NOT_FOUND, 'Invoice not found.');
     }

     if(isExist.image){
          unlinkFile(isExist.image);
     }
     return await Invoice.findByIdAndUpdate(id, payload, { new: true });
};

const deleteInvoice = async (id: string): Promise<Iinvoice | null> => {
     const result = await Invoice.findById(id);
     if (!result) {
          throw new AppError(StatusCodes.NOT_FOUND, 'Invoice not found.');
     }
     result.isDeleted = true;
     result.deletedAt = new Date();
     await result.save();
     return result;
};

const hardDeleteInvoice = async (id: string): Promise<Iinvoice | null> => {
     const result = await Invoice.findByIdAndDelete(id);
     if (!result) {
          throw new AppError(StatusCodes.NOT_FOUND, 'Invoice not found.');
     }
     if(result.image){
          unlinkFile(result.image);
     }
     return result;
};

const getInvoiceById = async (id: string): Promise<Iinvoice | null> => {
     const result = await Invoice.findById(id);
     return result;
};   

export const invoiceService = {
     createInvoice,
     getAllInvoices,
     getAllUnpaginatedInvoices,
     updateInvoice,
     deleteInvoice,
     hardDeleteInvoice,
     getInvoiceById
};
