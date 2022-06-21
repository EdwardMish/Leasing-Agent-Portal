import * as React from 'react';
import { useDispatch } from 'react-redux';

import NotificationsAPI, { Types } from '../../../API/Notifications';

import { EditorContentDisplay } from '../../../Shared/Content';
import { LoadingContent } from '../../../Shared/PageElements';

import { Notifications as NotificationsState } from '../../../State';

import styles = require('./notifications-details.module.css');

interface Properties {
    notificationId: number;
    removeNotification: (notificationId: number) => void;
}

const Details = ({ notificationId, removeNotification }: Properties): React.ReactElement => {
    const dispatch = useDispatch();

    const [notificationLoaded, setNotificationLoaded] = React.useState<boolean>(false);
    const [notification, setNotification] = React.useState<Types.NotificationDetail>();

    React.useEffect(() => {
        NotificationsAPI.getDetail(notificationId)
            .then((notificationDetail: Types.NotificationDetail) => {
                setNotification(notificationDetail);
                setNotificationLoaded(true);

                NotificationsAPI.deleteNotification(notificationId)
                    .then(() => {
                        removeNotification(notificationId);

                        dispatch({
                            type: NotificationsState.Actions.DECREASE_COUNT,
                            payload: 1,
                        });
                    });
            });
    }, []);

    return (
        <>
            {
                notificationLoaded
                    ? (
                        <div className={`${styles.NotificationDetails} ${styles.ScrollWrapper}`}>
                            <h1>{notification?.subject}</h1>
                            <div>
                                <EditorContentDisplay content={notification?.description} />
                            </div>
                        </div>
                    )
                    : <LoadingContent message="Loading Notification Details" />
            }
        </>
    );
};

export default Details;
