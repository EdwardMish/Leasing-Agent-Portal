import * as React from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import { Add } from 'Icons';

import { IconWithText } from 'Shared/PageElements';

import { Actions, Header, HeaderLink, LinksPanel, Tabs, Wrapper } from 'Shared/Tabs';

import { CurrentUserState } from 'State';

import { ActiveList } from './ActiveList';
import { WorkingList } from './WorkingList';
import { AllList } from './AllList';
import { ClosedList } from './ClosedList';
import { HistoryList } from './HistoryList';
import { ToDoList } from './ToDoList';
import { WatchingList } from './WatchingList';

const viewStates = {
    0: 'new',
    1: 'working',
    2: 'watching',
    3: 'all',
    4: 'history',

    // Tenant View States
    5: 'active',
    6: 'closed',
};

export const RequestList: React.FC<{}> = () => {
    let { url } = useRouteMatch();

    const isTenant: boolean = useSelector(CurrentUserState.selectors.currentUserIsTenant);

    const tenantTabs = [
        { name: 'Active', link: `${url}/${viewStates[5]}` },
        { name: 'Closed', link: `${url}/${viewStates[6]}` },
    ];

    const ooTabs = [
        { name: 'New', link: `${url}/${viewStates[0]}` },
        { name: 'Working', link: `${url}/${viewStates[1]}` },
        { name: 'Watching', link: `${url}/${viewStates[2]}` },
        { name: 'All', link: `${url}/${viewStates[3]}` },
        { name: 'My History', link: `${url}/${viewStates[4]}` },
    ];

    return (
        <>
            <h1>Requests</h1>
            {isTenant ? (
                <>
                    <Tabs>
                        <Header style={{ marginBottom: '1rem' }}>
                            {tenantTabs.map(({ name, link }) => (
                                <HeaderLink key={`tab-header-item-tenant-${name}`} name={name} link={link} />
                            ))}
                        </Header>
                        <LinksPanel>
                            <Switch>
                                <Route exact path={`${url}/${viewStates[5]}`}>
                                    <ActiveList sharedStoreId="requests" />
                                </Route>
                                <Route exact path={`${url}/${viewStates[6]}`}>
                                    <ClosedList sharedStoreId="requests" />
                                </Route>
                                <Redirect from={url} to={`${url}/${viewStates[5]}`} />
                            </Switch>
                        </LinksPanel>
                        <Actions>
                            <Wrapper actionid="create-request">
                                <Link to="/requests/create">
                                    <IconWithText text="Create Request" Icon={Add} />
                                </Link>
                            </Wrapper>
                        </Actions>
                    </Tabs>
                </>
            ) : (
                <>
                    <Tabs>
                        <Header style={{ marginBottom: '1rem' }}>
                            {ooTabs.map(({ name, link }) => (
                                <HeaderLink key={`tab-header-item-oo-${name}`} name={name} link={link} />
                            ))}
                        </Header>
                        <LinksPanel>
                            <Switch>
                                <Route exact path={`${url}/${viewStates[0]}`}>
                                    <ToDoList sharedStoreId="requests" />
                                </Route>
                                <Route exact path={`${url}/${viewStates[1]}`}>
                                    <WorkingList sharedStoreId="requests" />
                                </Route>
                                <Route exact path={`${url}/${viewStates[2]}`}>
                                    <WatchingList sharedStoreId="requests" />
                                </Route>
                                <Route exact path={`${url}/${viewStates[3]}`}>
                                    <AllList sharedStoreId="requests" />
                                </Route>
                                <Route exact path={`${url}/${viewStates[4]}`}>
                                    <HistoryList sharedStoreId="requests" />
                                </Route>
                                <Redirect from={url} to={`${url}/${viewStates[0]}`} />
                            </Switch>
                        </LinksPanel>
                        <Actions>
                            <Wrapper actionid="create-request">
                                <Link to="/requests/create">
                                    <IconWithText text="Create Request" Icon={Add} />
                                </Link>
                            </Wrapper>
                        </Actions>
                    </Tabs>
                </>
            )}
        </>
    );
};

