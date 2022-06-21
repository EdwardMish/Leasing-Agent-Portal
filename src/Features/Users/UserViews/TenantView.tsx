import * as React from 'react';

import { SelectFromAllOccupants, useSelectFromAllOccupants } from '../../../Shared/PropertyTenantResolution';
import { LoadingContent } from '../../../Shared/PageElements';

interface TenantViewProps {
    setTenants: (tenantIds: number[]) => void;
}

export const TenantView: React.FC<TenantViewProps> = ({ setTenants }) => {
    const [
        propertiesWithOccupants,
        selectedOccupants,
        visibleOccupants,
        propertiesAreLoaded,
        toggleOccupantSelection,
        searchHandler,
    ] = useSelectFromAllOccupants();

    React.useEffect(() => {
        setTenants(selectedOccupants);
    }, [selectedOccupants]);

    return (
        propertiesAreLoaded
            ? (
                <SelectFromAllOccupants
                    properties={propertiesWithOccupants}
                    selectedOccupants={selectedOccupants}
                    visibleOccupants={visibleOccupants}
                    propertiesAreLoaded={propertiesAreLoaded}
                    toggleOccupants={toggleOccupantSelection}
                    searchHandler={searchHandler}
                />
            )
            : <LoadingContent />
    );
};
