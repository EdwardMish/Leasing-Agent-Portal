import * as React from 'react';
import { useDispatch } from 'react-redux';

import NotificationsAPI from '../../../API/Notifications';

import { globalMessageActionCreators, Notifications } from '../../../State';

import styles = require('./settings-menu.module.css');

const SettingsMenu = (): React.ReactElement => {
    const dispatch = useDispatch();

    const [deleting, setDeleting] = React.useState<boolean>(false);

    const deleteAll = () => {
        setDeleting(true);

        NotificationsAPI.deleteAllNotifications()
            .then(() => {
                dispatch(globalMessageActionCreators.addSuccessMessage('Notifications have been cleared.'));

                // Clear the notification count
                dispatch({
                    type: Notifications.Actions.SET_COUNT,
                    payload: 0,
                } as Notifications.ActionTypes);
                setDeleting(false);
            })
            .catch(() => {
                dispatch(globalMessageActionCreators.addSuccessMessage(
                    'We were not able to clear your notifications. Please try again.'
                ));
                setDeleting(false);
            });
    };

    return (
        <div className={styles.SettingsMenu}>
            {
                deleting
                    ? <p>Clearing Notifications, please wait.</p>
                    : <p className={styles.Active} onClick={() => { deleteAll(); }}>Clear All Notifications</p>
            }
        </div>
    );
};

export default SettingsMenu;
