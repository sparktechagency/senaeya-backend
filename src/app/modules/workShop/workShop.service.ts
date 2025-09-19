import { StatusCodes } from 'http-status-codes';
import AppError from '../../../errors/AppError';
import { IworkShop } from './workShop.interface';
import { WorkShop } from './workShop.model';
import QueryBuilder from '../../builder/QueryBuilder';
import unlinkFile from '../../../shared/unlinkFile';

const createWorkShop = async (payload: IworkShop): Promise<IworkShop> => {
     const result = await WorkShop.create(payload);
     if (!result) {
          if(payload.image){
               unlinkFile(payload.image);
          }
          throw new AppError(StatusCodes.NOT_FOUND, 'WorkShop not found.');
     }
     return result;
};

const getAllWorkShops = async (query: Record<string, any>): Promise<{ meta: { total: number; page: number; limit: number; }; result: IworkShop[]; }> => {
     const queryBuilder = new QueryBuilder(WorkShop.find(), query);
     const result = await queryBuilder.filter().sort().paginate().fields().modelQuery;
     const meta = await queryBuilder.countTotal();
     return { meta, result };
};

const getAllUnpaginatedWorkShops = async (): Promise<IworkShop[]> => {
     const result = await WorkShop.find();
     return result;
};

const updateWorkShop = async (id: string, payload: Partial<IworkShop>): Promise<IworkShop | null> => {
     const isExist = await WorkShop.findById(id);
     if (!isExist) {
          if(payload.image){
               unlinkFile(payload.image);
          }
          throw new AppError(StatusCodes.NOT_FOUND, 'WorkShop not found.');
     }

     if(isExist.image){
          unlinkFile(isExist.image);
     }
     return await WorkShop.findByIdAndUpdate(id, payload, { new: true });
};

const deleteWorkShop = async (id: string): Promise<IworkShop | null> => {
     const result = await WorkShop.findById(id);
     if (!result) {
          throw new AppError(StatusCodes.NOT_FOUND, 'WorkShop not found.');
     }
     result.isDeleted = true;
     result.deletedAt = new Date();
     await result.save();
     return result;
};

const hardDeleteWorkShop = async (id: string): Promise<IworkShop | null> => {
     const result = await WorkShop.findByIdAndDelete(id);
     if (!result) {
          throw new AppError(StatusCodes.NOT_FOUND, 'WorkShop not found.');
     }
     if(result.image){
          unlinkFile(result.image);
     }
     return result;
};

const getWorkShopById = async (id: string): Promise<IworkShop | null> => {
     const result = await WorkShop.findById(id);
     return result;
};   

export const workShopService = {
     createWorkShop,
     getAllWorkShops,
     getAllUnpaginatedWorkShops,
     updateWorkShop,
     deleteWorkShop,
     hardDeleteWorkShop,
     getWorkShopById
};
