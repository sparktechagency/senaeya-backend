import express from 'express';
import { workShopController } from './workShop.controller';
import auth from '../../middleware/auth';
import fileUploadHandler from '../../middleware/fileUploadHandler';
import parseFileData from '../../middleware/parseFileData';
import { FOLDER_NAMES } from '../../../enums/files';
import validateRequest from '../../middleware/validateRequest';
import { workShopValidation } from './workShop.validation';
import { USER_ROLES } from '../../../enums/user';

const router = express.Router();

router.post('/', auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    fileUploadHandler(),
    parseFileData(FOLDER_NAMES.IMAGE),
    validateRequest(workShopValidation.createWorkShopZodSchema), workShopController.createWorkShop);

router.get('/', workShopController.getAllWorkShops);

router.get('/unpaginated', workShopController.getAllUnpaginatedWorkShops);

router.delete('/hard-delete/:id', auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN), workShopController.hardDeleteWorkShop);

router.patch('/:id', fileUploadHandler(),
    parseFileData(FOLDER_NAMES.IMAGE), auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    validateRequest(workShopValidation.updateWorkShopZodSchema), workShopController.updateWorkShop);

router.delete('/:id', auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN), workShopController.deleteWorkShop);

router.get('/:id', workShopController.getWorkShopById);

export const workShopRoutes = router;
