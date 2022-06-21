import { Role } from '../../../State/Shared/Types';

export interface LocationsOccupantUser {
    email: string;
    mobilePhoneNumber: string | null;
    enabled: boolean;
    id: number;
    lastLogon: string;
    name: string;
    requestsSubmitted: number;
    roles: Role[];
    hasInvitation: boolean;
}
