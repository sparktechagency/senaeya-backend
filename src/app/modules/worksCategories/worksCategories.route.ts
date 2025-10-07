import express from 'express';
import { worksCategoriesController } from './worksCategories.controller';
import auth from '../../middleware/auth';
import fileUploadHandler from '../../middleware/fileUploadHandler';
import parseFileData from '../../middleware/parseFileData';
import { FOLDER_NAMES } from '../../../enums/files';
import validateRequest from '../../middleware/validateRequest';
import { worksCategoriesValidation } from './worksCategories.validation';
import { USER_ROLES } from '../../../enums/user';

const router = express.Router();

router.post('/', auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    fileUploadHandler(),
    parseFileData(FOLDER_NAMES.IMAGE),
    validateRequest(worksCategoriesValidation.createWorksCategoriesZodSchema), worksCategoriesController.createWorksCategories);

router.get('/', worksCategoriesController.getAllWorksCategoriess);

router.get('/unpaginated', worksCategoriesController.getAllUnpaginatedWorksCategoriess);

router.delete('/hard-delete/:id', auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN), worksCategoriesController.hardDeleteWorksCategories);

router.patch('/:id', fileUploadHandler(),
    parseFileData(FOLDER_NAMES.IMAGE), auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    validateRequest(worksCategoriesValidation.updateWorksCategoriesZodSchema), worksCategoriesController.updateWorksCategories);

router.delete('/:id', auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN), worksCategoriesController.deleteWorksCategories);

router.get('/:id', worksCategoriesController.getWorksCategoriesById);

export const worksCategoriesRoutes = router;
