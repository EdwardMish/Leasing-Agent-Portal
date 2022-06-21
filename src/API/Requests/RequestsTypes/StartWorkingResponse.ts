export interface AssignedUser {
    id: number;
    name: string;
    email: string;
}

export interface StartWorkingResponse {
    success: boolean;
    assignedTo: AssignedUser;
}
