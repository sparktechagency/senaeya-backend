import { StatusCodes } from 'http-status-codes';
import AppError from '../../../errors/AppError';
import { Icar, IcarCreate } from './car.interface';
import { Car } from './car.model';
import QueryBuilder from '../../builder/QueryBuilder';
import unlinkFile from '../../../shared/unlinkFile';
import { CLIENT_CAR_TYPE } from '../client/client.enum';
import { imageService } from '../image/image.service';

const createCar = async (payload: IcarCreate): Promise<Icar> => {
     if (payload.carType == CLIENT_CAR_TYPE.SAUDI) {
          // payload must include plateNumberForSaudi
          if (
               !payload.plateNumberForSaudi?.symbol ||
               !payload.plateNumberForSaudi?.numberEnglish ||
               !payload.plateNumberForSaudi?.numberArabic ||
               !payload.plateNumberForSaudi?.alphabetsCombinations
          ) {
               throw new AppError(StatusCodes.BAD_REQUEST, 'Plate number for Saudi is required.');
          }
          if (payload.plateNumberForSaudi.symbol) {
               const isExistSymbol = await imageService.getImageById(payload.plateNumberForSaudi.symbol);
               if (!isExistSymbol) {
                    throw new AppError(StatusCodes.NOT_FOUND, 'Plate number for Saudi symbol not found.');
               }
          }
     }
     if (payload.carType == CLIENT_CAR_TYPE.INTERNATIONAL) {
          // payload must include plateNumberForInternational
          if (!payload.plateNumberForInternational) {
               throw new AppError(StatusCodes.BAD_REQUEST, 'Plate number for international is required.');
          }
     }
     const result = await Car.create(payload);
     if (!result) {
          if (payload.image) {
               unlinkFile(payload.image);
          }
          throw new AppError(StatusCodes.NOT_FOUND, 'Car not found.');
     }
     return result;
};

const getAllCars = async (query: Record<string, any>): Promise<{ meta: { total: number; page: number; limit: number }; result: Icar[] }> => {
     const queryBuilder = new QueryBuilder(Car.find(), query);
     const result = await queryBuilder.filter().sort().paginate().fields().modelQuery;
     const meta = await queryBuilder.countTotal();
     return { meta, result };
};

const getAllUnpaginatedCars = async (): Promise<Icar[]> => {
     const result = await Car.find();
     return result;
};

const updateCar = async (id: string, payload: Partial<Icar>): Promise<Icar | null> => {
     const isExist = await Car.findById(id);
     if (!isExist) {
          if (payload.image) {
               unlinkFile(payload.image);
          }
          throw new AppError(StatusCodes.NOT_FOUND, 'Car not found.');
     }

     if (isExist.image) {
          unlinkFile(isExist.image);
     }
     return await Car.findByIdAndUpdate(id, payload, { new: true });
};

const deleteCar = async (id: string): Promise<Icar | null> => {
     const result = await Car.findById(id);
     if (!result) {
          throw new AppError(StatusCodes.NOT_FOUND, 'Car not found.');
     }
     result.isDeleted = true;
     result.deletedAt = new Date();
     await result.save();
     return result;
};

const hardDeleteCar = async (id: string): Promise<Icar | null> => {
     const result = await Car.findByIdAndDelete(id);
     if (!result) {
          throw new AppError(StatusCodes.NOT_FOUND, 'Car not found.');
     }
     if (result.image) {
          unlinkFile(result.image);
     }
     return result;
};

const getCarById = async (id: string): Promise<Icar | null> => {
     const result = await Car.findById(id);
     return result;
};

export const carService = {
     createCar,
     getAllCars,
     getAllUnpaginatedCars,
     updateCar,
     deleteCar,
     hardDeleteCar,
     getCarById,
};
