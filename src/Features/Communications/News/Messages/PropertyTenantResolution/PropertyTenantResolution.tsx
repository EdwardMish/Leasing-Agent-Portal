import * as React from 'react';

import { Occupants } from '../../../../../State';
import { SelectFromAllOccupants, useSelectFromAllOccupants } from '../../../../../Shared/PropertyTenantResolution';

const styles = require('./property-resolution.module.css');

interface PropertyTenantResolution {
    occupants: Occupants.Types.Occupant[];
}

export const PropertyTenantResolution = () => {
    const [
        properties,
        selectedOccupants,
        visibleOccupants,
        propertiesAreLoaded,
        toggleOccupants,
        searchHandler,
    ] = useSelectFromAllOccupants();

    const occupants = selectedOccupants.map((n) => `${n}`);

    return (
        <>
            <SelectFromAllOccupants
                properties={properties}
                selectedOccupants={selectedOccupants}
                visibleOccupants={visibleOccupants}
                propertiesAreLoaded={propertiesAreLoaded}
                toggleOccupants={toggleOccupants}
                searchHandler={searchHandler}
            />
            <select
                className={styles.hiddenInput}
                id="Occupants"
                name="Occupants"
                multiple
                value={occupants}
                onChange={() => { }}
            >
                {
                    selectedOccupants.map((o) => <option value={o} key={`occupant-resolution-option-${o}`} />)
                }
            </select>
        </>
    );
};
