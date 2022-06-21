import * as React from 'react';
import { useSelector } from 'react-redux';

import { LoadingContent } from '../../Shared/PageElements';
import { PageWrapper } from '../../Shared/PageWrapper';

import { CurrentUser } from '../../State/CurrentUser/Types';
import { currentUserIsLoaded, currentUser } from '../../State/CurrentUser/selectors';

import AccountAddress from './AccountAddress';
import AccountName from './AccountName';
import AccountPhone from './AccountPhone';
import AccountPreferences from './AccountPreferences';

const AccountDetails: React.FC = () => {
    const userIsLoaded: boolean = useSelector(currentUserIsLoaded);
    const user: CurrentUser = useSelector(currentUser);

    return (
        <PageWrapper pageTitle="Account Details">
            <h1>Account Details</h1>
            {userIsLoaded && user ? (
                <>
                    <AccountName />
                    <AccountAddress />
                    <AccountPhone />
                    <AccountPreferences />
                </>
            ) : (
                <LoadingContent />
            )}
        </PageWrapper>
    );
};

export default AccountDetails;
