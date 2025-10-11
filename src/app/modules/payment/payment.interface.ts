import { Types } from "mongoose";

export interface Ipayment {
     providerWorkShopId: Types.ObjectId;
     image: string;
     title: string;
     description:string;
     createdAt: Date;
     updatedAt: Date;
     isDeleted: boolean;
     deletedAt?: Date;
}

export type IpaymentFilters = {
     searchTerm?: string;
};
