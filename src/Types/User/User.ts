import { Role } from '../../State/Shared/Types';
import { UserTypes } from './UserTypes';

// TODO: Transition to BaseUser from Business Information State
export interface User {
    userType: UserTypes;
    email: string;
    firstName: string;
    id: number;
    lastName: string;
    notificationTypes: string[];
    isEnabled: boolean;
    userTypeDisplay: string;
    isOwnerOperatorAdmin: boolean;
    roles: Role[];
}
