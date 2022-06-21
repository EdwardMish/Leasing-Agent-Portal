import * as React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import {
    // useDispatch,
    useSelector
} from 'react-redux'

import { conversationsSelectors } from '../../../State'
import { ConversationsListPage } from './ConversationsListPage'
import { ConversationsDetailPage } from './ConversationsDetailPage'
import { LoadingContent } from '../../../Shared/PageElements'
import { PageWrapper } from '../../../Shared/PageWrapper'

export const ConversationsPage: React.FC<{}> = () => {
    let { path } = useRouteMatch()

    const conversationsAreLoaded: boolean = useSelector(conversationsSelectors.conversationsAreLoaded)

    return (
        <PageWrapper pageTitle='Conversations'>
            {
                conversationsAreLoaded
                    ? <>
                        <Switch>
                            <Route path={`${path}/:conversationId`}>
                                <ConversationsDetailPage />
                            </Route>
                            <Route path={`${path}`}>
                                <ConversationsListPage />
                            </Route>
                        </Switch>
                    </>
                    : <LoadingContent />
            }
        </PageWrapper>
    )
}