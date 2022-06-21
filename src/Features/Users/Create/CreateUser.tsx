import * as React from 'react';
import { Title } from 'Shared/PageElements';
import { PageWrapper } from '../../../Shared/PageWrapper';
import { Route } from '../../../Types';
import { CreateUserForm } from './CreateUserForm';

const routes: Route[] = [{ target: '/users', display: 'Users' }];

const breadCrumbs = {
    current: 'Create User',
    routes,
};

export const CreateUser: React.FC<{}> = () => (
    <PageWrapper pageTitle="Users | Create" breadCrumbs={breadCrumbs}>
        <Title title="Create User" />
        <CreateUserForm />
    </PageWrapper>
);
