import express from 'express';
import { workController } from './work.controller';
import auth from '../../middleware/auth';
import fileUploadHandler from '../../middleware/fileUploadHandler';
import parseFileData from '../../middleware/parseFileData';
import { FOLDER_NAMES } from '../../../enums/files';
import validateRequest from '../../middleware/validateRequest';
import { workValidation } from './work.validation';
import { USER_ROLES } from '../../../enums/user';

const router = express.Router();

router.post(
     '/',
     auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
     validateRequest(workValidation.createWorkZodSchema),
     workController.createWork,
);

router.post(
     '/xlxs',
     auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
     fileUploadHandler(),
     parseFileData(FOLDER_NAMES.DOCUMENT),
     workController.createManyWorksByXLXS,
);

router.get('/', workController.getAllWorks);

router.get('/unpaginated', workController.getAllUnpaginatedWorks);

router.delete('/hard-delete/:id', auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN), workController.hardDeleteWork);

router.patch(
     '/:id',
     // fileUploadHandler(),
     // parseFileData(FOLDER_NAMES.DOCUMENT),
     auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
     validateRequest(workValidation.updateWorkZodSchema),
     workController.updateWork,
);

router.delete('/:id', auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN), workController.deleteWork);

router.get('/:id', workController.getWorkById);

export const workRoutes = router;
