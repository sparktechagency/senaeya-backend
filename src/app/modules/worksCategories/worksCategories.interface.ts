export interface IworksCategories {
     image: string;
     title: string;
     description:string;
     createdAt: Date;
     updatedAt: Date;
     isDeleted: boolean;
     deletedAt?: Date;
}

export type IworksCategoriesFilters = {
     searchTerm?: string;
};
