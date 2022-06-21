import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { LastLocationProvider } from 'react-router-last-location';
import { CurrentUserWrapper } from '../CurrentUser';
import { ToastMessageWrapper } from '../Features/ToastMessages';
import { GlobalMessageWrapper } from '../GlobalMessages';
import { FeatureFlags } from '../State';
import hubConnectionThunk from '../State/middleware/hubConnectionThunk';
import ApplicationErrorBoundary from './ApplicationErrorBoundary';
import { Core } from './Core';
import { AuthorizationInterceptor } from './Interceptors/AuthorizationInterceptor';
import TermsConditions from './TermsConditions';

function Main() {
    const dispatch = useDispatch();

    const { getAccessTokenSilently, loginWithRedirect } = useAuth0();

    const [tokenPending, toggleTokenPending] = React.useState<boolean>(false);
    const [tokenLoaded, toggleTokenLoaded] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (!tokenPending && !tokenLoaded) {
            toggleTokenPending(true);

            getAccessTokenSilently({
                audience: 'https://api.centecomm.com',
            })
                .then((tokenResponse) => {
                    dispatch(hubConnectionThunk(tokenResponse));

                    toggleTokenLoaded(true);
                    toggleTokenPending(false);
                })
                .catch((e) => {
                    if (e.error === 'login_required') loginWithRedirect();
                    if (e.error === 'consent_required') loginWithRedirect();

                    throw e;
                });
        }
    }, [tokenPending, tokenLoaded]);

    return (
        <ApplicationErrorBoundary>
            <FeatureFlags.Loaders.FeatureFlagsLoader />
            <CurrentUserWrapper />
            <TermsConditions />
            <ToastMessageWrapper />
            <GlobalMessageWrapper />
            <AuthorizationInterceptor />
            <LastLocationProvider>
                <Core />
            </LastLocationProvider>
        </ApplicationErrorBoundary>
    );
}

export default Main;
