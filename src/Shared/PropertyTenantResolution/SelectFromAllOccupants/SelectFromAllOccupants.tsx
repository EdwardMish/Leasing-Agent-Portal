import * as React from 'react';

import { ArrowUpCircle, ArrowDownCircle, Remove } from '../../../Icons';
import { LoadingContent, SecondaryTitleWithAction, ToggleIcon } from '../../../Shared/PageElements';
import { Search } from '../../../Shared/Search';
import { StateProperty } from '../StateProperty';
import { PropertyWithOccupants } from '../../../State/Shared/Types';

const styles = require('./select-from-all-occupants.module.css');

interface SelectFromAllOccupantsProps {
    properties: PropertyWithOccupants[];
    selectedOccupants: number[];
    visibleOccupants: number[];
    propertiesAreLoaded: boolean;
    toggleOccupants: (occupantIds: number[], operator?: string) => void;
    searchHandler: (searchTerm: string) => void;
}

export const SelectFromAllOccupants: React.FC<SelectFromAllOccupantsProps> = ({
    properties,
    selectedOccupants,
    visibleOccupants,
    propertiesAreLoaded,
    toggleOccupants,
    searchHandler,
}) => {
    const [activeSearch, toggleActiveSearch] = React.useState<boolean>(false);
    const [showSelected, toggleShowSelected] = React.useState<boolean>(false);
    const [searchInput, setSearchTerm] = React.useState<string>();
    const [forceClearSearch, setForceClearSearch] = React.useState<boolean>(false);
    const [forceOccupantListOpen, setForceOccupantListOpen] = React.useState<boolean>(false);
    const [forceOccupantListClosed, setForceOccupantListClosed] = React.useState<boolean>(false);

    const selectedOccupantsSet = new Set(selectedOccupants);
    const visibleOccupantsSet = new Set(visibleOccupants);

    const [occupantsList, toggleList] = React.useState<boolean>(false);

    const checkAll = (e: React.SyntheticEvent<HTMLButtonElement>): void => {
        e.preventDefault();

        toggleOccupants(visibleOccupants, 'add');
    };

    const uncheckAll = (e: React.SyntheticEvent<HTMLButtonElement>): void => {
        e.preventDefault();

        toggleOccupants(visibleOccupants, 'remove');
    };

    const action = {
        callBack: () => {
            toggleList(!occupantsList);
            searchHandler('');

            if (activeSearch) toggleActiveSearch(false);
            if (forceOccupantListOpen) setForceOccupantListOpen(false);
            if (forceOccupantListClosed) setForceOccupantListClosed(false);
        },
    };

    const search = (searchTerm: string) => {
        setSearchTerm(searchTerm);
        searchHandler(searchTerm);

        if (!activeSearch) toggleActiveSearch(true);
        if (!forceOccupantListOpen) setForceOccupantListOpen(true);
        if (forceOccupantListClosed) setForceOccupantListClosed(false);
    };

    const clearSearch = () => {
        searchHandler('');

        if (activeSearch) toggleActiveSearch(false);
        if (forceOccupantListOpen) setForceOccupantListOpen(false);
        if (!forceOccupantListClosed) setForceOccupantListClosed(true);
    };

    return (
        propertiesAreLoaded
            ? (
                <>
                    <SecondaryTitleWithAction
                        title={selectedOccupants.length > 0 ? `${selectedOccupants.length} Neighbors Selected` : 'Select Neighbors'}
                        action={action}
                        ActionIcon={occupantsList ? ArrowUpCircle : ArrowDownCircle}
                    />
                    {
                        occupantsList
                    && (
                        <>
                            <Search
                                handler={search}
                                placeholder="Search Neighbors"
                                cleanUpCallback={clearSearch}
                                clearCallback={clearSearch}
                                forceClear={forceClearSearch}
                                debounceDelay={500}
                            />
                            <ToggleIcon active={showSelected} message="Show Selected Only" toggle={() => toggleShowSelected(!showSelected)} />
                            <div className={styles.StatePropertyList}>
                                <>
                                    <>
                                        {
                                            activeSearch
                                            && (
                                                <>
                                                    <div className={styles.ActiveSearch}>
                                                        <p>{`Currently Searching: ${searchInput}`}</p>
                                                        <div
                                                            className={styles.ActiveSearchIcon}
                                                            onClick={() => {
                                                                toggleActiveSearch(false);
                                                                setForceClearSearch(true);
                                                            }}
        >
                                                            <Remove />
                                                        </div>
                                                    </div>
                                                    <div className={styles.ButtonRow}>
                                                        <button onClick={checkAll}>Check All</button>
                                                        <button onClick={uncheckAll}>Uncheck All</button>
                                                    </div>
                                                </>
                                            )
                                        }
                                        {
                                            properties.map(({ id, name, occupants }: PropertyWithOccupants) => (
                                                <StateProperty
                                                    key={`state-property-${id}`}
                                                    id={id}
                                                    name={name}
                                                    occupants={occupants}
                                                    occupantIds={occupants.map((o) => o.id)}
                                                    activeSearch={activeSearch}
                                                    showSelectedOnly={showSelected}
                                                    toggleOccupants={toggleOccupants}
                                                    selectedOccupants={selectedOccupantsSet}
                                                    visibleOccupants={visibleOccupantsSet}
                                                    forceOccupantListClosed={forceOccupantListClosed}
                                                    forceOccupantListOpen={forceOccupantListOpen}
                                                />
                                            ))
                                        }

                                    </>
                                </>
                            </div>
                        </>
                    )
                    }
                </>
            )
            : <LoadingContent />
    );
};
