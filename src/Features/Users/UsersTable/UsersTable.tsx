import * as React from 'react';
import { Link } from 'react-router-dom';

import { User } from '../../../Types';

const styles = require('./users-table.module.css');

interface UsersTableProps {
    users: User[];
    rootPath: string;
}

export const UsersTable: React.FC<UsersTableProps> = ({ users, rootPath }: UsersTableProps) => (
    <div className={styles.UsersTable}>
        {
            users.map((user: User) => (
                <Link key={`users-table-row-${user.id}`} to={`${rootPath}/details/${user.id}`}>
                    <div className={styles.UsersTableRow}>
                        <p className={`${styles.UserEmail} ${user.isEnabled ? '' : styles.DisabledUser}`}>{user.email}</p>
                        <p className={styles.UserFirstName}>{user.firstName}</p>
                        <p className={styles.UserLastName}>{user.lastName}</p>
                    </div>
                </Link>
            ))
        }
    </div>
);
