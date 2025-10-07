export interface IcarBrand {
     image: string;
     title: string;
     country:string;
     description?:string;
     createdAt: Date;
     updatedAt: Date;
     isDeleted: boolean;
     deletedAt?: Date;
}

export type IcarBrandFilters = {
     searchTerm?: string;
};
