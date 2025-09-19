import { Router } from 'express';
import { ChatController } from './chat.controller';
import auth from '../../middleware/auth';
import { USER_ROLES } from '../../../enums/user';

const router = Router();

// Existing routes
router.get(
  '/',
  auth(
    USER_ROLES.ADMIN,
    USER_ROLES.SUPER_ADMIN,
    USER_ROLES.WORKSHOP_OWNER,
  ),
  ChatController.getChats,
);
router.post(
  '/create-chat',
  auth(
    USER_ROLES.ADMIN,
    USER_ROLES.SUPER_ADMIN,
    USER_ROLES.WORKSHOP_OWNER,
  ),
  ChatController.createChat,
);
router.patch(
  '/mark-chat-as-read/:id',
  auth(
    USER_ROLES.ADMIN,
    USER_ROLES.SUPER_ADMIN,
    USER_ROLES.WORKSHOP_OWNER,
  ),
  ChatController.markChatAsRead,
);
router.delete(
  '/delete/:chatId',
  auth(
    USER_ROLES.ADMIN,
    USER_ROLES.SUPER_ADMIN,
    USER_ROLES.WORKSHOP_OWNER,
  ),
  ChatController.deleteChat,
);

// New routes for additional features
router.patch(
  '/mute-unmute/:chatId',
  auth(
    USER_ROLES.ADMIN,
    USER_ROLES.SUPER_ADMIN,
    USER_ROLES.WORKSHOP_OWNER,
  ),
  ChatController.muteUnmuteChat,
);
router.patch(
  '/block-unblock/:chatId/:targetUserId',
  auth(
    USER_ROLES.ADMIN,
    USER_ROLES.SUPER_ADMIN,
    USER_ROLES.WORKSHOP_OWNER,
  ),
  ChatController.blockUnblockUser,
);

export const chatRoutes = router;
