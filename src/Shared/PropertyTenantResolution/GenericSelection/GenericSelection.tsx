import * as React from 'react';

import { CheckMark } from '../../../Icons';

const styles = require('./generic-selection.module.css');

interface GenericSelectionProps {
    id: number;
    isActive: boolean;
    toggleSelection: (id: number) => void;
    display: string;
}

export const GenericSelection: React.FC<GenericSelectionProps> = ({
    id,
    isActive,
    toggleSelection,
    display,
}) => (
    <li
        onClick={() => toggleSelection(id)}
        className={`${styles.GenericSelection} ${isActive ? styles.ActiveGenericSelection : styles.InActiveGenericSelection}`}
    >
        <div className={styles.GenericSelectionIndicatorIcon}>{isActive && <CheckMark />}</div>
        <p>{display}</p>
    </li>
);
