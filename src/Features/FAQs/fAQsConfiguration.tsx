import * as React from 'react';

import { RouteNavigationConfiguration } from '../../Core/Types/RouteNavigationConfiguration';
import Page from './Pages';

const fAQsConfiguration: RouteNavigationConfiguration = {
    name: 'FAQs',
    navigation: {
        main: {
            text: 'FAQs',
            route: {
                url: '/faqs',
                pageRoot: <Page />,
            },
            isAllowed: (): boolean => true,
        },
    },
    disableFeature: [],
};

export default fAQsConfiguration;
