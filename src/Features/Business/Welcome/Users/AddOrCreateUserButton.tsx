import * as React from 'react';
import { Link } from 'react-router-dom';

import { Add, IconColors } from '../../../../Icons';

import styles = require('../welcome.module.css');

interface AddOrCreateUserProps {
    baseRoute: string;
    createOnly?: boolean;
}

const AddOrCreateUserButton: React.FC<AddOrCreateUserProps> = ({ baseRoute, createOnly }) => (createOnly ? (
    <Link to={`/app/welcome/users/${baseRoute}/create-user`} className={styles.AddOrCreateUser}>
        <p>Create User</p>
        <Add color={IconColors.BrandBlue} aspect="1.5rem" />
    </Link>
) : (
    <Link to={`/app/welcome/users/${baseRoute}/add-users`} className={styles.AddOrCreateUser}>
        <p>Add or Create User</p>
        <Add color={IconColors.BrandBlue} aspect="1.5rem" />
    </Link>
));

export default AddOrCreateUserButton;
