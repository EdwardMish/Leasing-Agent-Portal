import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ComplianceType } from '../../../API/Compliance/Types/ComplianceType';
import ApplicationPageWrapper from '../../../Shared/Application/ApplicationPageWrapper';

import { LoadingContent } from '../../../Shared/PageElements';
import { ScrollToTop } from '../../../Shared/ScrollToTop';

import { Welcome as WelcomeState } from '../../../State';

import * as Pages from './Pages';
import ContactInformationPage from './Pages/ContactInformationPage';

const Welcome = () => {
    const { areLoaded, firstOccupantToSetup } = WelcomeState.Hooks.useOccupantsFromWelcomeState();

    return (
        <>
            <ScrollToTop />
            {areLoaded ? (
                <ApplicationPageWrapper>
                    <Switch>
                        <Route exact path="/app/welcome/business-information">
                            {firstOccupantToSetup ? <Pages.BusinessInformationPage /> : <Redirect to="/app/welcome" />}
                        </Route>
                        <Route path="/app/welcome/business-contacts">
                            {firstOccupantToSetup ? <Pages.BusinessContactsPage /> : <Redirect to="/app/welcome" />}
                        </Route>
                        <Route path="/app/welcome/users">
                            {firstOccupantToSetup ? <Pages.UsersPage /> : <Redirect to="/app/welcome" />}
                        </Route>
                        <Route exact path="/app/welcome/checklist">
                            {firstOccupantToSetup ? (
                                <Pages.ContentPage
                                    title="Onboarding Checklist"
                                    nextRoute={`/app/welcome/compliance/${ComplianceType.CertificateOfInsurance}`}
                                />
                            ) : (
                                <Redirect to="app/welcome" />
                            )}
                        </Route>
                        <Route path="/app/welcome/compliance">
                            {firstOccupantToSetup ? <Pages.CompliancePage /> : <Redirect to="/app/welcome" />}
                        </Route>
                        <Route path="/app/welcome/contact-information">
                            <ContactInformationPage nextRoute="/app/welcome/emergency-alerts" />
                        </Route>
                        <Route path="/app/welcome/emergency-alerts">
                            <Pages.EmergencyAlertsPage nextRoute="/app/welcome/business-information" />
                        </Route>
                        <Route path="/app/welcome/utility-transfer">
                            <Pages.UtilityTransferPage nextRoute="/app/welcome/keys" />
                        </Route>
                        <Route path="/app/welcome/keys">
                            <Pages.KeysPage nextRoute="/app/welcome/complete" />
                        </Route>
                        <Route exact path="/app/welcome/complete">
                            {firstOccupantToSetup ? <Pages.CompletePage /> : <Redirect to="/app/welcome" />}
                        </Route>
                        <Route path="/app/welcome">
                            <Pages.WelcomePage nextRoute="/app/welcome/contact-information" />
                        </Route>
                    </Switch>
                </ApplicationPageWrapper>
            ) : (
                <LoadingContent />
            )}
        </>
    );
};

export default Welcome;

