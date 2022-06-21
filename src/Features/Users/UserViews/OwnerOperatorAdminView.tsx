import * as React from 'react';

const styles = require('./user-views.module.css');

export const OwnerOperatorAdminView: React.FC<{}> = () => (
    <>
        <div className={styles.OwnerOperatorAdminView}>
            <p className={styles.OwnerOperatorAdminViewDisclaimer}>Owner/Operator Admin roles have global access to:</p>
            <ul>
                <li>Property Records</li>
                <li>Tenant Records</li>
                <li>Users</li>
                <li>Notifications</li>
                <li>News</li>
                <li>Documents</li>
            </ul>
        </div>
    </>
);
