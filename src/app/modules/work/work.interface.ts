import { Types } from 'mongoose';

export interface Iwork {
     title: string;
     worksCategories: Types.ObjectId;
     code: string;
     cost: number;
     createdAt: Date;
     updatedAt: Date;
     isDeleted: boolean;
     deletedAt?: Date;
}

export type IworkFilters = {
     searchTerm?: string;
};
