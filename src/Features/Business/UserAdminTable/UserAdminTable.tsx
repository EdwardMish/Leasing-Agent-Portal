import * as React from 'react';
import { useDispatch } from 'react-redux';
import ModalWithAction from 'Shared/Modal/ModalWithAction';
import { Business as BusinessAPI, UsersAPI } from '../../../API';
import { IconColors, InteractiveIcon, Remove } from '../../../Icons';
import { FlexWrapper } from '../../../Shared/FlexWrapper';
import { BusinessRoleBlock } from '../../../Shared/RoleBlocks';
import { Business, globalMessageActionCreators } from '../../../State';

const styles = require('./user-admin-table.module.css');

interface UserAdminTableProps {
    canRemove: boolean;
    occupantId: number | string;
    occupantName: string;
    propertyName: string;
    users: Business.Types.BusinessUser[];
}

export const UserAdminTable: React.FC<UserAdminTableProps> = ({
    canRemove,
    users,
    occupantId,
    occupantName,
    propertyName,
}) => {
    const dispatch = useDispatch();

    const [userRoles, setUserRoles] = React.useState<BusinessAPI.Types.Role[]>([]);
    const [showRemoveWarning, toggleRemoveWarning] = React.useState<boolean>(false);
    const [userIdToRemove, setUserId] = React.useState<number>(0);
    const [userNameToRemove, setUserName] = React.useState<string>('');

    React.useEffect(() => {
        BusinessAPI.API.getUserRoles().then((roles: BusinessAPI.Types.Role[]) => {
            setUserRoles(roles);
        });
    }, []);

    const handleRemove = (id: number, firstName: string, lastName: string) => {
        setUserId(id);
        setUserName(`${firstName} ${lastName}`);
        toggleRemoveWarning(true);
    };

    const removeAllPermissions = () => {
        UsersAPI.removeOccupantAssociation(occupantId, userIdToRemove)
            .then(() => {
                dispatch({
                    type: Business.Actions.REMOVE_BUSINESS_USER,
                    payload: {
                        occupantId,
                        userId: userIdToRemove,
                    },
                } as Business.ActionTypes);

                dispatch(
                    globalMessageActionCreators.addSuccessMessage(
                        `${userNameToRemove} has been removed from your organization.`,
                    ),
                );

                setUserId(0);
                setUserName('');
                toggleRemoveWarning(false);
            })
            .catch(() => {
                dispatch(
                    globalMessageActionCreators.addErrorMessage(
                        `We could not remove ${userNameToRemove} from your organization at this time.`,
                    ),
                );

                setUserId(0);
                setUserName('');
                toggleRemoveWarning(false);
            });
    };

    return (
        <>
            {users.map(({ id, email, firstName, lastName, roles }: Business.Types.BusinessUser) => (
                <div className={styles.UserRow} key={`user-admin-table-row-${id}`}>
                    <FlexWrapper align="center" justify="between" className={styles.PermissionsRow}>
                        <div className={styles.UserBlock}>
                            <p>{`${firstName} ${lastName}`}</p>
                            <p>{email}</p>
                        </div>
                        {userRoles.map((role: BusinessAPI.Types.Role) => (
                            <div key={`user-roles-table-row-${id}-${role.id}`} style={{ padding: '0 0.5rem' }}>
                                <BusinessRoleBlock occupantId={occupantId} role={role} userRoles={roles} userId={id} />
                            </div>
                        ))}
                        <FlexWrapper align="center" justify="center" style={{ width: '4rem' }}>
                            <InteractiveIcon
                                action={() => handleRemove(id, firstName, lastName)}
                                color={IconColors.WarningRed}
                                iconAspect="1.5rem"
                                Icon={Remove}
                                aspect="2rem"
                            />
                        </FlexWrapper>
                    </FlexWrapper>
                </div>
            ))}
            {showRemoveWarning && (
                <ModalWithAction
                    header="Remove User"
                    actionText="Confirm"
                    actionCallback={removeAllPermissions}
                    cancelCallback={() => toggleRemoveWarning(false)}
                >
                    <div style={{ padding: '1rem' }}>
                        <h3 style={{ margin: '0 0 0.5rem' }}>{`Remove ${userNameToRemove}`}</h3>
                        <p
                            style={{ margin: '0 0 0.5rem', lineHeight: '1.75' }}
                        >{`This action will remove access for ${userNameToRemove}.`}</p>
                        <p
                            style={{ margin: '0 0 0.5rem', lineHeight: '1.75' }}
                        >{`They will no longer be associated to ${occupantName} at ${propertyName}.`}</p>
                        <p style={{ margin: '0 0 0.5rem', lineHeight: '1.75' }}>
                            <b>Would you like to continue?</b>
                        </p>
                    </div>
                </ModalWithAction>
            )}
        </>
    );
};

