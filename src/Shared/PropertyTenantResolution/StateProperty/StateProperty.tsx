import * as React from 'react';

import { Close, List } from '../../../Icons';

import { GenericSelection } from '../../../Shared/PropertyTenantResolution';

import { PropertyOccupant } from '../../../State/Shared/Types';

import { PropertySelectState } from '../../../Types';

import { OccupantsList } from './OccupantsList';

import { PropertySelectStateIcon, PropertySelectStateText } from './PropertySelectState';

const styles = require('./state-property.module.css');

interface StatePropertyProps {
    id: number,
    name: string,
    occupants: PropertyOccupant[],
    occupantIds: number[],
    activeSearch: boolean;
    showSelectedOnly: boolean;
    toggleOccupants: (occupantIds: number[], operator?: string) => void;
    selectedOccupants: Set<number>;
    visibleOccupants: Set<number>;
    forceOccupantListOpen?: boolean;
    forceOccupantListClosed?: boolean;
}

export const StateProperty: React.FC<StatePropertyProps> = ({
    id,
    name,
    occupants,
    occupantIds,
    activeSearch,
    showSelectedOnly,
    toggleOccupants,
    selectedOccupants,
    visibleOccupants,
    forceOccupantListOpen = false,
    forceOccupantListClosed = false,
}) => {
    const occupantCount = occupantIds.length;

    const [showOccupants, toggleShowOccupants] = React.useState<boolean>(false);
    const [selectedOccupantCount, setSelectedOccupantCount] = React.useState<number>(0);
    const [selectState, setPropertySelectState] = React.useState<PropertySelectState>(PropertySelectState.NONE);
    const [visibleCount, setVisibleCount] = React.useState<number>(0);

    React.useEffect(() => {
        if (forceOccupantListOpen) {
            toggleShowOccupants(true);
        }

        if (forceOccupantListClosed) {
            toggleShowOccupants(false);
        }
    }, [forceOccupantListOpen, forceOccupantListClosed]);

    React.useEffect(() => {
        const selectedCount: number = occupantIds.filter((id) => selectedOccupants.has(id)).length;

        setSelectedOccupantCount(selectedCount);

        switch (occupantCount - selectedCount) {
        case occupantCount:
            setPropertySelectState(PropertySelectState.NONE);
            break;
        case 0:
            setPropertySelectState(PropertySelectState.ALL);
            break;
        default:
            setPropertySelectState(PropertySelectState.SOME);
            break;
        }
    }, [selectedOccupants]);

    React.useEffect(() => {
        setVisibleCount(occupantIds.filter((id) => visibleOccupants.has(id)).length);
    }, [visibleOccupants]);

    const selectProperty = (): void => {
        toggleOccupants(occupantIds, 'add');
    };

    const deselectProperty = (): void => {
        toggleOccupants(occupantIds, 'remove');
    };

    const shouldShowSelf = (): boolean => {
        // When selected only is on: If the propertyState is not NONE
        if (showSelectedOnly && selectState === PropertySelectState.NONE) {
            return false;
        }

        // When searching: If there are visible
        if (activeSearch) {
            return visibleCount > 0;
        }

        // Default: Show all
        return true;
    };

    return (
        <>
            {
                shouldShowSelf()
                    ? (
                        <div className={styles.StatePropertyWrapper}>
                            <div className={styles.StateProperty}>
                                <div className={styles.PropertyName}>
                                    <h2>{name}</h2>
                                </div>
                                {
                                    !activeSearch
                                && (
                                    <div className={styles.StatePropertyActions} onClick={() => toggleShowOccupants(!showOccupants)}>
                                        <div className={`${styles.StatePropertySelectIcon} ${selectState === PropertySelectState.NONE ? styles.InActiveProperty : styles.ActiveProperty}`}>
                                            <PropertySelectStateIcon state={selectState} count={selectedOccupantCount} />
                                        </div>
                                        <PropertySelectStateText state={selectState} count={selectedOccupantCount} />
                                        <div className={styles.StatePropertyShowList}>
                                            {showOccupants ? <Close aspect="1.5rem" /> : <List />}
                                        </div>
                                    </div>
                                )
                                }
                            </div>
                            {
                                showOccupants
                            && (
                                <>
                                    <ul className={styles.OccupantsList}>
                                        {
                                            !activeSearch && !showSelectedOnly
                                                ? selectState === PropertySelectState.ALL
                                                    ? (
                                                        <GenericSelection
                                                            id={id}
                                                            isActive
                                                            toggleSelection={deselectProperty}
                                                            display="Remove All Tenants"
                                                        />
                                                    )
                                                    : (
                                                        <GenericSelection
                                                            id={id}
                                                            isActive={false}
                                                            toggleSelection={selectProperty}
                                                            display="Select All Tenants"
                                                        />
                                                    )
                                                : null
                                        }
                                        <OccupantsList
                                            occupants={occupants}
                                            filterVisible={activeSearch}
                                            showSelectedOnly={showSelectedOnly}
                                            visibleOccupants={visibleOccupants}
                                            selectedOccupants={selectedOccupants}
                                            toggleOccupants={toggleOccupants}
                                        />
                                    </ul>
                                </>
                            )
                            }
                        </div>
                    )
                    : null
            }
        </>
    );
};
