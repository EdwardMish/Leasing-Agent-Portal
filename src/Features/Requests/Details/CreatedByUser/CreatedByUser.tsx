import * as React from 'react';

import styles = require('./created-by-user.module.css');

interface Properties {
    name: string;
    email: string;
}

const CreatedByUser: React.FC<Properties> = ({ name, email }) => (
    <div className={styles.CreatedByUser}>
        <p><b>Created By:</b></p>
        <p>{name}</p>
        {email && <p className={styles.UserEmail}>{email}</p>}
    </div>
);

export default CreatedByUser;
