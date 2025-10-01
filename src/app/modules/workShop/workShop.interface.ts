import { Types } from "mongoose";

export interface IworkShop {
     image: string;
     title: string;
     memberId: Types.ObjectId | null;
     description:string;
     createdAt: Date;
     updatedAt: Date;
     isDeleted: boolean;
     deletedAt?: Date;
}

export type IworkShopFilters = {
     searchTerm?: string;
};
