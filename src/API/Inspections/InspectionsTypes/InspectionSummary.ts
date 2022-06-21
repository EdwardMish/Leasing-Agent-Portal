export interface InspectionSummary {
    id: number;
    propertyId: number;
    propertyName: string;
    createdByName: string;
    createdDate: string;
    completedDate?: string;
    interactionCount: number;
    followUpCount: number;
}
