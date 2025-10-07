export interface Iinvoice {
     image: string;
     title: string;
     description:string;
     createdAt: Date;
     updatedAt: Date;
     isDeleted: boolean;
     deletedAt?: Date;
}

export type IinvoiceFilters = {
     searchTerm?: string;
};
