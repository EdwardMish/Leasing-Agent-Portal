import { useAuth0 } from '@auth0/auth0-react';
import * as React from 'react';

declare const window: Window & {
    hj?: (identity: string, email: string, obj: Record<string, unknown>) => void;
};

export const CurrentUserWrapper: React.FC<{}> = () => {
    const { user } = useAuth0();

    const [userAttachedToHotjar, toggleUserAttachedToHotjar] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (!userAttachedToHotjar && user) {
            const { email = 'Unknown User' } = user;

            if (
                typeof window !== 'undefined' &&
                Object.hasOwnProperty.call(window, 'hj') &&
                typeof window.hj === 'function'
            ) {
                // @ts-ignore Checking for function in wrapper
                window.hj('identify', email, {});
            }

            toggleUserAttachedToHotjar(true);
        }
    }, [user]);

    return null;
};
