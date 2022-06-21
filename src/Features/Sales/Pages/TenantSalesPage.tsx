import * as React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'

import { LoadingContent } from '../../../Shared/PageElements'

import { Sales } from '../../../State'
import { currentUserHasPermission } from '../../../State/CurrentUser/selectors'
import { UserPermissions } from '../../../Types'

import {
    OccupantDetail,
    Resubmit,
    SubmitMonth,
    TenantSalesDashboard
} from '../Tenant'



export const TenantSalesPage: React.FC<{}> = () => {

    let { path } = useRouteMatch()

    const canSubmitSales: boolean = useSelector(currentUserHasPermission(UserPermissions.SubmitSales))

    const { areLoaded, occupants } = Sales.Hooks.useOccupantsFromSalesState()

    return (
        <>
            {
                areLoaded
                    ? <Switch>
                        <Route exact path={`${path}/resubmit/:occupantId/:year/:month`}>
                            {
                                canSubmitSales ? <Resubmit /> : <Redirect to='/' />
                            }
                        </Route>
                        <Route exact path={`${path}/submit/:occupantId/:year/:month`}>
                            {
                                canSubmitSales ? <SubmitMonth /> : <Redirect to='/' />
                            }
                        </Route>
                        <Route exact path={`${path}/:occupantId`}>
                            <OccupantDetail />
                        </Route>
                        {
                            occupants.length == 1
                                ? <Redirect to={`${path}/${occupants[0].id}`} />
                                : <Route path={`${path}`}><TenantSalesDashboard /></Route>
                        }
                    </Switch>
                    : <LoadingContent />
            }
        </>
    )
}