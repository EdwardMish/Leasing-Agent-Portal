import { useAuth0 } from '@auth0/auth0-react';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import NotificationPanel from '../../Features/Notifications/Panel/NotificationPanel';

import { CurrentUserState } from '../../State';

import EmergencyAlertCreateBubble from '../EmergencyAlertCreateBubble/EmergencyAlertCreateBubble';
import { FeedbackPanel } from '../FeedbackPanel';

import styles from './user-panel.module.css';

function UserPanel() {
    const { logout } = useAuth0();

    const currentUser: CurrentUserState.Types.CurrentUser = useSelector(CurrentUserState.selectors.currentUser);
    const userIsTenant: boolean = useSelector(CurrentUserState.selectors.currentUserIsTenant);

    const [showNotifications, setShowNotifications] = React.useState<boolean>(false);

    return (
        <div className={styles.UserPanelWrapper}>
            {showNotifications === false ? (
                <>
                    <div className={styles.UserPanel}>
                        <p className={styles.UserPanelHeading}>{`${currentUser.firstName} ${currentUser.lastName}`}</p>
                        <Link to="/account">Account</Link>
                        <div
                            className={styles.Notifications}
                            onClick={() => {
                                setShowNotifications(!showNotifications);
                            }}
                        >
                            Notifications
                        </div>
                        <p
                            className={styles.UserPanelLink}
                            onClick={() =>
                                logout({
                                    returnTo: `${BASE_PATH}/logout.html`,
                                })
                            }
                        >
                            Sign Out
                        </p>
                    </div>
                    {userIsTenant ? <FeedbackPanel /> : <EmergencyAlertCreateBubble />}
                </>
            ) : (
                <NotificationPanel closePanel={() => setShowNotifications(false)} />
            )}
        </div>
    );
}

export default UserPanel;
