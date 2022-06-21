export interface InspectionComment {
    id: number;
    createdDate: string;
    commenterName: string;
    noteText: string;
    parent?: number;
}
