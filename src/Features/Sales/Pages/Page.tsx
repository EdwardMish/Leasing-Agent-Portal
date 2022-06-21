import * as React from 'react'
import { useSelector } from 'react-redux'
import { CurrentUserState } from '../../../State'

import { OOSalesPage } from './OOSalesPage'
import { TenantSalesPage } from './TenantSalesPage'



export const Page: React.FC<{}> = () => {

    const userIsTenant: boolean = useSelector(CurrentUserState.selectors.currentUserIsTenant)

    return (
        <>
            {
                userIsTenant
                    ?
                    <TenantSalesPage />
                    :
                    <OOSalesPage />
            }
        </>
    )
}