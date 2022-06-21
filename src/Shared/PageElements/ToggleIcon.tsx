import * as React from 'react';

import { ToggleLeft, ToggleRight } from '../../Icons';

const styles = require('./toggle-icon.module.css');

interface ToggleIconProps {
    active: boolean;
    message: string;
    toggle: () => void;
}

export const ToggleIcon: React.FC<ToggleIconProps> = ({ active, message, toggle }) => (
    <div className={styles.ActiveToggleIcon} onClick={toggle}>
        {
            active
                ? <ToggleRight />
                : <ToggleLeft />
        }
        <p>{message}</p>
    </div>
);
