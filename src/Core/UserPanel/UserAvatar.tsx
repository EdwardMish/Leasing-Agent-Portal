import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NotificationsAPI from '../../API/Notifications';

import { CurrentUserState, Notifications } from '../../State';

import styles from './user-panel.module.css';

const userImageData: string =
    'data:image/jpeg;base64,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';

function UserAvatar(): React.ReactElement {
    const dispatch = useDispatch();

    const currentUser: CurrentUserState.Types.CurrentUser = useSelector(CurrentUserState.selectors.currentUser);

    const notificationsCount = useSelector(Notifications.selectors.notificationsCount);

    React.useEffect(() => {
        NotificationsAPI.getUnreadNotificationsCount()
            .then((response) => {
                dispatch({
                    type: Notifications.Actions.SET_COUNT,
                    payload: response.count,
                } as Notifications.ActionTypes);
            })
            .catch((err) => {
                console.log('Error: ', err);
            });
    }, []);

    return (
        <>
            <div className={styles.UserAvatar}>
                <img src={userImageData} alt={currentUser.firstName} />
                <span>{notificationsCount}</span>
            </div>
        </>
    );
}

export default UserAvatar;
