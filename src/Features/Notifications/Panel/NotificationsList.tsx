import * as React from 'react';
import { NotificationSummary } from '../../../API/Notifications/Types';
import { LoadingContent, NoContent } from '../../../Shared/PageElements';

import styles = require('./notifications-panel.module.css');

export interface Properties {
    notifications: NotificationSummary[];
    handleSelect: (notificationId: number) => void;
    children?: React.ReactNode;
}

const NotificationsList = ({ notifications, handleSelect, children }: Properties): React.ReactElement => (

    <>
        {
            notifications && notifications.length > 0
                ? (
                    <ul className={`${styles.NotificationList} ${styles.ScrollWrapper}`}>
                        {
                            notifications.map((notification) => (
                                <div key={`notification-${notification.id}`} onClick={() => handleSelect(notification.id)}>
                                    <li className={`${styles.Notification}`}>
                                        <p className={styles.Subject}>{notification.subject}</p>
                                        <p className={styles.Date}>{new Date(notification.created).toLocaleString()}</p>
                                    </li>
                                </div>
                            ))
                        }
                        {children}
                    </ul>
                )
                : (
                    <>
                        {
                            notifications && notifications.length === 0
                                ? <NoContent message="No notifications available at this time." />
                                : <LoadingContent />
                        }
                    </>
                )
        }
    </>
);

export default NotificationsList;
