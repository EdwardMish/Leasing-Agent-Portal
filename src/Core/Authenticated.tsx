import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { useLocation } from 'react-router-dom';

interface Properties {
    children: React.ReactNode;
}

function Authenticated({ children }: Properties): React.ReactElement {
    const location = useLocation();

    const returnTo = (): string => {
        // If we receive an invitation link, we do not want to store it as a returnTo
        // entry in state for the return of the redirect from authentication so send them
        // to the home page instead.
        if (location.search.startsWith('?invitation')) return '/';

        return `${location.pathname}${window.location.search}`;
    };

    const onRedirecting = (): JSX.Element => <></>;

    const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

    const routeIsAuthenticated = isAuthenticated;

    React.useEffect(() => {
        if (isLoading || routeIsAuthenticated) {
            return;
        }
        const opts = {
            appState: {
                returnTo: typeof returnTo === 'function' ? returnTo() : returnTo,
            },
        };

        (async (): Promise<void> => {
            await loginWithRedirect(opts);
        })();
    }, [isLoading, routeIsAuthenticated, loginWithRedirect, returnTo]);

    return routeIsAuthenticated ? <>{children}</> : onRedirecting();
}

export default Authenticated;
