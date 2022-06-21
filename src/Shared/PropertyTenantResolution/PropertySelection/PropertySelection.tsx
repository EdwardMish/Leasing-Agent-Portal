import * as React from 'react';

import { CheckMark } from '../../../Icons';
import { PropertyWithOccupants } from '../../../State/Shared/Types';

const styles = require('./property-selection.module.css');

interface PropertySelectionProps {
    activePropertyIds: number[];
    togglePropertySelection: (propertyId: number) => void;
    property: PropertyWithOccupants;
    isActive?: boolean;
}

export const PropertySelection: React.FC<PropertySelectionProps> = ({
    activePropertyIds,
    togglePropertySelection,
    property,
    isActive,
}) => {
    const active = isActive || activePropertyIds.includes(property.id);

    return (
        <li
            onClick={() => togglePropertySelection(property.id)}
            className={`${styles.PropertySelection} ${active ? styles.ActivePropertySelection : styles.InActivePropertySelection}`}
        >
            <div className={styles.PropertySelectionIndicatorIcon}>{active && <CheckMark />}</div>
            <p>{property.name}</p>
        </li>
    );
};
