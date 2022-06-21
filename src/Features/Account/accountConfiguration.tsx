import * as React from 'react';
import { RouteNavigationConfiguration } from '../../Core/Types/RouteNavigationConfiguration';
import Pages from './Pages';

const accountConfiguration: RouteNavigationConfiguration = {
    name: 'Account',
    navigation: {
        right: {
            text: 'Account',
            route: {
                url: '/account',
                pageRoot: <Pages.AccountPage />,
            },
            isAllowed: (): boolean => true,
        },
    },
    disableFeature: [],
};

export default accountConfiguration;
