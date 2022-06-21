import * as React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'

import { LoadingContent } from '../../../Shared/PageElements'
import { PageWrapper } from '../../../Shared/PageWrapper'
import { PropertyList } from '../../../Shared/Property/PropertyList'

import { DirectoryState } from '../../../State'

import { OccupantDetail } from '../Occupant'

import { PropertyDetail } from '../PropertyDetail'

export const DirectoryPage: React.FC<{}> = () => {

    let { path } = useRouteMatch()

    const { areLoaded } = DirectoryState.Hooks.usePropertiesFromDirectoryState()

    const properties: DirectoryState.Types.DirectoryPropertyWithOccupants[] = useSelector(DirectoryState.selectors.sortedPropertiesList)

    return (
        <>
            {
                areLoaded
                    ? <>
                        <Switch>
                            <Route path={`${path}/:propertyId(\\d+)/:occupantId(\\d+)`}>
                                <OccupantDetail />
                            </Route>
                            <Route path={`${path}/:propertyId(\\d+)`}>
                                <PropertyDetail />
                            </Route>
                            {
                                properties.length === 1
                                    ? <Redirect to={`${path}/${properties[0].id}`} />
                                    : <Route exact path={path}>
                                        <PageWrapper pageTitle='Directory'>
                                            <h1>Directory</h1>
                                            <PropertyList properties={properties} />
                                        </PageWrapper>
                                    </Route>
                            }
                        </Switch>
                    </>
                    : <LoadingContent />
            }
        </>
    )
}