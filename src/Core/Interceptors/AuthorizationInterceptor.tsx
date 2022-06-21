import * as React from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

export const AuthorizationInterceptor: React.FC<{}> = () => {
    const { getAccessTokenSilently, loginWithRedirect } = useAuth0();

    axios.interceptors.request.use(
        async (config) => {
            let accessToken = '';

            try {
                accessToken = await getAccessTokenSilently({
                    audience: 'https://api.centecomm.com',
                });
            } catch (e) {
                if (e.error === 'login_required') loginWithRedirect();
                if (e.error === 'consent_required') loginWithRedirect();

                throw e;
            }

            if (config && config.headers) {
                if (accessToken) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }
            }
            return config;
        },
        (error) => {
            Promise.reject(error);
        }
    );

    return <></>;
};
