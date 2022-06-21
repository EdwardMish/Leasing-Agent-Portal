import { CurrentUser } from '../../../State/CurrentUser/Types';

import { UserPermissions } from '../../../Types/User';

import { userHasPermissions } from '../../../utils/Users/userHasPermissions';

import { DashboardLink } from '../Types/DashboardLink';

import {
    NounIconChat,
    NounIconInvoice,
    NounIconLease,
    NounIconRoof,
    NounQuestionMark,
    NounIconSubmit,
} from '../../../Icons';

const getTenantLinks = (user: CurrentUser): DashboardLink[] => {
    let linksForUser: DashboardLink[] = [];

    if (userHasPermissions(user, [UserPermissions.CreateUpdateRequests])) {
        linksForUser.push(
            {
                text: 'Submit A Roof Leak',
                url: '/requests/create?category=roofing',
                Icon: NounIconRoof,
            },
            {
                text: 'Create a Request',
                url: '/requests/create',
                Icon: NounIconChat,
            },
        );
    }

    if (userHasPermissions(user, [UserPermissions.ViewInvoices])) {
        linksForUser.push(
            {
                text: 'Invoice Question',
                url: '/requests/create?category=billing',
                Icon: NounQuestionMark,
            },
            {
                text: 'Pay My Invoice',
                url: '/invoices',
                Icon: NounIconInvoice,
            },
        );
    }

    if (userHasPermissions(user, [UserPermissions.SubmitSales])) {
        linksForUser.push({
            text: 'Submit Sales',
            url: '/sales',
            Icon: NounIconSubmit,
        });
    }

    if (userHasPermissions(user, [UserPermissions.ViewDocuments])) {
        linksForUser.push({
            text: 'View Lease',
            url: '/documents',
            Icon: NounIconLease,
        });
    }

    return linksForUser;
};

export default getTenantLinks;
