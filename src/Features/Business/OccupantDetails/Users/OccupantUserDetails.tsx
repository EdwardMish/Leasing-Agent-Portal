import * as React from 'react';

import { Business } from '../../../../State';

import { Add } from '../../../../Icons';
import { LoadingContent, SecondaryTitle, SecondaryTitleWithAction } from '../../../../Shared/PageElements';

import { UserAdminTable } from '../../UserAdminTable';
import { CreateUserModal as CreateUserModalComponent } from './CreateUser';
import Modal from 'Shared/Modal/Modal';

const styles = require('../occupant-details.module.css');

interface OccupantUserDetailsProps {
    marketingName: string;
    propertyName: string;
    occupantId: number | string;
    baseUsers: Business.Types.BaseUser[];
}

export const OccupantUserDetails: React.FC<OccupantUserDetailsProps> = ({
    marketingName,
    propertyName,
    occupantId,
    baseUsers,
}) => {
    const { areLoaded, canAccess, canRemove, users } = Business.Hooks.useBusinessUsersFromState(occupantId);

    const [createUserModal, toggleCreateUserModal] = React.useState<boolean>(false);

    const handleCreate = () => {
        toggleCreateUserModal(true);
    };

    const handleClose = () => {
        toggleCreateUserModal(false);
    };

    return (
        <>
            {areLoaded ? (
                <>
                    {canAccess ? (
                        <>
                            <SecondaryTitleWithAction
                                title="Manage User Roles"
                                withMargin={false}
                                action={{
                                    callBack: handleCreate,
                                    actionTitle: 'Create User',
                                }}
                                ActionIcon={Add}
                            />
                            <UserAdminTable
                                canRemove={canRemove}
                                occupantId={occupantId}
                                occupantName={marketingName}
                                propertyName={propertyName}
                                users={users}
                            />
                        </>
                    ) : (
                        <>
                            <SecondaryTitle title="Business Users &amp; Contacts" />
                            <ul className={styles.UserList}>
                                {baseUsers.map(({ firstName, lastName, id }) => (
                                    <li key={`occupant-details-user-list-${id}`}>
                                        <span>{`${firstName} ${lastName}`}</span>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </>
            ) : (
                <LoadingContent message="Loading Users..." />
            )}
            {createUserModal && (
                <Modal callBack={handleClose} header="Create User">
                    <div style={{ padding: '1rem' }}>
                        <CreateUserModalComponent
                            occupantId={occupantId}
                            occupantName={marketingName}
                            closeCallback={handleClose}
                        />
                    </div>
                </Modal>
            )}
        </>
    );
};
