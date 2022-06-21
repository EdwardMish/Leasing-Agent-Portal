import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Compliance, { ComplianceType, OccupantCompliance } from '../../../API/Compliance'

import { WelcomeActions, WelcomeActionTypes } from '../actions'
import { complianceForOccupant } from '../selectors'

type WelcomeStateComplianceHook = (occupantId: number) => {
    isLoaded: boolean,
    hasError: boolean,
    compliance: OccupantCompliance[] | null,
    error: string | undefined,
    complianceByType: (complianceType: ComplianceType) => OccupantCompliance | null
}

export const useComplianceFromWelcomeState: WelcomeStateComplianceHook = (occupantId) => {
    const dispatch = useDispatch()

    const compliance: OccupantCompliance[] | null = useSelector(complianceForOccupant(occupantId))

    const [errorState, setErrorState] = React.useState<string | undefined>()
    const [loadedOccupantId, setLoadedOccupantId] = React.useState<number | string>(0)
    const [pending, togglePending] = React.useState<boolean>(false)

    React.useEffect(() => {
        if (!pending && !compliance && occupantId !== loadedOccupantId) {
            togglePending(true)

            Compliance.getOccupantCompliance(occupantId)
                .then((compliance) => {
                    setLoadedOccupantId(occupantId)

                    dispatch({
                        type: WelcomeActions.ADD_OCCUPANT_COMPLIANCE,
                        payload: {
                            occupantId,
                            compliance
                        }
                    } as WelcomeActionTypes)

                    togglePending(false)
                })
                .catch(() => {
                    setErrorState('We were not able to access compliance data.')

                    togglePending(false)
                })
        }
    }, [occupantId, compliance])

    const complianceByType = (type: ComplianceType) => !!(compliance) && !!(compliance.length)
        ? compliance.find(({ complianceType }: OccupantCompliance) => complianceType === type) || null
        : null

    return {
        isLoaded: !!(compliance),
        hasError: !!(errorState),
        compliance,
        error: errorState,
        complianceByType
    }
}
