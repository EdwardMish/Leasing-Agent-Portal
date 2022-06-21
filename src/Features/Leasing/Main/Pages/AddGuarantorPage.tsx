import AddGuarantorForm from 'Features/Leasing/Main/Components/AddGuarantorForm';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { PageWrapper } from 'Shared/PageWrapper';
import { Route } from 'Types/Route';

const AddGuarantorPage: React.FC = (): React.ReactElement => {
    const { leadId } = useParams<{ leadId: string }>();

    const routes: Route[] = [
        { target: '/leasing', display: 'Leasing' },
        { target: `/leasing/leads/${leadId}`, display: 'Lead' },
    ];

    const breadCrumbs = {
        current: 'Add Guarantor',
        routes,
    };

    return (
        <PageWrapper breadCrumbs={breadCrumbs} pageTitle="Add Guarantor">
            <AddGuarantorForm />
        </PageWrapper>
    );
};

export default AddGuarantorPage;

