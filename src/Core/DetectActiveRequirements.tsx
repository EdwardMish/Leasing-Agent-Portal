import React from 'react';
import { Redirect } from 'react-router-dom';

import { LoadingContent } from '../Shared/PageElements';
import { PageWrapper } from '../Shared/PageWrapper';

import { Welcome as WelcomeState } from '../State';
import { CurrentUser } from '../State/CurrentUser/Types/CurrentUser';
import { useLeasingState } from '../State/Leasing/Hooks';

import { userIsTenant } from '../utils/Users';

interface Properties {
    currentUser: CurrentUser;
    children: React.ReactNode;
}

function DetectActiveRequirements({ currentUser, children }: Properties): React.ReactElement {
    const currentUserIsTenant = userIsTenant(currentUser);

    const { areLoaded: welcomeStateLoaded, occupantsRequiringSetup } = WelcomeState.Hooks.useOccupantsFromWelcomeState();

    const { isLoaded: leasingStateLoaded, hasActiveApplication, isApplicationPaused } = useLeasingState();

    if (currentUserIsTenant) {
        if (!welcomeStateLoaded || !leasingStateLoaded) {
            return (
                <PageWrapper pageTitle="Validating Requirements">
                    <LoadingContent message="Please wait one moment while we check for required tasks." />
                </PageWrapper>
            );
        }

        // First check is to determine is there is a active onboarding process
        if (welcomeStateLoaded && occupantsRequiringSetup.length > 0) {
            return <Redirect to="/app/welcome" />;
        }

        // Then the next check is to determine if the user has an active lease application
        if (leasingStateLoaded && hasActiveApplication && !isApplicationPaused) {
            return <Redirect to="/app/lease-application" />;
        }
    }

    return <>{children}</>;
}

export default DetectActiveRequirements;
