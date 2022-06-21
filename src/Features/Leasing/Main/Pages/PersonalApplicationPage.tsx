import CreateTask from 'Features/Leasing/Main/Pages/CreateTask';
import PersonalLeasingApplicationDetailsPage from 'Features/Leasing/Main/Pages/PersonalLeasingApplicationDetailsPage';
import PersonalLeasingApplicationSummaryPage from 'Features/Leasing/Main/Pages/PersonalLeasingApplicationSummaryPage';
import React from 'react';
import { Redirect, Route, Switch, useParams, useRouteMatch } from 'react-router-dom';

function PersonalApplicationPage(): JSX.Element {
    const { leadId: leadIdParam, applicationId: applicationIdParam } =
        useParams<{ leadId: string; applicationId: string }>();
    const applicationId = parseInt(applicationIdParam, 10);
    const leadId = parseInt(leadIdParam, 10);
    const { url } = useRouteMatch();

    return (
        <Switch>
            <Route path={`${url}/summary`}>
                <PersonalLeasingApplicationSummaryPage leadId={leadId} applicationId={applicationId} />
            </Route>
            <Route path={`${url}/activity`}>
                <PersonalLeasingApplicationDetailsPage leadId={leadId} applicationId={applicationId} />
            </Route>
            <Route path={`${url}/create-task`}>
                <CreateTask leadId={leadId} applicationId={applicationId} />
            </Route>
            <Redirect to={`${url}/activity`} />
        </Switch>
    );
}

export default PersonalApplicationPage;
