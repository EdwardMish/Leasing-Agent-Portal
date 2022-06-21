import AddGuarantorPage from 'Features/Leasing/Main/Pages/AddGuarantorPage';
import CreateLeadPage from 'Features/Leasing/Main/Pages/CreateLeadPage';
import LeadsPage from 'Features/Leasing/Main/Pages/LeadsPage';
import LeasingPage from 'Features/Leasing/Main/Pages/LeasingPage';
import PersonalApplicationPage from 'Features/Leasing/Main/Pages/PersonalApplicationPage';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

export const BASE_ROUTE = '/leasing/leads';

const LEASING_ROUTES = {
    CREATE_LEAD: `${BASE_ROUTE}/create`,
    LEAD_DETAILS: `${BASE_ROUTE}/:leadId`,
    ADD_GUARANTOR: `${BASE_ROUTE}/:leadId/add-guarantor`,
    GUARANTOR_APPLICATION: `${BASE_ROUTE}/:leadId/guarantors/:applicationId`,
};

const Page: React.FC = (): React.ReactElement => (
    <Switch>
        <Route exact path={`${LEASING_ROUTES.CREATE_LEAD}`}>
            <CreateLeadPage />
        </Route>
        <Route exact path={`${LEASING_ROUTES.LEAD_DETAILS}`}>
            <LeadsPage />
        </Route>
        <Route exact path={`${LEASING_ROUTES.ADD_GUARANTOR}`}>
            <AddGuarantorPage />
        </Route>
        <Route path={`${LEASING_ROUTES.GUARANTOR_APPLICATION}`}>
            <PersonalApplicationPage />
        </Route>
        <Route path="/leasing">
            <LeasingPage />
        </Route>
    </Switch>
);

export default Page;
