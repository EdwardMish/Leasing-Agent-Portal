import * as React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'

import { Business } from '../../../State'

import { LoadingContent } from '../../../Shared/PageElements'
import { PageWrapper } from '../../../Shared/PageWrapper'

import { OccupantDetailsPage } from '../OccupantDetails'
import { OccupantList } from '../OccupantList'

export const BusinessPage = () => {
    const { areLoaded, occupants } = Business.Hooks.useBusinessOccupantsFromState()

    return (
        <>
            {
                areLoaded
                    ? <Switch>
                        <Route path='/business/:occupantId'>
                            <OccupantDetailsPage />
                        </Route>
                        <Route path='/business'>
                            {
                                occupants.length === 1
                                    ? <Redirect to={`/business/${occupants[0].id}`} />
                                    : <PageWrapper pageTitle='Business Information'>
                                        <OccupantList occupants={occupants} />
                                    </PageWrapper>
                            }
                        </Route>
                    </Switch>
                    : <LoadingContent />
            }
        </>
    )
}