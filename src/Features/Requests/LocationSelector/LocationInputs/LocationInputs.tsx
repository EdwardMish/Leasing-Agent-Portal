import * as React from 'react'

import { Inputs } from '../../../../Shared/FormFields'

interface LocationInputsProps {
    occupantId: number;
    propertyId: number;
}

export const LocationInputs: React.FC<LocationInputsProps> = ({
    occupantId,
    propertyId
}) => {
    const noOpHandler = (e: React.FormEvent<HTMLInputElement>) => { return; }

    return (
        <>
            <Inputs.Number
                id='location-selector-property-id'
                name='Property ID'
                value={propertyId}
                handler={noOpHandler}
                required
                hidden
            />
            <Inputs.Number
                id='location-selector-occupant-id'
                name='Occupant ID'
                value={occupantId}
                handler={noOpHandler}
                required
                hidden
            />
        </>
    )
}