import * as React from 'react';

import { Search } from '../../../../Shared/Search';
import { LoadingContent, ToggleIcon } from '../../../../Shared/PageElements';
import {
    PropertyTenantSelectionHeader,
    DropDownSelector,
    TenantSelection,
    useSingleOccupantSelection,
    useSinglePropertySelection,
} from '../../../../Shared/PropertyTenantResolution';

import { PropertyOccupant } from '../../../../State/Shared/Types';

import { LocationInputs } from '../LocationInputs';

const styles = require('../location-selector.module.css');

export const MultipleLocations: React.FC<{}> = () => {
    const [showTenants, toggleShowTenants] = React.useState<boolean>(false);
    const [showActiveOccupants, toggleActiveOccupants] = React.useState<boolean>(false);
    const [occupantList, setOccupantList] = React.useState<PropertyOccupant[]>([]);

    const [
        availableProperties,
        selectedPropertyId,
        visibleProperties,
        selectProperty,
        searchProperties,
        propertiesAreLoaded,
    ] = useSinglePropertySelection();

    const [
        availableOccupants,
        selectedOccupantId,
        setActiveProperty,
        selectOccupant,
        searchOccupants,
        occupantsAreLoaded,
        hasSingleOccupant,
        currentOccupant,
    ] = useSingleOccupantSelection();

    React.useEffect(() => {
        showActiveOccupants
            ? setOccupantList(availableOccupants.filter((occupant) => occupant.id === selectedOccupantId))
            : setOccupantList(availableOccupants);

        // NOOP For TS Checks, PH
        if (hasSingleOccupant) {
        }
    }, [showActiveOccupants, JSON.stringify(availableOccupants)]);

    const handlePropertySelection = (propertyId: number) => {
        setActiveProperty(propertyId);

        selectProperty(propertyId);
    };

    const handleOccupantSelection = (occupantId: number) => {
        selectOccupant(occupantId);

        toggleShowTenants(false);
    };

    const handlePropertySearch = (searchInput: string): void => {
        searchProperties(searchInput);
    };

    const handleOccupantSearch = (searchInput: string): void => {
        searchOccupants(searchInput);
    };

    const handleOccupantToggle = () => {
        toggleShowTenants(!showTenants);
        searchOccupants('');
    };

    return (
        <div className={styles.LocationSelector}>
            <DropDownSelector
                availableOptions={availableProperties}
                selectedOptionId={selectedPropertyId}
                visibleOptions={visibleProperties}
                searchHandler={handlePropertySearch}
                selectOptionHandler={handlePropertySelection}
                loaded={propertiesAreLoaded}
            />
            {selectedPropertyId > -1 && (
                <>
                    {occupantsAreLoaded ? (
                        <PropertyTenantSelectionHeader
                            propertyOrOccupant={currentOccupant}
                            handler={handleOccupantToggle}
                            listActive={showTenants}
                            type="t"
                        />
                    ) : (
                        <LoadingContent message="Loading Tenants" />
                    )}
                </>
            )}
            {selectedPropertyId > -1 && showTenants && (
                <>
                    <Search handler={handleOccupantSearch} />
                    <ToggleIcon
                        active={showActiveOccupants}
                        message="Show Selected Only"
                        toggle={() => toggleActiveOccupants(!showActiveOccupants)}
                    />
                    <ul className={`${styles.list} ${styles.PropertySelect}`}>
                        {occupantList.map((occupancy: PropertyOccupant) => (
                            <TenantSelection
                                key={`${occupancy.id}-available`}
                                toggleOccupantSelection={handleOccupantSelection}
                                activeOccupantIds={[selectedOccupantId]}
                                name={occupancy.name}
                                id={occupancy.id}
                            />
                        ))}
                    </ul>
                </>
            )}
            <LocationInputs occupantId={selectedOccupantId} propertyId={selectedPropertyId} />
        </div>
    );
};

