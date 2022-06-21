import * as React from 'react'
import { useSelector } from 'react-redux'

import { CurrentUserState, Properties } from '../../../State'

import { LoadingContent } from '../../../Shared/PageElements'

import { SingleLocation } from './SingleLocation'
import { MultipleLocations } from './MultipleLocations'

export const LocationSelector: React.FC<{}> = () => {

    const propertiesAreLoaded: boolean = useSelector(Properties.selectors.propertiesAreLoaded)

    const currentUserOccupants: number[] = useSelector(CurrentUserState.selectors.currentUserOccupants)

    return (
        propertiesAreLoaded && currentUserOccupants
            ? <>
                {
                    currentUserOccupants.length === 1
                        ? <SingleLocation occupantId={currentUserOccupants[0]} />
                        : <MultipleLocations />
                }
            </>
            : <LoadingContent message='Loading Properties' />
    )
}