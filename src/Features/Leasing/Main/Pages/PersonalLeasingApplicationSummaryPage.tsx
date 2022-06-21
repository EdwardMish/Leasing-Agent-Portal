import { API as LeasingAPI } from 'API/Leasing';
import { PersonalLeaseApplication } from 'API/Leasing/Types';
import useLeasingLead from 'Features/Leasing/Main/Components/Hooks/useLeasingLead';
import ProfileSnapshot from 'Features/Leasing/Main/Components/ProfileSnapshot';
import ProfileSummaryTabContents from 'Features/Leasing/Main/Components/SummaryTabContents/ProfileSummaryTabContents';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { LoadingContent } from 'Shared/PageElements';
import { PageWrapper } from 'Shared/PageWrapper';
import { Header, HeaderLink, LinksPanel, Tabs } from 'Shared/Tabs';
import { globalMessageActionCreators } from 'State';
import { Route as RouteLink } from 'Types/Route';

interface Properties {
    leadId: number;
    applicationId: number;
}

function PersonalLeasingApplicationSummaryPage({ leadId, applicationId }: Properties): JSX.Element {
    const dispatch = useDispatch();
    const { url } = useRouteMatch();

    const [userDetails, setUserDetails] = React.useState<PersonalLeaseApplication>();
    const [loadingDetails, setLoadingDetails] = React.useState(true);

    const { leasingLead, loading: loadingLead } = useLeasingLead(leadId);

    React.useEffect(() => {
        LeasingAPI.getPersonalLeaseApplication(leadId, applicationId)
            .then((res: PersonalLeaseApplication) => {
                setUserDetails(res);
                setLoadingDetails(false);
            })
            .catch((err) =>
                dispatch(globalMessageActionCreators.addErrorMessage('Unable to retrieve personal lease application', err)),
            );
    }, [leadId, applicationId]);

    const routes: RouteLink[] = [
        { target: '/leasing', display: 'Leasing' },
        { target: `/leasing/leads/${leadId}`, display: 'Lead Details' },
        { target: `/leasing/leads/${leadId}/guarantors/${applicationId}/activity/`, display: 'Profile Activity' },
    ];

    const breadCrumbs = {
        current: 'Profile Summary',
        routes,
    };

    return (
        <PageWrapper pageTitle="Leasing | Lead Details" breadCrumbs={breadCrumbs}>
            {!loadingDetails ? (
                <main>
                    {!loadingLead && leasingLead && userDetails && (
                        <ProfileSnapshot
                            userProfile={userDetails}
                            guarantorName={userDetails.name}
                            summary={url.includes('summary')}
                            leadId={leadId}
                            leasingLead={leasingLead}
                        />
                    )}
                    <Tabs>
                        <Header style={{ margin: '1rem 0' }}>
                            <HeaderLink key="remaining-tab" name="Assets" link={`${url}/assets`} />
                            <HeaderLink key="completed-tab" name="Liabilities" link={`${url}/liabilities`} />
                            <HeaderLink key="messages-tab" name="Other" link={`${url}/other`} />
                        </Header>

                        <LinksPanel>
                            <Switch>
                                <Route exact path={`${url}/assets`}>
                                    <ProfileSummaryTabContents assets applicationId={applicationId} />
                                </Route>
                                <Route exact path={`${url}/liabilities`}>
                                    <ProfileSummaryTabContents liabilities applicationId={applicationId} />
                                </Route>
                                <Route exact path={`${url}/other`}>
                                    <ProfileSummaryTabContents other applicationId={applicationId} />
                                </Route>
                                <Redirect from={`${url}`} to={`${url}/assets`} />
                            </Switch>
                        </LinksPanel>
                    </Tabs>
                </main>
            ) : (
                <LoadingContent />
            )}
        </PageWrapper>
    );
}

export default PersonalLeasingApplicationSummaryPage;

