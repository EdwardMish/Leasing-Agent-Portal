export interface NewRequest {
    description: string;
    category: string;
    propertyId: number;
    subcategory?: string;
    // Need a space OR an occupant
    occupantId?: number;
    // Spaces not implemented yet
    // spaceId?: number;
}
