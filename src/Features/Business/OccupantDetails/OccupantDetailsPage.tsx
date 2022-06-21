import * as React from 'react'
import { Switch, Route as ReactRouterRoute, Redirect } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { Business, CurrentUserState } from '../../../State'
import { Route, UserPermissions } from '../../../Types'

import { TabLink } from '../../../Shared/TabLink'
import { PageWrapper } from '../../../Shared/PageWrapper'

import { OccupantDetails } from './Details'
import { OccupantUserDetails } from './Users'
import OccupantComplianceDetails from './Compliance/OccupantComplianceDetails'

const styles = require('./occupant-details.module.css')

const baseTabs = (occupantId) => ({
    details: {
        name: 'Details',
        link: `/business/${occupantId}/details`
    },
    users: {
        name: 'Users',
        link: `/business/${occupantId}/users`
    },
    compliance: {
        name: 'Compliance',
        link: `/business/${occupantId}/compliance`
    }
})

export const OccupantDetailsPage: React.FC<{}> = () => {
    let { occupantId } = useParams<{ occupantId: string }>()

    const userHasBusinessPermission: CurrentUserState.Types.CurrentUser = useSelector(CurrentUserState.selectors.currentUserHasPermissionsForOccupant([UserPermissions.AdministrateBusiness], occupantId))
    const occupant: Business.Types.Occupant = useSelector(Business.selectors.occupant(occupantId))

    const tabs = userHasBusinessPermission
        ? [
            baseTabs(occupantId).details,
            baseTabs(occupantId).users,
            baseTabs(occupantId).compliance,
        ] : [
            baseTabs(occupantId).details,
            baseTabs(occupantId).users,
        ]

    const routes: Route[] = [
        { target: '/business', display: 'All Businesses' }
    ]

    const breadCrumbs = {
        current: occupant?.marketingName || 'Loading...',
        routes
    }

    return (
        <PageWrapper pageTitle={`Business | ${occupant?.marketingName || ''}`} breadCrumbs={breadCrumbs}>
            <h1 style={{ margin: '0 0 0.25rem' }}>{occupant.marketingName}</h1>
            <p className={styles.PropertyName}>{occupant.propertyName}</p>

            <TabLink tabs={tabs} />
            <Switch>
                <ReactRouterRoute path={`/business/${occupantId}/details`}>
                    <OccupantDetails occupant={occupant} />
                </ReactRouterRoute>
                <ReactRouterRoute path={`/business/${occupantId}/users`}>
                    <OccupantUserDetails
                        marketingName={occupant.marketingName}
                        propertyName={occupant.propertyName}
                        occupantId={occupant.id}
                        baseUsers={occupant.users}
                    />
                </ReactRouterRoute>
                <ReactRouterRoute path={`/business/${occupantId}/compliance`}>
                    {
                        userHasBusinessPermission
                            ? <OccupantComplianceDetails occupantId={occupant.id} />
                            : <Redirect to={`/business/${occupantId}/details`} />
                    }
                </ReactRouterRoute>
                <Redirect
                    exact
                    from={`/business/:occupantId`}
                    to={`/business/${occupantId}/details`}
                />
            </Switch>
        </PageWrapper>
    )
}