import { WatcherResponse } from './WatcherResponse';

export interface RequestResponse {
    assignedTo: {
        email: string;
        id: number;
        name: string;
    } | null;
    category: {
        category: string;
        name: string;
    };
    createdBy: {
        email: string;
        id: number;
        name: string;
    };
    createdDate: string;
    description: string;
    id: number;
    occupantId: number;
    occupantName: string;
    priority: string;
    propertyId: number;
    propertyName: string;
    spaceName: string;
    status: string;
    subCategory: {
        subCategory: string;
        name: string;
    } | null;
    watchers: WatcherResponse[];
}
