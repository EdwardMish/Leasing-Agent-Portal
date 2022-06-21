import React from 'react';
import {
    Link,
    Switch,
    Route,
    useRouteMatch,
} from 'react-router-dom';

import { Add } from '../../../Icons';
import { IconWithText } from '../../../Shared/PageElements';
import { PageWrapper } from '../../../Shared/PageWrapper';

import {
    Actions,
    Header,
    HeaderLink,
    LinksPanel,
    Tabs,
    Wrapper,
} from '../../../Shared/Tabs';

import InspectionDetail from '../Feature/InspectionDetail';

import InspectionPrint from '../Feature/Print';

import InspectionsPanel from './InspectionsPanel';

import styles = require('../inspections.module.css')

export default (): React.ReactElement => {
    const { url } = useRouteMatch();

    return (
        <Switch>
            <Route path="/inspections/details/:inspectionId">
                <InspectionDetail />
            </Route>
            <Route exact path="/inspections/:inspectionId/print">
                <InspectionPrint />
            </Route>
            <Route path="/inspections">
                <PageWrapper pageTitle="Inspections" className={styles.Inspections}>
                    <h1>Inspections</h1>
                    <Tabs>
                        <Header>
                            <HeaderLink name="Drafts" link={`${url}/drafts`} />
                            <HeaderLink name="Completed" link={`${url}/completed`} />
                        </Header>
                        <LinksPanel>
                            <InspectionsPanel url={url} />
                        </LinksPanel>
                        <Actions>
                            <Wrapper actionid="link-to-inspections-app">
                                <Link to="/app/inspections">
                                    <IconWithText text="Create Inspection" Icon={Add} />
                                </Link>
                            </Wrapper>
                        </Actions>
                    </Tabs>
                </PageWrapper>
            </Route>
        </Switch>
    );
};
