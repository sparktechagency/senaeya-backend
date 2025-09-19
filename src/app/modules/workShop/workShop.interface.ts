export interface IworkShop {
     image: string;
     title: string;
     description:string;
     createdAt: Date;
     updatedAt: Date;
     isDeleted: boolean;
     deletedAt?: Date;
}

export type IworkShopFilters = {
     searchTerm?: string;
};
