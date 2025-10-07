import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { carBrandCountriesService } from './carBrandCountries.service';

const createCarBrandCountries = catchAsync(async (req: Request, res: Response) => {
     const result = await carBrandCountriesService.createCarBrandCountries(req.body);

     sendResponse(res, {
          statusCode: 200,
          success: true,
          message: 'CarBrandCountries created successfully',
          data: result,
     });
});

const getAllCarBrandCountriess = catchAsync(async (req: Request, res: Response) => {
     const result = await carBrandCountriesService.getAllCarBrandCountriess(req.query);

     sendResponse(res, {
          statusCode: 200,
          success: true,
          message: 'CarBrandCountriess retrieved successfully',
          data: result,
     });
});

const getAllUnpaginatedCarBrandCountriess = catchAsync(async (req: Request, res: Response) => {
     const result = await carBrandCountriesService.getAllUnpaginatedCarBrandCountriess();

     sendResponse(res, {
          statusCode: 200,
          success: true,
          message: 'CarBrandCountriess retrieved successfully',
          data: result,
     });
});

const updateCarBrandCountries = catchAsync(async (req: Request, res: Response) => {
     const { id } = req.params;
     const result = await carBrandCountriesService.updateCarBrandCountries(id, req.body);

     sendResponse(res, {
          statusCode: 200,
          success: true,
          message: 'CarBrandCountries updated successfully',
          data: result || undefined,
     });
});

const deleteCarBrandCountries = catchAsync(async (req: Request, res: Response) => {
     const { id } = req.params;
     const result = await carBrandCountriesService.deleteCarBrandCountries(id);

     sendResponse(res, {
          statusCode: 200,
          success: true,
          message: 'CarBrandCountries deleted successfully',
          data: result || undefined,
     });
});

const hardDeleteCarBrandCountries = catchAsync(async (req: Request, res: Response) => {
     const { id } = req.params;
     const result = await carBrandCountriesService.hardDeleteCarBrandCountries(id);

     sendResponse(res, {
          statusCode: 200,
          success: true,
          message: 'CarBrandCountries deleted successfully',
          data: result || undefined,
     });
});

const getCarBrandCountriesById = catchAsync(async (req: Request, res: Response) => {
     const { id } = req.params;
     const result = await carBrandCountriesService.getCarBrandCountriesById(id);

     sendResponse(res, {
          statusCode: 200,
          success: true,
          message: 'CarBrandCountries retrieved successfully',
          data: result || undefined,
     });
});  

export const carBrandCountriesController = {
     createCarBrandCountries,
     getAllCarBrandCountriess,
     getAllUnpaginatedCarBrandCountriess,
     updateCarBrandCountries,
     deleteCarBrandCountries,
     hardDeleteCarBrandCountries,
     getCarBrandCountriesById
};
