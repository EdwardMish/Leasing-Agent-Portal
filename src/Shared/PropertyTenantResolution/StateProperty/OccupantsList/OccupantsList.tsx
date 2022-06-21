import * as React from 'react';

import { TenantSelection } from '../../../../Shared/PropertyTenantResolution';
import { PropertyOccupant } from '../../../../State/Shared/Types';

interface OccupantsListProps {
    occupants: PropertyOccupant[];
    visibleOccupants: Set<number>;
    showSelectedOnly: boolean;
    selectedOccupants: Set<number>;
    toggleOccupants: (occupantIds: number[]) => void;
    filterVisible?: boolean;
}

export const OccupantsList: React.FC<OccupantsListProps> = ({
    occupants,
    visibleOccupants,
    showSelectedOnly,
    selectedOccupants,
    toggleOccupants,
    filterVisible = false,
}) => {
    const selectTenant = (occupantId: number): void => {
        toggleOccupants([occupantId]);
    };

    return (
        <>
            {
                occupants
                    .filter((o: PropertyOccupant) => !showSelectedOnly || selectedOccupants.has(o.id))
                    .filter((o: PropertyOccupant) => !filterVisible || visibleOccupants.has(o.id))
                    .map((o: PropertyOccupant) => (
                        <TenantSelection
                            key={`tenant-selection-${o.id}`}
                            activeOccupantIds={selectedOccupants}
                            toggleOccupantSelection={selectTenant}
                            name={o.name}
                            id={o.id}
                        />
                    ))
            }
        </>
    );
};
