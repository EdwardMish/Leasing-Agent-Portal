import * as React from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Add } from '../../../../Icons/Add';
import IconWithText from '../../../../Shared/PageElements/IconWithText';
import InteractionCreate from '../Interactions/InteractionCreate';
import InteractionDetails from '../Interactions/InteractionDetails';
import InteractionsList from '../Interactions/InteractionsList';
import ApplicationPageWrapper from './PageWrapper';

export default (): React.ReactElement => {

    const { url } = useRouteMatch();

    return (
        <Switch>
            <Route exact path="/app/inspections/:propertyId/interactions/create">
                <ApplicationPageWrapper>
                    <InteractionCreate />
                </ApplicationPageWrapper>
            </Route>
            <Route exact path="/app/inspections/:propertyId/interactions/:interactionId">
                <ApplicationPageWrapper>
                    <InteractionDetails />
                </ApplicationPageWrapper>
            </Route>
            <Route path="/app/inspections/:propertyId/interactions">
                <ApplicationPageWrapper headerAction={(
                    <Link to={`${url}/create`}>
                        <IconWithText text='Add Interaction' Icon={Add} />
                    </Link>
                )}>
                    <InteractionsList />
                </ApplicationPageWrapper>
            </Route>
        </Switch >
    );
};
