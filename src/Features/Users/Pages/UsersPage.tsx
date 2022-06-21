import * as React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';

import { CreateUser } from '../Create/CreateUser';
import { UserDetails } from '../Details/UserDetails';
import { UsersList } from '../UsersList';

export const UsersPage: React.FC<{}> = () => {
    const { path } = useRouteMatch();

    return (
        <>
            <Switch>
                <Route exact path={`${path}/create`}>
                    <CreateUser />
                </Route>
                <Route exact path={`${path}/details/:userId`}>
                    <UserDetails />
                </Route>
                <Route path={path}>
                    <UsersList />
                </Route>
            </Switch>
        </>
    );
};
