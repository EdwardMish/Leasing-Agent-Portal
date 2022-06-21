import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { ErrorLayout } from './Layouts';

export const errorDescriptions = {
    unauthorized: 'You are not authorized to access this site.',
    access_denied: 'Access has been denied to this site.',
    too_many_attempts: 'The account is blocked due to too many attempts to sign in',
};

interface Properties {
    children: React.ReactNode;
}

export const AuthenticationErrorsWrapper: React.FC<Properties> = ({ children }): React.ReactElement => {
    const { search } = useLocation();

    const queryParams = new URLSearchParams(search);

    const [showErrors, setShowErrors] = React.useState<boolean>(false);

    React.useEffect(() => {
        window.history.replaceState(null, '', '/');
    }, []);

    const getErrorMessage = (error: string | null) => {
        if (error == null) return 'error parameter not provided';

        return errorDescriptions[error] || 'Error Message Not Found';
    };

    return (
        <>
            {queryParams.has('error') ? (
                <ErrorLayout>
                    <div>
                        <h2>{getErrorMessage(queryParams.get('error'))}</h2>
                    </div>
                    <p>
                        If you have questions about this error, please contact support for more information. Customer support
                        may as for you to provide the following details.
                    </p>
                    <p
                        style={{ fontWeight: 'bold', marginTop: '4rem', cursor: 'pointer' }}
                        onClick={() => setShowErrors(!showErrors)}
                    >
                        {showErrors ? 'Hide' : 'Show'} Error Details
                    </p>
                    <p>{showErrors && queryParams.get('error_description')}</p>
                </ErrorLayout>
            ) : (
                children
            )}
        </>
    );
};
