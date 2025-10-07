import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { imageService } from './image.service';

const createImage = catchAsync(async (req: Request, res: Response) => {
     const result = await imageService.createImage(req.body);

     sendResponse(res, {
          statusCode: 200,
          success: true,
          message: 'Image created successfully',
          data: result,
     });
});

const getAllImages = catchAsync(async (req: Request, res: Response) => {
     const { type } = req.params;
     const result = await imageService.getAllImages(req.query,type);

     sendResponse(res, {
          statusCode: 200,
          success: true,
          message: 'Images retrieved successfully',
          data: result,
     });
});

const getAllUnpaginatedImages = catchAsync(async (req: Request, res: Response) => {
     const { type } = req.params;
     const result = await imageService.getAllUnpaginatedImages(type);

     sendResponse(res, {
          statusCode: 200,
          success: true,
          message: 'Images retrieved successfully',
          data: result,
     });
});

const updateImage = catchAsync(async (req: Request, res: Response) => {
     const { id } = req.params;
     const result = await imageService.updateImage(id, req.body);

     sendResponse(res, {
          statusCode: 200,
          success: true,
          message: 'Image updated successfully',
          data: result || undefined,
     });
});

const deleteImage = catchAsync(async (req: Request, res: Response) => {
     const { id } = req.params;
     const result = await imageService.deleteImage(id);

     sendResponse(res, {
          statusCode: 200,
          success: true,
          message: 'Image deleted successfully',
          data: result || undefined,
     });
});

const hardDeleteImage = catchAsync(async (req: Request, res: Response) => {
     const { id } = req.params;
     const result = await imageService.hardDeleteImage(id);

     sendResponse(res, {
          statusCode: 200,
          success: true,
          message: 'Image deleted successfully',
          data: result || undefined,
     });
});

const getImageById = catchAsync(async (req: Request, res: Response) => {
     const { id } = req.params;
     const result = await imageService.getImageById(id);

     sendResponse(res, {
          statusCode: 200,
          success: true,
          message: 'Image retrieved successfully',
          data: result || undefined,
     });
});  

export const imageController = {
     createImage,
     getAllImages,
     getAllUnpaginatedImages,
     updateImage,
     deleteImage,
     hardDeleteImage,
     getImageById
};
