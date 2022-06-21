import * as React from 'react';
import { useSelector } from 'react-redux';

import { PropertyTenantResolution } from '../../../State';
import { PropertyWithOccupants } from '../../../State/Shared/Types';

import { usePropertyTenantResolution } from '../usePropertyTenantResolution';

type MultiplePropertySelectionHook = () => [
    PropertyWithOccupants[],
    number[],
    (propertyIds: number[]) => void,
    (propertyId: number) => void,
    (searchTerm: string) => void,
    boolean
];

export const useMultiplePropertySelection: MultiplePropertySelectionHook = () => {
    const [propertiesAreLoaded] = usePropertyTenantResolution();

    const allProperties: PropertyWithOccupants[] = useSelector(PropertyTenantResolution.selectors.sortedPropertiesWithOccupantsList);

    const [properties, setProperties] = React.useState<PropertyWithOccupants[]>([]);
    const [selectedProperties, setSelectedProperties] = React.useState<number[]>([]);

    React.useEffect(() => {
        if (allProperties.length > 0) {
            setProperties(allProperties);
        }
    }, [allProperties.length]);

    const addMultipleProperties = (propertyIds: number[]): void => {
        const idsToAdd = propertyIds.filter((id: number) => !selectedProperties.includes(id));

        setSelectedProperties([
            ...selectedProperties,
            ...idsToAdd,
        ]);
    };

    const toggleProperty = (propertyId: number): void => {
        if (selectedProperties.includes(propertyId)) {
            const propertyIndex = selectedProperties.indexOf(propertyId);

            setSelectedProperties([
                ...selectedProperties.slice(0, propertyIndex),
                ...selectedProperties.slice(propertyIndex + 1),
            ]);

            return;
        }

        setSelectedProperties([
            propertyId,
            ...selectedProperties,
        ]);
    };

    const searchProperties = (searchTerm: string) => {
        if (searchTerm.length <= 0) {
            setProperties(allProperties);
        }

        const search = searchTerm.toLowerCase();

        const filteredList: PropertyWithOccupants[] = allProperties.filter((p: PropertyWithOccupants) => p.name.toLowerCase().includes(search));

        setProperties(filteredList);
    };

    return [
        properties,
        selectedProperties,
        addMultipleProperties,
        toggleProperty,
        searchProperties,
        propertiesAreLoaded,
    ];
};
