import React from 'react';
import { useRouteMatch, Redirect, Route, Switch } from 'react-router-dom';

import CustomTask from './CreateCustomTask';
import CommanTask from './CreateCommonTasks';

import { Description } from 'Shared/PageElements';
import Title from 'Shared/PageElements/Title';
import { PageWrapper } from 'Shared/PageWrapper';
import { Header, HeaderLink, LinksPanel, Tabs } from 'Shared/Tabs';
import { Route as RouteLink } from 'Types/Route';

interface Properties {
    leadId: number;
    applicationId: number;
}

function CreateTask({ leadId, applicationId }: Properties): JSX.Element {
    const { url } = useRouteMatch();

    const routes: RouteLink[] = [
        { target: '/leasing', display: 'Leasing' },
        { target: `/leasing/leads/${leadId}`, display: 'Lead Details' },
        { target: `/leasing/leads/${leadId}/guarantors/${applicationId}/activity/`, display: 'Profile Activity' },
    ];

    const breadCrumbs = {
        current: 'Create Custom Task',
        routes,
    };

    return (
        <PageWrapper breadCrumbs={breadCrumbs} pageTitle={`Leasing | Lead (${leadId || ''}) | Create Custom Task`}>
            <main>
                <Title title="Add Task" />
                <div>
                    <Description>
                        If you would like the applicant to complete additional tasks or answer explicit questions, then you
                        can select from the shortcut list or create a custom task.
                    </Description>
                </div>
                <Tabs>
                    <Header style={{ margin: '1rem 0' }}>
                        <HeaderLink key="task-shortcuts" name="Task Shortcuts" link={`${url}/common`} />
                        <HeaderLink key="custom-task" name="Create Custom Task" link={`${url}/custom`} />
                    </Header>

                    <LinksPanel>
                        <Switch>
                            <Route exact path={`${url}/common`}>
                                <CommanTask leadId={leadId} applicationId={applicationId} />
                            </Route>
                            <Route exact path={`${url}/custom`}>
                                <CustomTask leadId={leadId} applicationId={applicationId} />
                            </Route>
                            <Redirect from={`${url}`} to={`${url}/common`} />
                        </Switch>
                    </LinksPanel>
                </Tabs>
            </main>
        </PageWrapper>
    );
}

export default CreateTask;
