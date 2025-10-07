import express from 'express';
import { invoiceController } from './invoice.controller';
import auth from '../../middleware/auth';
import fileUploadHandler from '../../middleware/fileUploadHandler';
import parseFileData from '../../middleware/parseFileData';
import { FOLDER_NAMES } from '../../../enums/files';
import validateRequest from '../../middleware/validateRequest';
import { invoiceValidation } from './invoice.validation';
import { USER_ROLES } from '../../../enums/user';

const router = express.Router();

router.post(
     '/',
     auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
     fileUploadHandler(),
     parseFileData(FOLDER_NAMES.IMAGE),
     validateRequest(invoiceValidation.createInvoiceZodSchema),
     invoiceController.createInvoice,
);

router.get('/', invoiceController.getAllInvoices);

router.get('/unpaginated', invoiceController.getAllUnpaginatedInvoices);

router.delete('/hard-delete/:id', auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN), invoiceController.hardDeleteInvoice);

router.patch(
     '/:id',
     fileUploadHandler(),
     parseFileData(FOLDER_NAMES.IMAGE),
     auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
     validateRequest(invoiceValidation.updateInvoiceZodSchema),
     invoiceController.updateInvoice,
);

router.delete('/:id', auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN), invoiceController.deleteInvoice);

router.get('/:id', invoiceController.getInvoiceById);

export const invoiceRoutes = router;
