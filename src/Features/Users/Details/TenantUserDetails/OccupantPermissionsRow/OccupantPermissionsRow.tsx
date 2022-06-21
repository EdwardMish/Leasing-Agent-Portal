import * as React from 'react';
import { useDispatch } from 'react-redux';
import ModalWithAction from 'Shared/Modal/ModalWithAction';
import { UserRolesAPI, UsersAPI } from '../../../../../API';
import { IconColors, InteractiveIcon, Remove } from '../../../../../Icons';
import { FlexWrapper } from '../../../../../Shared/FlexWrapper';
import { UserDetailRoleBlock } from '../../../../../Shared/RoleBlocks';
import { globalMessageActionCreators, Shared } from '../../../../../State';

interface OccupantPermissionsRowProps {
    occupantId: number;
    occupantName: string;
    roles: Shared.Types.Role[];
    propertyName: string;
    userId: number;
}

const styles = require('./occupant-permissions-row.module.css');

export const OccupantPermissionsRow: React.FC<OccupantPermissionsRowProps> = ({
    occupantId,
    occupantName,
    roles,
    propertyName,
    userId,
}) => {
    const dispatch = useDispatch();

    const [tenantRoles, setTenantRoles] = React.useState<Shared.Types.Role[]>([]);
    const [showRemoveWarning, toggleRemoveWarning] = React.useState<boolean>(false);
    const [userRoles, setRoles] = React.useState<Shared.Types.Role[]>(roles);
    const [permissionsRemoved, setPermissionsRemoved] = React.useState<boolean>(false);

    React.useEffect(() => {
        UserRolesAPI.getTenantRoles()
            .then((roles) => setTenantRoles(roles))
            .catch(() => {});
    }, []);

    const updateRoles = (role: Shared.Types.Role) => {
        const roleIndex = userRoles.findIndex((r) => r.id === role.id);

        roleIndex > -1
            ? setRoles([...userRoles.slice(0, roleIndex), ...userRoles.slice(roleIndex + 1)])
            : setRoles([...userRoles, role]);
    };

    const removeAllPermissions = () => {
        UsersAPI.removeOccupantAssociation(occupantId, userId)
            .then(() => {
                dispatch(globalMessageActionCreators.addSuccessMessage('User has been removed from the organization.'));

                setRoles([]);
                setPermissionsRemoved(true);
                toggleRemoveWarning(false);
            })
            .catch(() => {
                dispatch(
                    globalMessageActionCreators.addErrorMessage(
                        'We could not remove the user from the organization at this time.',
                    ),
                );
            });
    };

    return (
        <>
            <div
                className={styles.UserRow}
                key={`user-admin-table-row-${occupantId}`}
                style={{
                    backgroundColor: permissionsRemoved ? IconColors.WarningRedSecondary : 'transparent',
                }}
            >
                <FlexWrapper align="center" justify="between" className={styles.PermissionsRow}>
                    <div className={styles.UserBlock}>
                        <p style={{ color: permissionsRemoved ? IconColors.WarningRed : 'inherit' }}>
                            <b>{occupantName}</b>
                        </p>
                        <p style={{ color: permissionsRemoved ? IconColors.WarningRed : 'inherit' }}>{propertyName}</p>
                    </div>
                    {!permissionsRemoved ? (
                        <>
                            {tenantRoles.map((role: Shared.Types.Role) => (
                                <div key={`tenant-role-row-${role.id}`} style={{ margin: '0 0.5rem' }}>
                                    <UserDetailRoleBlock
                                        occupantId={occupantId}
                                        role={role}
                                        userRoles={userRoles}
                                        userId={userId}
                                        callBack={updateRoles}
                                    />
                                </div>
                            ))}
                            <FlexWrapper align="center" justify="center" style={{ width: '4rem' }}>
                                <InteractiveIcon
                                    action={() => toggleRemoveWarning(true)}
                                    color={IconColors.WarningRed}
                                    iconAspect="1.5rem"
                                    Icon={Remove}
                                    aspect="2rem"
                                />
                            </FlexWrapper>
                        </>
                    ) : (
                        <p style={{ color: IconColors.WarningRed }}>{`Access to ${occupantName} removed.`}</p>
                    )}
                </FlexWrapper>
            </div>
            {showRemoveWarning && (
                <ModalWithAction
                    header="Remove All Permissions"
                    actionText="Confirm"
                    actionCallback={removeAllPermissions}
                    cancelCallback={() => toggleRemoveWarning(false)}
                >
                    <div style={{ padding: '1rem' }}>
                        <h3 style={{ margin: '0 0 0.5rem' }}>Remove Permissions</h3>
                        <p style={{ margin: '0 0 0.5rem', lineHeight: '1.75' }}>This action will remove all permissions.</p>
                        <p
                            style={{ margin: '0 0 0.5rem', lineHeight: '1.75' }}
                        >{`This User will no longer have access to ${occupantName} at ${propertyName}.`}</p>
                        <p style={{ margin: '0 0 0.5rem', lineHeight: '1.75' }}>
                            <b>Would you like to continue?</b>
                        </p>
                    </div>
                </ModalWithAction>
            )}
        </>
    );
};

