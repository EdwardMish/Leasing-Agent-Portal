import * as React from 'react';
import { useSelector } from 'react-redux';

import { PropertyTenantResolution } from '../../../State';
import { PropertyOccupant, PropertyWithOccupants } from '../../../State/Shared/Types';

import { filterId } from '../../../utils';

import { usePropertyTenantResolution } from '../usePropertyTenantResolution';

type SelectFromAllOccupantsHook = () => [
    PropertyWithOccupants[],
    number[],
    number[],
    boolean,
    (occupantIds: number[], operator?: string) => void,
    (searchTerm: string) => void
]

export const useSelectFromAllOccupants: SelectFromAllOccupantsHook = () => {
    const [propertiesAreLoaded] = usePropertyTenantResolution();

    const properties: PropertyWithOccupants[] = useSelector(PropertyTenantResolution.selectors.sortedPropertiesWithOccupantsList);

    const [allProperties, setProperties] = React.useState<PropertyWithOccupants[]>([]);
    const [allOccupants, setAllOccupants] = React.useState<PropertyOccupant[]>([]);
    const [selectedOccupants, setSelectedOccupants] = React.useState<number[]>([]);
    const [visibleOccupants, setVisibleOccupants] = React.useState<number[]>([]);

    React.useEffect(() => {
        setProperties(properties);
        setAllOccupants(properties.map(({ occupants }: PropertyWithOccupants) => occupants).reduce((agg: PropertyOccupant[], curr: PropertyOccupant[]) => ([...agg, ...curr]), []));
    }, [propertiesAreLoaded, properties.length]);

    const toggleOccupants = (occupantIds: number[], operator?: string): void => {
        let filteredOccupants: number[] = [];

        switch (operator) {
        case 'add':
            const occupantIdSetAdd = new Set([...selectedOccupants, ...occupantIds]);

            occupantIdSetAdd.forEach((id) => {
                filteredOccupants.push(id);
            });

            break;
        case 'remove':
            const occupantIdSetRemove = new Set(occupantIds);

            filteredOccupants = selectedOccupants.filter((id) => !occupantIdSetRemove.has(id));
            break;
        default:
            filteredOccupants = occupantIds.reduce((agg: number[], number) => filterId(number, agg), selectedOccupants);
            break;
        }

        setSelectedOccupants(filteredOccupants);
    };

    const search = (searchTerm: string): void => {
        if (!searchTerm) {
            setVisibleOccupants([]);
            return;
        }

        const term = searchTerm.toLowerCase();

        const activeSearch = allOccupants.filter((o) => o.name.toLowerCase().includes(term)).map((o) => o.id);

        setVisibleOccupants(activeSearch);
    };

    return [
        allProperties,
        selectedOccupants,
        visibleOccupants,
        propertiesAreLoaded,
        toggleOccupants,
        search,
    ];
};
