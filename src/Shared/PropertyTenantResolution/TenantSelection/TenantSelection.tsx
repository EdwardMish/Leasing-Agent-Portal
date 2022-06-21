import * as React from 'react';

import { CheckMark } from '../../../Icons';

const styles = require('./tenant-selection.module.css');

interface TenantSelectionProps {
    activeOccupantIds: number[] | Set<number>;
    toggleOccupantSelection: (occupantId: number) => void;
    name: string;
    id: number;
}

export const TenantSelection: React.FC<TenantSelectionProps> = ({
    activeOccupantIds,
    toggleOccupantSelection,
    name,
    id,
}) => {
    const isActive = activeOccupantIds instanceof Array
        ? activeOccupantIds.includes(id)
        : activeOccupantIds.has(id);

    return (
        <li
            onClick={() => toggleOccupantSelection(id)}
            className={`${styles.OccupantSelection} ${isActive ? styles.ActiveOccupantSelection : styles.InActiveOccupantSelection}`}
        >
            <div className={styles.OccupantSelectionIndicatorIcon}>{isActive && <CheckMark />}</div>
            <p>{name}</p>
        </li>
    );
};
