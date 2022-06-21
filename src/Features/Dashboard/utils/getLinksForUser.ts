import { CurrentUser } from '../../../State/CurrentUser/Types';

import { userIsTenant } from '../../../utils/Users/userIsTenant';

import getOOLinks from './getOOLinks';
import getTenantLinks from './getTenantLinks';

import { DashboardLink } from '../Types/DashboardLink';

export const getLinksForUser = (user: CurrentUser): DashboardLink[] => {
    if (userIsTenant(user)) return getTenantLinks(user);

    return getOOLinks(user);
};
