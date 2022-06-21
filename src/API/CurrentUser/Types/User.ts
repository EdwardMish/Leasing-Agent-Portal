import { OwnerOperator } from './OwnerOperator';
import { Tenant } from './Tenant';

export interface User {
    email: string;
    enabled: boolean;
    firstName: string;
    id: number;
    lastName: string;
    notificationTypes: string[];
    ownerOperator: OwnerOperator | null;
    tenant: Tenant | null;
    userType: string;
}
