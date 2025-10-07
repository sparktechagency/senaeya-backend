export interface IcarBrandCountries {
     image: string;
     title: string;
     description:string;
     createdAt: Date;
     updatedAt: Date;
     isDeleted: boolean;
     deletedAt?: Date;
}

export type IcarBrandCountriesFilters = {
     searchTerm?: string;
};
