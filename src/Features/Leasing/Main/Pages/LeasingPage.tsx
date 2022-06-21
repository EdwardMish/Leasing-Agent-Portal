import { LeasingLeadStatus } from 'API/Leasing/Types/LeasingLead';
import LeasingLeads from 'Features/Leasing/Main/Components/LeasingLeads';
import * as React from 'react';
import { Link, Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Add } from '../../../../Icons';
import { IconWithText } from '../../../../Shared/PageElements';
import { PageWrapper } from '../../../../Shared/PageWrapper';
import { Actions, Header, HeaderLink, LinksPanel, Tabs, Wrapper } from '../../../../Shared/Tabs';

const LeasingPage: React.FC = (): React.ReactElement => {
    const { url } = useRouteMatch();

    return (
        <PageWrapper pageTitle="Leasing | Leads">
            <h1>Leasing Leads</h1>
            <Tabs>
                <Header>
                    <HeaderLink name="In Progress" link={`${url}/in-progress`} />
                    <HeaderLink name="Completed" link={`${url}/completed`} />
                    <HeaderLink name="Canceled" link={`${url}/canceled`} />
                </Header>
                <LinksPanel>
                    <Switch>
                        <Route exact path="/leasing/in-progress">
                            <LeasingLeads />
                        </Route>
                        <Route exact path="/leasing/completed">
                            <LeasingLeads status={LeasingLeadStatus.COMPLETED} />
                        </Route>
                        <Route exact path="/leasing/canceled">
                            <LeasingLeads status={LeasingLeadStatus.CANCELED} />
                        </Route>
                        <Redirect from={url} to={`${url}/in-progress`} />
                    </Switch>
                </LinksPanel>
                <Actions>
                    <Wrapper actionid="link-to-leasing-app">
                        <Link to="/leasing/leads/create">
                            <IconWithText text="Create Lead" Icon={Add} />
                        </Link>
                    </Wrapper>
                </Actions>
            </Tabs>
        </PageWrapper>
    );
};

export default LeasingPage;

