import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import UsersAPI from '../../../API/Users';

import { IconColors } from '../../../Icons';

import { CurrentUserState, globalMessageActionCreators, UserActions, UserActionTypes } from '../../../State';
import { currentUser } from '../../../State/CurrentUser/selectors';
import { CurrentUser } from '../../../State/CurrentUser/Types';

import AccountDetailsSectionTitle from '../AccountDetailsSectionTitle';

import AccountNameDetails from './AccountNameDetails';
import EditAccountName from './EditAccountName';

const AccountName: React.FC = (): React.ReactElement => {
    const dispatch = useDispatch();

    const user: CurrentUser = useSelector(currentUser);

    const [editName, toggleEditName] = React.useState<boolean>(false);

    const edit = (firstName: string, lastName: string) => {
        UsersAPI.updateUserName(user.id, firstName, lastName)
            .then(() => {
                dispatch({
                    type: UserActions.UPDATE_NAME,
                    payload: {
                        userId: user.id,
                        firstName,
                        lastName,
                    },
                } as UserActionTypes);

                dispatch({
                    type: CurrentUserState.Actions.UPDATE_CURRENT_USER_NAME,
                    payload: {
                        firstName,
                        lastName,
                    },
                } as CurrentUserState.ActionTypes);

                toggleEditName(false);
            })
            .catch((err) => {
                dispatch(globalMessageActionCreators.addErrorMessage(`Unable to update name`, err));
            });
    };

    return (
        <div
            style={{
                borderBottom: `1px solid ${IconColors.OffWhite}`,
                margin: '0 0 1rem',
            }}
        >
            <AccountDetailsSectionTitle title="Name" active={editName} toggleActive={() => toggleEditName(!editName)} />
            {editName ? (
                <EditAccountName
                    firstName={user.firstName}
                    lastName={user.lastName}
                    cancel={() => {
                        toggleEditName(false);
                    }}
                    edit={edit}
                />
            ) : (
                <AccountNameDetails firstName={user.firstName} lastName={user.lastName} />
            )}
        </div>
    );
};

export default AccountName;
