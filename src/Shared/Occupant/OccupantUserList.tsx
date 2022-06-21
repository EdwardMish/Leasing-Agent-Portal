import * as React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import LocationsAPI, { LocationsOccupantUser } from 'API/Locations';
import { CurrentUserState, globalMessageActionCreators, Occupants } from 'State';

import { formatPhone } from 'utils';

import DynamicContent from 'Shared/PageElements/DynamicContent';

import styles = require('./occupant-user-list.module.css');

type Occupant = Occupants.Types.Occupant;

interface OccupantUserListProps {
    occupant: Occupant;
}

const OccupantUserList: React.FC<OccupantUserListProps> = ({ occupant }) => {
    const dispatch = useDispatch();

    const [loadedOccupantUsers, toggleLoadedOccupantUsers] = React.useState<boolean>(false);
    const [occupantUsers, setOccupantUsers] = React.useState<LocationsOccupantUser[]>([]);

    const currentUserIsOOAdmin = useSelector(CurrentUserState.selectors.currentUserIsOOAdmin);

    const noContentMessage = `No 'registered' users exist for ${occupant.name}.`;

    React.useEffect(() => {
        LocationsAPI.getOccupantUsers(occupant.id)
            .then((users: LocationsOccupantUser[]) => {
                setOccupantUsers(users);
                toggleLoadedOccupantUsers(true);
            })
            .catch((err) => {
                dispatch(
                    globalMessageActionCreators.addErrorMessage(
                        `We were not able to retrieve users for ${occupant?.name || 'this Neighbor'}.`,
                        err,
                    ),
                );
            });
    }, [occupant.id]);

    return (
        <DynamicContent loaded={loadedOccupantUsers} noContent={!occupantUsers.length} noContentMessage={noContentMessage}>
            <div className={styles.OccupantUserList}>
                <table>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Roles</th>
                            <th>Requests Submitted</th>
                            <th>Last Logged In</th>
                        </tr>
                    </thead>
                    <tbody>
                        {occupantUsers.map((user) => (
                            <tr key={`occupant-user-${user.id}`}>
                                <td className={`${user.enabled ? styles.UserEnabled : styles.UserDisabled}`}>
                                    {currentUserIsOOAdmin ? (
                                        <Link key={`occupant-user-${user.id}`} to={`/users/details/${user.id}`}>
                                            <span>{user.name}</span>
                                            <span>{user.email}</span>
                                            {user.mobilePhoneNumber && formatPhone(user.mobilePhoneNumber) && (
                                                <span>{formatPhone(user.mobilePhoneNumber)}</span>
                                            )}
                                        </Link>
                                    ) : (
                                        <>
                                            <span>{user.name}</span>
                                            <span>{user.email}</span>
                                        </>
                                    )}
                                </td>
                                <td>
                                    {user.roles.map(({ id, name }) => (
                                        <span
                                            key={`user-role-table-${id}`}
                                            style={{ display: 'inline-block', width: '100%' }}
                                        >
                                            {name}
                                        </span>
                                    ))}
                                </td>
                                <td>{user.requestsSubmitted}</td>
                                <td>{user.lastLogon}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DynamicContent>
    );
};

export default OccupantUserList;
