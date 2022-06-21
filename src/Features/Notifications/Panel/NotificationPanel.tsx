import * as React from 'react';
import NotificationsAPI, { Types } from '../../../API/Notifications';
import { NotificationSummary } from '../../../API/Notifications/Types';
import { PagedSortedFilteredRequestParams, SortColumn } from '../../../API/Shared/PagedSortedFilteredRequest';
import { ArrowLeftCircle, Close, Gear } from '../../../Icons';
import { Types as TableTypes } from '../../../Shared/Table';
import Details from '../Details';
import NotificationsList from './NotificationsList';
import SettingsMenu from './SettingsMenu';

import styles = require('./notifications-panel.module.css');
import { Button } from '../../../Shared/Button/Button';

const sortColumn: SortColumn[] = [
    { columnName: 'Id', sortDirection: TableTypes.SortDirection.DESC },
];

export interface NotificationsPanelProperties {
    closePanel: () => void
}

const NotificationPanel: React.FC<NotificationsPanelProperties> = ({ closePanel }) => {
    const [notifications, setNotifications] = React.useState<Types.NotificationSummary[]>([]);
    const [selectedNotificationId, setSelectedNotificationId] = React.useState<number>(0);
    const [showSettingsMenu, toggleNotificationPanel] = React.useState<boolean>(false);
    const [currentPage, setCurrentPage] = React.useState<number>(1);

    const loadMoreNotifications = () => {
        NotificationsAPI.getAll(new PagedSortedFilteredRequestParams(sortColumn, [], 10, currentPage))
            .then((notificationSummaries: NotificationSummary[]) => {
                setNotifications(notifications.concat(notificationSummaries));
                setCurrentPage(currentPage + 1);
            });
    };

    React.useEffect(() => {
        if (!selectedNotificationId) {
            loadMoreNotifications();
        }
    }, []);

    const showNotificationDetails = (notificationId: number) => {
        setSelectedNotificationId(notificationId);
    };

    const removeNotification = (notificationId: number) => {
        setNotifications(notifications?.filter((_) => _.id !== notificationId));
    };

    return (
        <>
            {
                selectedNotificationId
                    ? (
                        <>
                            <div className={styles.Banner}>
                                <div className={styles.Action} onClick={() => { setSelectedNotificationId(0); }}>
                                    <ArrowLeftCircle />
                                    <p>Back to List</p>
                                </div>
                            </div>
                            <Details notificationId={selectedNotificationId} removeNotification={removeNotification} />
                        </>
                    )
                    : (
                        <>
                            <div className={styles.Banner}>
                                <div className={styles.Action} onClick={() => closePanel()}>
                                    <ArrowLeftCircle />
                                    <p>Close Notifications</p>
                                </div>
                                <div
                                    className={styles.Action}
                                    onClick={() => {
                                        toggleNotificationPanel(!showSettingsMenu);
                                    }}
                                >
                                    {
                                        showSettingsMenu ? <Close aspect="1.5rem" /> : <Gear />
                                    }
                                </div>
                            </div>
                            {
                                showSettingsMenu
                                    ? <SettingsMenu />
                                    : (
                                        <div className={styles.Container}>
                                            <NotificationsList
                                                notifications={notifications}
                                                handleSelect={showNotificationDetails}
                                            >
                                                <Button callback={loadMoreNotifications} text='Load More' fullWidth withMarginTop />
                                            </NotificationsList>

                                        </div>
                                    )
                            }
                        </>
                    )
            }
        </>
    );
};

export default NotificationPanel;
