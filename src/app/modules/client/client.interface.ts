import { Types } from 'mongoose';
import { CLIENT_TYPE } from './client.enum';

export interface IClient {
     providerWorkShopId: Types.ObjectId;
     clientType?: CLIENT_TYPE;
     clientId?: string;
     contact: string;
     document: string; // ref: Document
     cars: Types.ObjectId[]; // servicetaken for as client ref: Car
     invoices: Types.ObjectId[]; // service taken for as client ref: Invoice
     createdAt: Date;
     updatedAt: Date;
     isDeleted: boolean;
     deletedAt?: Date;
}

export type IClientFilters = {
     searchTerm?: string;
};
