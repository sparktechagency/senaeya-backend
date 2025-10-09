import { Router } from 'express';
import { WebsiteLogoController } from './websiteLogo.controller';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middleware/auth';
import fileUploadHandler from '../../middleware/fileUploadHandler';
import validateUserAuthority from '../../middleware/validateUserAuthority';

const router = Router();
router.post('/upload', auth(USER_ROLES.WORKSHOP_MEMBER, USER_ROLES.WORKSHOP_OWNER), validateUserAuthority(), fileUploadHandler(), WebsiteLogoController.createOrUpdateLogo);

router.get('/', WebsiteLogoController.getLogo);

export const WebsiteLogoRoutes = router;
