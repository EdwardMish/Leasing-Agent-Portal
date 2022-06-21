import * as React from 'react';
import { useDispatch } from 'react-redux';

import { addNotificationPreference, removeNotificationPreference } from '../../../API/User';

import { addErrorMessage } from '../../../State/GlobalMessages/actionCreators';

const formStyles = require('../UserForm/user-form.module.css');
const styles = require('./notification-preferences.module.css');

interface NotificationPreferencesProps {
    userId: string | number;
    prefills?: string[];
}

export const NotificationPreferences: React.FC<NotificationPreferencesProps> = ({ userId, prefills = [] }) => {
    const dispatch = useDispatch();

    const [normal, toggleNormal] = React.useState<boolean>(prefills.includes('normal'));
    const [news, toggleNews] = React.useState<boolean>(prefills.includes('news'));
    const [requests, toggleRequests] = React.useState<boolean>(prefills.includes('requests'));
    const [salesSubmittals, toggleSalesSubmittals] = React.useState<boolean>(prefills.includes('salesSubmittal'));

    React.useEffect(() => {
        toggleNormal(prefills.includes('normal'));
        toggleNews(prefills.includes('news'));
        toggleRequests(prefills.includes('requests'));
        toggleSalesSubmittals(prefills.includes('salesSubmittal'));
    }, [prefills]);

    const handleNormal = () => {
        const action = normal ? removeNotificationPreference : addNotificationPreference;

        action(userId, 'Normal').then(() => { toggleNormal(!normal); });
    };

    const handleNews = () => {
        const action = news ? removeNotificationPreference : addNotificationPreference;

        action(userId, 'News').then(() => { toggleNews(!news); });
    };

    const handleSalesSubmittals = () => {
        const action = salesSubmittals ? removeNotificationPreference : addNotificationPreference;

        action(userId, 'SalesSubmittal').then(() => { toggleSalesSubmittals(!salesSubmittals); });
    };

    const handleRequests = () => {
        const action = requests ? removeNotificationPreference : addNotificationPreference;

        action(userId, 'Requests')
            .then(() => { toggleRequests(!requests); })
            .catch(() => {
                dispatch(addErrorMessage('Notification change was not successful.'));
            });
    };

    return (
        <fieldset className={styles.NotificationPreferences}>
            <legend>Notification Preferences</legend>
            <p className={formStyles.UserFormSubText}>Check which types of email you would like to receive.</p>
            <div className={styles.CheckBox}>
                <input
                    checked={normal}
                    id="normal"
                    name="normal"
                    type="checkbox"
                    onChange={handleNormal}
                />
                <label htmlFor="normal">Standard Notifications</label>
            </div>
            <div className={styles.CheckBox}>
                <input
                    checked={news}
                    id="news"
                    name="news"
                    type="checkbox"
                    onChange={handleNews}
                />
                <label htmlFor="news">Community News</label>
            </div>
            <div className={styles.CheckBox}>
                <input
                    checked={requests}
                    id="requests"
                    name="requests"
                    type="checkbox"
                    onChange={handleRequests}
                />
                <label htmlFor="requests">Support Requests</label>
            </div>
            <div className={styles.CheckBox}>
                <input
                    checked={salesSubmittals}
                    id="salesSubmittals"
                    name="salesSubmittals"
                    type="checkbox"
                    onChange={handleSalesSubmittals}
                />
                <label htmlFor="salesSubmittals">Sales Submittals</label>
            </div>
        </fieldset>
    );
};
