import express from 'express';
import { clientController } from './client.controller';
import auth from '../../middleware/auth';
import fileUploadHandler from '../../middleware/fileUploadHandler';
import parseFileData from '../../middleware/parseFileData';
import { FOLDER_NAMES } from '../../../enums/files';
import validateRequest from '../../middleware/validateRequest';
import { clientValidation } from './client.validation';
import { USER_ROLES } from '../../../enums/user';

const router = express.Router();

router.post(
     '/',
     auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
     fileUploadHandler(),
     parseFileData(FOLDER_NAMES.DOCUMENT),
     validateRequest(clientValidation.createClientZodSchema),
     clientController.createClient,
);

router.get('/', clientController.getAllClients);

router.get('/unpaginated', clientController.getAllUnpaginatedClients);

router.delete('/hard-delete/:id', auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN), clientController.hardDeleteClient);

router.patch(
     '/:id',
     auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
     fileUploadHandler(),
     parseFileData(FOLDER_NAMES.DOCUMENT),
     validateRequest(clientValidation.updateClientZodSchema),
     clientController.updateClient,
);

router.delete('/:id', auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN), clientController.deleteClient);

router.get('/:id', clientController.getClientById);

export const clientRoutes = router;
