import * as React from 'react';
import { CurrentUser } from '../../State/CurrentUser/Types';

export interface AppRoute {
    url: string;
    displayName: string;
    pageRoot: React.ReactElement;
    isAllowed: (user: CurrentUser) => boolean;
    includeInMainNavigation: boolean;
    includeInRightPanel: boolean;
}
