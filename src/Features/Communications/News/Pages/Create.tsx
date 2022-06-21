import * as React from 'react';

import { Route } from '../../../../Types';

import { PageWrapper } from '../../../../Shared/PageWrapper';

import CreateNews from '../Create/CreateNews';

const routes: Route[] = [{ target: '/communications/news', display: 'Communications' }];

const breadCrumbs = {
    current: 'Create News',
    routes,
};

const CreateNewsPage: React.FC = (): React.ReactElement => (
    <PageWrapper breadCrumbs={breadCrumbs} pageTitle="Create News">
        <CreateNews />
    </PageWrapper>
);

export default CreateNewsPage;
