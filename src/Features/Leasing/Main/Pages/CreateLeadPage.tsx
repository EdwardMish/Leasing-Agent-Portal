import CreateLeadForm from 'Features/Leasing/Main/Components/CreateLeadForm';
import * as React from 'react';
import { PageWrapper } from 'Shared/PageWrapper';
import { Route } from 'Types/Route';

const routes: Route[] = [{ target: '/leasing', display: 'Leasing' }];

const breadCrumbs = {
    current: 'Create Lead',
    routes,
};

const CreateLeadPage: React.FC = (): React.ReactElement => (
    <PageWrapper breadCrumbs={breadCrumbs} pageTitle="Create Lead">
        <CreateLeadForm />
    </PageWrapper>
);

export default CreateLeadPage;

