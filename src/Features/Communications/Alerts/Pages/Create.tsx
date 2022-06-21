import * as React from 'react';

import { Route } from '../../../../Types';

import { PageWrapper } from '../../../../Shared/PageWrapper';

import CreateAlert from '../CreateAlert';

const routes: Route[] = [{ target: '/communications/alerts', display: 'Communications' }];

const breadCrumbs = {
    current: 'Create Alert',
    routes,
};

const CreateAlertPage: React.FC = (): React.ReactElement => (
    <PageWrapper breadCrumbs={breadCrumbs} pageTitle="Create Alert">
        <h1>Emergency Alert</h1>
        <CreateAlert />
    </PageWrapper>
);

export default CreateAlertPage;
