import express from 'express';
import { carBrandCountriesController } from './carBrandCountries.controller';
import auth from '../../middleware/auth';
import fileUploadHandler from '../../middleware/fileUploadHandler';
import parseFileData from '../../middleware/parseFileData';
import { FOLDER_NAMES } from '../../../enums/files';
import validateRequest from '../../middleware/validateRequest';
import { carBrandCountriesValidation } from './carBrandCountries.validation';
import { USER_ROLES } from '../../../enums/user';

const router = express.Router();

router.post('/', auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    fileUploadHandler(),
    parseFileData(FOLDER_NAMES.IMAGE),
    validateRequest(carBrandCountriesValidation.createCarBrandCountriesZodSchema), carBrandCountriesController.createCarBrandCountries);

router.get('/', carBrandCountriesController.getAllCarBrandCountriess);

router.get('/unpaginated', carBrandCountriesController.getAllUnpaginatedCarBrandCountriess);

router.delete('/hard-delete/:id', auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN), carBrandCountriesController.hardDeleteCarBrandCountries);

router.patch('/:id', fileUploadHandler(),
    parseFileData(FOLDER_NAMES.IMAGE), auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    validateRequest(carBrandCountriesValidation.updateCarBrandCountriesZodSchema), carBrandCountriesController.updateCarBrandCountries);

router.delete('/:id', auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN), carBrandCountriesController.deleteCarBrandCountries);

router.get('/:id', carBrandCountriesController.getCarBrandCountriesById);

export const carBrandCountriesRoutes = router;
