import { ImageType } from './image.enum';
export interface Iimage {
     image: string;
     title?: string;
     type: ImageType;
     description?: string;
     createdAt: Date;
     updatedAt: Date;
     isDeleted: boolean;
     deletedAt?: Date;
}

export type IimageFilters = {
     searchTerm?: string;
};
