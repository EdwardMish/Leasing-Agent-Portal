import useLeasingLead from 'Features/Leasing/Main/Components/Hooks/useLeasingLead';
import LeadsDetails from 'Features/Leasing/Main/Components/LeadsDetails';
import React from 'react';
import { useParams } from 'react-router-dom';
import { LoadingContent } from 'Shared/PageElements';
import { PageWrapper } from 'Shared/PageWrapper';
import { Route } from 'Types/Route';

function LeadsPage(): React.ReactElement {
    const { leadId: leadIdString } = useParams<{ leadId: string }>();

    const leadId = parseInt(leadIdString, 10);

    const { leasingLead, loading } = useLeasingLead(leadId);

    const routes: Route[] = [{ target: '/leasing', display: 'Leasing' }];

    const breadCrumbs = {
        current: `Lead Details | ${leasingLead?.name || ''}`,
        routes,
    };

    return (
        <PageWrapper pageTitle="Leasing | Lead Details" breadCrumbs={breadCrumbs}>
            {!loading && !!leasingLead ? (
                <LeadsDetails leasingLead={leasingLead} />
            ) : (
                <LoadingContent message="Loading Leasing Lead Details" />
            )}
        </PageWrapper>
    );
}

export default LeadsPage;
