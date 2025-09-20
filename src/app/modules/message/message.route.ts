import express from 'express';
import { messageController } from './message.controller';
import auth from '../../middleware/auth';
import fileUploadHandler from '../../middleware/fileUploadHandler';
import parseFileData from '../../middleware/parseFileData';
import { FOLDER_NAMES } from '../../../enums/files';
import validateRequest from '../../middleware/validateRequest';
import { messageValidation } from './message.validation';
import { USER_ROLES } from '../../../enums/user';

const router = express.Router();

router.post('/', auth(USER_ROLES.WORKSHOP_MEMBER, USER_ROLES.WORKSHOP_OWNER), validateRequest(messageValidation.createMessageZodSchema), messageController.createMessage);

router.get('/', auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN), messageController.getAllMessages);

router.get('/unpaginated', auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN), messageController.getAllUnpaginatedMessages);

router.delete('/hard-delete/:id', auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN), messageController.hardDeleteMessage);

// router.patch('/:id', auth(USER_ROLES.WORKSHOP_MEMBER, USER_ROLES.WORKSHOP_OWNER),
//     validateRequest(messageValidation.updateMessageZodSchema), messageController.updateMessage);

router.delete('/:id', auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN), messageController.deleteMessage);

router.get('/:id', auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN), messageController.getMessageById);

export const messageRoutes = router;
