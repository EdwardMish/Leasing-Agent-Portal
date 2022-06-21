export interface CategoryResponse {
    id: string;
    name: string;
    subCategories: {
        id: string;
        name: string;
    }[];
}
