import * as React from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';

import { Actions, Header, HeaderLink, LinksPanel, Tabs, Wrapper } from '../../../Shared/Tabs';
import { Add } from '../../../Icons';
import { IconWithText } from '../../../Shared/PageElements';
import { PageWrapper } from '../../../Shared/PageWrapper';

import UsersListInvitesTable from './Invites';
import UsersListUsersTable from './Users';

const styles = require('./users-list.module.css');

export const UsersList = () => {
    const viewStates = {
        0: 'active',
        1: 'invitations',
    };

    const tabs = [
        { name: 'Users', link: `/users/${viewStates[0]}` },
        { name: 'Invitations', link: `/users/${viewStates[1]}` },
    ];

    return (
        <PageWrapper pageTitle='Users' className={styles.UsersList}>
            <h1>Users</h1>
            <Tabs>
                <Header style={{ marginBottom: '1rem' }}>
                    {tabs.map(({ name, link }) => (
                        <HeaderLink key={`tab-header-item-${name}`} name={name} link={link} />
                    ))}
                </Header>
                <LinksPanel>
                    <Switch>
                        <Route exact path={`/users/${viewStates[0]}`}>
                            <UsersListUsersTable />
                        </Route>
                        <Route exact path={`/users/${viewStates[1]}`}>
                            <UsersListInvitesTable />
                        </Route>
                        <Redirect from='/users' exact to={`/users/${viewStates[0]}`} />
                    </Switch>
                </LinksPanel>
                <Actions>
                    <Wrapper actionid='create-request'>
                        <Link to='/users/create'>
                            <IconWithText text='Create User' Icon={Add} />
                        </Link>
                    </Wrapper>
                </Actions>
            </Tabs>
        </PageWrapper>
    );
};
