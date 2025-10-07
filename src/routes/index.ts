import express from 'express';
import { UserRouter } from '../app/modules/user/user.route';
import { AuthRouter } from '../app/modules/auth/auth.route';
import SettingsRouter from '../app/modules/settings/settings.route';
import { messageRoutes } from '../app/modules/message/message.route';
import { workShopRoutes } from '../app/modules/workShop/workShop.route';
import { carBrandRoutes } from '../app/modules/carBrand/carBrand.route';
import { imageRoutes } from '../app/modules/image/image.route';
import { clientRoutes } from '../app/modules/client/client.route';

const router = express.Router();
const routes = [
     {
          path: '/auth',
          route: AuthRouter,
     },
     {
          path: '/users',
          route: UserRouter,
     },
     {
          path: '/settings',
          route: SettingsRouter,
     },
     {
          path: '/message',
          route: messageRoutes,
     },
     {
          path: '/workshops',
          route: workShopRoutes,
     },
     {
          path: '/car-brands',
          route: carBrandRoutes,
     },
     {
          path: '/images',
          route: imageRoutes,
     },
     {
          path: '/clients',
          route: clientRoutes,
     },
];

routes.forEach((element) => {
     if (element?.path && element?.route) {
          router.use(element?.path, element?.route);
     }
});

export default router;
