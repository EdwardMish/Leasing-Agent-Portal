import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Completed from '../Feature/Completed';
import Drafts from '../Feature/Drafts';

interface InspectionPanelProps {
    url: string;
}

export default ({ url }: InspectionPanelProps): React.ReactElement => (
    <Switch>
        <Route exact path={`${url}/drafts`}>
            <Drafts />
        </Route>
        <Route exact path={`${url}/completed`}>
            <Completed />
        </Route>
        <Redirect from={url} to={`${url}/drafts`} />
    </Switch>
);
