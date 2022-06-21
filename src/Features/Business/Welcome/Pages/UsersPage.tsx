import * as React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import { CurrentUserState, Welcome } from '../../../../State';
import { ApplicationFeatures } from '../../../ApplicationFeatures';

import { AddUsers } from '../AddUsers';
import { TenantRoleNames } from '../TenantRoleNames';

import CreateUser from '../CreateUser';
import ManageUsers from '../Users/ManageUsers';

// Snippets
import UsersInvoicesSnippet from '../../../../Data/Snippets/UsersInvoicesSnippet';
import UsersRequestsSnippet from '../../../../Data/Snippets/UsersRequestsSnippet';
import UsersSalesSnippet from '../../../../Data/Snippets/UsersSalesSnippet';

export const UsersPage = () => {
    const currentUser: CurrentUserState.Types.CurrentUser = useSelector(
        CurrentUserState.selectors.currentUser,
    );

    return (
        <Switch>
            <Route path='/app/welcome/users/:feature/add-users'>
                <AddUsers />
            </Route>
            <Route path='/app/welcome/users/:feature/create-user'>
                <CreateUser />
            </Route>
            <Route path={`/app/welcome/users/${ApplicationFeatures.Sales}`}>
                <ManageUsers
                    feature={ApplicationFeatures.Sales}
                    header='Sales'
                    title='Who will be handling sales submissions for your business?'
                    nextRoute={`/app/welcome/users/${ApplicationFeatures.Invoices}`}
                    roleName={TenantRoleNames.Sales}
                    showUser={(o: Welcome.Types.TenantUser) =>
                        o.enabled &&
                        o.id !== currentUser.id &&
                        o.roles.some((role) => role.name === TenantRoleNames.Admin)
                    }
                    Snippet={<UsersSalesSnippet />}
                />
            </Route>
            <Route path={`/app/welcome/users/${ApplicationFeatures.Invoices}`}>
                <ManageUsers
                    feature={ApplicationFeatures.Invoices}
                    header='Invoices'
                    title='Who will be handling invoices for your business?'
                    nextRoute={`/app/welcome/users/${ApplicationFeatures.Requests}`}
                    roleName={TenantRoleNames.Accounting}
                    showUser={(o: Welcome.Types.TenantUser) =>
                        o.enabled &&
                        o.id !== currentUser.id &&
                        o.roles.some((role) => role.name === TenantRoleNames.Admin)
                    }
                    Snippet={<UsersInvoicesSnippet />}
                />
            </Route>
            <Route path={`/app/welcome/users/${ApplicationFeatures.Requests}`}>
                <ManageUsers
                    feature={ApplicationFeatures.Requests}
                    header='Communications'
                    title='Is there anyone else who you would like to provide access to DashComm?'
                    nextRoute='/app/welcome/checklist'
                    roleName={TenantRoleNames.Basic}
                    showUser={(o: Welcome.Types.TenantUser) => true}
                    createOnly
                    Snippet={<UsersRequestsSnippet />}
                />
            </Route>
            <Redirect
                exact
                from='/app/welcome/users'
                to={`/app/welcome/users/${ApplicationFeatures.Sales}`}
            />
        </Switch>
    );
};
