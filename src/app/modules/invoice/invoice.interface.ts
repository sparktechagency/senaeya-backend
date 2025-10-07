import { Types } from 'mongoose';

export interface Iinvoice {
     client: Types.ObjectId;
     providerWorkShopId: Types.ObjectId;
     image: string;
     title: string;
     description: string;
     createdAt: Date;
     updatedAt: Date;
     isDeleted: boolean;
     deletedAt?: Date;
}

export type IinvoiceFilters = {
     searchTerm?: string;
};
