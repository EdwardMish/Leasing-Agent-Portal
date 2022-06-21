import { withAuthenticationRequired } from '@auth0/auth0-react';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { LoadingContent } from '../Shared/PageElements';
import { PageWrapper } from '../Shared/PageWrapper';

import { useCurrentUser } from '../State/CurrentUser/Hooks';
import { CurrentUser } from '../State/CurrentUser/Types';

import DetectActiveRequirements from './DetectActiveRequirements';
import IsolatedRoutes from './IsolatedRoutes';
import StandardLayout from './Layouts/Standard/StandardLayout';

export interface Properties {
    currentUser: CurrentUser;
}

const CoreComponent = (): React.ReactElement => {
    const { currentUser, isCurrentUserLoaded } = useCurrentUser();

    return (
        <>
            {isCurrentUserLoaded ? (
                <Switch>
                    <Route path="/app">
                        <IsolatedRoutes currentUser={currentUser} />
                    </Route>

                    <Route path="/">
                        <DetectActiveRequirements currentUser={currentUser}>
                            <StandardLayout currentUser={currentUser} />
                        </DetectActiveRequirements>
                    </Route>
                </Switch>
            ) : (
                <PageWrapper>
                    <LoadingContent />
                </PageWrapper>
            )}
        </>
    );
};

const Core = withAuthenticationRequired(CoreComponent);

export { Core };
