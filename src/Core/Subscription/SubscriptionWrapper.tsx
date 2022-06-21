import { AppState } from '@auth0/auth0-react';
import * as React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import SubscriptionContext from './SubscriptionContext';

interface SubscriptionProps {
    domain: string;
    clientId: string;
    redirectUri: string;
    organization: string;
    audience: string;
    invitation?: string;
    onRedirectCallback?: (appState: AppState) => void;
}

// TODO: Data driven by build env VAR -> AUTH_TARGET
const baseAuth = {
    audience: 'https://api.centecomm.com',
};

const localAuth: SubscriptionProps = {
    ...baseAuth,
    domain: 'auth.qa.centecomm.com',
    clientId: 'ZhENQlBg5PGTx1J1Gt8Trkgoj52vAEjf',
    redirectUri: 'http://localhost:3000',
    organization: 'org_KEm17HQLFzwc4g1z',
};

const devAuth: SubscriptionProps = {
    ...baseAuth,
    domain: 'auth.qa.centecomm.com',
    clientId: 'ZhENQlBg5PGTx1J1Gt8Trkgoj52vAEjf',
    redirectUri: 'https://app.qa.centecomm.com',
    organization: 'org_KEm17HQLFzwc4g1z',
};

const prodAuth: SubscriptionProps = {
    ...baseAuth,
    domain: 'auth.centecomm.com',
    clientId: 'hh803DUwvrUAErUsbsPnl6V67F0CPAQb',
    redirectUri: 'https://www.dashcomm.com',
    organization: 'org_cbVrqF7f5gaWGfso',
};

const SubscriptionWrapper: React.FC<{ children: (data: SubscriptionProps) => React.ReactElement }> = ({
    children,
}): React.ReactElement => {
    const { search } = useLocation();
    const history = useHistory();

    const queryParams = new URLSearchParams(search);

    React.useEffect(() => {
        if (queryParams.has('invitation')) window.history.replaceState(null, '', '/');
    }, []);

    const onRedirectCallback = React.useCallback(
        (appState) => history.push(appState?.returnTo || window.location.pathname),
        []
    );

    let subProps: SubscriptionProps;

    switch (AUTH_TARGET) {
        case 'local':
            subProps = localAuth;
            break;
        case 'dev':
            subProps = devAuth;
            break;
        case 'prod':
            subProps = prodAuth;
            break;
    }

    return (
        <SubscriptionContext.Provider
            value={{
                organization: subProps.organization,
                isLoaded: true,
            }}
        >
            {children({
                ...subProps,
                invitation: queryParams.has('invitation') ? queryParams.get('invitation') || undefined : undefined,
                onRedirectCallback,
            })}
        </SubscriptionContext.Provider>
    );
};

export default SubscriptionWrapper;
