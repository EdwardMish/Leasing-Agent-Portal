import { CurrentUser } from '../../State/CurrentUser/Types';
import { UserTypes } from '../../Types';

export const userIsOwnerOperator = (user: CurrentUser): boolean => !!user
    && user.hasOwnProperty('userType')
    && user.userType === UserTypes.OwnerOperator;
