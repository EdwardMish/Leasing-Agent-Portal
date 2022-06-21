import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ApplicationPageWrapper from '../../../../Shared/Application/ApplicationPageWrapper';
import { useLeasingState } from '../../../../State/Leasing/Hooks';
import AddressPage from './AddressPage';
import AssetsPage from './AssetsPage';
import AddAssetPage from './AddAssetPage';
import LiabilitiesPage from './LiabilitiesPage';
import AddLiabilityPage from './AddLiabilityPage';
import IdentityPage from './IdentityPage';
import OverviewPage from './OverviewPage';
import PersonalInformationPage from './PersonalInformationPage';
import ReviewPage from './ReviewPage';
import WelcomePage from './WelcomePage';
import DocumentsPage from './DocumentsPage';
import AddDocumentPage from './AddDocumentsPage';
import QuestionsPage from './QuestionsPage';
import RespondQuestionPage from './RespondQuestionPage';

export const BASE_LEASE_APPLICATION_ROUTE = '/app/lease-application';

const LeasingApplicationRoutes = {
    WELCOME: `${BASE_LEASE_APPLICATION_ROUTE}/welcome`,
    PERSONAL_INFO: `${BASE_LEASE_APPLICATION_ROUTE}/personal`,
    ADDRESS: `${BASE_LEASE_APPLICATION_ROUTE}/address`,
    IDENTITY: `${BASE_LEASE_APPLICATION_ROUTE}/identity`,
    REVIEW: `${BASE_LEASE_APPLICATION_ROUTE}/review`,
    OVERVIEW: `${BASE_LEASE_APPLICATION_ROUTE}/overview`,
    ASSETS: `${BASE_LEASE_APPLICATION_ROUTE}/assets`,
    ADD_ASSET: `${BASE_LEASE_APPLICATION_ROUTE}/assets/add`,
    LIABILITIES: `${BASE_LEASE_APPLICATION_ROUTE}/liabilities`,
    ADD_LIABILITY: `${BASE_LEASE_APPLICATION_ROUTE}/liabilities/add`,
    DOCUMENTS: `${BASE_LEASE_APPLICATION_ROUTE}/documents`,
    ADD_DOCUMENT: `${BASE_LEASE_APPLICATION_ROUTE}/documents/add`,
    QUESTIONS: `${BASE_LEASE_APPLICATION_ROUTE}/questions`,
    RESPOND_QUESTION: `${BASE_LEASE_APPLICATION_ROUTE}/questions/respond`,
};

function Page(): React.ReactElement {
    const { isApplicationStarted, personalInformation, address, identification } = useLeasingState();

    return (
        <ApplicationPageWrapper>
            {!isApplicationStarted ? (
                <Switch>
                    <Route exact path={`${LeasingApplicationRoutes.WELCOME}`}>
                        <WelcomePage next={`${LeasingApplicationRoutes.PERSONAL_INFO}`} />
                    </Route>
                    <Route exact path={`${LeasingApplicationRoutes.PERSONAL_INFO}`}>
                        <PersonalInformationPage
                            previous={`${LeasingApplicationRoutes.WELCOME}`}
                            next={`${LeasingApplicationRoutes.ADDRESS}`}
                        />
                    </Route>
                    <Route exact path={`${LeasingApplicationRoutes.ADDRESS}`}>
                        {!personalInformation ? (
                            <Redirect to={`${LeasingApplicationRoutes.WELCOME}`} />
                        ) : (
                            <AddressPage
                                previous={`${LeasingApplicationRoutes.PERSONAL_INFO}`}
                                next={`${LeasingApplicationRoutes.IDENTITY}`}
                            />
                        )}
                    </Route>
                    <Route path={`${LeasingApplicationRoutes.IDENTITY}`}>
                        {!address ? (
                            <Redirect to={`${LeasingApplicationRoutes.ADDRESS}`} />
                        ) : (
                            <IdentityPage
                                previous={`${LeasingApplicationRoutes.ADDRESS}`}
                                next={`${LeasingApplicationRoutes.REVIEW}`}
                            />
                        )}
                    </Route>
                    <Route exact path={`${LeasingApplicationRoutes.REVIEW}`}>
                        {!identification ? (
                            <Redirect to={`${LeasingApplicationRoutes.IDENTITY}`} />
                        ) : (
                            <ReviewPage
                                previous={`${LeasingApplicationRoutes.IDENTITY}`}
                                next={`${LeasingApplicationRoutes.OVERVIEW}`}
                                personalInformation={personalInformation}
                                address={address}
                                identification={identification}
                                personalInformationLink={`${LeasingApplicationRoutes.PERSONAL_INFO}`}
                                identificationLink={`${LeasingApplicationRoutes.IDENTITY}`}
                                addressLink={`${LeasingApplicationRoutes.ADDRESS}`}
                            />
                        )}
                    </Route>
                    <Route path={`${BASE_LEASE_APPLICATION_ROUTE}`}>
                        <Redirect to={`${LeasingApplicationRoutes.WELCOME}`} />
                    </Route>
                </Switch>
            ) : (
                <Switch>
                    <Route path={`${LeasingApplicationRoutes.OVERVIEW}`}>
                        <OverviewPage routes={LeasingApplicationRoutes} />
                    </Route>
                    <Route exact path={`${LeasingApplicationRoutes.ASSETS}`}>
                        <AssetsPage
                            previous={`${LeasingApplicationRoutes.OVERVIEW}`}
                            addAssetRoute={`${LeasingApplicationRoutes.ADD_ASSET}`}
                        />
                    </Route>
                    <Route exact path={`${LeasingApplicationRoutes.ADD_ASSET}`}>
                        <AddAssetPage previous={`${LeasingApplicationRoutes.ASSETS}`} />
                    </Route>
                    <Route exact path={`${LeasingApplicationRoutes.LIABILITIES}`}>
                        <LiabilitiesPage
                            previous={`${LeasingApplicationRoutes.OVERVIEW}`}
                            addLiabilityRoute={`${LeasingApplicationRoutes.ADD_LIABILITY}`}
                        />
                    </Route>
                    <Route exact path={`${LeasingApplicationRoutes.ADD_LIABILITY}`}>
                        <AddLiabilityPage previous={`${LeasingApplicationRoutes.LIABILITIES}`} />
                    </Route>
                    <Route exact path={`${LeasingApplicationRoutes.DOCUMENTS}`}>
                        <DocumentsPage
                            previous={`${LeasingApplicationRoutes.OVERVIEW}`}
                            addDocumentRoute={`${LeasingApplicationRoutes.ADD_DOCUMENT}`}
                        />
                    </Route>
                    <Route exact path={`${LeasingApplicationRoutes.ADD_DOCUMENT}`}>
                        <AddDocumentPage previous={`${LeasingApplicationRoutes.DOCUMENTS}`} />
                    </Route>
                    <Route exact path={`${LeasingApplicationRoutes.QUESTIONS}`}>
                        <QuestionsPage
                            previous={`${LeasingApplicationRoutes.OVERVIEW}`}
                            respondQuestionLink={`${LeasingApplicationRoutes.RESPOND_QUESTION}`}
                        />
                    </Route>
                    <Route path={`${LeasingApplicationRoutes.RESPOND_QUESTION}`}>
                        <RespondQuestionPage previous={`${LeasingApplicationRoutes.QUESTIONS}`} />
                    </Route>
                    <Route path={`${BASE_LEASE_APPLICATION_ROUTE}`}>
                        <Redirect to={`${LeasingApplicationRoutes.OVERVIEW}`} />
                    </Route>
                </Switch>
            )}
        </ApplicationPageWrapper>
    );
}

export default Page;
