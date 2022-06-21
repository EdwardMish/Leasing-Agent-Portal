import * as React from 'react';

import { RouteNavigationConfiguration } from '../../Core/Types/RouteNavigationConfiguration';
import { CurrentUser } from '../../State/CurrentUser/Types/CurrentUser';

import { userIsTenant } from '../../utils/Users';

import NewsPage from './Pages/NewsPage';

const newsConfiguration: RouteNavigationConfiguration = {
    name: 'News',
    navigation: {
        main: {
            text: 'News',
            route: {
                url: '/news',
                pageRoot: <NewsPage />,
            },
            isAllowed: (currentUser: CurrentUser) => userIsTenant(currentUser),
        },
    },
    disableFeature: [],
};

export default newsConfiguration;
