import * as React from 'react';

import { PropertyWithOccupants } from '../../../State/Shared/Types';

import { Search } from '../../Search';
import { LoadingContent, ToggleIcon } from '../../PageElements';
import { PropertySelection } from '../PropertySelection';
import { PropertyTenantSelectionHeader } from '../PropertyTenantSelectionHeader';

const styles = require('../property-tenant-resolution.module.css');

interface DropDownSelectorProps {
    availableOptions: any[];
    selectedOptionId?: number;
    visibleOptions: number[];
    searchHandler: (searchTerm: string) => void;
    selectOptionHandler: (propertyId: number) => void;
    loaded: boolean;
    searchPlaceholder?: string;
    loadingMessage?: string;
    headerType?: 'Tenant' | 'Property' | 'T' | 'P' | 't' | 'p' | 'Space';
}

export const DropDownSelector: React.FC<DropDownSelectorProps> = ({
    availableOptions,
    selectedOptionId,
    visibleOptions,
    searchHandler,
    selectOptionHandler,
    loaded,
    searchPlaceholder = 'Search Properties',
    loadingMessage = 'Loading Properties',
    headerType = 'Property',
}) => {
    const [filterVisible, toggleFilter] = React.useState<boolean>(false);
    const [selectedProperty, setSelectedProperty] = React.useState<PropertyWithOccupants>();
    const [showList, toggleShowList] = React.useState<boolean>(false);
    const [showSelected, toggleShowSelected] = React.useState<boolean>(false);
    const [propertyList, setPropertyList] = React.useState<PropertyWithOccupants[]>(availableOptions);

    const visibleOptionsSet = new Set(visibleOptions);

    React.useEffect(() => {
        if (showSelected) {
            setPropertyList(availableOptions.filter((property) => property.id === selectedOptionId));
        } else {
            setPropertyList(availableOptions);
        }
    }, [showSelected, availableOptions.length]);

    React.useEffect(() => {
        const selected = availableOptions.find((p: PropertyWithOccupants) => p.id === selectedOptionId);

        selected ? setSelectedProperty(selected) : setSelectedProperty(undefined);
    }, [selectedOptionId]);

    const action = () => {
        toggleShowList(!showList);
        searchHandler('');
        toggleFilter(false);
    };

    const handlePropertySelection = (id: number) => {
        toggleShowList(false);
        selectOptionHandler(id);
    };

    const clearSearch = () => {
        toggleFilter(false);
        searchHandler('');
    };

    const handleSearch = (searchTerm: string): void => {
        if (!filterVisible) toggleFilter(true);

        searchHandler(searchTerm);
    };

    return loaded ? (
        <>
            <PropertyTenantSelectionHeader
                propertyOrOccupant={selectedProperty}
                handler={action}
                listActive={showList}
                type={headerType}
                withMargin
            />
            {showList && (
                <>
                    <Search
                        handler={handleSearch}
                        placeholder={searchPlaceholder}
                        cleanUpCallback={clearSearch}
                        clearCallback={clearSearch}
                    />
                    <ToggleIcon
                        active={showSelected}
                        message="Show Selected Only"
                        toggle={() => toggleShowSelected(!showSelected)}
                    />
                    <ul className={`${styles.list} ${styles.PropertySelect}`}>
                        {propertyList
                            .filter((p: PropertyWithOccupants) => !filterVisible || visibleOptionsSet.has(p.id))
                            .map((property: PropertyWithOccupants) => (
                                <PropertySelection
                                    key={`${property.id}-available`}
                                    property={property}
                                    togglePropertySelection={handlePropertySelection}
                                    activePropertyIds={[selectedOptionId]}
                                />
                            ))}
                    </ul>
                </>
            )}
        </>
    ) : (
        <LoadingContent message={loadingMessage} />
    );
};

