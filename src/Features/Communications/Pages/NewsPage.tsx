import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import { PageWrapper } from 'Shared/PageWrapper';

import News from '../News/Pages/NewsPage';
import NewsDetailsTenant from '../News/Details/TenantNewsDetails';

const NewsPage: React.FC = (): React.ReactElement => (
    <Switch>
        <Route path="/news/details/:newsItemId">
            <NewsDetailsTenant />
        </Route>
        <Route path="/news">
            <PageWrapper pageTitle="News">
                <h1>News</h1>
                <News />
            </PageWrapper>
        </Route>
    </Switch>
);

export default NewsPage;
