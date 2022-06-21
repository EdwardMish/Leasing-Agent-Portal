import { Auth0Provider } from '@auth0/auth0-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '../State';
import Authenticated from './Authenticated';
import { AuthenticationErrorsWrapper } from './AuthenticationErrorsWrapper';
import Main from './Main';
import SubscriptionWrapper from './Subscription/SubscriptionWrapper';

export default ReactDOM.render(
    <>
        <Provider store={store}>
            <Router basename={`${ROOT}`}>
                <AuthenticationErrorsWrapper>
                    <SubscriptionWrapper>
                        {({ domain, clientId, redirectUri, organization, audience, invitation, onRedirectCallback }) => (
                            <Auth0Provider
                                domain={domain}
                                clientId={clientId}
                                redirectUri={redirectUri}
                                organization={organization}
                                audience={audience}
                                invitation={invitation}
                                useRefreshTokens
                                onRedirectCallback={onRedirectCallback}
                            >
                                <Authenticated>
                                    <Main />
                                </Authenticated>
                            </Auth0Provider>
                        )}
                    </SubscriptionWrapper>
                </AuthenticationErrorsWrapper>
            </Router>
        </Provider>
    </>,
    document.getElementById('app-main')
);
