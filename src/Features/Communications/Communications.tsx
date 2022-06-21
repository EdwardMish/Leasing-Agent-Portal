import * as React from 'react';
import { Link, Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectors } from 'State/CurrentUser';

import { UserRoles } from 'Types';

import { userRole } from 'utils/Users';

import { Add } from 'Icons';

import { Tabs, Header, HeaderLink, LinksPanel, Actions, Wrapper } from 'Shared/Tabs';
import { PageWrapper } from 'Shared/PageWrapper';
import { IconWithText } from 'Shared/PageElements';

import Alerts from './Alerts/Pages/List';
import News from './News/Pages/NewsPage';

const Communications: React.FC<{}> = () => {
    const { url } = useRouteMatch();

    const canAccess: boolean = useSelector(
        selectors.currentUserHasRoles([userRole(UserRoles.OOAdmin), userRole(UserRoles.OOPropertyManager)]),
    );

    return (
        <PageWrapper pageTitle="Communications">
            <h1>Communications</h1>
            <Tabs>
                <Header>
                    <HeaderLink name="News" link={`${url}/news`} />
                    <HeaderLink name="Alerts" link={`${url}/alerts`} />
                </Header>
                <LinksPanel>
                    <div style={{ padding: '1rem 0' }}>
                        <Switch>
                            <Route exact path="/communications/alerts">
                                <Alerts />
                            </Route>
                            <Route exact path="/communications/news">
                                <News />
                            </Route>
                            <Redirect path="/communications" to="/communications/news" />
                        </Switch>
                    </div>
                </LinksPanel>
                <Actions>
                    <Wrapper actionid="create-news">
                        <Link to="/communications/news/create">
                            <IconWithText text="Create News" Icon={Add} iconOnLeft />
                        </Link>
                    </Wrapper>
                    <Wrapper actionid="create-alert" shouldhide={() => !canAccess}>
                        <Link to="/communications/alerts/create">
                            <IconWithText text="Create Alert" Icon={Add} iconOnLeft />
                        </Link>
                    </Wrapper>
                </Actions>
            </Tabs>
        </PageWrapper>
    );
};

export default Communications;
