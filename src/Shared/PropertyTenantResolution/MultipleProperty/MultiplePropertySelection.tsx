import * as React from 'react';

import { ArrowDownCircle, ArrowUpCircle } from '../../../Icons';

import { PropertyWithOccupants } from '../../../State/Shared/Types';

import { Search } from '../../Search';
import { SecondaryTitle, SecondaryTitleWithAction, ToggleIcon } from '../../PageElements';
import { PropertySelection } from '../PropertySelection';

const styles = require('../property-tenant-resolution.module.css');

interface MultiplePropertySelectionProps {
    availableProperties: PropertyWithOccupants[];
    selectedProperties: number[];
    searchHandler: (searchTerm: string) => void;
    propertyHandler: (propertyId: number) => void;
    loaded: boolean;
}

export const MultiplePropertySelection: React.FC<MultiplePropertySelectionProps> = ({
    availableProperties,
    selectedProperties,
    searchHandler,
    propertyHandler,
    loaded,
}) => {
    const [showList, toggleShowList] = React.useState<boolean>(false);
    const [showSelected, toggleShowSelected] = React.useState<boolean>(false);
    const [propertyList, setPropertyList] = React.useState<PropertyWithOccupants[]>(availableProperties);

    React.useEffect(() => {
        if (showSelected) {
            const propertyIdSet = new Set(selectedProperties);

            setPropertyList(availableProperties.filter((property) => propertyIdSet.has(property.id)));
        } else {
            setPropertyList(availableProperties);
        }
    }, [showSelected, availableProperties.length]);

    const action = {
        callBack: () => {
            toggleShowList(!showList);
            searchHandler('');
        },
    };

    const selectedPropertySet = new Set(selectedProperties);

    return (
        loaded
            ? (
                <>
                    <SecondaryTitleWithAction
                        title={selectedProperties.length > 0 ? `${selectedProperties.length} Properties Selected` : 'Select Properties'}
                        action={action}
                        ActionIcon={showList ? ArrowUpCircle : ArrowDownCircle}
                    />
                    {
                        !showList && !!selectedProperties.length && selectedProperties.length <= 20
                    && (
                        <div className={styles.CurrentPropertySelection}>
                            {
                                availableProperties
                                    .filter((p: PropertyWithOccupants) => selectedPropertySet.has(p.id))
                                    .map((p: PropertyWithOccupants) => <p key={`selected-property-${p.id}`}>{p.name}</p>)
                            }
                        </div>
                    )
                    }
                    {
                        showList
                    && (
                        <>
                            <Search handler={searchHandler} clearCallback={()=>searchHandler("")}/>
                            <ToggleIcon active={showSelected} message="Show Selected Only" toggle={() => toggleShowSelected(!showSelected)} />
                            <ul className={`${styles.list} ${styles.PropertySelect}`}>
                                {
                                    propertyList.map((property: PropertyWithOccupants) => (
                                        <PropertySelection
                                            key={`${property.id}-available`}
                                            property={property}
                                            togglePropertySelection={propertyHandler}
                                            activePropertyIds={selectedProperties}
                                        />
                                    ))
                                }
                            </ul>
                        </>
                    )
                    }
                </>
            )
            : <SecondaryTitle title="Properties Loading" />
    );
};
