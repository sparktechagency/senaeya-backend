import express from 'express';
import { imageController } from './image.controller';
import auth from '../../middleware/auth';
import fileUploadHandler from '../../middleware/fileUploadHandler';
import parseFileData from '../../middleware/parseFileData';
import { FOLDER_NAMES } from '../../../enums/files';
import validateRequest from '../../middleware/validateRequest';
import { imageValidation } from './image.validation';
import { USER_ROLES } from '../../../enums/user';

const router = express.Router();

router.post(
     '/',
     auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
     fileUploadHandler(),
     parseFileData(FOLDER_NAMES.IMAGE),
     validateRequest(imageValidation.createImageZodSchema),
     imageController.createImage,
);

router.get('/get/:id', imageController.getImageById);
router.get('/:type', imageController.getAllImages);

router.get('/unpaginated/:type', imageController.getAllUnpaginatedImages);

router.delete('/hard-delete/:id', auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN), imageController.hardDeleteImage);

router.patch(
     '/:id',
     fileUploadHandler(),
     parseFileData(FOLDER_NAMES.IMAGE),
     auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
     validateRequest(imageValidation.updateImageZodSchema),
     imageController.updateImage,
);

router.delete('/:id', auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN), imageController.deleteImage);


export const imageRoutes = router;
