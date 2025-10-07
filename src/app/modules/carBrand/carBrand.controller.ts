import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { carBrandService } from './carBrand.service';

const createCarBrand = catchAsync(async (req: Request, res: Response) => {
     const result = await carBrandService.createCarBrand(req.body);

     sendResponse(res, {
          statusCode: 200,
          success: true,
          message: 'CarBrand created successfully',
          data: result,
     });
});

const getAllCarBrands = catchAsync(async (req: Request, res: Response) => {
     const result = await carBrandService.getAllCarBrands(req.query);

     sendResponse(res, {
          statusCode: 200,
          success: true,
          message: 'CarBrands retrieved successfully',
          data: result,
     });
});

const getAllUnpaginatedCarBrands = catchAsync(async (req: Request, res: Response) => {
     const result = await carBrandService.getAllUnpaginatedCarBrands();

     sendResponse(res, {
          statusCode: 200,
          success: true,
          message: 'CarBrands retrieved successfully',
          data: result,
     });
});

const updateCarBrand = catchAsync(async (req: Request, res: Response) => {
     const { id } = req.params;
     const result = await carBrandService.updateCarBrand(id, req.body);

     sendResponse(res, {
          statusCode: 200,
          success: true,
          message: 'CarBrand updated successfully',
          data: result || undefined,
     });
});

const deleteCarBrand = catchAsync(async (req: Request, res: Response) => {
     const { id } = req.params;
     const result = await carBrandService.deleteCarBrand(id);

     sendResponse(res, {
          statusCode: 200,
          success: true,
          message: 'CarBrand deleted successfully',
          data: result || undefined,
     });
});

const hardDeleteCarBrand = catchAsync(async (req: Request, res: Response) => {
     const { id } = req.params;
     const result = await carBrandService.hardDeleteCarBrand(id);

     sendResponse(res, {
          statusCode: 200,
          success: true,
          message: 'CarBrand deleted successfully',
          data: result || undefined,
     });
});

const getCarBrandById = catchAsync(async (req: Request, res: Response) => {
     const { id } = req.params;
     const result = await carBrandService.getCarBrandById(id);

     sendResponse(res, {
          statusCode: 200,
          success: true,
          message: 'CarBrand retrieved successfully',
          data: result || undefined,
     });
});  

export const carBrandController = {
     createCarBrand,
     getAllCarBrands,
     getAllUnpaginatedCarBrands,
     updateCarBrand,
     deleteCarBrand,
     hardDeleteCarBrand,
     getCarBrandById
};
