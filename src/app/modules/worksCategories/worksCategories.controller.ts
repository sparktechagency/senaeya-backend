import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { worksCategoriesService } from './worksCategories.service';

const createWorksCategories = catchAsync(async (req: Request, res: Response) => {
     const result = await worksCategoriesService.createWorksCategories(req.body);

     sendResponse(res, {
          statusCode: 200,
          success: true,
          message: 'WorksCategories created successfully',
          data: result,
     });
});

const getAllWorksCategoriess = catchAsync(async (req: Request, res: Response) => {
     const result = await worksCategoriesService.getAllWorksCategoriess(req.query);

     sendResponse(res, {
          statusCode: 200,
          success: true,
          message: 'WorksCategoriess retrieved successfully',
          data: result,
     });
});

const getAllUnpaginatedWorksCategoriess = catchAsync(async (req: Request, res: Response) => {
     const result = await worksCategoriesService.getAllUnpaginatedWorksCategoriess();

     sendResponse(res, {
          statusCode: 200,
          success: true,
          message: 'WorksCategoriess retrieved successfully',
          data: result,
     });
});

const updateWorksCategories = catchAsync(async (req: Request, res: Response) => {
     const { id } = req.params;
     const result = await worksCategoriesService.updateWorksCategories(id, req.body);

     sendResponse(res, {
          statusCode: 200,
          success: true,
          message: 'WorksCategories updated successfully',
          data: result || undefined,
     });
});

const deleteWorksCategories = catchAsync(async (req: Request, res: Response) => {
     const { id } = req.params;
     const result = await worksCategoriesService.deleteWorksCategories(id);

     sendResponse(res, {
          statusCode: 200,
          success: true,
          message: 'WorksCategories deleted successfully',
          data: result || undefined,
     });
});

const hardDeleteWorksCategories = catchAsync(async (req: Request, res: Response) => {
     const { id } = req.params;
     const result = await worksCategoriesService.hardDeleteWorksCategories(id);

     sendResponse(res, {
          statusCode: 200,
          success: true,
          message: 'WorksCategories deleted successfully',
          data: result || undefined,
     });
});

const getWorksCategoriesById = catchAsync(async (req: Request, res: Response) => {
     const { id } = req.params;
     const result = await worksCategoriesService.getWorksCategoriesById(id);

     sendResponse(res, {
          statusCode: 200,
          success: true,
          message: 'WorksCategories retrieved successfully',
          data: result || undefined,
     });
});  

export const worksCategoriesController = {
     createWorksCategories,
     getAllWorksCategoriess,
     getAllUnpaginatedWorksCategoriess,
     updateWorksCategories,
     deleteWorksCategories,
     hardDeleteWorksCategories,
     getWorksCategoriesById
};
