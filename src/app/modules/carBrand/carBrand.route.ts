import express from 'express';
import { carBrandController } from './carBrand.controller';
import auth from '../../middleware/auth';
import fileUploadHandler from '../../middleware/fileUploadHandler';
import parseFileData from '../../middleware/parseFileData';
import { FOLDER_NAMES } from '../../../enums/files';
import validateRequest from '../../middleware/validateRequest';
import { carBrandValidation } from './carBrand.validation';
import { USER_ROLES } from '../../../enums/user';

const router = express.Router();

router.post('/', auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    fileUploadHandler(),
    parseFileData(FOLDER_NAMES.IMAGE),
    validateRequest(carBrandValidation.createCarBrandZodSchema), carBrandController.createCarBrand);

router.get('/', carBrandController.getAllCarBrands);

router.get('/unpaginated', carBrandController.getAllUnpaginatedCarBrands);

router.delete('/hard-delete/:id', auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN), carBrandController.hardDeleteCarBrand);

router.patch('/:id', fileUploadHandler(),
    parseFileData(FOLDER_NAMES.IMAGE), auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    validateRequest(carBrandValidation.updateCarBrandZodSchema), carBrandController.updateCarBrand);

router.delete('/:id', auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN), carBrandController.deleteCarBrand);

router.get('/:id', carBrandController.getCarBrandById);

export const carBrandRoutes = router;
