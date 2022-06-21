import * as React from 'react';

import { toggleUserProperty, UserPropertiesAPI } from '../../../API/User';
import { MultiplePropertySelection, useMultiplePropertySelection } from '../../../Shared/PropertyTenantResolution';
import { SecondaryTitle } from '../../../Shared/PageElements';

interface PropertySelectionProps {
    userId: number;
}

export const PropertySelection: React.FC<PropertySelectionProps> = ({ userId }) => {
    const [userPropertiesLoaded, toggleLoaded] = React.useState<boolean>(false);

    const [availableProperties, selectedProperties, addMultipleProperties, toggleProperty, searchProperties, loaded] =
        useMultiplePropertySelection();

    React.useEffect(() => {
        UserPropertiesAPI.get(userId).then((properties: UserPropertiesAPI.Property[]) => {
            addMultipleProperties(properties.map((p: UserPropertiesAPI.Property) => p.id));
            toggleLoaded(true);
        });
    }, [userId]);

    const handleUserPropertyToggle = (propertyId: number): void => {
        toggleUserProperty(userId, propertyId, selectedProperties).then(() => {
            toggleProperty(propertyId);
        });
    };

    return userPropertiesLoaded && loaded ? (
        <>
            <MultiplePropertySelection
                availableProperties={availableProperties}
                selectedProperties={selectedProperties}
                searchHandler={searchProperties}
                propertyHandler={handleUserPropertyToggle}
                loaded={loaded}
            />
        </>
    ) : (
        <SecondaryTitle title="Loading Properties..." />
    );
};

