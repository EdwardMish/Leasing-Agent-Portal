import { API as LeasingAPI } from 'API/Leasing';
import { PersonalLeaseApplication } from 'API/Leasing/Types';
import CancelApplicationModal from 'Features/Leasing/Main/Components/CancelApplicationModal';
import CompleteApplicationModal from 'Features/Leasing/Main/Components/CompleteApplicationModal';
import ProfileDetailsTabContents from 'Features/Leasing/Main/Components/DetailsTabContents/ProfileDetailsTabContents';
import useLeasingLead from 'Features/Leasing/Main/Components/Hooks/useLeasingLead';
import ProfileSnapshot from 'Features/Leasing/Main/Components/ProfileSnapshot';
import { Add, CheckMark, IconColors, Remove } from 'Icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, Redirect, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import Modal from 'Shared/Modal/Modal';
import { IconWithText, LoadingContent } from 'Shared/PageElements';
import { PageWrapper } from 'Shared/PageWrapper';
import { Actions, Header, HeaderLink, LinksPanel, Tabs, Wrapper } from 'Shared/Tabs';
import { globalMessageActionCreators } from 'State';
import { Route as RouteLink } from 'Types/Route';

interface Properties {
    leadId: number;
    applicationId: number;
}

interface TaskCompleteStatus {
    assets: boolean;
    liabilities: boolean;
    questions: boolean;
    documents: boolean;
}

function PersonalLeasingApplicationDetailsPage({ leadId, applicationId }: Properties): JSX.Element {
    const dispatch = useDispatch();
    const { url } = useRouteMatch();
    const history = useHistory();

    const [userDetails, setUserDetails] = React.useState<PersonalLeaseApplication>();
    const [showCancelModal, toggleShowCancelModal] = React.useState<boolean>(false);
    const [showCompletedModal, toggleShowCompletedModal] = React.useState<boolean>(false);
    const [loadingDetails, setLoadingDetails] = React.useState(true);
    const [taskCompleteStatus, setTaskCompleteStatus] = React.useState<TaskCompleteStatus>();

    const customTaskFormUrl = `${url.substring(0, url.indexOf('/activity'))}/create-task`;

    const { leasingLead, loading: loadingLead } = useLeasingLead(leadId);

    React.useEffect(() => {
        LeasingAPI.getPersonalLeaseApplication(leadId, applicationId)
            .then((leaseApplication: PersonalLeaseApplication) => {
                setUserDetails(leaseApplication);
                setTaskCompleteStatus({
                    assets: !!leaseApplication.completedAssets,
                    liabilities: !!leaseApplication.completedLiabilities,
                    questions: !!leaseApplication.completedQuestions,
                    documents: !!leaseApplication.completedDocuments,
                });
                setLoadingDetails(false);
            })
            .catch((err) =>
                dispatch(globalMessageActionCreators.addErrorMessage('Unable to retrieve personal lease application', err)),
            );
    }, []);

    const cancelApplication = async () => {
        try {
            await LeasingAPI.cancelPersonalLeaseApplication(leadId, applicationId);
            history.push('/leasing');
        } catch (err) {
            dispatch(globalMessageActionCreators.addErrorMessage('Unable to cancel application, please try again.', err));
        }
    };

    const completeApplication = async () => {
        try {
            await LeasingAPI.completePersonalLeaseApplication(leadId, applicationId);
            history.push(`/leasing/leads/${leadId}`);
        } catch (err) {
            dispatch(globalMessageActionCreators.addErrorMessage('Unable to complete application, please try again.', err));
        }
    };

    const routes: RouteLink[] = [
        { target: '/leasing', display: 'Leasing' },
        { target: `/leasing/leads/${leadId}`, display: `Lead Details | ${leasingLead?.name || ''}` },
    ];

    const breadCrumbs = {
        current: 'Profile Activity',
        routes,
    };

    return (
        <PageWrapper pageTitle="Leasing | Lead Details" breadCrumbs={breadCrumbs}>
            {!loadingLead && !!leasingLead && !loadingDetails && userDetails ? (
                <main>
                    <ProfileSnapshot
                        userProfile={userDetails}
                        guarantorName={userDetails.name}
                        summary={url.includes('summary')}
                        leadId={leadId}
                        leasingLead={leasingLead}
                    />

                    {showCompletedModal && (
                        <Modal hideHeader>
                            <CompleteApplicationModal
                                onClose={() => toggleShowCompletedModal(false)}
                                onOk={completeApplication}
                            />
                        </Modal>
                    )}
                    {showCancelModal && (
                        <Modal hideHeader>
                            <CancelApplicationModal onClose={() => toggleShowCancelModal(false)} onOk={cancelApplication} />
                        </Modal>
                    )}
                    <Tabs>
                        <Header style={{ margin: '1rem 0' }}>
                            <HeaderLink key="remaining-tasks" name="Remaining Tasks" link={`${url}/remaining`} />
                            <HeaderLink key="completed-tab" name="Completed" link={`${url}/completed`} />
                            <HeaderLink key="messaging-tab" name="Messaging" link={`${url}/messaging`} />
                        </Header>

                        <LinksPanel>
                            <Switch>
                                <Route exact path={`${url}/remaining`}>
                                    <ProfileDetailsTabContents
                                        remaining
                                        taskCompleteStatus={taskCompleteStatus}
                                        leadId={leadId}
                                        applicationId={applicationId}
                                        messagingTabLink={`${url}/messaging`}
                                        applicationCompleted={!!userDetails.completed}
                                    />
                                </Route>
                                <Route exact path={`${url}/completed`}>
                                    <ProfileDetailsTabContents
                                        completed
                                        taskCompleteStatus={taskCompleteStatus}
                                        leadId={leadId}
                                        applicationId={applicationId}
                                        messagingTabLink={`${url}/messaging`}
                                    />
                                </Route>

                                <Route exact path={`${url}/messaging`}>
                                    <ProfileDetailsTabContents
                                        messaging
                                        taskCompleteStatus={taskCompleteStatus}
                                        leadId={leadId}
                                        applicationId={applicationId}
                                        guarantor={userDetails?.name}
                                        applicationCompleted={!!userDetails.completed}
                                    />
                                </Route>
                                <Redirect from={`${url}`} to={`${url}/remaining`} />
                            </Switch>
                        </LinksPanel>
                        {!userDetails.completed && (
                            <Actions>
                                <Wrapper actionid="create-task">
                                    <Link to={customTaskFormUrl}>
                                        <IconWithText
                                            text="ADD CUSTOM TASK"
                                            Icon={Add}
                                            style={{ justifyContent: 'right' }}
                                        />
                                    </Link>
                                </Wrapper>
                                <Wrapper actionid="complete-application">
                                    <div onClick={() => toggleShowCompletedModal(true)}>
                                        <IconWithText
                                            text="COMPLETE APPLICATION"
                                            Icon={CheckMark}
                                            style={{ justifyContent: 'right' }}
                                        />
                                    </div>
                                </Wrapper>
                                <Wrapper actionid="cancel-application">
                                    <div onClick={() => toggleShowCancelModal(true)}>
                                        <IconWithText
                                            text="CANCEL APPLICATION"
                                            Icon={Remove}
                                            color={IconColors.WarningRed}
                                            style={{ justifyContent: 'right' }}
                                        />
                                    </div>
                                </Wrapper>
                            </Actions>
                        )}
                    </Tabs>
                </main>
            ) : (
                <LoadingContent />
            )}
        </PageWrapper>
    );
}

export default PersonalLeasingApplicationDetailsPage;
