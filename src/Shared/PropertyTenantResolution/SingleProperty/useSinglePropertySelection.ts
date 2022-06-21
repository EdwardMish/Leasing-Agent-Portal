import * as React from 'react';
import { useSelector } from 'react-redux';

import { PropertyTenantResolution } from '../../../State';
import { PropertyWithOccupants } from '../../../State/Shared/Types';
import { usePropertyTenantResolution } from '../usePropertyTenantResolution';

type SinglePropertySelectionHook = () => [
    PropertyWithOccupants[],
    number,
    number[],
    (propertyId: number) => void,
    (searchTerm: string) => void,
    boolean,
    boolean
];

const {
    selectors,
} = PropertyTenantResolution;

export const useSinglePropertySelection: SinglePropertySelectionHook = () => {
    const [propertiesAreLoaded] = usePropertyTenantResolution();

    const properties: PropertyWithOccupants[] = useSelector(selectors.sortedPropertiesWithOccupantsList);

    const [selectedPropertyId, setSelectedProperty] = React.useState<number>(-1);
    const [visibleProperties, setVisibleProperties] = React.useState<number[]>([]);
    const [hasSingleProperty, setHasSingleProperty] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (propertiesAreLoaded && properties.length === 1) {
            setHasSingleProperty(true);
            setSelectedProperty(properties[0].id);
        }
    }, [propertiesAreLoaded]);

    const selectProperty = (propertyId: number | string): void => {
        const id = typeof propertyId === 'string'
            ? parseInt(propertyId)
            : propertyId;

        setSelectedProperty(id);
    };

    const searchProperties = (searchTerm: string) => {
        if (!searchTerm) {
            setVisibleProperties([]);
        }

        const term = searchTerm.toLowerCase();

        const filteredList: number[] = properties.filter((p: PropertyWithOccupants) => p.name.toLowerCase().includes(term)).map((p) => p.id);

        setVisibleProperties(filteredList);
    };

    return [
        properties,
        selectedPropertyId,
        visibleProperties,
        selectProperty,
        searchProperties,
        propertiesAreLoaded,
        hasSingleProperty,
    ];
};
