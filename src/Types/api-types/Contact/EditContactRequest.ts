export interface EditContactRequest {
    id: number | string;
    name: string;
    email: string;
    occupantId: number | string;
    businessPhone?: string;
    mobilePhone?: string;
}
