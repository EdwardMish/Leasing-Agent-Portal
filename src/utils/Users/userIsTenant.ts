import { CurrentUser } from '../../State/CurrentUser/Types';
import { UserTypes } from '../../Types';

export const userIsTenant = (user: CurrentUser): boolean => !!user
    && user.hasOwnProperty('userType')
    && user.userType === UserTypes.Tenant;
