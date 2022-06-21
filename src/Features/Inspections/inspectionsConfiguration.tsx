import * as React from 'react';

import { RouteNavigationConfiguration } from '../../Core/Types/RouteNavigationConfiguration';

import { CurrentUser } from '../../State/CurrentUser/Types/CurrentUser';
import { Role } from '../../State/Shared/Types';

import { UserRoles } from '../../Types/User/UserRoles';

import { userIsOwnerOperatorAndHasRoles } from '../../utils/Users';

import LeftHeaderComponent from './Application/LeftHeaderComponent';
import Page from './Application/Pages/Page';
import InspectionsPage from './Pages/InspectionsPage';

const inspectionsConfiguration: RouteNavigationConfiguration = {
    name: 'Inspections',
    application: {
        url: '/app/inspections',
        PageRoot: <Page />,
        LeftHeaderComponent: <LeftHeaderComponent />,
        isAllowed: (user: CurrentUser) =>
                userIsOwnerOperatorAndHasRoles(user, [{ id: UserRoles.OOPropertyManager } as Role]),
    },
    navigation: {
        main: {
            text: 'Inspections',
            route: {
                url: '/inspections',
                pageRoot: <InspectionsPage />,
            },
            isAllowed: (user: CurrentUser) =>
                userIsOwnerOperatorAndHasRoles(user, [{ id: UserRoles.OOPropertyManager } as Role]),
        },
    },
    disableFeature: [],
};

export default inspectionsConfiguration;
