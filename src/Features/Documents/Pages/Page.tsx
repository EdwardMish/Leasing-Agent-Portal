import * as React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { LoadingContent, Title } from '../../../Shared/PageElements';
import { PageWrapper } from '../../../Shared/PageWrapper';
import { PropertyList } from '../../../Shared/Property/PropertyList';
import { Documents } from '../../../State';
import { TenantDocuments } from '../TenantDocuments';
import { TenantDocumentsPropertyDetail } from '../TenantDocumentsPropertyDetail';

export const Page: React.FC<{}> = () => {
    let { path } = useRouteMatch();

    const { areLoaded, propertiesWithOccupants } = Documents.Hooks.usePropertiesFromDocumentState();

    return (
        <>
            {areLoaded ? (
                <Switch>
                    <Route path={`${path}/:propertyId/:occupantId`}>
                        <TenantDocuments />
                    </Route>
                    <Route path={`${path}/:propertyId`}>
                        <TenantDocumentsPropertyDetail />
                    </Route>
                    {propertiesWithOccupants.length === 1 ? (
                        <Redirect to={`${path}/${propertiesWithOccupants[0].id}`} />
                    ) : (
                        <Route path={path}>
                            <PageWrapper pageTitle='Documents'>
                                <Title title="Documents" />
                                <PropertyList properties={propertiesWithOccupants} />
                            </PageWrapper>
                        </Route>
                    )}
                </Switch>
            ) : (
                <LoadingContent />
            )}
        </>
    );
};
