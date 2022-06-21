import * as React from 'react'
import { useSelector } from 'react-redux'
import { useParams, useRouteMatch } from 'react-router-dom'

import { LoadingContent } from '../../../../Shared/PageElements'
import { PageWrapper } from '../../../../Shared/PageWrapper'
import { TenantSalesTable } from '../../../../Shared/Sales/SalesTable/Tenant/TenantSalesTable'

import { Occupants, Sales } from '../../../../State'

import { Route } from '../../../../Types'

import { getRootPath } from '../../../../utils'

import { OccupantSummary } from '../../OccupantSummary'
import { PriorityList } from '../PriorityList'

export const OccupantDetail: React.FC<{}> = () => {

    let { path } = useRouteMatch()

    let { occupantId } = useParams<{ occupantId: string }>()

    const { name: occupantName = '', propertyName = '' }: Occupants.Types.Occupant = useSelector(Sales.selectors.salesOccupant(occupantId))
    const occupantsAreLoaded: boolean = useSelector(Sales.selectors.salesForOccupantAreLoaded)
    const hasSingleSalesOccupant: boolean = useSelector(Sales.selectors.hasSingleSalesOccupant)

    const target = getRootPath(path, '/sales')

    const routes: Route[] = [
        { target, display: 'Sales' },
    ]

    const breadCrumbs = {
        current: occupantName || '',
        routes
    }

    return (
        <PageWrapper pageTitle={`Sales | ${occupantName}`} breadCrumbs={breadCrumbs}>
            {
                occupantsAreLoaded
                    ?
                    <>
                        <OccupantSummary
                            noMarginTop
                            occupantName={occupantName}
                            propertyName={propertyName}
                        />
                        {hasSingleSalesOccupant && <PriorityList />}
                        <TenantSalesTable occupantId={occupantId} />
                    </>
                    : <LoadingContent />
            }
        </PageWrapper>
    )
}