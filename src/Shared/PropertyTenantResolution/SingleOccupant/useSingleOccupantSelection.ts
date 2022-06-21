import * as React from 'react';
import { useSelector } from 'react-redux';

import { PropertyTenantResolution } from '../../../State';
import { PropertyOccupant } from '../../../State/Shared/Types';

import { usePropertyTenantResolution } from '../usePropertyTenantResolution';

type SingleOccupantSelectionHook = () => [
    PropertyOccupant[],
    number,
    (propertyId: number, occupantId?: number) => void,
    (occupantId: number) => void,
    (searchTerm: string) => void,
    boolean,
    boolean,
    PropertyOccupant | undefined
]

const {
    selectors,
} = PropertyTenantResolution;

export const useSingleOccupantSelection: SingleOccupantSelectionHook = () => {
    const [propertiesAreLoaded] = usePropertyTenantResolution();

    const [propertyId, setPropertyId] = React.useState<number>(-1);
    const [selectedOccupantId, setSelectedOccupantId] = React.useState<number>(-1);
    const [occupants, setOccupants] = React.useState<PropertyOccupant[]>([]);
    const [currentSelectedOccupant, setCurrentSelectedOccupant] = React.useState<PropertyOccupant | undefined>();
    const [hasSingleOccupant, setHasSingleOccupant] = React.useState<boolean>(false);

    const { occupants: occupantsOfProperty = [] } = useSelector(selectors.propertyWithOccupants(propertyId));

    React.useEffect(() => {
        setOccupants(occupantsOfProperty);

        if (occupantsOfProperty.length === 1) {
            setHasSingleOccupant(true);
            setSelectedOccupantId(occupantsOfProperty[0].id);
        }
    }, [JSON.stringify(occupantsOfProperty)]);

    React.useEffect(() => {
        if (propertiesAreLoaded && selectedOccupantId > -1) {
            const currentSelected = occupantsOfProperty.find((o: PropertyOccupant) => o.id === selectedOccupantId);

            setCurrentSelectedOccupant(currentSelected);

            if (!currentSelected) {
                setSelectedOccupantId(-1);
            }
        }
    }, [selectedOccupantId, propertyId]);

    const setCurrentProperty = (propertyId: number, occupantId: number) => {
        setPropertyId(propertyId);

        if (occupantId) {
            setSelectedOccupantId(occupantId);
        }
    };

    const selectOccupant = (occupantId: number): void => {
        setSelectedOccupantId(occupantId);
    };

    const searchOccupants = (searchTerm: string) => {
        if (searchTerm) {
            setOccupants(occupantsOfProperty);
        }

        const search = searchTerm.toLowerCase();

        const filteredList: PropertyOccupant[] = occupantsOfProperty.filter((o: PropertyOccupant) => o.name.toLowerCase().includes(search));

        setOccupants(filteredList);
    };

    return [
        occupants,
        selectedOccupantId,
        setCurrentProperty,
        selectOccupant,
        searchOccupants,
        propertiesAreLoaded,
        hasSingleOccupant,
        currentSelectedOccupant,
    ];
};
