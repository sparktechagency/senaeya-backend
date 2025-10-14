import express from 'express';
import { paymentController } from './payment.controller';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { paymentValidation } from './payment.validation';
import { USER_ROLES } from '../../../enums/user';
import validateUserAuthority from '../../middleware/validateUserAuthority';

const router = express.Router();

router.post('/', auth(USER_ROLES.WORKSHOP_OWNER, USER_ROLES.WORKSHOP_MEMBER), validateUserAuthority(),
    validateRequest(paymentValidation.createPaymentZodSchema), paymentController.createPayment);

router.get('/', paymentController.getAllPayments);

router.get('/unpaginated', paymentController.getAllUnpaginatedPayments);

router.delete('/hard-delete/:id', auth(USER_ROLES.WORKSHOP_OWNER, USER_ROLES.WORKSHOP_MEMBER), validateUserAuthority(), paymentController.hardDeletePayment);

router.patch('/:id', auth(USER_ROLES.WORKSHOP_OWNER, USER_ROLES.WORKSHOP_MEMBER), validateUserAuthority(),
    validateRequest(paymentValidation.updatePaymentZodSchema), paymentController.updatePayment);

router.delete('/:id', auth(USER_ROLES.WORKSHOP_OWNER, USER_ROLES.WORKSHOP_MEMBER), validateUserAuthority(), paymentController.deletePayment);

router.get('/:id', paymentController.getPaymentById);

export const paymentRoutes = router;
