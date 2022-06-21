import { ActiveLeaseApplication } from './ActiveLeaseApplication';

export interface ExistingGuarantor {
    id: number;
    name: string;
    validUserType: boolean;
    activeLeaseApplication?: ActiveLeaseApplication;
}
