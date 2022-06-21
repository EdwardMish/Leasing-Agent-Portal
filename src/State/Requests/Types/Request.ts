import { Subcategory } from '../Types';
import { RequestUserSummary } from './RequestUserSummary'

export interface Request {
    assignedTo: RequestUserSummary | null;
    category: {
        id: string;
        name: string;
    };
    createdBy: RequestUserSummary;
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
    subcategory: Subcategory | null;
}