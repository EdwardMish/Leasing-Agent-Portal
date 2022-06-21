import * as React from 'react';

import { ArrowDownCircle, ArrowUpCircle } from '../../../Icons';

import { PropertyOccupant, PropertyWithOccupants } from '../../../State/Shared/Types';

const styles = require('./property-tenant-selection-header.module.css');

interface PropertyTenantSelectionHeaderProps {
    listActive: boolean;
    handler: () => void;
    propertyOrOccupant: PropertyWithOccupants | PropertyOccupant | undefined;
    type: 'Tenant' | 'Property' | 'T' | 'P' | 't' | 'p' | 'Space';
    withMargin?: boolean;
}

export const PropertyTenantSelectionHeader: React.FC<PropertyTenantSelectionHeaderProps> = ({
    listActive,
    handler,
    propertyOrOccupant,
    type,
    withMargin = false,
}) => {
    const [selectionType, setSelectionType] = React.useState<'Tenant' | 'Property' | 'Space'>();

    React.useEffect(() => {
        const theType = type.toLocaleLowerCase();

        if (theType === 'p' || theType === 'property') {
            setSelectionType('Property');
        } else if (theType === 't' || theType === 'tenant') {
            setSelectionType('Tenant');
        } else if (theType === 'space') {
            setSelectionType('Space');
        }
    }, [propertyOrOccupant]);

    return (
        <>
            {selectionType && (
                <div
                    className={`${styles.PropertyTenantSelectionHeader} ${withMargin ? styles.WithMargin : ''} `}
                    onClick={handler}
                >
                    <p>
                        {!!propertyOrOccupant && propertyOrOccupant.hasOwnProperty('id')
                            ? `${selectionType}: ${propertyOrOccupant.name}`
                            : `Click to select a ${selectionType} (required)`}
                    </p>
                    {listActive ? <ArrowUpCircle /> : <ArrowDownCircle />}
                </div>
            )}
        </>
    );
};

