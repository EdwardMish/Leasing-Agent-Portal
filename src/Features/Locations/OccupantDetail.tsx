import * as React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route as ReactRoute, Switch, useParams, useRouteMatch } from 'react-router-dom';
import { FlexWrapper } from 'Shared/FlexWrapper';
import OccupantMailingAddress from 'Shared/Occupant/OccupantMailingAddress';
import { OccupantSettings } from 'Shared/Occupant/OccupantSettings';
import OccupantUserList from 'Shared/Occupant/OccupantUserList';
import InvitedUserList from 'Shared/Occupant/InvitedUserList';
import { LoadingContent, SecondaryTitle } from 'Shared/PageElements';
import { PageWrapper } from 'Shared/PageWrapper';
import { AdminSalesTable } from 'Shared/Sales';
import { Header, HeaderLink, LinksPanel, Tabs } from 'Shared/Tabs';
import { CurrentUserState } from 'State';
import { selectors } from 'State/Locations';
import useLocationsOccupantFromState from 'State/Locations/Hooks/useLocationsOccupantFromState';
import { Property } from 'State/Shared/Types';
import { Route } from 'Types';
import { getRootPath } from 'utils';
import { mapOccupantResponseToOccupant } from 'utils/Mappers';
import { OccupantSummary } from 'Features/Sales/OccupantSummary';
import OccupantCompliance from './Compliance/OccupantCompliance';
import OccupantDocuments from './OccupantDocuments';
import OccupantRequests from './OccupantRequests';

const OccupantDetail: React.FC = (): React.ReactElement => {
    const { url, path } = useRouteMatch();

    const routeUrl = '/locations/:propertyId/occupants/:occupantId';

    const { propertyId, occupantId } = useParams<{ propertyId: string; occupantId: string }>();

    const property: Property = useSelector(selectors.property(propertyId));

    const canAccessSettings: boolean = useSelector(CurrentUserState.selectors.currentUserIsOOAdmin);

    const { isLoaded: occupantIsLoaded, occupant } = useLocationsOccupantFromState(occupantId);

    const target = getRootPath(path, '/locations');

    const rootRoute = `${target}/${propertyId}`;

    const routes: Route[] = [
        { target, display: 'Locations' },
        { target: rootRoute, display: property?.name || '' },
        { target: `${rootRoute}/neighbors`, display: 'Neighbors' },
    ];

    const breadCrumbs = {
        current: occupant?.marketingName || 'Loading...',
        routes,
    };

    const tabs = [
        { name: 'Users', link: `${url}/users` },
        { name: 'Invited Users', link: `${url}/invited-users` },
        { name: 'Sales', link: `${url}/sales` },
        { name: 'Documents', link: `${url}/documents` },
        { name: 'Requests', link: `${url}/requests` },
        { name: 'Compliance', link: `${url}/compliance` },
        { name: 'Settings', link: `${url}/settings`, hideTab: () => !canAccessSettings },
    ];

    return (
        <PageWrapper
            pageTitle={`Locations | ${occupant?.marketingName || ''} @ ${property?.name || ''}`}
            breadCrumbs={breadCrumbs}
        >
            {occupantIsLoaded && !!occupant ? (
                <>
                    <FlexWrapper align="start" justify="between">
                        <div>
                            <OccupantSummary
                                noMarginTop
                                occupantName={occupant.marketingName || ''}
                                propertyName={property?.name || ''}
                                headerTags={['h1', 'h3']}
                            />
                            <>
                                {Object.values(occupant.mailingAddress).some((s: string) => s && !!s.length) ? (
                                    <div style={{ margin: '0 0 1.5rem' }}>
                                        <SecondaryTitle title="Mailing Address" />
                                        <OccupantMailingAddress mailingAddress={occupant.mailingAddress} />
                                    </div>
                                ) : (
                                    <p
                                        style={{
                                            margin: '1rem 0 0.4rem',
                                            color: 'rgb(140, 140, 140)',
                                        }}
                                    >
                                        <i>No Mailing Address Set</i>
                                    </p>
                                )}
                            </>
                        </div>
                    </FlexWrapper>
                    <Tabs>
                        <Header>
                            {tabs.map(({ name, link, hideTab }) => (
                                <HeaderLink
                                    key={`tab-header-item-occupant-${name}`}
                                    name={name}
                                    link={link}
                                    hideTab={hideTab}
                                />
                            ))}
                        </Header>
                        <LinksPanel>
                            <Switch>
                                <ReactRoute path={`${routeUrl}/sales`}>
                                    <AdminSalesTable occupant={mapOccupantResponseToOccupant(occupant)} />
                                </ReactRoute>
                                <ReactRoute path={`${routeUrl}/documents`}>
                                    <OccupantDocuments occupantId={occupantId} />
                                </ReactRoute>
                                <ReactRoute path={`${routeUrl}/users`}>
                                    <OccupantUserList occupant={mapOccupantResponseToOccupant(occupant)} />
                                </ReactRoute>
                                <ReactRoute path={`${routeUrl}/invited-users`}>
                                    <InvitedUserList occupant={mapOccupantResponseToOccupant(occupant)} />
                                </ReactRoute>
                                <ReactRoute path={`${routeUrl}/settings`}>
                                    <div style={{ margin: '1rem 0 0' }}>
                                        {canAccessSettings ? (
                                            <OccupantSettings occupant={mapOccupantResponseToOccupant(occupant)} />
                                        ) : (
                                            <Redirect to={`${url}/details`} />
                                        )}
                                    </div>
                                </ReactRoute>
                                <ReactRoute path={`${routeUrl}/requests`}>
                                    <div style={{ margin: '1rem 0 0' }}>
                                        <OccupantRequests occupantId={occupantId} />
                                    </div>
                                </ReactRoute>
                                <ReactRoute path={`${routeUrl}/compliance`}>
                                    <div style={{ margin: '1rem 0 0' }}>
                                        <OccupantCompliance occupantId={parseInt(occupantId, 10)} />
                                    </div>
                                </ReactRoute>
                                <Redirect from="/" to={`${url}/users`} />
                            </Switch>
                        </LinksPanel>
                    </Tabs>
                </>
            ) : (
                <LoadingContent />
            )}
        </PageWrapper>
    );
};

export default OccupantDetail;
