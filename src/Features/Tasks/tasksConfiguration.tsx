import React from 'react';
import { RouteNavigationConfiguration } from '../../Core/Types/RouteNavigationConfiguration';
import { Tasks } from '../../Icons';
import { CurrentUser } from '../../State/CurrentUser/Types';
import { userIsTenant } from '../../utils/Users';

const taskConfiguration: RouteNavigationConfiguration = {
    name: 'Tasks',
    navigation: {
        top: {
            text: 'Tasks',
            icon: <Tasks aspect="1.5" />,
            isAllowed: (user: CurrentUser): boolean => userIsTenant(user),
        },
    },

    disableFeature: [],
};

export default taskConfiguration;
