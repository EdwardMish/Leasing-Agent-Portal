import * as React from 'react';

import { RouteNavigationConfiguration } from '../../Core/Types/RouteNavigationConfiguration';
import { MessageCircle } from '../../Icons';

const conversationsConfiguration: RouteNavigationConfiguration = {
    name: 'Conversations',
    navigation: {
        top: {
            text: 'Conversations',
            icon: <MessageCircle />,
            isAllowed: (): boolean => true,
        },
    },
    disableFeature: [],
};

export default conversationsConfiguration;
