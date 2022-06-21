import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import { Types } from '../State/CurrentUser';

import { configurations } from '../Features';

import { IsolatedLayout } from './Layouts';
import { RouteNavigationConfiguration } from './Types/RouteNavigationConfiguration';

interface IsolatedRoutesProps {
    currentUser: Types.CurrentUser;
}

const IsolatedRoutes: React.FC<IsolatedRoutesProps> = ({ currentUser }) => (
    <Switch>
        {configurations
            .filter((config: RouteNavigationConfiguration) => !config.disableFeature.includes('application'))
            .filter(
                (config: RouteNavigationConfiguration) => !!config.application && config.application.isAllowed(currentUser)
            )
            .map(({ application, name }) => (
                <Route path={application?.url || ''} key={`${name.toLowerCase().replace(' ', '-')}`}>
                    <IsolatedLayout
                        LeftHeaderComponent={application?.LeftHeaderComponent}
                        RightHeaderComponent={application?.RightHeaderComponent}
                    >
                        {application?.isAllowed(currentUser) ? application?.PageRoot || null : <Redirect to="/" />}
                    </IsolatedLayout>
                </Route>
            ))}
        <Redirect to="/" />
    </Switch>
);

export default IsolatedRoutes;
