import { StatusCodes } from 'http-status-codes';
import AppError from '../../../errors/AppError';
import { Iimage } from './image.interface';
import { Image } from './image.model';
import QueryBuilder from '../../builder/QueryBuilder';
import unlinkFile from '../../../shared/unlinkFile';
import { ImageType } from './image.enum';

const createImage = async (payload: Iimage): Promise<Iimage> => {
     if (payload.type === ImageType.WEBSITE_LOGO) {
          const isExist = await Image.findOne({ type: ImageType.WEBSITE_LOGO });
          if (isExist) {
               if (payload.image) {
                    unlinkFile(payload.image);
               }
               throw new AppError(StatusCodes.BAD_REQUEST, 'Website logo already exists. Please update the existing logo or delete the existing logo.');
          }
     }
     const result = await Image.create(payload);
     if (!result) {
          if (payload.image) {
               unlinkFile(payload.image);
          }
          throw new AppError(StatusCodes.NOT_FOUND, 'Image not found.');
     }
     return result;
};

const getAllImages = async (query: Record<string, any>,type: string): Promise<{ meta: { total: number; page: number; limit: number }; result: Iimage[] }> => {
     const queryBuilder = new QueryBuilder(Image.find({type: type}), query);
     const result = await queryBuilder.filter().sort().paginate().fields().modelQuery;
     const meta = await queryBuilder.countTotal();
     return { meta, result };
};

const getAllUnpaginatedImages = async (type: string): Promise<Iimage[]> => {
     const result = await Image.find({type: type});
     return result;
};

const updateImage = async (id: string, payload: Partial<Iimage>): Promise<Iimage | null> => {
     const isExist = await Image.findById(id);
     if (!isExist) {
          if (payload.image) {
               unlinkFile(payload.image);
          }
          throw new AppError(StatusCodes.NOT_FOUND, 'Image not found.');
     }

     if (isExist.image) {
          unlinkFile(isExist.image);
     }
     return await Image.findByIdAndUpdate(id, payload, { new: true });
};

const deleteImage = async (id: string): Promise<Iimage | null> => {
     const result = await Image.findById(id);
     if (!result) {
          throw new AppError(StatusCodes.NOT_FOUND, 'Image not found.');
     }
     result.isDeleted = true;
     result.deletedAt = new Date();
     await result.save();
     return result;
};

const hardDeleteImage = async (id: string): Promise<Iimage | null> => {
     const result = await Image.findByIdAndDelete(id);
     if (!result) {
          throw new AppError(StatusCodes.NOT_FOUND, 'Image not found.');
     }
     if (result.image) {
          unlinkFile(result.image);
     }
     return result;
};

const getImageById = async (id: string): Promise<Iimage | null> => {
     const result = await Image.findById(id);
     return result;
};

export const imageService = {
     createImage,
     getAllImages,
     getAllUnpaginatedImages,
     updateImage,
     deleteImage,
     hardDeleteImage,
     getImageById,
};
