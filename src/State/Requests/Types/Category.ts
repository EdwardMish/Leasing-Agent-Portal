import { Subcategory } from './Subcategory'

export interface Category {
    id: string;
    name: string;
    subcategories: Subcategory[]
}
