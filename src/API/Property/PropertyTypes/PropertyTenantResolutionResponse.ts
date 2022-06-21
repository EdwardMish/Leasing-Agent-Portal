export interface PropertyTenantResolutionResponse {
    id: number;
    name: string;
    occupants: {
        id: number;
        name: string;
    }[];
}
