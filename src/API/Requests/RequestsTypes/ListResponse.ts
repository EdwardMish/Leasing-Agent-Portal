import { RequestCategory } from 'Types/Requests/RequestCategory';
import { RequestStatus } from 'Types/Requests/RequestStatus';

export interface ListResponse {
    category: RequestCategory;
    createdDate: string;
    daysOpen: number;
    description: string;
    isOpen: boolean;
    name: string;
    occupantName: string;
    priority: string;
    propertyName: string;
    requestId: number;
    space: number;
    status: RequestStatus;
    assignedTo: {
        email: string;
        id: number;
        name: string;
    } | null;
    createdBy: {
        email: string;
        id: number;
        name: string;
    };
}
