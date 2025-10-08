import { Types } from 'mongoose';
import { WorkType } from './work.enum';

export interface Iwork {
     title: string;
     worksCategories: Types.ObjectId;
     type: WorkType | string; 
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
