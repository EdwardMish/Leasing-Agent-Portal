import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import Communications from '../Communications';
import NewsDetailsOO from '../News/Details/OwnerOperatorNewsDetails';
import CreateNews from '../News/Pages/Create';
import CreateAlert from '../Alerts/Pages/Create';

const CommunicationsPage: React.FC = (): React.ReactElement => (
    <Switch>
        <Route exact path="/communications/alerts/create">
            <CreateAlert />
        </Route>
        <Route exact path="/communications/news/create">
            <CreateNews />
        </Route>
        <Route exact path="/communications/news/details/:newsItemId">
            <NewsDetailsOO />
        </Route>
        <Route path="/communications">
            <Communications />
        </Route>
    </Switch>
);

export default CommunicationsPage;
