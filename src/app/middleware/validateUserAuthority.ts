import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import { WorkShop } from '../modules/workShop/workShop.model';
import { IUser } from '../modules/user/user.interface';

const validateUserAuthority = () => async (req: Request, res: Response, next: NextFunction) => {
     try {
          const user = req.user as IUser & { id: string };
          const { providerWorkShopId } = req.body;
          const workShop = await WorkShop.findById(providerWorkShopId).select('ownerId helperUserId');
          if (!workShop) {
               throw new Error('Workshop not found');
          }
          if (workShop.ownerId.toString() !== user!.id) {
               if (workShop.helperUserId!.toString() !== user!.id) {
                    throw new Error('You are not authorized to perform this action');
               }
          }
          next();
     } catch (error) {
          next(error);
     }
};

export default validateUserAuthority;
