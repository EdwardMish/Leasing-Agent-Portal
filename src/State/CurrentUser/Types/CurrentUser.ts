import { OwnerOperatorUser, TenantUser, User } from '../../Shared/Types';

export interface CurrentUser extends User {
    tenant?: TenantUser;
    ownerOperator?: OwnerOperatorUser;
}
