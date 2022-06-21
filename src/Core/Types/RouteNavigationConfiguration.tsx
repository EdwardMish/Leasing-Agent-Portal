import * as React from 'react';

import { CurrentUser } from '../../State/CurrentUser/Types';

export interface RouteNavigationConfiguration {
    name: string;
    application?: {
        url: string;
        PageRoot: React.ReactElement;
        LeftHeaderComponent?: React.ReactElement;
        RightHeaderComponent?: React.ReactElement;
        isAllowed: (user: CurrentUser) => boolean;
    };
    navigation: {
        main?: {
            text: string;
            route: {
                url: string;
                pageRoot: React.ReactElement;
            };
            // eslint-disable-next-line no-unused-vars
            isAllowed: (user: CurrentUser) => boolean;
        };
        right?: {
            text: string;
            route: {
                url: string;
                pageRoot: React.ReactElement;
            };
            // eslint-disable-next-line no-unused-vars
            isAllowed: (user: CurrentUser) => boolean;
        };
        top?: {
            text: string;
            icon: React.ReactElement;
            isAllowed: (user: CurrentUser) => boolean;
        };
    };
    disableFeature: Array<'application' | 'main' | 'right' | 'top'>;
}
