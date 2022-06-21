import { CurrentUser } from '../../../State/CurrentUser/Types';

import { UserRoles, UserRolesDisplayName } from '../../../Types/User/UserRoles';

import { userHasRoles } from '../../../utils/Users/userHasRoles';

import { DashboardLink } from '../Types/DashboardLink';

import { NounIconChat, NounIconSubmit, NounNewRequest, NounNews, NounNewInspection } from '../../../Icons';

const getOOLinks = (user: CurrentUser): DashboardLink[] => {
    let linksForUser: DashboardLink[] = [
        {
            text: 'Create a Request',
            url: '/requests/create',
            Icon: NounIconChat,
        },
        {
            text: 'View All News',
            url: '/communications/news',
            Icon: NounNews,
        },
        {
            text: 'View New Requests',
            url: '/requests/new',
            Icon: NounNewRequest,
        },
    ];

    if (
        userHasRoles(user, [
            {
                id: UserRoles.OOSalesCoordinator,
                name: UserRolesDisplayName[UserRoles.OOSalesCoordinator],
            },
        ])
    ) {
        linksForUser.push({
            text: 'View All Sales',
            url: '/sales',
            Icon: NounIconSubmit,
        });
    }

    if (
        userHasRoles(user, [
            {
                id: UserRoles.OOPropertyManager,
                name: UserRolesDisplayName[UserRoles.OOPropertyManager],
            },
        ])
    ) {
        linksForUser.push({
            text: 'Create Inspection',
            url: '/app/inspections',
            Icon: NounNewInspection,
        });
    }

    return linksForUser;
};

export default getOOLinks;
