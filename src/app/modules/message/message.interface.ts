export interface Imessage {
     message:string;
     name:string;
     contact:string;
     createdAt: Date;
     updatedAt: Date;
     isDeleted: boolean;
     deletedAt?: Date;
}

export type ImessageFilters = {
     searchTerm?: string;
};
